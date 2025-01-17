import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function FloatingMenu() {
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const menuRef = useRef<globalThis.HTMLDivElement | null>(null);
  const buttonRef = useRef<globalThis.HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        isQuickActionOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as globalThis.Node) &&
        !buttonRef.current.contains(event.target as globalThis.Node)
      ) {
        setIsQuickActionOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isQuickActionOpen]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 tablet:hidden">
      {/* Quick Action Options */}
      <div
        ref={menuRef}
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300 ${
          isQuickActionOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 items-center bg-dark-100 rounded-lg p-3 shadow-lg border border-dark-300">
          {/* Call the Club */}
          <button
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors whitespace-nowrap py-1"
            onClick={() => (window.location.href = "tel:+1234567890")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-xs">Call the Club</span>
          </button>

          {/* Book a Bay */}
          <Link
            to="/reservations"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors whitespace-nowrap py-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xs">Book a Bay</span>
          </Link>

          {/* Make a Dining Reservation */}
          <Link
            to="/dining"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors whitespace-nowrap py-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">Dining Reservation</span>
          </Link>
        </div>
      </div>

      {/* Main Menu Bar */}
      <div className="flex items-center gap-4 bg-dark-100 rounded-lg px-5 py-2 shadow-lg border border-dark-300">
        {/* Account Button */}
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-[10px]">Account</span>
        </Link>

        {/* Quick Action Button */}
        <button
          ref={buttonRef}
          className={`flex flex-col items-center transition-colors ${
            isQuickActionOpen ? "text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
        >
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${
              isQuickActionOpen ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-[10px]">Quick Action</span>
        </button>

        {/* Calendar Button */}
        <Link
          to="/events"
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px]">Calendar</span>
        </Link>
      </div>
    </div>
  );
}

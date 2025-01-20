import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface FloatingMenuProps {
  isNavOpen: boolean;
}

export function FloatingMenu({ isNavOpen }: FloatingMenuProps) {
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const menuRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const scrollTimeout = useRef<number>();

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(true);

      // Clear the previous timeout
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout to remove the scrolling state
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 750);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        isQuickActionOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as any) &&
        !buttonRef.current.contains(event.target as any)
      ) {
        setIsQuickActionOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isQuickActionOpen]);

  // Don't render if nav is expanded
  if (isNavOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none tablet:hidden transition-opacity duration-200 ${
          isScrolling ? "opacity-30" : "opacity-100"
        }`}
      />
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 tablet:hidden transition-opacity duration-200 ${
          isScrolling ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Quick Action Options */}
        <div
          ref={menuRef}
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300 ${
            isQuickActionOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1.5 items-center bg-dark-100 rounded-lg p-2.5 shadow-lg border border-dark-300">
            {/* Call the Club */}
            <button
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap py-1"
              onClick={() => (window.location.href = "tel:+1234567890")}
            >
              <svg
                className="w-3.5 h-3.5"
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
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              <svg
                className="w-3.5 h-3.5"
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
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              <svg
                className="w-3.5 h-3.5"
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
        <div className="flex items-center gap-3 bg-dark-100 rounded-lg px-4 py-1.5 shadow-lg border border-dark-300">
          {/* Account Button */}
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-[8px]">Account</span>
          </Link>

          {/* Quick Action Button */}
          <button
            ref={buttonRef}
            className={`flex flex-col items-center transition-colors ${
              isQuickActionOpen
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
          >
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
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
            <span className="text-[8px]">Quick Action</span>
          </button>

          {/* Calendar Button */}
          <Link
            to="/events"
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-[8px]">Calendar</span>
          </Link>
        </div>
      </div>
    </>
  );
}

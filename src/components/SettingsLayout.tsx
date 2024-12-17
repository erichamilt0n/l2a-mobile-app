import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SettingsLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function SettingsLayout({ children, title, description }: SettingsLayoutProps) {
  const location = useLocation();

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Link to="/profile" className={`block bg-dark-100 rounded-xl p-4 md:p-6 text-center transition-colors ${
          location.pathname === '/profile' ? 'ring-2 ring-[#333e48]' : 'hover:bg-dark-200'
        }`}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#333e48] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm md:text-base text-gray-400">Profile</span>
        </Link>

        <Link to="/reservations" className={`block bg-dark-100 rounded-xl p-4 md:p-6 text-center transition-colors ${
          location.pathname === '/reservations' ? 'ring-2 ring-[#333e48]' : 'hover:bg-dark-200'
        }`}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#333e48] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm md:text-base text-gray-400">Reservation History</span>
        </Link>

        <Link to="/notifications" className={`block bg-dark-100 rounded-xl p-4 md:p-6 text-center transition-colors ${
          location.pathname === '/notifications' ? 'ring-2 ring-[#333e48]' : 'hover:bg-dark-200'
        }`}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#333e48] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <span className="text-sm md:text-base text-gray-400">Notifications</span>
        </Link>

        <Link to="/preferences" className={`block bg-dark-100 rounded-xl p-4 md:p-6 text-center transition-colors ${
          location.pathname === '/preferences' ? 'ring-2 ring-[#333e48]' : 'hover:bg-dark-200'
        }`}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#333e48] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm md:text-base text-gray-400">Preferences</span>
        </Link>
      </div>

      {children}
    </div>
  );
}

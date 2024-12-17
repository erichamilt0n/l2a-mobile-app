import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleMouseEnter = () => {
  };

  const handleMouseLeave = () => {
    onClose();
  };

  const handleLogout = () => {
    navigate('/')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Reservations',
      path: '/reservations',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Events',
      path: '/events',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: 'Pro Shop',
      path: '/pro-shop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 tablet:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        style={{ backgroundColor: '#7d622d' }}
        className={`fixed top-0 right-0 h-screen transform transition-transform ease-in-out z-30 
          ${isOpen ? 'translate-x-0' : 'translate-x-full tablet:translate-x-0'}
          group tablet:hover:w-64 tablet:w-16 w-64
          tablet:hover:p-4 tablet:p-2 p-4
          duration-200`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`flex justify-between items-center mb-8 tablet:opacity-0 tablet:group-hover:opacity-100 transition-opacity duration-200 ${!isOpen && 'hidden tablet:flex'}`}>
          <h2 className="text-2xl font-bold text-white">Lodge2A</h2>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center rounded-xl transition-all duration-200 
                ${location.pathname === item.path
                  ? 'bg-white/20 text-white'
                  : 'text-white hover:bg-white/10'
                }
                tablet:px-2 tablet:group-hover:px-3 px-3 py-3
                tablet:justify-center tablet:group-hover:justify-start`}
            >
              <div className="flex items-center justify-center w-6 h-6 tablet:mx-auto tablet:group-hover:mx-0">
                {item.icon}
              </div>
              <span className={`ml-3 tablet:hidden tablet:group-hover:inline-block transition-all duration-200`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className={`absolute bottom-8 tablet:left-2 tablet:right-2 tablet:group-hover:left-4 tablet:group-hover:right-4 left-4 right-4 transition-all duration-200`}>
          <button
            onClick={handleLogout}
            className={`flex items-center rounded-xl transition-all duration-200
              text-white hover:bg-white/10
              tablet:px-2 tablet:group-hover:px-3 px-3 py-3
              tablet:justify-center tablet:group-hover:justify-start w-full`}
          >
            <div className="flex items-center justify-center w-6 h-6 tablet:mx-auto tablet:group-hover:mx-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className={`ml-3 tablet:hidden tablet:group-hover:inline-block transition-all duration-200`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 p-2 rounded-xl bg-dark-100 text-gray-400 hover:text-white tablet:hidden z-50"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}

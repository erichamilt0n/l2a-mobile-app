import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Stats from './pages/Stats'
import Login from './pages/Login'
import Events from './pages/Events'
import Reservation from './pages/Reservation'
import Reservations from './pages/Reservations'
import Dashboard from './pages/Dashboard'
import ProShop from './pages/ProShop'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Preferences from './pages/Preferences'
import Profile from './pages/Profile'
import Navigation, { MobileMenuButton } from './components/Navigation'

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isLoginPage = location.pathname === '/'

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-dark">
      {!isLoginPage && (
        <>
          <Navigation isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
          <MobileMenuButton
            onClick={() => {
              setIsMobileMenuOpen(true)
            }}
          />
          <div className="tablet:ml-16 tablet:group-hover:ml-64 transition-[margin] duration-200 ease-in-out">
            <div className="max-w-[1920px] w-full mx-auto px-4 tablet:px-8 py-6 tablet:py-10">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/events" element={<Events />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/pro-shop" element={<ProShop />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      {isLoginPage && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

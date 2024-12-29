import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'

/**
 * Icon component for the score card
 * @returns {JSX.Element} Score icon SVG
 */
function ScoreIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  )
}

/**
 * Icon component for the handicap card
 * @returns {JSX.Element} Handicap icon SVG
 */
function HandicapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

/**
 * Icon component for the reservations card
 * @returns {JSX.Element} Reservations icon SVG
 */
function ReservationsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

/**
 * Icon component for the events card
 * @returns {JSX.Element} Events icon SVG
 */
function EventsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}

/**
 * Header component displaying welcome message
 * @returns {JSX.Element} Welcome header section
 */
function WelcomeHeader() {
  return (
    <header className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome Back, John</h1>
      <p className="text-gray-400">Here's what's happening at Lodge2A</p>
    </header>
  )
}

/**
 * Grid of stat cards displaying user information
 * @param {Object} props - Component props
 * @param {(route: string) => void} props.onCardClick - Handler for card clicks
 * @returns {JSX.Element} Grid of stat cards
 */
function StatCards({ onCardClick }: { onCardClick: (route: string) => void }) {
  const handleScoreClick = () => onCardClick('/scores')
  const handleHandicapClick = () => onCardClick('/handicap')
  const handleReservationsClick = () => onCardClick('/reservations')
  const handleEventsClick = () => onCardClick('/events')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard title="Recent Score" value="82" onClick={handleScoreClick} icon={<ScoreIcon />} />
      <StatCard
        title="Handicap"
        value="14.2"
        onClick={handleHandicapClick}
        icon={<HandicapIcon />}
      />
      <StatCard
        title="Reservations"
        value="2"
        onClick={handleReservationsClick}
        icon={<ReservationsIcon />}
      />
      <StatCard title="Events" value="3" onClick={handleEventsClick} icon={<EventsIcon />} />
    </div>
  )
}

/**
 * Main dashboard component
 * @returns {JSX.Element} Dashboard page
 */
export default function Dashboard() {
  const navigate = useNavigate()

  /**
   * Handles navigation when a card is clicked
   * @param {string} route - The route to navigate to
   */
  function handleCardClick(route: string) {
    navigate(route)
  }

  return (
    <main data-testid="dashboard" className="container mx-auto px-4 py-6 md:py-8">
      <WelcomeHeader />
      <StatCards onCardClick={handleCardClick} />
    </main>
  )
}

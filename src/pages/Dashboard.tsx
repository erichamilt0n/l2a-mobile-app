import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Grid } from '../components/layout/Grid'
import { StatCard } from '../components/ui/StatCard'

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

function WelcomeHeader() {
  return (
    <header className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome Back, John</h1>
      <p className="text-gray-400">Here's what's happening at Lodge2A</p>
    </header>
  )
}

function StatCards({ onCardClick }: { onCardClick: (route: string) => void }) {
  return (
    <Grid cols={1} mdCols={2} lgCols={4} gap={6} className="mb-6">
      <StatCard
        title="Recent Score"
        value="82"
        onClick={() => onCardClick('/scores')}
        icon={<ScoreIcon />}
      />
      <StatCard
        title="Handicap"
        value="14.2"
        onClick={() => onCardClick('/handicap')}
        icon={<HandicapIcon />}
      />
      <StatCard
        title="Reservations"
        value="2"
        onClick={() => onCardClick('/reservations')}
        icon={<ReservationsIcon />}
      />
      <StatCard
        title="Events"
        value="3"
        onClick={() => onCardClick('/events')}
        icon={<EventsIcon />}
      />
    </Grid>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()

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

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Grid } from '../components/layout/Grid'
import { StatCard } from '../components/ui/StatCard'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome Back, John</h1>
        <p className="text-gray-400">Here's what's happening at Lodge2A</p>
      </div>

      {/* Quick Stats */}
      <Grid cols={1} mdCols={2} lgCols={4} gap={6}>
        <StatCard
          title="Upcoming Reservations"
          value="3"
          onClick={() => navigate('/reservations')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Events This Week"
          value="5"
          onClick={() => navigate('/events')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Average Score"
          value="82"
          onClick={() => navigate('/scores')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <StatCard
          title="Pro Shop Points"
          value="1,250"
          onClick={() => navigate('/pro-shop')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </Grid>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Recent Activity</h2>
            <Button variant="secondary">View All</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center justify-between">
                <div>
                  <p className="text-white">Bay Reservation</p>
                  <p className="text-sm text-gray-400">2 hours - Bay {item}</p>
                </div>
                <p className="text-gray-400">Dec {item * 5}, 2024</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Upcoming Events</h2>
            <Button variant="secondary" onClick={() => navigate('/events')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center justify-between">
                <div>
                  <p className="text-white">Tournament {item}</p>
                  <p className="text-sm text-gray-400">18 holes - Singles</p>
                </div>
                <p className="text-gray-400">Dec {item * 10}, 2024</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

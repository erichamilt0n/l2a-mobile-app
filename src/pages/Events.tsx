import React from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Grid } from '../components/layout/Grid'

interface Event {
  id: string
  title: string
  date: string
  time: string
  type: string
  spots: number
  status: string
}

export default function Events() {
  const events: Event[] = [
    {
      id: '1',
      title: 'Winter Tournament',
      date: 'Dec 20, 2024',
      time: '2:00 PM',
      type: 'Tournament',
      spots: 8,
      status: 'open',
    },
    {
      id: '2',
      title: 'Pro Training Session',
      date: 'Dec 22, 2024',
      time: '10:00 AM',
      type: 'Training',
      spots: 4,
      status: 'waitlist',
    },
    {
      id: '3',
      title: 'Christmas Social',
      date: 'Dec 24, 2024',
      time: '1:00 PM',
      type: 'Social',
      spots: 12,
      status: 'open',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Upcoming Events</h1>
        <p className="text-gray-400">Register for tournaments and training sessions</p>
      </div>

      {/* Event Categories */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <Button variant="primary" className="flex-1 sm:flex-none">
            All Events
          </Button>
          <Button variant="secondary" className="flex-1 sm:flex-none">
            Tournaments
          </Button>
          <Button variant="secondary" className="flex-1 sm:flex-none">
            Training
          </Button>
          <Button variant="secondary" className="flex-1 sm:flex-none">
            Social
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <Grid cols={1} mdCols={2} lgCols={3} gap={6}>
        {events.map(event => (
          <Card key={event.id} className="flex flex-col p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{event.title}</h3>
                <p className="text-sm text-gray-400">
                  {event.date} at {event.time}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  event.type === 'Tournament'
                    ? 'bg-blue-100 text-blue-800'
                    : event.type === 'Social'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-purple-100 text-purple-800'
                }`}
              >
                {event.type}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400">{event.spots} spots left</span>
              </div>
            </div>

            <div className="mt-auto">
              {event.status === 'open' ? (
                <Button variant="primary" className="w-full">
                  Register Now
                </Button>
              ) : (
                <Button variant="secondary" className="w-full">
                  Waitlist
                </Button>
              )}
            </div>
          </Card>
        ))}
      </Grid>

      {/* Calendar View Button */}
      <div className="mt-8 text-center">
        <Button variant="secondary" className="inline-flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          View Calendar
        </Button>
      </div>
    </div>
  )
}

import React from 'react'
import { Button } from '../components/ui/Button'
import { BayIcon, TableIcon } from '../components/icons'

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

export default function Reservations() {
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '9:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: false },
    { id: '3', time: '11:00 AM', available: true },
    { id: '4', time: '12:00 PM', available: true },
    { id: '5', time: '1:00 PM', available: false },
    { id: '6', time: '2:00 PM', available: true },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Make a Reservation</h1>
        <p className="text-gray-400">Book your bay or table</p>
      </div>

      {/* Reservation Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
        <Button variant="primary" icon={<BayIcon />}>
          Bay Reservation
        </Button>
        <Button variant="secondary" icon={<TableIcon />}>
          Table Reservation
        </Button>
      </div>

      {/* Date Selection */}
      <div className="bg-dark-100 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Select Date</h2>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => {
            const date = new Date('2024-12-16T16:56:15-05:00')
            date.setDate(date.getDate() + index)
            return (
              <Button
                key={index}
                variant={index === 0 ? 'primary' : 'secondary'}
                fullWidth
              >
                <div className="text-sm font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold">{date.getDate()}</div>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="bg-dark-100 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Select Time</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {timeSlots.map(slot => (
            <Button
              key={slot.id}
              variant={slot.available ? 'primary' : 'secondary'}
              disabled={!slot.available}
              fullWidth
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>

      {/* Guest Count */}
      <div className="bg-dark-100 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Number of Guests</h2>
        <div className="flex items-center space-x-4">
          <Button variant="secondary" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>} />
          <span className="text-xl font-bold text-white">4</span>
          <Button variant="secondary" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>} />
        </div>
      </div>

      {/* Submit Button */}
      <Button variant="primary" fullWidth>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        Complete Reservation
      </Button>
    </div>
  )
}

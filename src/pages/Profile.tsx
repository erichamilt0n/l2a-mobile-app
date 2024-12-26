import React from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Grid } from '../components/layout/Grid'
import { StatCard } from '../components/ui/StatCard'

interface PaymentHistory {
  id: string
  date: string
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

export default function Profile() {
  const paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      date: 'Dec 15, 2024',
      description: 'Bay Reservation - 2 Hours',
      amount: 120.0,
      status: 'completed',
    },
    {
      id: '2',
      date: 'Dec 10, 2024',
      description: 'Pro Shop Purchase - Golf Balls',
      amount: 45.99,
      status: 'completed',
    },
    {
      id: '3',
      date: 'Dec 5, 2024',
      description: 'Monthly Membership Fee',
      amount: 199.99,
      status: 'completed',
    },
    {
      id: '4',
      date: 'Nov 28, 2024',
      description: 'Table Reservation - Dinner',
      amount: 85.0,
      status: 'completed',
    },
  ]

  const getStatusColor = (status: PaymentHistory['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <Grid cols={1} gap={6}>
        {/* Profile Information */}
        <Card>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#2d3339] flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-white">JD</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">John Doe</h2>
              <p className="text-gray-400">john.doe@example.com</p>
              <p className="text-gray-400">Member since Dec 2024</p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Grid cols={1} mdCols={2} lgCols={4} gap={4}>
          <StatCard
            title="Total Spent"
            value="$450.98"
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
          <StatCard
            title="Reservations"
            value="12"
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
            title="Events Attended"
            value="5"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />
          <StatCard
            title="Pro Shop Points"
            value="1,250"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            }
          />
        </Grid>

        {/* Payment History */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Payment History</h2>
            <Button variant="secondary">View All</Button>
          </div>
          <div className="space-y-4">
            {paymentHistory.map(payment => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-dark-200 rounded-lg"
              >
                <div>
                  <p className="text-sm md:text-base text-white font-medium">
                    {payment.description}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base text-white font-medium">
                    ${payment.amount.toFixed(2)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  )
}

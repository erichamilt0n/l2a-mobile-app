import React from 'react'
import SettingsLayout from '../components/SettingsLayout'

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
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <SettingsLayout
      title="Profile Dashboard"
      description="Manage your account settings and preferences"
    >
      {/* Personal Information */}
      <div className="bg-white rounded-xl p-4 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Personal Information</h2>
            <p className="text-sm text-gray-500">Update your personal details</p>
          </div>
          <button className="w-full md:w-auto px-4 py-2 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="text-gray-900">john.doe@example.com</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <div className="text-gray-900">+1 (555) 123-4567</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <div className="text-gray-900">123 Main Street</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
            <div className="text-gray-900">San Francisco</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
            <div className="text-gray-900">CA</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Zip</label>
            <div className="text-gray-900">94105</div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Payment History</h2>
            <p className="text-sm text-gray-500">View and manage your billing information</p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3">
            <button className="w-full md:w-auto px-4 py-2 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Edit Billing
            </button>
            <button className="w-full md:w-auto px-4 py-2 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors">
              View All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {paymentHistory.map(payment => (
            <div
              key={payment.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div className="mb-3 md:mb-0">
                <h3 className="font-medium text-gray-900">{payment.description}</h3>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <span className="text-lg font-medium text-gray-900">
                  ${payment.amount.toFixed(2)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  )
}

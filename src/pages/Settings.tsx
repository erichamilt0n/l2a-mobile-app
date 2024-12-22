import React from 'react'

interface PaymentHistory {
  id: string
  date: string
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

export default function Settings() {
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
    <div className="tablet:pl-16 tablet:group-hover:pl-64 transition-[padding] duration-200">
      <div className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Settings</h1>

        {/* Sections Grid */}
        <div className="grid gap-6 pb-8">
          {/* Personal Information */}
          <section className="bg-dark-100 rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                <p className="text-sm text-gray-400">Update your personal details</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <div className="text-white">john.rambo@badass.com</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                <div className="text-white">+1 (555) 123-4567</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                <div className="text-white">123 Main Street</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                <div className="text-white">Hope</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">State</label>
                <div className="text-white">WA</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Zip</label>
                <div className="text-white">98826</div>
              </div>
            </div>
          </section>

          {/* Payment History */}
          <section className="bg-dark-100 rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-white">Payment History</h2>
                <p className="text-sm text-gray-400">View and manage your billing information</p>
              </div>
              <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3">
                <button className="w-full md:w-auto px-4 py-2 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-dark-200 rounded-lg"
                >
                  <div className="mb-3 md:mb-0">
                    <h3 className="font-medium text-white">{payment.description}</h3>
                    <p className="text-sm text-gray-400">{payment.date}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <span className="text-lg font-medium text-white">
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
          </section>

          {/* Notifications */}
          <section className="bg-dark-100 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive updates about your reservations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333e48]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Get alerts on your mobile device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333e48]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Display */}
          <section className="bg-dark-100 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Display</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-400">Toggle dark mode theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333e48]"></div>
                </label>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Text Size</h3>
                <select className="w-full bg-dark-200 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#333e48]">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-dark-100 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Profile Visibility</h3>
                  <p className="text-sm text-gray-400">Make your profile visible to others</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333e48]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Activity Status</h3>
                  <p className="text-sm text-gray-400">Show when you're online</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333e48]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Account */}
          <section className="bg-dark-100 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account</h2>
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors">
                Change Password
              </button>
              <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

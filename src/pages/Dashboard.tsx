import React from 'react'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome Back, John</h1>
        <p className="text-gray-400">Here's what's happening at Lodge2A</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm md:text-base text-gray-400">Upcoming Reservations</h3>
            <svg
              className="w-5 h-5 text-[#333e48]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white">3</p>
        </div>

        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm md:text-base text-gray-400">Events This Week</h3>
            <svg
              className="w-5 h-5 text-[#333e48]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white">5</p>
        </div>

        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm md:text-base text-gray-400">Average Score</h3>
            <svg
              className="w-5 h-5 text-[#333e48]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white">82</p>
        </div>

        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm md:text-base text-gray-400">Pro Shop Points</h3>
            <svg
              className="w-5 h-5 text-[#333e48]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white">1,250</p>
        </div>
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-sm text-[#333e48] hover:text-[#4a5761] transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Practical Shooting Alpha', date: 'Dec 15, 2024' },
              { name: 'CQC', date: 'Dec 14, 2024' },
              { name: 'Practical Shooting Charlie', date: 'Dec 13, 2024' },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-dark-200 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#333e48] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm md:text-base text-white font-medium">{item.name}</p>
                  <p className="text-xs md:text-sm text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Upcoming Events</h2>
            <button className="text-sm text-[#333e48] hover:text-[#4a5761] transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-start space-x-3 p-3 bg-dark-200 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#333e48] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm md:text-base text-white font-medium">Winter Tournament</p>
                  <p className="text-xs md:text-sm text-gray-400">Dec 20, 2024 • 2:00 PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

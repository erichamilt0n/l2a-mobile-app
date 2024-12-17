import React from 'react';

export default function Stats() {
  const stats = {
    titlesPlayed: 24,
    averageScore: 714,
    bestScore: 1075,
    hoursPlayed: 7,
  };

  const recentScores = [
    { date: 'Dec 15, 2024', score: 82, course: 'Lodge2A Main Course' },
    { date: 'Dec 10, 2024', score: 85, course: 'Lodge2A Main Course' },
    { date: 'Dec 5, 2024', score: 79, course: 'Lodge2A Main Course' },
    { date: 'Nov 30, 2024', score: 81, course: 'Lodge2A Main Course' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Stats</h1>
        <p className="text-gray-400">Track your performance and progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <h3 className="text-sm md:text-base text-gray-400 mb-2">Titles Played</h3>
          <p className="text-xl md:text-2xl font-bold text-white">{stats.titlesPlayed}</p>
        </div>

        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <h3 className="text-sm md:text-base text-gray-400 mb-2">Average Score</h3>
          <p className="text-xl md:text-2xl font-bold text-white">{stats.averageScore.toLocaleString()}</p>
        </div>

        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <h3 className="text-sm md:text-base text-gray-400 mb-2">Best Score</h3>
          <p className="text-xl md:text-2xl font-bold text-white">{stats.bestScore.toLocaleString()}</p>
        </div>

        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <h3 className="text-sm md:text-base text-gray-400 mb-2">Hours Played</h3>
          <p className="text-xl md:text-2xl font-bold text-white">{stats.hoursPlayed}</p>
        </div>
      </div>

      {/* Score History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scores */}
        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Recent Scores</h2>
            <button className="text-sm text-[#333e48] hover:text-[#4a5761] transition-colors">View All</button>
          </div>
          <div className="space-y-4">
            {recentScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#333e48] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{score.score}</span>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-white font-medium">{score.course}</p>
                    <p className="text-xs md:text-sm text-gray-400">{score.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-dark-100 rounded-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Score Trends</h2>
            <div className="flex space-x-2">
              <button className="text-sm px-3 py-1 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors">Week</button>
              <button className="text-sm px-3 py-1 bg-dark-200 text-gray-400 rounded-lg hover:bg-[#4a5761] hover:text-white transition-colors">Month</button>
              <button className="text-sm px-3 py-1 bg-dark-200 text-gray-400 rounded-lg hover:bg-[#4a5761] hover:text-white transition-colors">Year</button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Component Here
          </div>
        </div>
      </div>
    </div>
  );
}

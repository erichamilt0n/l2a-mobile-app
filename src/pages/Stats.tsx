import React from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Grid } from '../components/layout/Grid'
import { StatCard } from '../components/ui/StatCard'

export default function Stats() {
  const stats = {
    titlesPlayed: 24,
    averageScore: 714,
    bestScore: 1075,
    hoursPlayed: 7,
  }

  const recentScores = [
    { date: 'Dec 15, 2024', score: 82, course: 'Lodge2A Main Course' },
    { date: 'Dec 10, 2024', score: 85, course: 'Lodge2A Main Course' },
    { date: 'Dec 5, 2024', score: 79, course: 'Lodge2A Main Course' },
    { date: 'Nov 30, 2024', score: 81, course: 'Lodge2A Main Course' },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Stats</h1>
        <p className="text-gray-400">Track your performance and progress</p>
      </div>

      {/* Stats Overview */}
      <Grid cols={1} mdCols={2} lgCols={4} gap={6} className="mb-6 md:mb-8">
        <StatCard
          title="Titles Played"
          value={stats.titlesPlayed}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="Average Score"
          value={stats.averageScore.toLocaleString()}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
        />
        <StatCard
          title="Best Score"
          value={stats.bestScore.toLocaleString()}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          }
        />
        <StatCard
          title="Hours Played"
          value={stats.hoursPlayed}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </Grid>

      {/* Score History */}
      <Grid cols={2} gap={6} className="grid-cols-1 lg:grid-cols-2">
        {/* Recent Scores */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">Recent Scores</h2>
            <Button variant="secondary" className="flex-1 sm:flex-none">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentScores.map((score, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-dark-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#2d3339] flex items-center justify-center flex-shrink-0">
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
        </Card>

        {/* Performance Chart */}
        <Card>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
            <h2 className="text-lg md:text-xl font-semibold text-white">Score Trends</h2>
            <div className="flex w-full sm:w-auto space-x-2">
              <Button variant="primary" className="flex-1 sm:flex-none">
                Week
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                Month
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                Year
              </Button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Component Here
          </div>
        </Card>
      </Grid>
    </div>
  )
}

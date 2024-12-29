import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  title: string
  value: string | number
  className?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, className = '', icon }: StatCardProps) {
  return (
    <div data-testid="stat-card" className={`bg-[#1e2327] rounded-xl p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-sm md:text-base text-gray-400">{title}</div>
      <div className="text-2xl md:text-3xl font-bold text-white mt-1">{value}</div>
    </div>
  )
}

import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  className?: string
  icon?: ReactNode
  onClick?: () => void
}

export function StatCard({ title, value, className = '', icon, onClick }: StatCardProps) {
  return (
    <div
      data-testid="stat-card"
      className={`bg-[#1e2327] rounded-xl p-4 md:p-6 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-2">
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-sm md:text-base text-gray-400">{title}</div>
      <div className="text-2xl md:text-3xl font-bold text-white mt-1">{value}</div>
    </div>
  )
}

import { ReactNode, KeyboardEvent, HTMLAttributes } from 'react'

interface StatCardProps {
  /** The title text to display in the card */
  title: string
  /** The value to display (can be number or text) */
  value: string | number
  /** Optional CSS classes to apply to the card */
  className?: string
  /** Optional icon to display in the card */
  icon?: ReactNode
  /** Optional click handler for the card */
  onClick?: () => void
}

/**
 * StatCard component displays a card with a title, value, and optional icon
 * @param {StatCardProps} props - The props for the StatCard component
 * @returns {JSX.Element} A card displaying statistical information
 */
export function StatCard({ title, value, className = '', icon, onClick }: StatCardProps) {
  /**
   * Handles keyboard events for accessibility
   * @param {KeyboardEvent<HTMLDivElement>} event - The keyboard event
   */
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.()
    }
  }

  const handleClick = () => {
    onClick?.()
  }

  return (
    <div
      data-testid="stat-card"
      className={`bg-[#1e2327] rounded-xl p-4 md:p-6 ${className} cursor-pointer`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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

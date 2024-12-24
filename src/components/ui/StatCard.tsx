import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Card } from './Card'

type StatCardProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  title: string
  value: string | number
  icon?: ReactNode
}

export const StatCard = ({
  title,
  value,
  icon,
  onClick,
  className,
  ...props
}: StatCardProps) => {
  return (
    <Card
      hover={!!onClick}
      className={className}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm md:text-base text-gray-400">{title}</h3>
        {icon && <div className="text-[#2d3339]">{icon}</div>}
      </div>
      <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
    </Card>
  )
}

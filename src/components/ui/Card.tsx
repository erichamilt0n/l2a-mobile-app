import type { ComponentPropsWithRef, ReactNode } from 'react'
import clsx from 'clsx'

type CardProps = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  hover?: boolean
  selected?: boolean
}

export const Card = ({
  children,
  hover = false,
  selected = false,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-[#1e2327] rounded-xl p-4 md:p-6',
        {
          'transition-colors hover:bg-[#2d3339]': hover,
          'ring-2 ring-[#2d3339]': selected,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

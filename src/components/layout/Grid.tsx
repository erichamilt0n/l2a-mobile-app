import type { ComponentPropsWithRef, ReactNode } from 'react'
import clsx from 'clsx'

type GridProps = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4 | 6
  gap?: 2 | 4 | 6 | 8
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-6'
} as const

const gapMap = {
  2: 'gap-2',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8'
} as const

export const Grid = ({
  children,
  cols = 4,
  gap = 4,
  className,
  ...props
}: GridProps) => {
  return (
    <div
      className={clsx(
        'grid',
        colsMap[cols],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

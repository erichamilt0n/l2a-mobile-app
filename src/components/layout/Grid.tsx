import type { ComponentPropsWithRef, ReactNode } from 'react'
import clsx from 'clsx'

type GridProps = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4 | 6
  mdCols?: 1 | 2 | 3 | 4 | 6
  lgCols?: 1 | 2 | 3 | 4 | 6
  gap?: 2 | 4 | 6 | 8
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
} as const

const mdColsMap = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  6: 'md:grid-cols-6',
} as const

const lgColsMap = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  6: 'lg:grid-cols-6',
} as const

const gapMap = {
  2: 'gap-2',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
} as const

export const Grid = ({
  children,
  cols = 1,
  mdCols,
  lgCols,
  gap = 4,
  className,
  ...props
}: GridProps) => {
  return (
    <div
      className={clsx(
        'grid',
        colsMap[cols],
        mdCols && mdColsMap[mdCols],
        lgCols && lgColsMap[lgCols],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

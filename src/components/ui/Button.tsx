/// <reference types="react" />
/// <reference types="DOM" />
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  fullWidth?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'p-4 md:p-6 rounded-xl transition-colors flex items-center justify-center',
        {
          'bg-blue-500 hover:bg-blue-600 text-white': variant === 'primary',
          'bg-gray-100 hover:bg-gray-200 text-gray-900': variant === 'secondary',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

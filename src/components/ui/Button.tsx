import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
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
          'bg-[#333e48] text-white hover:bg-[#4a5761]': variant === 'primary',
          'bg-dark-200 text-gray-400 hover:bg-[#4a5761] hover:text-white': variant === 'secondary',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  )
}

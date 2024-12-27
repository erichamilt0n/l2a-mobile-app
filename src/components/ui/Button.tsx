/// <reference types="react" />
import type { ComponentPropsWithRef, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'link'
  icon?: ReactNode
  fullWidth?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = 'p-4 md:p-6 rounded-xl transition-colors'
  const variantStyles = {
    primary: 'bg-[#2d3339] hover:bg-[#3a424a] text-white',
    secondary: 'bg-[#1e2327] hover:bg-[#2d3339] text-gray-400',
    link: 'text-blue-500 hover:text-blue-600 underline bg-transparent'
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        {
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed': props.disabled,
        },
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    </button>
  )
}

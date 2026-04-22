import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white'
  className?: string
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-3',
  lg: 'w-8 h-8 border-4',
}

const colorMap = {
  primary: 'border-primary/30 border-t-primary',
  white: 'border-white/30 border-t-white',
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      className = '',
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${sizeMap[size]} ${colorMap[color]} rounded-full animate-spin ${className}`}
      />
    )
  }
)

Spinner.displayName = 'Spinner'

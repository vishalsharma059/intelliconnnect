import React from 'react'

interface SkeletonProps {
  variant?: 'text' | 'avatar' | 'card'
  width?: string
  height?: string
  className?: string
  count?: number
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width = '100%',
      height = '1rem',
      className = '',
      count = 1,
    },
    ref
  ) => {
    const baseStyles = 'bg-border/50 animate-pulse rounded'

    const variantStyles = {
      text: 'h-4 rounded',
      avatar: 'w-10 h-10 rounded-full',
      card: 'rounded-lg p-4 space-y-3',
    }

    const skeletons = Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        ref={i === 0 ? ref : null}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={{
          width: variant === 'card' ? '100%' : width,
          height: variant === 'avatar' ? 'auto' : height,
        }}
      />
    ))

    return variant === 'card' ? (
      <div className="space-y-3">
        {skeletons}
      </div>
    ) : (
      <div className="space-y-2">{skeletons}</div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

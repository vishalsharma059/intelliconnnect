import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-semibold transition rounded-lg flex items-center justify-center gap-2'

    const variantStyles = {
      primary:
        'bg-primary hover:bg-primary-dark text-white disabled:bg-primary/50',
      secondary:
        'bg-secondary hover:bg-secondary/80 text-white disabled:bg-secondary/50',
      ghost:
        'text-primary hover:bg-primary/10 disabled:text-primary/50',
      outline:
        'border border-primary text-primary hover:bg-primary/10 disabled:border-primary/50 disabled:text-primary/50',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

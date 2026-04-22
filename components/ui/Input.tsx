import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`w-full ${
              icon ? 'pl-10' : 'pl-4'
            } pr-4 py-2 border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary transition focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              error ? 'border-error' : 'border-border'
            } ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

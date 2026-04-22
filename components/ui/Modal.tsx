import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  showCloseButton?: boolean
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'md',
      showCloseButton = true,
    },
    ref
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [isOpen])

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <div
          ref={ref}
          className={`relative bg-card-bg rounded-lg shadow-xl z-10 w-full mx-4 ${sizeMap[size]} animate-slideIn`}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-border">
              {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-foreground transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'

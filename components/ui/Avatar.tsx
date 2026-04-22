import React from 'react'
import Image from 'next/image'
import { getInitials } from '@utils/helpers'

interface AvatarProps {
  src?: string
  alt?: string
  firstName?: string
  lastName?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  isOnline?: boolean
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-2xl',
}

const statusBadgeSize = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = 'avatar',
      firstName = '',
      lastName = '',
      size = 'md',
      className = '',
      isOnline = false,
    },
    ref
  ) => {
    const initials = getInitials(firstName, lastName)

    return (
      <div ref={ref} className={`relative inline-flex ${className}`}>
        <div className={`${sizeMap[size]} rounded-full bg-primary flex items-center justify-center text-white font-semibold overflow-hidden flex-shrink-0`}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 64px) 100vw, 64px"
            />
          ) : (
            initials
          )}
        </div>

        {isOnline && (
          <div
            className={`${statusBadgeSize[size]} bg-success rounded-full absolute bottom-0 right-0 border-2 border-white`}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

'use client'

import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  onLoadMore: () => void
  isLoading: boolean
  hasMore: boolean
}

export const useInfiniteScroll = ({
  threshold = 0.1,
  onLoadMore,
  isLoading,
  hasMore,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!observerTarget.current || !hasMore || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          onLoadMore()
        }
      },
      { threshold }
    )

    observer.observe(observerTarget.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold, onLoadMore, isLoading, hasMore])

  return observerTarget
}

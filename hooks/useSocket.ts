'use client'

import { useEffect, useRef, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@store/index'
import {
  addOnlineUser,
  removeOnlineUser,
  addMessage,
  setTyping,
} from '@store/chatSlice'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

export const useSocket = (userId: string | undefined) => {
  const socketRef = useRef<Socket | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!userId) return

    socketRef.current = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('accessToken'),
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    socketRef.current.on('connect', () => {
      console.log('[v0] Socket connected:', socketRef.current?.id)
      socketRef.current?.emit('user:online', { userId })
    })

    socketRef.current.on('user:online', (data: { userId: string }) => {
      dispatch(addOnlineUser(data.userId))
    })

    socketRef.current.on('user:offline', (data: { userId: string }) => {
      dispatch(removeOnlineUser(data.userId))
    })

    socketRef.current.on('message:new', (message: any) => {
      dispatch(addMessage(message))
    })

    socketRef.current.on('typing:start', (data: any) => {
      dispatch(setTyping({ ...data, isTyping: true }))
    })

    socketRef.current.on('typing:stop', (data: any) => {
      dispatch(setTyping({ ...data, isTyping: false }))
    })

    socketRef.current.on('disconnect', () => {
      console.log('[v0] Socket disconnected')
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [userId, dispatch])

  const emitTyping = useCallback(
    (conversationId: string, isTyping: boolean) => {
      socketRef.current?.emit('typing', {
        conversationId,
        userId,
        isTyping,
      })
    },
    [userId]
  )

  const emitMessageRead = useCallback((messageId: string) => {
    socketRef.current?.emit('message:read', { messageId, userId })
  }, [userId])

  return {
    socket: socketRef.current,
    emitTyping,
    emitMessageRead,
  }
}

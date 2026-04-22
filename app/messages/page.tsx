'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store/index'
import { fetchConversations, setActiveConversation } from '@store/chatSlice'
import { Avatar } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { Search, Plus, Send } from 'lucide-react'
import { formatRelativeTime } from '@utils/helpers'

export default function MessagesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { conversations, activeConversation, loading } = useSelector(
    (state: RootState) => state.chat
  )
  const { user } = useSelector((state: RootState) => state.auth)
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    dispatch(fetchConversations())
  }, [dispatch])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !activeConversation) return
    setMessageText('')
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      <div className="w-full sm:w-80 border-r border-border flex flex-col bg-background">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-card-bg border border-border rounded-full text-sm focus:outline-none focus:border-primary transition"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner size="md" />
            </div>
          ) : conversations.length > 0 ? (
            conversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(
                (p) => p.id !== user?.id
              )

              return (
                <button
                  key={conversation.id}
                  onClick={() =>
                    dispatch(setActiveConversation(conversation))
                  }
                  className={`w-full p-4 border-b border-border hover:bg-card-bg transition text-left ${
                    activeConversation?.id === conversation.id
                      ? 'bg-card-bg'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {otherParticipant && (
                      <Avatar
                        firstName={otherParticipant.firstName}
                        lastName={otherParticipant.lastName}
                        src={otherParticipant.profilePicture}
                        size="md"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {otherParticipant?.firstName}{' '}
                        {otherParticipant?.lastName}
                      </p>
                      <p className="text-text-secondary text-sm truncate">
                        {conversation.lastMessage?.text ||
                          'No messages yet'}
                      </p>
                    </div>

                    {conversation.unreadCount > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              )
            })
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <p>No conversations yet</p>
            </div>
          )}
        </div>
      </div>

      {activeConversation ? (
        <div className="hidden sm:flex flex-1 flex-col">
          <div className="border-b border-border p-4 flex items-center justify-between">
            <div>
              {activeConversation.participants.map((participant) => (
                participant.id !== user?.id && (
                  <div key={participant.id}>
                    <p className="font-semibold text-foreground">
                      {participant.firstName} {participant.lastName}
                    </p>
                    <p className="text-text-secondary text-sm">
                      @{participant.username}
                    </p>
                  </div>
                )
              ))}
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-center text-text-secondary">
              <p>No messages yet</p>
            </div>
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-border p-4 flex gap-3"
          >
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-card-bg border border-border rounded-full text-sm focus:outline-none focus:border-primary transition text-foreground"
            />
            <Button
              type="submit"
              disabled={!messageText.trim()}
              className="rounded-full"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center text-text-secondary">
          <p>Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  )
}

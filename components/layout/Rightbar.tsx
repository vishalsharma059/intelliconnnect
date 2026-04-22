'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'
import { Spinner } from '@components/ui/Spinner'

interface Suggestion {
  id: string
  firstName: string
  lastName: string
  username: string
  profilePicture?: string
  mutualFriends?: number
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alice_j',
    mutualFriends: 12,
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bob_smith',
    mutualFriends: 8,
  },
  {
    id: '3',
    firstName: 'Carol',
    lastName: 'Williams',
    username: 'carol_w',
    mutualFriends: 15,
  },
]

export const Rightbar = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)
  const [loading, setLoading] = useState(false)

  const handleFollow = (id: string) => {
    setSuggestions(suggestions.filter((s) => s.id !== id))
  }

  return (
    <aside className="hidden xl:flex flex-col w-80 bg-background border-l border-border">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <input
            type="text"
            placeholder="What&apos;s happening?!"
            className="w-full px-4 py-2 bg-card-bg border border-border rounded-full text-sm focus:outline-none focus:border-primary transition"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Who to follow
          </h3>

          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner size="md" />
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between p-3 bg-card-bg rounded-lg hover:bg-border/50 transition"
                >
                  <Link
                    href={`/profile/${suggestion.username}`}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <Avatar
                      firstName={suggestion.firstName}
                      lastName={suggestion.lastName}
                      src={suggestion.profilePicture}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {suggestion.firstName} {suggestion.lastName}
                      </p>
                      <p className="text-text-secondary text-xs truncate">
                        @{suggestion.username}
                      </p>
                      {suggestion.mutualFriends && (
                        <p className="text-text-tertiary text-xs">
                          {suggestion.mutualFriends} mutual friends
                        </p>
                      )}
                    </div>
                  </Link>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleFollow(suggestion.id)}
                    className="whitespace-nowrap"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary text-sm text-center py-8">
              No suggestions available
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-border p-4 text-center text-text-secondary text-xs space-y-2">
        <div className="space-x-2">
          <Link href="#" className="hover:text-primary transition">
            About
          </Link>
          <Link href="#" className="hover:text-primary transition">
            Help
          </Link>
          <Link href="#" className="hover:text-primary transition">
            Terms
          </Link>
        </div>
        <p>&copy; 2026 IntelliConnect. All rights reserved.</p>
      </div>
    </aside>
  )
}

'use client'

import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { Avatar } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'
import { Mail, MapPin, Link as LinkIcon } from 'lucide-react'
import { formatDate } from '@utils/helpers'

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-w-2xl mx-auto border-r border-border">
      <div className="h-48 bg-gradient-to-r from-primary to-secondary" />

      <div className="px-6 pb-6">
        <div className="flex justify-between items-start -mt-24 relative z-10 mb-4">
          <Avatar
            firstName={user.firstName}
            lastName={user.lastName}
            src={user.profilePicture}
            size="xl"
            className="border-4 border-background"
          />

          <Button className="rounded-full px-8">Edit Profile</Button>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-text-secondary">@{user.username}</p>

          {user.bio && (
            <p className="text-foreground mt-2">{user.bio}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-text-secondary text-sm mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>City, Country</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            <a href="#" className="text-primary hover:underline">
              example.com
            </a>
          </div>
          <div>Joined {formatDate(user.createdAt)}</div>
        </div>

        <div className="flex gap-8">
          <div>
            <span className="font-bold text-foreground">
              {user.following.length}
            </span>
            <span className="text-text-secondary"> Following</span>
          </div>
          <div>
            <span className="font-bold text-foreground">
              {user.followers.length}
            </span>
            <span className="text-text-secondary"> Followers</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border flex">
        <button className="flex-1 py-4 font-semibold text-primary border-b-2 border-primary">
          Posts
        </button>
        <button className="flex-1 py-4 font-semibold text-text-secondary hover:bg-card-bg/50 transition">
          Likes
        </button>
        <button className="flex-1 py-4 font-semibold text-text-secondary hover:bg-card-bg/50 transition">
          Media
        </button>
      </div>

      <div className="text-center py-12 text-text-secondary">
        <p>No posts yet</p>
      </div>
    </div>
  )
}

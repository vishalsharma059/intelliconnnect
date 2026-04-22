'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store/index'
import { fetchFeed, createPost } from '@store/postSlice'
import { setCreatePostModalOpen } from '@store/uiSlice'
import { PostCard } from '@components/posts/PostCard'
import { Modal } from '@components/ui/Modal'
import { Button } from '@components/ui/Button'
import { Avatar } from '@components/ui/Avatar'
import { Spinner } from '@components/ui/Spinner'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { Image as ImageIcon, Smile } from 'lucide-react'

export default function FeedPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, cursor, hasMore, loading } = useSelector(
    (state: RootState) => state.post
  )
  const { createPostModalOpen } = useSelector(
    (state: RootState) => state.ui
  )
  const [postContent, setPostContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(fetchFeed({ cursor: undefined, limit: 10 }))
  }, [dispatch])

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: useCallback(() => {
      if (cursor && hasMore && !loading) {
        dispatch(fetchFeed({ cursor, limit: 10 }))
      }
    }, [cursor, hasMore, loading, dispatch]),
    isLoading: loading,
    hasMore,
  })

  const handleCreatePost = async () => {
    if (!postContent.trim()) return

    setIsSubmitting(true)
    try {
      const result = await dispatch(
        createPost({ content: postContent, image: undefined })
      )
      if (result.type === 'post/createPost/fulfilled') {
        setPostContent('')
        dispatch(setCreatePostModalOpen(false))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto border-r border-border">
      <div className="border-b border-border p-4 bg-background sticky top-0 z-10">
        <div className="flex gap-4">
          {user && (
            <Avatar
              firstName={user.firstName}
              lastName={user.lastName}
              src={user.profilePicture}
              size="md"
              className="mt-2"
            />
          )}

          <div className="flex-1">
            <div
              onClick={() => dispatch(setCreatePostModalOpen(true))}
              className="p-4 bg-card-bg rounded-2xl cursor-pointer hover:bg-border/50 transition text-text-secondary"
            >
              What&apos;s happening?!
            </div>

            <div className="flex items-center justify-between gap-4 mt-4 px-2">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-primary/10 rounded-full transition text-primary">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-primary/10 rounded-full transition text-primary">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <Button
                onClick={() => dispatch(setCreatePostModalOpen(true))}
                className="rounded-full px-8"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={createPostModalOpen}
        onClose={() => dispatch(setCreatePostModalOpen(false))}
        title="Compose new post"
        size="lg"
      >
        <div className="space-y-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What&apos;s happening?!"
            className="w-full min-h-32 p-4 bg-card-bg border border-border rounded-lg resize-none focus:outline-none focus:border-primary transition text-foreground"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => dispatch(setCreatePostModalOpen(false))}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              disabled={!postContent.trim() || isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </Modal>

      <div>
        {loading && posts.length === 0 ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isOwnPost={user?.id === post.userId}
              />
            ))}

            {hasMore && <div ref={loadMoreRef} className="h-4" />}

            {loading && (
              <div className="flex justify-center py-8">
                <Spinner size="md" />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-text-secondary">
            <p>No posts yet. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  )
}

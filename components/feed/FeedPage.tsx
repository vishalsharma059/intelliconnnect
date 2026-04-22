"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { SharePost } from "@components/posts/SharePost";
import { PostCard } from "@components/posts/PostCard";
import { Spinner } from "@components/ui/Spinner";

interface FeedPageProps {
  posts?: any[];
  isLoading?: boolean;
  onPostCreate?: () => void;
}

export const FeedPage = React.forwardRef<HTMLDivElement, FeedPageProps>(
  ({ posts = [], isLoading = false, onPostCreate }, ref) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [localPosts, setLocalPosts] = useState(posts);

    useEffect(() => {
      setLocalPosts(posts);
    }, [posts]);

    const handleShareSubmit = async (content: string, image?: File) => {
      try {
        console.log("Share post:", { content, image });
        onPostCreate?.();
      } catch (error) {
        console.error("Failed to share post:", error);
      }
    };

    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto px-4 py-6 space-y-6">
        <SharePost onSubmit={handleShareSubmit} loading={isLoading} />

        <div className="space-y-4">
          {isLoading && !localPosts.length ? (
            <div className="flex justify-center items-center py-16">
              <Spinner size="lg" />
            </div>
          ) : localPosts.length > 0 ? (
            localPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isOwnPost={user?.id === post.user.id}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary mt-2">
                No posts yet. Be the first to share!
              </p>
            </div>
          )}
        </div>

        {localPosts.length > 0 && (
          <div className="flex justify-center py-4">
            <button className="px-6 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition font-semibold text-sm">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    );
  },
);

FeedPage.displayName = "FeedPage";

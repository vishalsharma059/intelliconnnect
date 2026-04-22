"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { Avatar } from "@components/ui/Avatar";
import { Button } from "@components/ui/Button";
import { ImagePlus, Smile, MapPin, X } from "lucide-react";

interface SharePostProps {
  onSubmit?: (content: string, image?: File) => Promise<void>;
  loading?: boolean;
}

export const SharePost = React.forwardRef<HTMLDivElement, SharePostProps>(
  ({ onSubmit, loading = false }, ref) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleRemoveImage = () => {
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleSubmit = async () => {
      if (!content.trim() && !selectedFile) return;

      try {
        await onSubmit?.(content, selectedFile || undefined);
        setContent("");
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    };

    return (
      <div
        ref={ref}
        className="w-full bg-card-bg rounded-lg shadow-sm border border-border mb-6 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            {user && (
              <Avatar
                firstName={user.firstName}
                lastName={user.lastName}
                src={user.profilePicture}
                size="md"
              />
            )}
            <input
              type="text"
              placeholder={`What's on your mind, ${user?.firstName}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 bg-input-bg text-foreground placeholder-text-secondary rounded-full px-4 py-2 text-sm focus:outline-none focus:bg-background focus:border border-primary transition"
            />
          </div>

          {preview && (
            <div className="relative mb-4 rounded-lg overflow-hidden bg-black/10 max-h-80">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto max-h-80 object-contain"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-error/90 hover:bg-error text-white rounded-full p-1 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <hr className="my-3 border-border" />

          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1">
              <label className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-lg cursor-pointer transition flex-1 justify-center">
                <ImagePlus className="w-5 h-5" />
                <span className="text-sm font-medium">Photo/Video</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png, .jpeg, .jpg, .gif, .webp, .mp4, .mov, .webm"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2 text-secondary hover:bg-secondary/10 px-3 py-2 rounded-lg cursor-pointer transition flex-1 justify-center">
                <Smile className="w-5 h-5" />
                <span className="text-sm font-medium">Feeling</span>
              </div>

              <div className="flex items-center gap-2 text-accent hover:bg-accent/10 px-3 py-2 rounded-lg cursor-pointer transition flex-1 justify-center">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">Location</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={(!content.trim() && !selectedFile) || loading}
            className="w-full bg-success hover:bg-success/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : "Share"}
          </Button>
        </div>
      </div>
    );
  },
);

SharePost.displayName = "SharePost";

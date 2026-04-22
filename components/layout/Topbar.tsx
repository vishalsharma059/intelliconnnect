"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/index";
import { toggleSidebar } from "@store/uiSlice";
import { Menu, X, Bell, Search, Settings } from "lucide-react";
import { Avatar } from "@components/ui/Avatar";
import Link from "next/link";
import { useState } from "react";

export const Topbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-primary-dark shadow-md">
      <div className="px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden p-2 hover:bg-primary-dark/50 rounded-lg transition text-white"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <Link
            href="/feed"
            className="font-bold text-xl text-white hidden sm:block"
          >
            IntelliConnect
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/30 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-primary-dark/50 rounded-lg transition text-white">
            <Search className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-primary-dark/50 rounded-lg transition relative text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-pulse" />
          </button>

          <Link
            href="/settings"
            className="p-2 hover:bg-primary-dark/50 rounded-lg transition text-white"
          >
            <Settings className="w-5 h-5" />
          </Link>

          {user && (
            <Link href="/profile" className="ml-2">
              <Avatar
                firstName={user.firstName}
                lastName={user.lastName}
                src={user.profilePicture}
                size="sm"
                className="cursor-pointer hover:opacity-80 transition border-2 border-white"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

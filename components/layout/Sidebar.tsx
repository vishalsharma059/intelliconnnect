"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/index";
import { logout } from "@store/authSlice";
import {
  Home,
  MessageSquare,
  Compass,
  Settings,
  LogOut,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";
import { Avatar } from "@components/ui/Avatar";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/feed", icon: <Home className="w-5 h-5" /> },
  {
    label: "Explore",
    href: "/explore",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    label: "Friends",
    href: "/profile",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside
      className={`fixed inset-0 lg:relative lg:inset-auto w-full sm:w-72 bg-card-bg border-r border-border flex flex-col z-30 transform transition-transform duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="hidden lg:block p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          IntelliConnect
        </h1>
        <p className="text-text-secondary text-xs mt-1">Connect & Share</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname.includes(item.href) && item.href !== "/profile";
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-text-secondary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {item.icon}
              <span className="font-semibold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">
            Online Friends
          </h3>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-background rounded-lg cursor-pointer transition">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
            </div>
            <span className="text-sm text-foreground truncate">
              Friend Name
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4 space-y-3">
        {user && (
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 hover:bg-background rounded-lg transition"
          >
            <Avatar
              firstName={user.firstName}
              lastName={user.lastName}
              src={user.profilePicture}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-text-secondary text-xs truncate">
                @{user.username}
              </p>
            </div>
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-error/10 hover:bg-error/20 text-error font-semibold py-2 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

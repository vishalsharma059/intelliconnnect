"use client";

import { useAuth } from "@hooks/useAuth";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Rightbar } from "./Rightbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@components/ui/Spinner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="mb-4">
            <Spinner size="lg" color="primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Loading IntelliConnect...
          </h1>
          <p className="text-text-secondary text-sm">
            Please wait while we connect you
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:flex lg:flex-col lg:w-72 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <div className="flex-1 flex overflow-hidden">
          <div className="lg:hidden absolute inset-0 pointer-events-none">
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto w-full lg:border-r lg:border-border">
            {children}
          </main>

          <Rightbar />
        </div>
      </div>
    </div>
  );
};

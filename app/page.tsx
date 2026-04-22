"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { Spinner } from "@components/ui/Spinner";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push("/feed");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Spinner />
    </div>
  );
}

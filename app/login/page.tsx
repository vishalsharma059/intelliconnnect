"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";
import { Mail, Lock, Loader, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feed");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      const result = await login(email, password);
      if (result.type === "auth/login/fulfilled") {
        router.push("/feed");
      } else {
        setFormError(result.payload || "Login failed");
      }
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-secondary flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />

        <div className="relative z-10 text-center text-white max-w-md">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              IntelliConnect
            </h1>
            <p className="text-xl text-white/80 font-light">
              Share. Connect. Inspire.
            </p>
          </div>

          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">✨</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">
                  Instant Sharing
                </h3>
                <p className="text-white/70 text-sm">
                  Share your thoughts, photos, and ideas with the world
                  instantly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">🌍</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">
                  Global Community
                </h3>
                <p className="text-white/70 text-sm">
                  Connect with millions of users from around the world
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">💬</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">
                  Real-time Chat
                </h3>
                <p className="text-white/70 text-sm">
                  Stay connected with instant messaging and notifications
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 italic text-sm">
              "IntelliConnect helps millions stay connected to what matters
              most."
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="lg:hidden mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IntelliConnect
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-text-secondary mt-2 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {(error || formError) && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 backdrop-blur-sm rounded-lg">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-error text-xs">!</span>
                </div>
                <p className="text-error text-sm font-medium">
                  {error || formError}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-foreground transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border border-border bg-input-bg text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                />
                <span className="text-text-secondary text-sm group-hover:text-foreground transition">
                  Remember me
                </span>
              </label>
              <Link
                href="#"
                className="text-primary hover:text-primary-dark font-medium text-sm transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 shadow-lg hover:shadow-primary/50 hover:shadow-2xl"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-secondary text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="py-2.5 px-4 border border-border rounded-lg hover:bg-card-bg transition text-sm font-medium text-foreground flex items-center justify-center gap-2">
              <span>Google</span>
            </button>
            <button className="py-2.5 px-4 border border-border rounded-lg hover:bg-card-bg transition text-sm font-medium text-foreground flex items-center justify-center gap-2">
              <span>GitHub</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-text-secondary text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary-dark font-semibold transition"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center text-text-tertiary text-xs space-y-2">
            <p>
              <Link href="#" className="hover:text-text-secondary transition">
                Privacy Policy
              </Link>
              {" • "}
              <Link href="#" className="hover:text-text-secondary transition">
                Terms of Service
              </Link>
            </p>
            <p>&copy; 2026 IntelliConnect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";
import {
  Mail,
  Lock,
  User,
  Loader,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import { isValidEmail, isStrongPassword } from "@utils/helpers";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feed");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    if (!isStrongPassword(formData.password)) {
      setFormError(
        "Password must be at least 8 characters with uppercase, lowercase, and numbers",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setFormError("Please agree to the Terms & Conditions");
      return;
    }

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (result.type === "auth/register/fulfilled") {
        router.push("/feed");
      } else {
        setFormError(result.payload || "Registration failed");
      }
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-primary to-primary-dark flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />

        <div className="relative z-10 text-center text-white max-w-md">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Join Now
            </h1>
            <p className="text-xl text-white/80 font-light">
              Start your journey today
            </p>
          </div>

          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">Easy Setup</h3>
                <p className="text-white/70 text-sm">
                  Create your account in just a few minutes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">Free Forever</h3>
                <p className="text-white/70 text-sm">
                  Access all features with our free plan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">
                  Secure & Private
                </h3>
                <p className="text-white/70 text-sm">
                  Your data is encrypted and protected
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">10M+</div>
              <div className="text-xs text-white/70">Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-white/70">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/70">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm max-h-[95vh] overflow-y-auto">
          <div className="mb-6">
            <div className="lg:hidden mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IntelliConnect
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Get Started</h2>
            <p className="text-text-secondary mt-2 text-sm">
              Create your account and join the community
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Username
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition text-sm font-medium">
                  @
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-foreground transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-text-tertiary mt-1.5">
                Min 8 characters, uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 border border-border rounded-lg bg-input-bg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-foreground transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded border border-border bg-input-bg text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer mt-1 flex-shrink-0"
              />
              <span className="text-text-secondary text-xs">
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-primary hover:text-primary-dark font-semibold transition"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-primary hover:text-primary-dark font-semibold transition"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 shadow-lg hover:shadow-primary/50 hover:shadow-2xl"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary-dark font-semibold transition"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center text-text-tertiary text-xs">
            <p>&copy; 2026 IntelliConnect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

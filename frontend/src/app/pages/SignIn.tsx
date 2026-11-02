import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Brain, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { loginUser } from "../services/api";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/profile");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-2xl shadow-2xl">
        {/* Left Side: Branding */}
        <div className="hidden w-1/2 flex-col justify-between bg-muted/20 p-10 lg:flex relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-md">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-black tracking-tight text-foreground">
                PrepGrap
              </span>
            </Link>

            <div className="space-y-3 pt-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Adaptive Career Onboarding
              </div>
              <h1 className="text-3xl font-black tracking-tight text-foreground leading-tight">
                Master Your Growth Path.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Log in to resume your skill-gap analyses, track completed modules, and access personalized pathways.
              </p>
            </div>
          </div>

          <div className="relative z-10 text-xs text-muted-foreground">
            © 2026 PrepGrap. AI-driven skill mapping engine.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2">
          <div className="w-full max-w-sm mx-auto space-y-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                Sign In
              </h2>
              <p className="text-xs text-muted-foreground">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {error && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-10 rounded-xl bg-background/80 border-border/60 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-10 pr-10 rounded-xl bg-background/80 border-border/60 text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full h-11 rounded-xl font-bold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg transition-all"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
              <Link to="/" className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <div>
                Not a member?{" "}
                <Link to="/signup" className="font-bold text-primary hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

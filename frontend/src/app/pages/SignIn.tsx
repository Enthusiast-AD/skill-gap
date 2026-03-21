import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";
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
      setError("Please put in both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      // Navigate to home after successful login
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-2xl shadow-[0_32px_128px_rgba(0,0,0,0.1)]">
        {/* Left Side: Branding/Marketing */}
        <div className="hidden w-1/2 flex-col justify-between bg-muted/30 p-12 lg:flex relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:scale-105 transition-transform duration-1000" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group/logo w-fit">
                <img src="/favicon.ico" alt="PrepGrap Logo" className="h-12 w-12 rounded-2xl shadow-2xl transition-all duration-500 group-hover/logo:rotate-12 group-hover/logo:scale-110" />
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                PrepGrap
              </span>
            </Link>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-foreground">
                Master Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">
                  Career Path
                </span>
                .
              </h1>
              <p className="max-w-md text-lg text-muted-foreground/80 font-medium leading-relaxed">
                Log in to resume your skill-gap analysis and personalized
                roadmap towards your dream role.
              </p>
            </div>

            
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-14 lg:w-1/2 bg-background/20 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-sm space-y-10">
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-foreground">
                Sign In
              </h2>
              <p className="text-[15px] font-medium text-muted-foreground/80">
                Enter your details to track your growth
              </p>
            </div>

            <form className="space-y-7" onSubmit={handleLogin}>
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <div className="space-y-5">
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-foreground/70 ml-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-11 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <div className="flex items-center justify-between ml-1 leading-none">
                    <label className="text-sm font-bold text-foreground/70">
                      Password
                    </label>
                    <Link
                      to="#"
                      className="text-xs font-bold text-primary/80 hover:text-primary transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-11 pr-11 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium placeholder:text-muted-foreground/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button disabled={loading} type="submit" className="w-full h-12 text-base font-black rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(var(--primary),0.2)] hover:shadow-[0_12px_32px_rgba(var(--primary),0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                {loading ? "Signing In..." : "Sign In Now"}
              </Button>
            </form>

            <p className="text-center text-[15px] font-medium text-muted-foreground/80">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-extrabold text-primary hover:underline underline-offset-4 decoration-2 decoration-primary/30"
              >
                Join PrepGrap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

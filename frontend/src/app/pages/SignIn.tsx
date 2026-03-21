import { motion } from "motion/react";
import { Link } from "react-router";
import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-500">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-2xl shadow-[0_32px_128px_rgba(0,0,0,0.1)]">
        {/* Left Side: Branding/Marketing */}
        <div className="hidden w-1/2 flex-col justify-between bg-muted/30 p-12 lg:flex relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:scale-105 transition-transform duration-1000" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group/logo w-fit">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-2xl transition-all duration-500 group-hover/logo:rotate-12 group-hover/logo:scale-110">
                <Brain className="h-7 w-7" />
              </div>
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                PrepGrap <span className="text-primary italic">AI</span>
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

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 shrink-0 rounded-full border-2 border-background bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/20 backdrop-blur-sm"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  10,000+ Students
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Joined PrepGrap AI
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-12 border-t border-border/40">
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
              Powered by Advanced Gemini 2.0
            </p>
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

            <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
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

              <Button className="w-full h-12 text-base font-black rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(var(--primary),0.2)] hover:shadow-[0_12px_32px_rgba(var(--primary),0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                Sign In Now
              </Button>
            </form>

            <div className="relative py-4 flex items-center gap-4">
              <div className="flex-grow border-t border-border/60"></div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40 bg-background/0 px-2">
                Secure Login
              </span>
              <div className="flex-grow border-t border-border/60"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary font-bold transition-all duration-300 group/btn"
              >
                <span className="flex items-center gap-2 group-hover/btn:scale-110 transition-transform">
                  Google
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary font-bold transition-all duration-300 group/btn"
              >
                <span className="flex items-center gap-2 group-hover/btn:scale-110 transition-transform">
                  GitHub
                </span>
              </Button>
            </div>

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

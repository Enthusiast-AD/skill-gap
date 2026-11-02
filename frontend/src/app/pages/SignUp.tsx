import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Brain, Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { registerUser } from "../services/api";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState<boolean | "indeterminate">(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await registerUser(email, password);
      navigate("/signin");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
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

            <div className="space-y-4 pt-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Adaptive Career Onboarding
              </div>
              <h1 className="text-3xl font-black tracking-tight text-foreground leading-tight">
                Bridge Your Skill Delta.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Save hours of redundant training. Build a tailored roadmap addressing only what you need to master your target role.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Contextual AI Gap Analysis",
                  "Automated Curriculum Generation",
                  "Verified Learning Resources",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs text-muted-foreground">
            © 2026 PrepGrap. AI-driven skill mapping engine.
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2">
          <div className="w-full max-w-sm mx-auto space-y-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                Create Account
              </h2>
              <p className="text-xs text-muted-foreground">
                Get started with adaptive onboarding in seconds
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
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
                      placeholder="Minimum 6 characters"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreed === true}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                  className="rounded-md border-border/60"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-none cursor-pointer">
                  I agree to the terms of service and privacy policy
                </label>
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full h-11 rounded-xl font-bold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg transition-all"
              >
                {loading ? "Creating Account..." : "Create Free Account"}
              </Button>
            </form>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
              <Link to="/" className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <div>
                Already registered?{" "}
                <Link to="/signin" className="font-bold text-primary hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

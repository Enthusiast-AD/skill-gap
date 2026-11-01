import { motion } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router";
import { Brain, Sun, Moon, LayoutDashboard, UploadCloud, LogOut, Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const navLinks = [
    { label: "Why PrepGrap", id: "why-prepgrap" },
    { label: "Showcase", id: "showcase" },
    { label: "Workflow", id: "workflow" },
    { label: "Reviews", id: "reviews" },
    { label: "Security", id: "security" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  const handleScrollOrNav = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 dark:bg-background/80 border-b border-border/60 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-all duration-300">
              <Brain className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover:rotate-6" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              PrepGrap
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground -mt-1 hidden sm:block">
              Skill Gap & Roadmap Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/30 dark:bg-muted/20 px-3 py-1.5 rounded-full border border-border/40">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollOrNav(link.id)}
              className="text-sm font-medium px-3.5 py-1 text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-full transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/upload"
            className="text-sm font-medium px-3.5 py-1 text-primary hover:bg-primary/10 rounded-full transition-all duration-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            New Scan
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
            )}
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/profile")}
                className="rounded-full text-xs sm:text-sm font-semibold gap-1.5 border-border/60 hover:bg-muted"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="rounded-full w-9 h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/signin")}
                className="text-xs sm:text-sm font-semibold rounded-full hidden sm:flex text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/upload")}
                size="sm"
                className="rounded-full text-xs sm:text-sm font-semibold px-4 bg-primary text-primary-foreground hover:shadow-md hover:shadow-primary/20 gap-1.5 transition-all"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full w-9 h-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollOrNav(link.id)}
              className="block w-full text-left py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/upload"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-primary"
          >
            <UploadCloud className="w-4 h-4" />
            Analyze Profile
          </Link>
          {!isLoggedIn && (
            <div className="pt-2 border-t border-border/40 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signin");
                }}
                className="flex-1 rounded-xl"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="flex-1 rounded-xl"
              >
                Sign Up
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}

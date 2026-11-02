import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  Brain,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Star,
  CheckCircle2,
  Lock,
  Layers,
  Terminal,
  Cpu,
  Database,
  Cloud,
  FileText,
  Boxes,
  Zap,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import HeroIntegrationArc from "../components/landing/HeroIntegrationArc";
import InteractiveEnginePreview from "../components/landing/InteractiveEnginePreview";
import AcceleratorNarrative from "../components/landing/AcceleratorNarrative";
import RoleTransitionShowcase from "../components/landing/RoleTransitionShowcase";
import WorkflowIntegrationCards from "../components/landing/WorkflowIntegrationCards";
import TestimonialsGrid from "../components/landing/TestimonialsGrid";
import SecurityCards from "../components/landing/SecurityCards";
import PricingCards from "../components/landing/PricingCards";
import FaqAccordion from "../components/landing/FaqAccordion";
import { SAMPLE_PROFILES } from "../services/api";

const COMPANY_LOGOS = [
  { name: "Google", symbol: "Google" },
  { name: "Stripe", symbol: "Stripe" },
  { name: "Vercel", symbol: "▲ Vercel" },
  { name: "Meta", symbol: "∞ Meta" },
  { name: "OpenAI", symbol: "OpenAI" },
  { name: "Datadog", symbol: "Datadog" },
  { name: "Figma", symbol: "Figma" },
  { name: "Notion", symbol: "Notion" },
];

export default function Landing() {
  const navigate = useNavigate();

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-amber-500/20 selection:text-amber-600">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
        {/* Ambient Warm Golden/Amber Radial Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[480px] bg-gradient-to-b from-amber-500/10 via-orange-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 left-1/4 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 right-1/4 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Floating Radiating Integration Arc */}
        <div className="container mx-auto px-4 max-w-6xl mb-6 lg:mb-8">
          <HeroIntegrationArc />
        </div>

        {/* Hero Content Center */}
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-6">
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs text-xs font-semibold hover:border-amber-400/70 hover:shadow-sm transition-all cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-800">AI-Driven Adaptive Onboarding</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-600 font-mono font-bold">
              v2.5 Engine
            </span>
          </motion.div>

          {/* Main Lindy-Style Gradient Headline */}
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.06] max-w-5xl mx-auto text-slate-900"
          >
            Bridge your skill gap,{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
              land the role.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Stop training what you already know. PrepGrap parses your resume against target job requisites, isolates the precise missing competencies, and builds a verified step-by-step pathway in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Button
              size="lg"
              onClick={() => navigate("/upload")}
              className="w-full sm:w-auto h-13 px-8 rounded-2xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 transition-all gap-2 group cursor-pointer"
            >
              Start Free Analysis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSmoothScroll("interactive-preview")}
              className="w-full sm:w-auto h-13 px-7 rounded-2xl text-base font-semibold border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted/80 hover:border-foreground/20 active:scale-95 transition-all cursor-pointer"
            >
              Explore Live Engine
            </Button>
          </motion.div>

          {/* Micro-copy & Social Proof Star Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-muted-foreground pt-1"
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
              <span className="ml-1 font-semibold text-foreground">5.0</span>
            </div>
            <span className="hidden sm:inline text-muted-foreground/40">•</span>
            <span>⚡ Instant 30s analysis</span>
            <span className="hidden sm:inline text-muted-foreground/40">•</span>
            <span>100% Free • No credit card required</span>
          </motion.div>

          {/* Quick Preset Sample Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-muted-foreground"
          >
            <span className="font-medium text-foreground">Or try with sample pathways:</span>
            {SAMPLE_PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate("/upload", { state: { sampleProfileId: p.id } })}
                className="px-3.5 py-1 rounded-full border border-border/70 bg-card/60 hover:border-amber-500/50 hover:bg-amber-500/5 hover:text-foreground active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>{p.title}</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              </button>
            ))}
          </motion.div>

          {/* Elevated Desktop Application Frame */}
          <motion.div
            id="interactive-preview"
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="pt-10 max-w-5xl mx-auto scroll-mt-24"
          >
            <InteractiveEnginePreview />
          </motion.div>
        </div>
      </section>

      {/* Social Proof Logos Ribbon */}
      <section className="py-12 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl space-y-4 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground/80">
            Bridging skill gaps for talent joining top modern engineering teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80 transition-all duration-300">
            {COMPANY_LOGOS.map((company, idx) => (
              <span
                key={idx}
                className="text-sm sm:text-base font-bold font-mono tracking-tight text-foreground/75 hover:text-foreground hover:scale-105 transition-all duration-200 cursor-default px-2 py-1 rounded-lg"
              >
                {company.symbol}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why PrepGrap Feels Like a 10x Career Accelerator */}
      <section id="why-prepgrap" className="py-20 md:py-28 border-b border-border/50 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              WHY PREPGRAP
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Why PrepGrap feels like{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
                a 10x career accelerator.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Traditional bootcamps and 40-hour video courses make you re-learn what you already mastered. PrepGrap isolates the exact 15% missing delta.
            </p>
          </div>

          {/* Stepped Narrative Component */}
          <AcceleratorNarrative />
        </div>
      </section>

      {/* Section 3: Interactive Work Showcase */}
      <section id="showcase" className="py-20 md:py-28 border-b border-border/50 bg-muted/15 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Zap className="w-3.5 h-3.5" />
              INTERACTIVE SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">
              What you can hand to PrepGrap 🪄
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Choose any engineering transition and watch PrepGrap compute the exact delta, map prerequisite dependencies, and sequence verified tutorials.
            </p>
          </div>

          {/* Role Transition Showcase with dynamic scenario switcher */}
          <RoleTransitionShowcase />
        </div>
      </section>

      {/* Section 4: Workflow Integration */}
      <section id="workflow" className="py-20 md:py-28 border-b border-border/50 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-14">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Layers className="w-3.5 h-3.5" />
              WORKFLOW INTEGRATION
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Like any great teammate, PrepGrap is{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
                wherever you work.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ingest any background, analyze any job requisition, and link directly to world-class verified learning assets.
            </p>
          </div>

          <WorkflowIntegrationCards />
        </div>
      </section>

      {/* Section 5: Testimonials Masonry Grid */}
      <section id="reviews" className="py-20 md:py-28 border-b border-border/50 bg-muted/15 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-14">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              COMMUNITY REVIEWS
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">
              People love PrepGrap.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From individual candidates cracking senior loops to engineering directors onboarding whole cohorts.
            </p>
          </div>

          <TestimonialsGrid />
        </div>
      </section>

      {/* Section 6: Security & Privacy */}
      <section id="security" className="py-20 md:py-28 border-b border-border/50 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-14">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-700 dark:text-blue-400">
              <Lock className="w-3.5 h-3.5" />
              ENTERPRISE PRIVACY
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Compliant, private, and{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
                in your control.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Your career history belongs to you. Zero retention for public model retraining, full encryption, and 1-click permanent purging.
            </p>
          </div>

          <SecurityCards />
        </div>
      </section>

      {/* Section 7: Pricing / Value Cards */}
      <section id="pricing" className="py-20 md:py-28 border-b border-border/50 bg-muted/15 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-14">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              TRANSPARENT VALUE
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              The career engine that{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent italic">
                punches above its price.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Start with a 100% free gap analysis. Upgrade when you need continuous tracking and export tools.
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* Section 8: FAQ Accordion */}
      <section id="faq" className="py-20 md:py-28 border-b border-border/50 relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-mono">
              FAQ.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Everything you need to know about PrepGrap's adaptive skill engine.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* Section 9: Bottom High-Impact CTA Banner */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Soft Radial Amber Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-amber-500/10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-card/95 via-card/85 to-amber-500/10 backdrop-blur-2xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Blurs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                Start with 100% free analysis.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Stop guessing what skills you need. Drop your resume, pick a target role, and get your personalized roadmap in 30 seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-2">
              <Button
                size="lg"
                onClick={() => navigate("/upload")}
                className="h-13 px-8 rounded-2xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 transition-all gap-2 group cursor-pointer"
              >
                Start Your Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground relative z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Free forever • No credit card required • Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Column Footer */}
      <footer className="border-t border-border/60 py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg tracking-tight">PrepGrap</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Adaptive skill gap analysis and automated Directed Acyclic Graph (DAG) learning pathway engine.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/70 text-[11px] font-mono text-muted-foreground shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All systems operational • v2.5 live</span>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                Product
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <button onClick={() => navigate("/upload")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Skill Gap Scan
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("interactive-preview")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Interactive Preview
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("why-prepgrap")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    DAG Sequencing
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("workflow")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Verified Curricula
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("pricing")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Pricing Tiers
                  </button>
                </li>
              </ul>
            </div>

            {/* Solutions Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                Solutions
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <button onClick={() => handleSmoothScroll("showcase")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Frontend to AI
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("showcase")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Data to MLOps
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("showcase")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Backend to Cloud
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("showcase")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Junior to SRE
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("pricing")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Team Onboarding
                  </button>
                </li>
              </ul>
            </div>

            {/* Company & Legal */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                Security & Trust
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <button onClick={() => handleSmoothScroll("security")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Zero-Retention Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("security")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    AES-256 Encryption
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("faq")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Privacy Guarantee
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSmoothScroll("faq")} className="hover:text-foreground transition-colors cursor-pointer text-left">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>© 2026 PrepGrap, Inc. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <button onClick={() => handleSmoothScroll("security")} className="hover:text-foreground transition-colors cursor-pointer">
                Privacy
              </button>
              <button onClick={() => handleSmoothScroll("faq")} className="hover:text-foreground transition-colors cursor-pointer">
                Security
              </button>
              <button onClick={() => handleSmoothScroll("faq")} className="hover:text-foreground transition-colors cursor-pointer">
                Status
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

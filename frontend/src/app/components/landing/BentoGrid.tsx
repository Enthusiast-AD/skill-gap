import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Target,
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle2,
  Clock,
  Layers,
  Shield,
  Play,
  ArrowUpRight,
  GitBranch,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function BentoGrid() {
  const [scrubIndex, setScrubIndex] = useState<number>(3);

  // Sparkline data points for velocity curve
  const sparklineData = [
    { day: "Day 1", standard: 10, prepgrap: 25, saved: "4h saved" },
    { day: "Day 3", standard: 22, prepgrap: 52, saved: "12h saved" },
    { day: "Day 5", standard: 35, prepgrap: 78, saved: "24h saved" },
    { day: "Day 7", standard: 45, prepgrap: 94, saved: "36h saved" },
    { day: "Day 10", standard: 55, prepgrap: 100, saved: "Full Ramp-up" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Bento Item 1: Velocity & Ramp-up Sparkline (Span 2 cols on lg) */}
      <div className="md:col-span-2 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between space-y-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 w-fit">
            <TrendingUp className="w-3.5 h-3.5" />
            Time-to-Productivity
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            80% Faster Onboarding Velocity
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
            Eliminate repetitive training on competencies the hire already has. Focus solely on the isolated delta.
          </p>
        </div>

        {/* Interactive Scrubbing Sparkline Area */}
        <div className="p-4 rounded-2xl border border-border/60 bg-background/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Competency Mastery Curve</span>
            <span className="font-mono font-bold text-emerald-500">
              {sparklineData[scrubIndex].saved}
            </span>
          </div>

          {/* SVG Sparkline Graph */}
          <div className="h-28 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
              {/* Grid guide lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="currentColor" className="text-border/40" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" className="text-border/40" strokeDasharray="3 3" />

              {/* Standard Onboarding Curve (Gray) */}
              <path
                d="M 0 90 Q 100 80, 200 65 T 400 45"
                fill="none"
                stroke="currentColor"
                className="text-muted-foreground/30"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* PrepGrap Accelerated Curve (Emerald/Indigo) */}
              <path
                d="M 0 85 Q 100 50, 200 22 T 400 5"
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth="3.5"
              />

              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Interactive Points Scrubber */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {sparklineData.map((pt, idx) => (
                <button
                  key={pt.day}
                  type="button"
                  onMouseEnter={() => setScrubIndex(idx)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    scrubIndex === idx
                      ? "bg-primary text-primary-foreground scale-125 shadow-lg shadow-primary/30"
                      : "bg-muted text-muted-foreground hover:scale-110"
                  }`}
                  title={`${pt.day}: ${pt.saved}`}
                >
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-muted-foreground font-mono pt-1">
            <span>Day 1 (Baseline)</span>
            <span>PrepGrap: 100% Ready (Day 10)</span>
            <span className="text-muted-foreground/60">Standard: 55% (Day 10)</span>
          </div>
        </div>
      </div>

      {/* Bento Item 2: Dynamic Skill Token Pills (Span 2 cols on lg) */}
      <div className="md:col-span-2 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 px-2.5 py-0.5 rounded-full bg-indigo-500/10 w-fit">
            <Brain className="w-3.5 h-3.5" />
            Normalized Taxonomy
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Multi-Tier Skill Disambiguation
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Distinguishes between beginner syntax knowledge and production architecture proficiency.
          </p>
        </div>

        {/* Interactive Floating Token Cloud */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { name: "Kubernetes Ops", status: "Missing", badge: "High Gap", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25" },
            { name: "Python Concurrency", status: "Upgrade", badge: "Inter → Expert", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25" },
            { name: "React 18 & SSR", status: "Mastered", badge: "Verified", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
            { name: "PostgreSQL & pgvector", status: "Mastered", badge: "Verified", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
            { name: "LangChain / RAG", status: "Missing", badge: "Priority", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25" },
            { name: "Docker Containerization", status: "Upgrade", badge: "Foundational", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25" },
            { name: "CI/CD GitHub Actions", status: "Mastered", badge: "Verified", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
          ].map((token) => (
            <motion.div
              key={token.name}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm ${token.color}`}
            >
              <span>{token.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-background/80 border border-current/20">
                {token.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bento Item 3: Directed Graph Milestones (Span 2 cols on lg) */}
      <div className="md:col-span-2 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 px-2.5 py-0.5 rounded-full bg-emerald-500/10 w-fit">
            <GitBranch className="w-3.5 h-3.5" />
            DAG Pathway Topology
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Strict Prerequisite Ordering
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Never attempt complex microservice orchestration before containerization fundamentals are solid.
          </p>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="p-4 rounded-2xl border border-border/60 bg-background/60 flex items-center justify-between gap-2 overflow-x-auto">
          {[
            { step: "01", title: "Container Basics", status: "Done" },
            { step: "02", title: "Cluster Pods", status: "Active" },
            { step: "03", title: "Vector Search", status: "Next" },
            { step: "04", title: "Cloud Scale", status: "Target" },
          ].map((node, i) => (
            <React.Fragment key={node.step}>
              <div className="flex flex-col items-center text-center min-w-[70px] space-y-1.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-mono transition-transform hover:scale-110 ${
                  node.status === "Done"
                    ? "bg-emerald-500 text-white"
                    : node.status === "Active"
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground"
                }`}>
                  {node.step}
                </div>
                <span className="text-[11px] font-bold text-foreground truncate max-w-[80px]">
                  {node.title}
                </span>
                <span className="text-[9px] uppercase font-semibold text-muted-foreground">
                  {node.status}
                </span>
              </div>

              {i < 3 && (
                <div className="h-0.5 flex-1 min-w-[20px] bg-gradient-to-r from-primary to-muted relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary absolute -top-0.5 left-1/2 -translate-x-1/2 animate-ping" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bento Item 4: Curated Verified Content (Span 2 cols on lg) */}
      <div className="md:col-span-2 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 px-2.5 py-0.5 rounded-full bg-amber-500/10 w-fit">
            <Play className="w-3.5 h-3.5" />
            Curated Resources
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Zero Example.com Placeholder Links
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Every pathway module connects directly to specific video masterclasses, hands-on tutorials, or official documentation.
          </p>
        </div>

        {/* Mock Resource Card */}
        <div className="p-3.5 rounded-2xl border border-border/60 bg-background/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground truncate">Kubernetes Architecture for Developers</p>
              <p className="text-[11px] text-muted-foreground">YouTube Video Tutorial • 45 mins • Verified Resource</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 whitespace-nowrap">
            Embedded Player
          </Badge>
        </div>
      </div>
    </div>
  );
}


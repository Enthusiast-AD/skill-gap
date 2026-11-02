import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Target,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Cloud,
  Terminal,
  Play,
  Check,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

type TabKey = "candidate" | "target" | "delta" | "pathway";

export default function InteractiveEnginePreview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("delta");
  const [completedDemoSteps, setCompletedDemoSteps] = useState<number[]>([1]);

  const toggleDemoStep = (step: number) => {
    setCompletedDemoSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const tabs: { key: TabKey; label: string; icon: React.ElementType; badge?: string }[] = [
    { key: "candidate", label: "Candidate Resume", icon: Code2 },
    { key: "target", label: "Job Description", icon: Target },
    { key: "delta", label: "Skill Gap Delta", icon: AlertTriangle, badge: "3 Gaps" },
    { key: "pathway", label: "Synthesized Pathway", icon: Sparkles, badge: "4 Modules" },
  ];

  return (
    <div className="w-full rounded-3xl border border-border/80 bg-card/80 dark:bg-card/50 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Top Application Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 border-b border-border/60 bg-muted/30 gap-3">
        {/* Window controls & label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            prepgrap-engine // interactive-preview
          </span>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Semantic AI Matching: Active</span>
        </div>
      </div>

      {/* Segmented Tab Navigation with Spring Layout Indicator */}
      <div className="flex items-center border-b border-border/60 bg-muted/15 px-3 py-2 overflow-x-auto gap-1.5 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-95 ${
                isActive
                  ? "text-foreground font-extrabold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeEngineTab"
                  className="absolute inset-0 bg-background dark:bg-card rounded-xl border border-border/80 shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                {tab.label}
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                    isActive ? "bg-primary/10 text-primary font-bold" : "bg-muted text-muted-foreground"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Surface Content Body with Smooth Crossfade */}
      <div className="p-5 sm:p-7 min-h-[360px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === "candidate" && (
            <motion.div
              key="candidate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">Alex Rivera (Full Stack Engineer)</h4>
                  <p className="text-xs text-muted-foreground">4+ Years Experience • React, TypeScript, Node.js, PostgreSQL</p>
                </div>
                <Badge variant="outline" className="w-fit text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  Extracted from Resume.pdf
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {[
                  { skill: "React & Next.js", level: "Expert", years: "4.0 yrs", pct: 95, color: "bg-emerald-500" },
                  { skill: "TypeScript / JavaScript", level: "Expert", years: "4.0 yrs", pct: 92, color: "bg-emerald-500" },
                  { skill: "PostgreSQL & SQL", level: "Intermediate", years: "2.5 yrs", pct: 68, color: "bg-sky-500" },
                  { skill: "Node.js REST APIs", level: "Intermediate", years: "3.0 yrs", pct: 75, color: "bg-sky-500" },
                  { skill: "Docker (Containers)", level: "Beginner", years: "1.0 yrs", pct: 35, color: "bg-amber-500" },
                  { skill: "Git / CI Workflows", level: "Expert", years: "4.0 yrs", pct: 90, color: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.skill} className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-foreground">
                      <span>{item.skill}</span>
                      <span className="text-[11px] font-mono text-muted-foreground">{item.level} ({item.years})</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "target" && (
            <motion.div
              key="target"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">Senior AI & Cloud Platform Engineer</h4>
                  <p className="text-xs text-muted-foreground">Infrastructure & Foundation Model Serving Team</p>
                </div>
                <Badge variant="outline" className="w-fit text-xs bg-primary/10 text-primary border-primary/20">
                  Target Role Specification
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {[
                  { skill: "Kubernetes & Cluster Ops", req: "Intermediate", mandatory: true, icon: Cloud },
                  { skill: "Python for Distributed Systems", req: "Expert", mandatory: true, icon: Cpu },
                  { skill: "LLM Orchestration & RAG", req: "Intermediate", mandatory: true, icon: Brain },
                  { skill: "Vector & Relational Databases", req: "Intermediate", mandatory: true, icon: Database },
                  { skill: "Terraform / Cloud IaC", req: "Intermediate", mandatory: false, icon: Layers },
                  { skill: "Microservice Architecture", req: "Intermediate", mandatory: false, icon: Code2 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.skill} className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{item.skill}</p>
                          <p className="text-[11px] text-muted-foreground">Required: {item.req}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-bold ${
                          item.mandatory
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.mandatory ? "Mandatory" : "Preferred"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === "delta" && (
            <motion.div
              key="delta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">AI Gap Isolation Matrix</h4>
                  <p className="text-xs text-muted-foreground">Comparing candidate baseline against role requisites</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">3 Mastered</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">3 Priority Gaps</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                {[
                  {
                    skill: "Kubernetes Cluster Orchestration",
                    gap: "Missing",
                    priority: "High",
                    desc: "Mandatory for platform role. Zero cluster administration evidenced in resume.",
                    badgeColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
                  },
                  {
                    skill: "Python for AI Systems",
                    gap: "Needs Upgrade",
                    priority: "High",
                    desc: "Candidate has intermediate scripting; role demands advanced async and concurrency.",
                    current: "Intermediate",
                    target: "Expert",
                    badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
                  },
                  {
                    skill: "LLM Pipeline Deployment (RAG)",
                    gap: "Missing",
                    priority: "High",
                    desc: "Core foundation models & vector search pipelines required for enterprise AI workloads.",
                    badgeColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
                  },
                ].map((item) => (
                  <div
                    key={item.skill}
                    className="p-3.5 rounded-2xl border border-border/60 bg-muted/20 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-foreground">{item.skill}</span>
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase ${item.badgeColor}`}>
                          {item.gap}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                          {item.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>

                    {item.current && (
                      <div className="text-[11px] font-mono text-muted-foreground whitespace-nowrap bg-background/80 px-2.5 py-1 rounded-lg border border-border/50">
                        {item.current} → <span className="font-bold text-primary">{item.target}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "pathway" && (
            <motion.div
              key="pathway"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">Generated Adaptive Roadmap</h4>
                  <p className="text-xs text-muted-foreground">Sequenced DAG modules addressing isolated delta • Est. 14 Hours</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Click checkmark to preview completion tracking:
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {[
                  {
                    order: 1,
                    title: "Kubernetes Core Architecture & Pods",
                    skill: "Kubernetes",
                    time: "4.0h",
                    type: "Video & Lab",
                    diff: "Beginner",
                  },
                  {
                    order: 2,
                    title: "Advanced Python Async & Microservices",
                    skill: "Python",
                    time: "3.5h",
                    type: "Hands-on",
                    diff: "Advanced",
                  },
                  {
                    order: 3,
                    title: "Vector Embeddings & RAG Architectures",
                    skill: "AI Systems",
                    time: "3.5h",
                    type: "Video Tutorial",
                    diff: "Intermediate",
                  },
                  {
                    order: 4,
                    title: "Production Cluster Deployment & CI/CD",
                    skill: "Cloud DevOps",
                    time: "3.0h",
                    type: "Capstone",
                    diff: "Advanced",
                  },
                ].map((mod) => {
                  const isDone = completedDemoSteps.includes(mod.order);

                  return (
                    <div
                      key={mod.order}
                      onClick={() => toggleDemoStep(mod.order)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] select-none ${
                        isDone
                          ? "border-emerald-500/40 bg-emerald-500/[0.06] shadow-xs"
                          : "border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-muted/40 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all ${
                            isDone ? "bg-emerald-500 text-white shadow-xs scale-105" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : mod.order}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-bold truncate transition-colors ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {mod.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {mod.skill} • {mod.time} • {mod.type}
                          </p>
                        </div>
                      </div>

                      <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${isDone ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400" : ""}`}>
                        {mod.diff}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Row inside Preview */}
        <div className="pt-5 mt-5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Ready to test this on your own resume? Results in ~5 seconds.
          </p>
          <Button
            size="sm"
            onClick={() => navigate("/upload")}
            className="w-full sm:w-auto rounded-xl px-5 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all gap-1.5 group cursor-pointer"
          >
            <span>Scan Your Resume & Job Description</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}


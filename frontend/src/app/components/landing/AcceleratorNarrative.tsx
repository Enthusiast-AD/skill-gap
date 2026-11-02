import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Clock,
} from "lucide-react";

const NARRATIVE_ITEMS = [
  {
    num: "01",
    tag: "Contextual Intelligence",
    title: "Zero generic keyword checklists",
    description:
      "Traditional ATS filters fail on synonyms. PrepGrap's semantic embedding engine understands that expertise in FastAPI and Node.js implies REST mastery, so you never waste hours reviewing basics you've already deployed.",
    metrics: "Eliminates ~70% of redundant training",
  },
  {
    num: "02",
    tag: "DAG Synthesis",
    title: "Prerequisites sequenced in logical order",
    description:
      "Learning isn't linear. PrepGrap automatically structures competencies as a Directed Acyclic Graph (DAG), ensuring distributed systems foundations are mastered before microservice tracing and Kafka streaming.",
    metrics: "Logical dependency resolution",
  },
  {
    num: "03",
    tag: "Verified Curricula",
    title: "Active, verified learning assets only",
    description:
      "Every video timestamp, official documentation link, and interactive lab is pre-verified against live providers. No broken 404s, paywalled bait-and-switch, or obsolete 5-year-old framework tutorials.",
    metrics: "100% oEmbed verified media links",
  },
  {
    num: "04",
    tag: "Readiness Telemetry",
    title: "Real-time candidate job readiness",
    description:
      "As you complete modules and pass checkpoint quizzes, your target role readiness score climbs in real time from 54% to 94%, giving hiring managers and yourself measurable confidence.",
    metrics: "Live interview-ready confidence index",
  },
];

export default function AcceleratorNarrative() {
  const [activeStep, setActiveStep] = useState(0);
  const [interactiveSkills, setInteractiveSkills] = useState([
    { name: "FastAPI REST Architecture", mastered: true, weight: 20 },
    { name: "PostgreSQL Schema Design", mastered: true, weight: 25 },
    { name: "Docker Multi-Stage Builds", mastered: false, weight: 20 },
    { name: "Kubernetes Pod Orchestration", mastered: false, weight: 20 },
    { name: "OpenTelemetry Distributed Tracing", mastered: false, weight: 15 },
  ]);

  const toggleSkill = (index: number) => {
    setInteractiveSkills((prev) =>
      prev.map((s, i) => (i === index ? { ...s, mastered: !s.mastered } : s))
    );
  };

  const currentScore = interactiveSkills.reduce(
    (acc, s) => acc + (s.mastered ? s.weight : 0),
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Left Column: Stacked Narrative */}
      <div className="lg:col-span-7 space-y-4">
        {NARRATIVE_ITEMS.map((item, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveStep(idx)}
              onClick={() => setActiveStep(idx)}
              className={`p-5 sm:p-6 rounded-3xl transition-all duration-300 cursor-pointer border ${
                isActive
                  ? "bg-card/95 dark:bg-card/75 border-amber-500/30 shadow-xl shadow-amber-500/5 -translate-y-0.5"
                  : "bg-card/20 border-transparent hover:bg-card/60 hover:border-border/60"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`text-2xl font-black font-mono tracking-tight transition-colors ${
                    isActive ? "text-amber-500 font-extrabold" : "text-muted-foreground/35"
                  }`}
                >
                  {item.num}
                </span>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {item.tag}
                    </span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {item.metrics}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Warm Ambient Card with Live Interactive Delta Simulator */}
      <div className="lg:col-span-5 relative">
        {/* Soft Ambient Mesh Glow behind card */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-orange-400/15 to-indigo-500/20 rounded-3xl blur-2xl -z-10" />

        <div className="p-6 sm:p-7 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/70 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Interactive Telemetry Simulator
              </span>
              <h4 className="text-base font-bold text-foreground">
                Live Skill Delta Calculation
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">Readiness</span>
              <span className="text-2xl font-black text-foreground">
                {currentScore}%
              </span>
            </div>
          </div>

          {/* Progress Bar with Animated Fill */}
          <div className="space-y-1.5">
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-500 h-2.5 rounded-full"
                animate={{ width: `${currentScore}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Candidate Baseline</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {currentScore >= 80 ? "Interview Ready" : "Target: 80%+"}
              </span>
            </div>
          </div>

          {/* Interactive Skill Toggles */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-primary" />
              Toggle competencies to test delta engine:
            </span>

            <div className="space-y-2">
              {interactiveSkills.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => toggleSkill(i)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                    skill.mastered
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                      : "bg-muted/30 border-border/70 text-muted-foreground hover:border-amber-500/40 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] transition-colors ${
                        skill.mastered
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-xs"
                          : "border-muted-foreground/40 bg-background"
                      }`}
                    >
                      {skill.mastered ? "✓" : ""}
                    </span>
                    <span className="font-semibold">{skill.name}</span>
                  </span>
                  <span className={`font-mono text-[10px] ${skill.mastered ? "font-bold text-emerald-600 dark:text-emerald-400" : ""}`}>
                    {skill.mastered ? "Mastered" : `+${skill.weight}%`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Micro Alert */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-xs text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              {currentScore === 100
                ? "All requirements satisfied! Ready for Staff SRE interviews."
                : `Delta identified: ${100 - currentScore}% remaining across unmastered nodes.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

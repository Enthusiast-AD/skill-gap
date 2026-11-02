import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";

export default function Results() {
  const navigate = useNavigate();
  const { analysisData, pathwayData, jobTitle, isLoaded } = useAppContext();
  const [filterTab, setFilterTab] = useState<"all" | "missing" | "improve" | "mastered">("all");
  const [showReasoning, setShowReasoning] = useState(true);

  useEffect(() => {
    if (isLoaded && !analysisData) {
      navigate("/upload");
    }
  }, [analysisData, isLoaded, navigate]);

  if (!analysisData) {
    return null;
  }

  const skillGaps = analysisData.skill_gaps || [];
  const resumeSkills = analysisData.resume_skills || [];

  const missingGaps = skillGaps.filter((g) => g.gap_type === "missing");
  const improvementGaps = skillGaps.filter((g) => g.gap_type === "needs_improvement");
  const highPriorityGaps = skillGaps.filter((g) => g.priority === "high");

  const totalHours =
    pathwayData?.estimated_hours ||
    missingGaps.length * 4.0 + improvementGaps.length * 2.5;

  const filteredGaps = skillGaps.filter((g) => {
    if (filterTab === "missing") return g.gap_type === "missing";
    if (filterTab === "improve") return g.gap_type === "needs_improvement";
    return true;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
      case "medium":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "low":
        return "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getProficiencyPercentage = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return 33;
      case "intermediate":
        return 66;
      case "expert":
        return 100;
      default:
        return 20;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/upload")}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Upload New Documents
            </Button>
            <Button
              onClick={() => navigate("/roadmap")}
              size="sm"
              className="rounded-full px-5 font-bold gap-2 bg-primary text-primary-foreground shadow-md shadow-primary/20 group"
            >
              View Learning Roadmap
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Title Banner */}
          <div className="p-6 sm:p-10 rounded-3xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-xl shadow-lg relative overflow-hidden">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Analysis Complete
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                Skill Gap Matrix
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Role assessment for{" "}
                <span className="font-bold text-foreground">
                  {jobTitle || "Target Position"}
                </span>
                . Review identified gaps below and see how they map directly to your roadmap.
              </p>
            </div>
          </div>

          {/* 4 Summary Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-5 rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Total Gaps</span>
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-black text-foreground">{skillGaps.length}</div>
              <p className="text-[11px] text-muted-foreground mt-1">To bridge for full alignment</p>
            </Card>

            <Card className="p-5 rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">High Priority</span>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
                {highPriorityGaps.length}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Mandatory core requisites</p>
            </Card>

            <Card className="p-5 rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">To Upgrade</span>
                <TrendingUp className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-3xl font-black text-sky-600 dark:text-sky-400">
                {improvementGaps.length}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Foundations already present</p>
            </Card>

            <Card className="p-5 rounded-2xl border-border/60 bg-card/70 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Est. Pathway Time</span>
                <Clock className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {totalHours}h
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Curated study & lab hours</p>
            </Card>
          </div>

          {/* AI Strategic Reasoning Trace Card */}
          {analysisData.reasoning_trace && (
            <Card className="p-6 rounded-3xl border-primary/20 bg-primary/[0.03] backdrop-blur-xl shadow-sm">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowReasoning(!showReasoning)}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">AI Strategic Assessment Rationale</h3>
                    <p className="text-xs text-muted-foreground">Detailed contextual rationale from candidate profile vs role requirements</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  {showReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>

              {showReasoning && (
                <div className="mt-4 pt-4 border-t border-primary/10 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                  {analysisData.reasoning_trace}
                </div>
              )}
            </Card>
          )}

          {/* Filter Tab Bar */}
          <div className="flex items-center gap-2 border-b border-border/60 pb-3 overflow-x-auto">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              All Gaps ({skillGaps.length})
            </button>
            <button
              onClick={() => setFilterTab("missing")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "missing"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              Missing Skills ({missingGaps.length})
            </button>
            <button
              onClick={() => setFilterTab("improve")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "improve"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              Needs Improvement ({improvementGaps.length})
            </button>
            <button
              onClick={() => setFilterTab("mastered")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "mastered"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              Mastered Strengths ({resumeSkills.length})
            </button>
          </div>

          {/* Section: Filtered Skills List */}
          {filterTab === "mastered" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Skills Verified in Your Resume</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {resumeSkills.map((s) => (
                  <Card
                    key={s.skill}
                    className="p-4 rounded-2xl border-emerald-500/30 bg-emerald-500/[0.03] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-foreground capitalize">{s.skill}</p>
                        <p className="text-[11px] text-muted-foreground capitalize">
                          {s.level} level {s.years ? `• ${s.years} yrs` : ""}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                      Verified
                    </Badge>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredGaps.map((gap) => {
                const isMissing = gap.gap_type === "missing";
                const currPct = getProficiencyPercentage(gap.current);
                const targetPct = getProficiencyPercentage(gap.target || "intermediate");

                return (
                  <Card
                    key={gap.skill}
                    className="p-5 rounded-2xl border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Icon, Title & Explanation */}
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isMissing
                              ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                              : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                          }`}
                        >
                          {isMissing ? (
                            <AlertTriangle className="w-5 h-5" />
                          ) : (
                            <TrendingUp className="w-5 h-5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base sm:text-lg font-bold text-foreground capitalize">
                              {gap.skill}
                            </h3>
                            <Badge variant="outline" className={`text-[10px] uppercase font-bold ${getPriorityStyle(gap.priority)}`}>
                              {gap.priority} priority
                            </Badge>
                            <Badge variant="outline" className="text-[10px] text-muted-foreground">
                              {isMissing ? "Missing" : "Needs Upgrade"}
                            </Badge>
                          </div>

                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {isMissing
                              ? "This skill is required for the role but not evidenced in your resume background."
                              : `Upgrade current proficiency from ${gap.current} to target ${gap.target} tier.`}
                          </p>
                        </div>
                      </div>

                      {/* Right: Proficiency Comparison Meter */}
                      {!isMissing && gap.current && gap.target && (
                        <div className="w-full sm:w-56 pt-2 sm:pt-0">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-1.5">
                            <span className="capitalize">Now: {gap.current}</span>
                            <span className="capitalize text-primary">Goal: {gap.target}</span>
                          </div>
                          <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-muted-foreground/40 rounded-full"
                              style={{ width: `${currPct}%` }}
                            />
                            <div
                              className="absolute top-0 left-0 h-full bg-primary opacity-80 rounded-full"
                              style={{ width: `${targetPct}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Bottom Call to Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-background to-accent/10 border border-border/60">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-foreground">
                Transform these gaps into an actionable pathway
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your personalized curriculum sequences these topics from fundamentals to production practice.
              </p>
            </div>
            <Button
              onClick={() => navigate("/roadmap")}
              size="lg"
              className="rounded-2xl px-8 h-12 text-sm font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 gap-2 flex-shrink-0 group"
            >
              Explore Interactive Roadmap
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

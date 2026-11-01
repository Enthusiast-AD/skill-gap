import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Brain,
  FileSearch,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  Clock,
} from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { useAppContext } from "../context/AppContext";
import { analyzeSkills, generatePathway } from "../services/api";

export default function Analyzing() {
  const navigate = useNavigate();
  const { sessionId, jobTitle, setAnalysisData, setPathwayData, isLoaded } = useAppContext();
  const [progress, setProgress] = useState(15);
  const [currentStep, setCurrentStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing analysis engine...");
  const [error, setError] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const effectRan = useRef(false);

  const steps = [
    {
      icon: FileSearch,
      title: "Document Parsing",
      desc: "Extracting structured text, credentials & experience from your resume and job description",
    },
    {
      icon: Brain,
      title: "AI Skill Extraction",
      desc: "Identifying normalized technical proficiencies, tools, and competency levels",
    },
    {
      icon: Target,
      title: "Gap Analysis Matrix",
      desc: "Comparing current capabilities against required competencies to isolate priority gaps",
    },
    {
      icon: Sparkles,
      title: "Curriculum Synthesis",
      desc: "Sequencing ordered learning modules, prerequisites, and resource tutorials",
    },
  ];

  // Elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const runAnalysisPipeline = async () => {
    if (!sessionId) {
      navigate("/upload");
      return;
    }

    setError("");
    try {
      // Step 0: Parsing
      setCurrentStep(0);
      setProgress(25);
      setStatusMessage("Reading and parsing document contents...");
      await new Promise((r) => setTimeout(r, 600));

      // Step 1: AI Skills Extraction
      setCurrentStep(1);
      setProgress(45);
      setStatusMessage("Analyzing professional background & role expectations...");

      const analysisResponse = await analyzeSkills(sessionId);
      setAnalysisData(analysisResponse);

      // Step 2: Gap Analysis Matrix
      setCurrentStep(2);
      setProgress(75);
      setStatusMessage("Calculating skill gaps, proficiencies, and role priorities...");
      await new Promise((r) => setTimeout(r, 700));

      // Step 3: Pathway Synthesis
      setCurrentStep(3);
      setProgress(90);
      setStatusMessage("Curating step-by-step personalized learning pathway...");

      const pathwayResponse = await generatePathway(sessionId);
      setPathwayData(pathwayResponse);

      // Complete
      setProgress(100);
      setStatusMessage("Analysis complete! Preparing results...");

      setTimeout(() => {
        navigate("/results");
      }, 700);
    } catch (err: any) {
      console.error("Analysis pipeline error:", err);
      const msg = err.response?.data?.detail || "An unexpected error occurred during profile analysis.";
      setError(msg);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!sessionId) {
      navigate("/upload");
      return;
    }

    if (effectRan.current) return;
    effectRan.current = true;

    runAnalysisPipeline();
  }, [sessionId, isLoaded, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Ambient Glow Orb */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Central Icon */}
          <div className="relative mb-6 inline-block">
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-xl shadow-primary/20 mx-auto"
            >
              <Brain className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background"></span>
            </span>
          </div>

          {/* Header titles */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2">
            Analyzing Your Profile
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Evaluating competencies for{" "}
            <span className="font-semibold text-foreground">
              {jobTitle || "your target role"}
            </span>
          </p>

          {/* Error State Banner */}
          {error ? (
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm text-left mb-6 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold">Analysis Interrupted</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{error}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/upload")}
                  className="rounded-xl text-xs gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to Upload
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setError("");
                    runAnalysisPipeline();
                  }}
                  className="rounded-xl text-xs gap-1.5 bg-primary text-primary-foreground"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress meter */}
              <div className="mb-8 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
                  <span className="truncate pr-2">{statusMessage}</span>
                  <span className="font-mono text-primary font-bold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 rounded-full" />
                <div className="flex justify-between items-center text-[11px] text-muted-foreground/80 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {elapsedSeconds}s elapsed
                  </span>
                  <span>Usually completes in ~5-10 seconds</span>
                </div>
              </div>

              {/* Four Pipeline Step Cards */}
              <div className="space-y-3 text-left mb-6">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isPast = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all duration-300 ${
                        isCurrent
                          ? "border-primary/60 bg-primary/5 shadow-sm"
                          : isPast
                            ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                            : "border-border/40 bg-muted/20 opacity-50"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isPast
                            ? "bg-emerald-500 text-white"
                            : isCurrent
                              ? "bg-primary text-primary-foreground animate-pulse"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isPast ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold ${isCurrent ? "text-primary" : "text-foreground"}`}>
                            {step.title}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] font-semibold text-primary animate-pulse">
                              Processing...
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{step.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Cancel Button */}
              <div className="pt-2 border-t border-border/40 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/upload")}
                  className="text-xs text-muted-foreground hover:text-foreground rounded-full"
                >
                  Cancel and return to upload
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

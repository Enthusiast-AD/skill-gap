import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Brain, FileSearch, Target, Sparkles } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function Analyzing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: FileSearch,
      label: "Parsing resume and job description",
      duration: 2000,
    },
    { icon: Brain, label: "Extracting skills with AI", duration: 2500 },
    { icon: Target, label: "Identifying skill gaps", duration: 2000 },
    {
      icon: Sparkles,
      label: "Generating personalized pathway",
      duration: 2500,
    },
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepTimeout: NodeJS.Timeout;

    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    const progressIncrement = (100 / totalDuration) * 50; // Update every 50ms

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + progressIncrement, 100);
      });
    }, 50);

    // Progress through steps
    let currentStepIndex = 0;
    const progressThroughSteps = () => {
      if (currentStepIndex < steps.length) {
        setCurrentStep(currentStepIndex);
        stepTimeout = setTimeout(() => {
          currentStepIndex++;
          progressThroughSteps();
        }, steps[currentStepIndex].duration);
      } else {
        // Generate mock analysis data
        const mockAnalysisData = {
          resumeSkills: [
            { skill: "Python", level: "expert", years: 4 },
            { skill: "JavaScript", level: "intermediate", years: 2 },
            { skill: "SQL", level: "beginner", years: 0.5 },
            { skill: "React", level: "intermediate", years: 2 },
          ],
          requiredSkills: [
            { skill: "Python", required_level: "expert", mandatory: true },
            {
              skill: "Kubernetes",
              required_level: "intermediate",
              mandatory: true,
            },
            { skill: "SQL", required_level: "intermediate", mandatory: true },
            {
              skill: "Docker",
              required_level: "intermediate",
              mandatory: true,
            },
            { skill: "AWS", required_level: "intermediate", mandatory: true },
            { skill: "React", required_level: "expert", mandatory: false },
          ],
          skillGaps: [
            { skill: "Kubernetes", gap_type: "missing", priority: "high" },
            { skill: "Docker", gap_type: "missing", priority: "high" },
            { skill: "AWS", gap_type: "missing", priority: "medium" },
            {
              skill: "SQL",
              gap_type: "needs_improvement",
              current: "beginner",
              target: "intermediate",
              priority: "medium",
            },
            {
              skill: "React",
              gap_type: "needs_improvement",
              current: "intermediate",
              target: "expert",
              priority: "low",
            },
          ],
        };
        localStorage.setItem(
          "PrepGrap_analysis",
          JSON.stringify(mockAnalysisData),
        );

        setTimeout(() => navigate("/results"), 500);
      }
    };

    progressThroughSteps();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex items-center justify-center">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Animated Logo */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Brain className="w-12 h-12 text-primary-foreground" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold mb-4">Analyzing Your Profile</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Our AI is processing your documents to identify skill gaps
          </p>

          {/* Progress Bar */}
          <div className="mb-12">
            <Progress value={progress} className="h-3 mb-3" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <motion.div
                  key={step.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-md"
                      : isComplete
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-border/30 bg-muted/10"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : isComplete
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className={`font-medium ${
                        isActive || isComplete
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                    />
                  )}
                  {isComplete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Floating particles animation */}
          <div className="relative mt-12 h-32 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                animate={{
                  y: [0, -100],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${10 + i * 12}%`,
                  bottom: 0,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

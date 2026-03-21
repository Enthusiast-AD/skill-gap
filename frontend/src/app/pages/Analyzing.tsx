import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Brain, FileSearch, Target, Sparkles } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { useAppContext } from "../context/AppContext";
import { analyzeSkills, generatePathway } from "../services/api";

export default function Analyzing() {
  const navigate = useNavigate();
  const { sessionId, setAnalysisData, setPathwayData } = useAppContext();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const effectRan = useRef(false);

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
    if (!sessionId) {
      navigate("/upload");
      return;
    }

    if (effectRan.current) return;
    effectRan.current = true;

    const processData = async () => {
      try {
        // Step 0: Parsing
        setCurrentStep(0);
        setProgress(25);
        
        // Step 1 & 2: Analyze
        setCurrentStep(1);
        const analysisResponse = await analyzeSkills(sessionId);
        setAnalysisData(analysisResponse);
        setProgress(60);
        
        // Step 3: Pathway
        setCurrentStep(2);
        setCurrentStep(3);
        const pathwayResponse = await generatePathway(sessionId);
        setPathwayData(pathwayResponse);
        setProgress(100);

        setTimeout(() => navigate("/results"), 1000);
      } catch (err: any) {
        console.error("Analysis error:", err);
        setError(err.response?.data?.detail || "Failed to analyze profile. Please try again.");
      }
    };

    processData();
  }, [sessionId, navigate, setAnalysisData, setPathwayData]);

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

          {error && (
            <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

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

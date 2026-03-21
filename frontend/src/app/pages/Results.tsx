import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

interface SkillGap {
  skill: string;
  gap_type: "missing" | "needs_improvement";
  priority: "high" | "medium" | "low";
  current?: string;
  target?: string;
}

interface AnalysisData {
  resumeSkills: Array<{ skill: string; level: string; years: number }>;
  requiredSkills: Array<{ skill: string; required_level: string; mandatory: boolean }>;
  skillGaps: SkillGap[];
}

export default function Results() {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("gapzero_analysis");
    if (data) {
      setAnalysisData(JSON.parse(data));
    } else {
      navigate("/upload");
    }
  }, [navigate]);

  if (!analysisData) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "low":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getGapTypeIcon = (gapType: string) => {
    return gapType === "missing" ? AlertCircle : TrendingUp;
  };

  const totalGaps = analysisData.skillGaps.length;
  const highPriorityGaps = analysisData.skillGaps.filter((g) => g.priority === "high").length;
  const estimatedHours = totalGaps * 3.5; // Mock calculation

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/upload")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <span className="text-xl font-semibold">GapZero AI</span>
          <div className="w-20"></div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12 max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Skill Gap Analysis Complete</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've identified the skills you need to master for your target role
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 border-border/50 bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl font-bold">{totalGaps}</div>
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground">Skill Gaps Identified</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 border-border/50 bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl font-bold">{highPriorityGaps}</div>
                  <TrendingUp className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-muted-foreground">High Priority Skills</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 border-border/50 bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl font-bold">{estimatedHours}h</div>
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground">Estimated Training Time</p>
              </Card>
            </motion.div>
          </div>

          {/* Skill Gaps List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Identified Skill Gaps</h2>
            <div className="grid gap-4">
              {analysisData.skillGaps.map((gap, index) => {
                const GapIcon = getGapTypeIcon(gap.gap_type);
                return (
                  <motion.div
                    key={gap.skill}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  >
                    <Card className="p-6 border-border/50 bg-card hover:border-primary/30 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <GapIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl font-semibold">{gap.skill}</h3>
                              <Badge className={getPriorityColor(gap.priority)}>{gap.priority} priority</Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">
                              {gap.gap_type === "missing"
                                ? "This skill is required but not currently in your skillset"
                                : `Upgrade from ${gap.current} to ${gap.target} level`}
                            </p>
                            {gap.gap_type === "needs_improvement" && gap.current && gap.target && (
                              <div>
                                <div className="flex items-center justify-between mb-2 text-sm">
                                  <span className="text-muted-foreground">Current: {gap.current}</span>
                                  <span className="text-muted-foreground">Target: {gap.target}</span>
                                </div>
                                <Progress
                                  value={gap.current === "beginner" ? 33 : gap.current === "intermediate" ? 66 : 100}
                                  className="h-2"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Your Current Skills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">Your Current Skills</h2>
            <Card className="p-6 border-border/50 bg-card">
              <div className="flex flex-wrap gap-3">
                {analysisData.resumeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  >
                    <Badge variant="outline" className="px-4 py-2 text-sm bg-green-500/10 border-green-500/20 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      {skill.skill} ({skill.level})
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center"
          >
            <Button onClick={() => navigate("/roadmap")} size="lg" className="px-12 py-6 text-lg group">
              View Your Learning Roadmap
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

import { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import LearningPath from "../components/LearningPath";
import { ArrowLeft, Clock, BookOpen, CheckCircle, Info, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useAppContext } from "../context/AppContext";

const extractYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return match ? match[1] : null;
};

export default function Roadmap() {
  const navigate = useNavigate();
  const { pathwayData } = useAppContext();

  useEffect(() => {
    if (!pathwayData) {
      navigate("/");
    }
  }, [pathwayData, navigate]);

  if (!pathwayData) return null;

  const modules = pathwayData.modules;
  const totalHours = pathwayData.estimated_hours || modules.reduce((sum, m) => sum + m.duration_hours, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/results")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Button>
          <span className="text-xl font-semibold">PrepGrap AI</span>
          <Button variant="outline" onClick={() => navigate("/")}>
            New Analysis
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Learning Roadmap
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              A personalized pathway designed to close your skill gaps
              efficiently
            </p>

            <div className="flex flex-wrap gap-4">
              <Card className="px-6 py-3 border-border/50 bg-card inline-flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{modules.length}</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
              </Card>
              <Card className="px-6 py-3 border-border/50 bg-card inline-flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{totalHours}h</div>
                  <div className="text-sm text-muted-foreground">
                    Total Duration
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Interactive Roadmap</p>
                  <p className="text-muted-foreground">
                    Click on any module to see detailed information. Arrows show
                    prerequisites. Colors indicate difficulty:
                    <span className="text-green-600 mx-1">
                      Green = Beginner
                    </span>
                    <span className="text-yellow-600 mx-1">
                      Yellow = Intermediate
                    </span>
                    <span className="text-red-600 mx-1">Red = Advanced</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <LearningPath pathwayData={{ modules: modules as any }} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Module Details</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.order.toString()}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <AccordionItem
                    value={module.order.toString()}
                    className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-all"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 text-left flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">
                            {module.order}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {module.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {module.skill}
                            </Badge>
                            <Badge
                              className={
                                getDifficultyColor(module.difficulty) +
                                " text-xs"
                              }
                            >
                              {module.difficulty}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {module.duration_hours}h
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <div className="space-y-4 pl-14">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-muted-foreground">
                            {module.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Why This Module?</h4>
                          <p className="text-muted-foreground">
                            {module.rationale}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            Module Type:
                          </span>
                          <Badge variant="outline">{module.type}</Badge>
                        </div>
                        {module.prerequisite && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-muted-foreground">
                              Prerequisite: Module {module.prerequisite}
                            </span>
                          </div>
                        )}
                        {module.resource_url && (
                          <div className="mt-2">
                            <h4 className="font-medium mb-3">Learning Resource</h4>
                            {extractYouTubeId(module.resource_url) ? (
                              <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20 relative aspect-video mt-2 max-w-2xl">
                                <iframe
                                  src={`https://www.youtube.com/embed/${extractYouTubeId(module.resource_url)}`}
                                  title={module.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                              </div>
                            ) : (
                              <Button asChild variant="outline" className="gap-2">
                                <a href={module.resource_url} target="_blank" rel="noopener noreferrer">
                                  Access Resource
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-8 text-center bg-gradient-to-br from-primary via-primary/95 to-primary/90 border-0">
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">
                Ready to Start Learning?
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Follow this pathway to bridge your skill gaps and become
                job-ready
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/")}
                className="bg-background text-foreground hover:bg-background/90"
              >
                Start Another Analysis
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

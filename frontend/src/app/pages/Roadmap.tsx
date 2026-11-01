import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import LearningPath from "../components/LearningPath";
import Navbar from "../components/Navbar";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Share2,
  Download,
  Sparkles,
  Trophy,
  Play,
  Check,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useAppContext } from "../context/AppContext";
import confetti from "canvas-confetti";

const extractYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match ? match[1] : null;
};

import { getResolvedResource } from "../services/resourceService";

export default function Roadmap() {
  const navigate = useNavigate();
  const { pathwayData, jobTitle, completedModules, toggleModuleCompletion, isLoaded } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [copiedLink, setCopiedLink] = useState(false);
  const detailRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (isLoaded && !pathwayData) {
      navigate("/");
    }
  }, [pathwayData, navigate, isLoaded]);

  if (!pathwayData) return null;

  const modules = pathwayData.modules;
  const totalHours = pathwayData.estimated_hours || modules.reduce((sum, m) => sum + m.duration_hours, 0);

  const completedCount = modules.filter((m) => completedModules.includes(m.order)).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  const handleSelectModule = (order: number) => {
    setSelectedOrder(order);
    const element = detailRefs.current[order];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleToggleComplete = (order: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const nowDone = toggleModuleCompletion(order);
    if (nowDone && completedCount + 1 === modules.length) {
      // Grand celebration when 100% completed
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pathwayData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `roadmap-${jobTitle ? jobTitle.toLowerCase().replace(/\s+/g, "-") : "learning-pathway"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredModules = modules.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mod.description && mod.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDiff =
      difficultyFilter === "all" || mod.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesDiff;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "intermediate":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";
      case "advanced":
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/results")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gap Analysis
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyShare}
              className="gap-1.5 rounded-full text-xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? "Link Copied!" : "Share Pathway"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJSON}
              className="gap-1.5 rounded-full text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
          </div>
        </div>

        {/* Title & Progress Header Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-card/60 dark:bg-card/40 border border-border/70 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                Adaptive Pathway Generated
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {jobTitle ? `${jobTitle} Learning Roadmap` : "Your Personalized Learning Roadmap"}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                Ordered curriculum curated to bridge your identified skill gaps with verified resources and estimated milestones.
              </p>
            </div>

            {/* Quick KPI Stat Chips */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-background/80 border border-border/60 shadow-sm flex-1 sm:flex-initial">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xl font-bold">{modules.length}</div>
                  <div className="text-[11px] font-medium text-muted-foreground">Modules</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-background/80 border border-border/60 shadow-sm flex-1 sm:flex-initial">
                <Clock className="w-5 h-5 text-indigo-500" />
                <div>
                  <div className="text-xl font-bold">{totalHours}h</div>
                  <div className="text-[11px] font-medium text-muted-foreground">Estimated Time</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-background/80 border border-border/60 shadow-sm flex-1 sm:flex-initial">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-xl font-bold">{progressPercent}%</div>
                  <div className="text-[11px] font-medium text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
              <span>Overall Roadmap Progress</span>
              <span className="font-bold text-foreground">
                {completedCount} of {modules.length} modules completed
              </span>
            </div>
            <Progress value={progressPercent} className="h-2.5 rounded-full" />
          </div>
        </div>

        {/* Section 1: Interactive Roadmap Graph */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Interactive Dependency Graph
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Drag to explore, zoom in/out, and click nodes to view learning content.
              </p>
            </div>
          </div>

          <LearningPath
            pathwayData={{ modules }}
            selectedOrder={selectedOrder}
            onSelectModule={handleSelectModule}
          />
        </section>

        {/* Section 2: Detailed Modules List with Search & Filters */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Curriculum Breakdown</h2>
              <p className="text-sm text-muted-foreground">
                Explore resources, rationale, and prerequisites step by step.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules & skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs rounded-full bg-card/60 border-border/60"
                />
              </div>

              {/* Difficulty filter buttons */}
              <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-full border border-border/40 text-xs">
                {["all", "beginner", "intermediate", "advanced"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-3 py-1 rounded-full capitalize font-medium transition-all ${
                      difficultyFilter === diff
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module Accordion */}
          {filteredModules.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-border/60 bg-card/30">
              <p className="text-muted-foreground">No modules match your current filter criteria.</p>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              value={selectedOrder ? selectedOrder.toString() : undefined}
              onValueChange={(val) => setSelectedOrder(val ? parseInt(val, 10) : null)}
              className="space-y-3.5"
            >
              {filteredModules.map((module) => {
                const isCompleted = completedModules.includes(module.order);
                const isSelected = selectedOrder === module.order;
                const resolved = getResolvedResource(module.skill, module.title, module.resource_url);
                const ytId = resolved.youtubeId;

                return (
                  <div
                    key={module.order}
                    ref={(el) => (detailRefs.current[module.order] = el)}
                  >
                    <AccordionItem
                      value={module.order.toString()}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-card/70 dark:bg-card/40 ${
                        isCompleted
                          ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                          : isSelected
                            ? "border-primary ring-2 ring-primary/20 shadow-md"
                            : "border-border/60 hover:border-primary/40"
                      }`}
                    >
                      <AccordionTrigger className="hover:no-underline px-5 py-4 group">
                        <div className="flex items-center gap-4 text-left flex-1 min-w-0">
                          {/* Module Order & Checkbox Button */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleComplete(module.order, e)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 group/check"
                            title={isCompleted ? "Mark in-progress" : "Mark completed"}
                          >
                            {isCompleted ? (
                              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 group-hover/check:bg-primary/20 flex items-center justify-center">
                                <span className="font-extrabold text-sm text-primary">
                                  {module.order}
                                </span>
                              </div>
                            )}
                          </button>

                          {/* Module Summary Details */}
                          <div className="flex-1 min-w-0 pr-2">
                            <h3
                              className={`font-bold text-base sm:text-lg mb-1 truncate transition-colors ${
                                isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                              }`}
                            >
                              {module.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-[11px] font-semibold">
                                {module.skill}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-[11px] capitalize font-semibold ${getDifficultyBadge(
                                  module.difficulty
                                )}`}
                              >
                                {module.difficulty}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                <Clock className="w-3 h-3" />
                                {module.duration_hours}h
                              </span>
                              <span className="text-xs text-muted-foreground capitalize font-medium px-2 py-0.5 rounded bg-muted/60">
                                {module.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/40">
                        <div className="space-y-4 pl-0 sm:pl-14">
                          {/* Module Description */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Module Overview
                            </h4>
                            <p className="text-sm leading-relaxed text-foreground/90">
                              {module.description}
                            </p>
                          </div>

                          {/* Rationale */}
                          {module.rationale && (
                            <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40 text-xs">
                              <span className="font-bold text-primary block mb-1">
                                Why is this step recommended?
                              </span>
                              <p className="text-muted-foreground leading-relaxed">
                                {module.rationale}
                              </p>
                            </div>
                          )}

                          {/* Prerequisite reminder */}
                          {module.prerequisite && (
                            <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                              <span>Prerequisite:</span>
                              <button
                                onClick={() => handleSelectModule(module.prerequisite!)}
                                className="underline hover:text-primary"
                              >
                                Step {module.prerequisite}
                              </button>
                            </div>
                          )}

                          {/* Verified Resource Hub */}
                          <div className="pt-2 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <Play className="w-3.5 h-3.5 text-primary" />
                                Verified Learning Resources
                              </h4>
                              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                ✓ Verified Active Content
                              </span>
                            </div>

                            {ytId ? (
                              <div className="space-y-3 max-w-3xl">
                                <div className="rounded-2xl overflow-hidden border border-border/70 bg-black/90 aspect-video relative shadow-md">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${ytId}`}
                                    title={module.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                  />
                                </div>

                                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                                  <div className="text-muted-foreground">
                                    Course Provider: <span className="font-bold text-foreground">{resolved.sourceName}</span>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2">
                                    <Button asChild variant="outline" size="sm" className="h-8 rounded-lg gap-1.5 text-xs">
                                      <a href={resolved.primaryUrl} target="_blank" rel="noopener noreferrer">
                                        Watch on YouTube
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </Button>

                                    <Button asChild variant="outline" size="sm" className="h-8 rounded-lg gap-1.5 text-xs">
                                      <a href={resolved.docUrl} target="_blank" rel="noopener noreferrer">
                                        Official Documentation
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </Button>

                                    <Button asChild variant="ghost" size="sm" className="h-8 rounded-lg gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                                      <a href={resolved.searchUrl} target="_blank" rel="noopener noreferrer">
                                        More Masterclasses
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-3 max-w-2xl">
                                <div>
                                  <p className="text-xs font-bold text-foreground mb-0.5">{resolved.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Curated by {resolved.sourceName}. Comprehensive official guide and interactive documentation.
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Button asChild size="sm" className="rounded-xl gap-2 text-xs font-bold bg-primary text-primary-foreground">
                                    <a href={resolved.docUrl} target="_blank" rel="noopener noreferrer">
                                      Access Official Guide & Docs
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  </Button>
                                  <Button asChild variant="outline" size="sm" className="rounded-xl gap-2 text-xs">
                                    <a href={resolved.searchUrl} target="_blank" rel="noopener noreferrer">
                                      Browse Video Tutorials
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action toggle button inside */}
                          <div className="pt-2 flex justify-end">
                            <Button
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={(e) => handleToggleComplete(module.order, e)}
                              className="rounded-full gap-2 text-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          )}
        </section>

        {/* Footer Next Actions */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-background to-accent/10 border border-border/60 text-center space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">Ready to test another role or upload a new resume?</h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            You can analyze multiple target job profiles to compare pathways and target your career progression.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              onClick={() => navigate("/upload")}
              className="rounded-full px-6 gap-2 bg-primary text-primary-foreground font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Start New Analysis
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

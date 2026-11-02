import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Database,
  Cloud,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

interface RoleScenario {
  id: string;
  tabLabel: string;
  fromRole: string;
  targetRole: string;
  matchScore: number;
  timeEstimate: string;
  identifiedGaps: string[];
  existingStrengths: string[];
  sampleModules: {
    title: string;
    description: string;
    tag: string;
    duration: string;
    resourceType: "Documentation" | "Interactive Lab" | "Video Deep-Dive";
  }[];
}

const SCENARIOS: RoleScenario[] = [
  {
    id: "fe-to-ai",
    tabLabel: "Frontend → AI Full-Stack",
    fromRole: "Mid-Level Frontend (React/TS)",
    targetRole: "Senior AI Platform Engineer",
    matchScore: 78,
    timeEstimate: "~18 hours • 2.5 weeks",
    identifiedGaps: [
      "Vercel AI SDK & Streaming SSR",
      "Vector Embeddings & pgvector",
      "Structured Output Tool Calling (Zod)",
    ],
    existingStrengths: ["React 19 & Next.js", "TypeScript 5.x", "Tailwind CSS", "REST/GraphQL"],
    sampleModules: [
      {
        title: "Streaming Responses with Vercel AI SDK",
        description: "Implement zero-latency streaming UI with useChat, ReadableStream, and Server Actions.",
        tag: "Core Framework",
        duration: "4.5 hrs",
        resourceType: "Documentation",
      },
      {
        title: "Semantic Vector Search with pgvector",
        description: "Store high-dimensional embeddings and execute similarity searches using cosine distance.",
        tag: "Data Layer",
        duration: "6.0 hrs",
        resourceType: "Interactive Lab",
      },
      {
        title: "Agentic Tool Calling & Structured Schemas",
        description: "Build deterministic multi-step agent loops with Zod validation and fallback strategies.",
        tag: "LLM Orchestration",
        duration: "7.5 hrs",
        resourceType: "Video Deep-Dive",
      },
    ],
  },
  {
    id: "data-to-mlops",
    tabLabel: "Data Analyst → ML & LLMOps",
    fromRole: "Senior Data Analyst (SQL/Python)",
    targetRole: "Production MLOps Engineer",
    matchScore: 72,
    timeEstimate: "~22 hours • 3 weeks",
    identifiedGaps: [
      "Docker Containerization & GPU Drivers",
      "FastAPI Async Model Serving",
      "MLflow Telemetry & Drift Monitoring",
    ],
    existingStrengths: ["SQL & Data Modeling", "Pandas / NumPy", "Statistical Analysis", "Data Viz"],
    sampleModules: [
      {
        title: "Packaging Models with Multi-Stage Docker",
        description: "Build ultra-lean container images for PyTorch and Transformers inference engines.",
        tag: "Infrastructure",
        duration: "6.0 hrs",
        resourceType: "Interactive Lab",
      },
      {
        title: "High-Throughput Model Serving with FastAPI",
        description: "Asynchronous prediction endpoints with batching, Pydantic v2 schemas, and health probes.",
        tag: "API Services",
        duration: "7.5 hrs",
        resourceType: "Documentation",
      },
      {
        title: "Model Drift & Experiment Tracking with MLflow",
        description: "Log hyperparameters, register artifacts, and set up automated alerts for inference degradation.",
        tag: "Observability",
        duration: "8.5 hrs",
        resourceType: "Video Deep-Dive",
      },
    ],
  },
  {
    id: "backend-to-cloud",
    tabLabel: "Backend → Cloud Architect",
    fromRole: "Backend Engineer (Java/Node)",
    targetRole: "Staff Cloud Solutions Architect",
    matchScore: 81,
    timeEstimate: "~26 hours • 3.5 weeks",
    identifiedGaps: [
      "Terraform Infrastructure as Code (IaC)",
      "Kubernetes Multi-Cluster Orchestration",
      "Kafka Distributed Event Streaming",
    ],
    existingStrengths: ["Microservice Design", "PostgreSQL / RDBMS", "Distributed Caching", "CI/CD Basics"],
    sampleModules: [
      {
        title: "Modular Cloud Provisioning with Terraform",
        description: "Author reusable modules, remote state locking with DynamoDB, and CI drift detection.",
        tag: "DevOps & IaC",
        duration: "8.0 hrs",
        resourceType: "Interactive Lab",
      },
      {
        title: "Kubernetes Ingress & Helm Deployments",
        description: "Configuring ingress controllers, resource quotas, canary deployments, and persistent storage.",
        tag: "Container Platform",
        duration: "9.5 hrs",
        resourceType: "Documentation",
      },
      {
        title: "Fault-Tolerant Streaming with Apache Kafka",
        description: "Partitioning strategies, consumer group rebalancing, and exactly-once processing semantics.",
        tag: "Distributed Systems",
        duration: "8.5 hrs",
        resourceType: "Video Deep-Dive",
      },
    ],
  },
  {
    id: "junior-to-sre",
    tabLabel: "Junior Dev → Platform SRE",
    fromRole: "Associate Software Engineer",
    targetRole: "Site Reliability Engineer (SRE)",
    matchScore: 68,
    timeEstimate: "~20 hours • 3 weeks",
    identifiedGaps: [
      "Prometheus & PromQL Metric Instrumentation",
      "Distributed Tracing with OpenTelemetry",
      "GitOps Automated Canary Rollouts (ArgoCD)",
    ],
    existingStrengths: ["Linux CLI & Bash", "Git Workflow", "Web Protocols (HTTP/DNS)", "Basic Cloud Setup"],
    sampleModules: [
      {
        title: "SLI/SLO Engineering with Prometheus",
        description: "Author alerting rules, PromQL aggregations, and Grafana golden signal dashboards.",
        tag: "Monitoring",
        duration: "6.5 hrs",
        resourceType: "Interactive Lab",
      },
      {
        title: "Full-Stack Tracing with OpenTelemetry",
        description: "Instrument microservices with span context propagation and export traces to Jaeger.",
        tag: "Observability",
        duration: "7.0 hrs",
        resourceType: "Documentation",
      },
      {
        title: "Declarative GitOps with ArgoCD",
        description: "Automated synchronization, progressive canary rollouts, and instant cluster rollbacks.",
        tag: "Platform Delivery",
        duration: "6.5 hrs",
        resourceType: "Video Deep-Dive",
      },
    ],
  },
];

export default function RoleTransitionShowcase() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>("fe-to-ai");

  const current = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  return (
    <div className="w-full space-y-8">
      {/* Scenario Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedId;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedId(sc.id)}
              className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isSelected
                  ? "text-primary-foreground shadow-md font-bold"
                  : "text-muted-foreground hover:text-foreground bg-card/70 hover:bg-card/90 border border-border/70 hover:border-border"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeScenarioPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/25"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span>{sc.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive App Mockup Window */}
      <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Terminal / App Header Chrome */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-muted/40 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-muted-foreground ml-2 hidden sm:inline">
              prepgrap://pipeline-delta/{current.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Ready for Execution</span>
          </div>
        </div>

        {/* Content Body with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-8 space-y-6"
          >
            {/* Top Delta Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Origin vs Target */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Transition Scope
                </div>
                <div className="text-sm font-bold text-foreground">
                  {current.fromRole}
                </div>
                <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{current.targetRole}</span>
                </div>
              </div>

              {/* Box 2: Overlap Score */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Baseline Competency Overlap
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-foreground">{current.matchScore}%</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Strong Foundation
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-amber-500 to-emerald-500 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${current.matchScore}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Box 3: Projected Readiness */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Time to Role Readiness
                </div>
                <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  {current.timeEstimate}
                </div>
                <div className="text-xs text-muted-foreground">
                  Focuses strictly on missing 3 competencies.
                </div>
              </div>
            </div>

            {/* Missing Gaps vs Verified Strengths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Missing Skills (Delta) */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5" />
                    Identified Competency Gaps (To Master)
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono">
                    {current.identifiedGaps.length} Gaps
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.identifiedGaps.map((gap, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-card border border-amber-500/30 text-foreground flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Existing Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Recognized Strengths (Skipped)
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono">
                    {current.existingStrengths.length} Verified
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.existingStrengths.map((str, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-card border border-emerald-500/30 text-muted-foreground flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {str}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Synthesized Pathway Modules */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  Synthesized Ordered Learning Pathway
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  Prerequisites Automatically Sequenced
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {current.sampleModules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-card/70 border border-border/70 hover:border-amber-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-muted text-foreground">
                          Step 0{idx + 1}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {mod.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground leading-snug">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">{mod.tag}</span>
                      <span className="text-muted-foreground font-mono">{mod.resourceType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Action */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60">
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ready to generate your own personalized roadmap?</span>
              </div>
              <Button
                size="sm"
                onClick={() => navigate("/upload")}
                className="w-full sm:w-auto rounded-xl px-5 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all gap-1.5 cursor-pointer"
              >
                Scan Your Resume Now
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

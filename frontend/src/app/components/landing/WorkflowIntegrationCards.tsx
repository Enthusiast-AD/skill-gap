import React from "react";
import {
  FileText,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const WORKFLOW_CARDS = [
  {
    title: "Resume & Profile Ingestion",
    subtitle: "Zero-retention semantic parsing",
    icon: FileText,
    badge: "Input Stream",
    accent: "from-rose-500/10 via-amber-500/10 to-transparent",
    preview: (
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            candidate_resume.pdf
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            Parsed (0.42s)
          </span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="text-muted-foreground">Extracted Competencies:</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-muted text-foreground">
              React 19
            </span>
            <span className="px-2 py-0.5 rounded-md bg-muted text-foreground">
              TypeScript
            </span>
            <span className="px-2 py-0.5 rounded-md bg-muted text-foreground">
              Node / Express
            </span>
            <span className="px-2 py-0.5 rounded-md bg-muted text-foreground">
              PostgreSQL
            </span>
          </div>
        </div>
      </div>
    ),
    features: [
      "PDF, DOCX, and LinkedIn PDF profile ingestion",
      "Semantic normalization across job title variances",
      "Confidential processing with zero model training",
    ],
  },
  {
    title: "Job Requisitions & ATS Specs",
    subtitle: "Raw job postings or greenhouse links",
    icon: Briefcase,
    badge: "Target Anchor",
    accent: "from-amber-500/10 via-orange-500/10 to-transparent",
    preview: (
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            target_job_spec.txt
          </span>
          <span className="text-[10px] text-primary font-bold">
            Level: Senior (L5)
          </span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="text-muted-foreground">Core Requirements:</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold">
              OpenTelemetry
            </span>
            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold">
              Kafka Streams
            </span>
            <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
              REST Architecture
            </span>
          </div>
        </div>
      </div>
    ),
    features: [
      "Paste any JD text or link from Greenhouse & Lever",
      "Distinguishes hard requirements from 'nice-to-haves'",
      "Automated seniority weighting & team context",
    ],
  },
  {
    title: "Curated Verified Curricula",
    subtitle: "Live tutorials, labs & official docs",
    icon: ExternalLink,
    badge: "Execution Layer",
    accent: "from-emerald-500/10 via-teal-500/10 to-transparent",
    preview: (
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            verified_resources
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            100% Tested Live
          </span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between p-1.5 rounded bg-muted/50">
            <span className="text-foreground font-semibold">Official OpenTelemetry Docs</span>
            <span className="text-muted-foreground">Documentation</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-muted/50">
            <span className="text-foreground font-semibold">Kafka Architecture (oEmbed)</span>
            <span className="text-muted-foreground">Video Lab</span>
          </div>
        </div>
      </div>
    ),
    features: [
      "Automated oEmbed checks eliminate broken 404 links",
      "Direct code repositories, sandboxes, and documentation",
      "Sequenced by prerequisite difficulty and time to learn",
    ],
  },
];

export default function WorkflowIntegrationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {WORKFLOW_CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-border/70 bg-muted/40 text-muted-foreground font-bold">
                  {card.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {card.subtitle}
                </p>
              </div>

              {/* Realistic Visual Mock */}
              <div className={`p-1 rounded-2xl bg-gradient-to-b ${card.accent}`}>
                {card.preview}
              </div>
            </div>

            {/* Feature Checklist */}
            <ul className="space-y-2 border-t border-border/60 pt-4">
              {card.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

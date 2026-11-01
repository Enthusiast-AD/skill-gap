import React from "react";
import { ShieldCheck, Lock, EyeOff, Trash2, Download, CheckCircle2, KeyRound } from "lucide-react";
import { Badge } from "../ui/badge";

const SECURITY_PILLARS = [
  {
    title: "Enterprise-Grade Encryption",
    tagline: "AES-256 at rest & TLS 1.3 in transit",
    icon: Lock,
    accent: "text-amber-500",
    bgAccent: "bg-amber-500/10 border-amber-500/20",
    preview: (
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="flex items-center gap-1.5 text-foreground font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            TLS 1.3 Secured
          </span>
          <span className="text-[10px] text-muted-foreground">RSA-4096</span>
        </div>
        <div className="space-y-1 text-[11px] text-muted-foreground">
          <div className="flex justify-between">
            <span>In-Transit:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Encrypted</span>
          </div>
          <div className="flex justify-between">
            <span>At-Rest Storage:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">AES-256-GCM</span>
          </div>
        </div>
      </div>
    ),
    points: [
      "End-to-end encryption for resume uploads and JDs",
      "No permanent storage of unredacted personal identifiers",
      "Scoped session tokens with automatic TTL invalidation",
    ],
  },
  {
    title: "Zero AI Model Training",
    tagline: "Your career data is never used to train public LLMs",
    icon: EyeOff,
    accent: "text-blue-500",
    bgAccent: "bg-blue-500/10 border-blue-500/20",
    preview: (
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="flex items-center gap-1.5 text-foreground font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            AI Policy Guarantee
          </span>
          <Badge variant="outline" className="text-[9px] bg-blue-500/10 text-blue-600 border-blue-500/20">
            Strict
          </Badge>
        </div>
        <div className="p-2 rounded bg-muted/40 text-[11px] text-muted-foreground">
          "Zero retention for model retraining across Google Gemini APIs and downstream pipelines."
        </div>
      </div>
    ),
    points: [
      "Ephemeral prompt context execution only",
      "No scraping, aggregating, or reselling of candidate profiles",
      "Compliant with enterprise confidentiality policies",
    ],
  },
  {
    title: "Full Sovereignty & Export",
    tagline: "Export your roadmaps or purge all data in 1 click",
    icon: Trash2,
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500/10 border-emerald-500/20",
    preview: (
      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <span className="flex items-center gap-1.5 text-foreground font-bold">
            <Download className="w-3.5 h-3.5 text-emerald-500" />
            Export Formats
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">1-Click</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-1.5 rounded bg-muted/40 text-center font-bold text-foreground">
            JSON / DAG
          </div>
          <div className="p-1.5 rounded bg-muted/40 text-center font-bold text-foreground">
            Markdown Spec
          </div>
        </div>
      </div>
    ),
    points: [
      "Export full sequenced roadmap with all resource links",
      "Instant 1-click session purge deletes all stored records",
      "Local-first fallback with zero mandatory account creation",
    ],
  },
];

export default function SecurityCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SECURITY_PILLARS.map((col, idx) => {
        const Icon = col.icon;
        return (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/50 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${col.bgAccent}`}>
                  <Icon className={`w-5 h-5 ${col.accent}`} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Verified Pillar
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {col.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {col.tagline}
                </p>
              </div>

              <div>{col.preview}</div>
            </div>

            <ul className="space-y-2 border-t border-border/60 pt-4">
              {col.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

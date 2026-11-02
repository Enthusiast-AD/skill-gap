import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  Github,
  Linkedin,
  Layers,
  BookOpen,
  Boxes,
} from "lucide-react";

interface ArcBadge {
  label: string;
  sub: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  curveClass: string;
  delay: number;
}

const LEFT_BADGES: ArcBadge[] = [
  {
    label: "PDF / DOCX",
    sub: "Resume Ingest",
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-50 border-rose-200/80 text-rose-500",
    curveClass: "translate-y-3",
    delay: 0.1,
  },
  {
    label: "LinkedIn Export",
    sub: "Profile Ingest",
    icon: Linkedin,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200/80 text-blue-600",
    curveClass: "translate-y-1",
    delay: 0.15,
  },
  {
    label: "GitHub Repos",
    sub: "Code Signal",
    icon: Github,
    color: "text-slate-700",
    bg: "bg-slate-100 border-slate-200 text-slate-700",
    curveClass: "translate-y-0",
    delay: 0.2,
  },
];

const RIGHT_BADGES: ArcBadge[] = [
  {
    label: "Docker / K8s",
    sub: "Containers",
    icon: Boxes,
    color: "text-sky-600",
    bg: "bg-sky-50 border-sky-200/80 text-sky-600",
    curveClass: "translate-y-0",
    delay: 0.25,
  },
  {
    label: "Greenhouse / ATS",
    sub: "Job Requisite",
    icon: Layers,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200/80 text-emerald-600",
    curveClass: "translate-y-1",
    delay: 0.3,
  },
  {
    label: "Verified Curricula",
    sub: "Docs & Labs",
    icon: BookOpen,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200/80 text-amber-600",
    curveClass: "translate-y-3",
    delay: 0.35,
  },
];

const MOBILE_BADGES = [
  { label: "PDF / DOCX Ingest", icon: FileText, color: "text-rose-500", bg: "bg-rose-50 border-rose-200" },
  { label: "LinkedIn Export", icon: Linkedin, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  { label: "GitHub Signal", icon: Github, color: "text-slate-700", bg: "bg-slate-100 border-slate-200" },
  { label: "Docker / K8s", icon: Boxes, color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
  { label: "ATS Specs", icon: Layers, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { label: "Verified Curricula", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
];

export default function HeroIntegrationArc() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Desktop Non-Overlapping Symmetrical Flex Wings (lg+) */}
      <div className="hidden lg:flex items-center justify-between gap-3 xl:gap-6 py-2 select-none">
        {/* Left Wing (3 Ingestion Badges) */}
        <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
          {LEFT_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: badge.delay,
                  ease: "easeOut",
                }}
                className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs shadow-slate-200/60 hover:-translate-y-1 hover:border-amber-400/80 hover:shadow-md transition-all duration-200 cursor-pointer group ${badge.curveClass}`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center border ${badge.bg} group-hover:scale-105 transition-transform shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-amber-600 transition-colors whitespace-nowrap">
                    {badge.label}
                  </span>
                  <span className="text-[9px] font-medium text-slate-500 leading-tight whitespace-nowrap">
                    {badge.sub}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Center Portal (Guaranteed Spacer for Visual Balance) */}
        <div className="flex-1 min-w-[20px] max-w-[120px]" />

        {/* Right Wing (3 Target Delivery Badges) */}
        <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
          {RIGHT_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: badge.delay,
                  ease: "easeOut",
                }}
                className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs shadow-slate-200/60 hover:-translate-y-1 hover:border-amber-400/80 hover:shadow-md transition-all duration-200 cursor-pointer group ${badge.curveClass}`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center border ${badge.bg} group-hover:scale-105 transition-transform shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-amber-600 transition-colors whitespace-nowrap">
                    {badge.label}
                  </span>
                  <span className="text-[9px] font-medium text-slate-500 leading-tight whitespace-nowrap">
                    {badge.sub}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Pill Ribbon (< lg) */}
      <div className="lg:hidden flex flex-wrap items-center justify-center gap-2 pb-1">
        {MOBILE_BADGES.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-2xs text-[11px] font-semibold text-slate-700 hover:border-amber-400 hover:text-slate-900 transition-all cursor-pointer"
            >
              <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

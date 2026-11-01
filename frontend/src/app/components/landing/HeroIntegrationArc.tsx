import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  Github,
  Linkedin,
  Database,
  Cloud,
  Layers,
  Code2,
  Cpu,
  BookOpen,
  Boxes,
} from "lucide-react";

interface ArcBadge {
  label: string;
  sub: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  positionClass: string;
  delay: number;
}

const ARC_BADGES: ArcBadge[] = [
  {
    label: "PDF / DOCX",
    sub: "Resume Ingest",
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-500/10 border-rose-500/20",
    positionClass: "-top-6 left-[4%] hidden lg:flex",
    delay: 0.1,
  },
  {
    label: "LinkedIn Export",
    sub: "Profile Ingest",
    icon: Linkedin,
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
    positionClass: "top-4 left-[14%] hidden md:flex",
    delay: 0.2,
  },
  {
    label: "GitHub Repos",
    sub: "Code Signal",
    icon: Github,
    color: "text-slate-700 dark:text-slate-300",
    bg: "bg-slate-500/10 border-slate-500/20",
    positionClass: "top-14 left-[24%] hidden sm:flex",
    delay: 0.3,
  },
  {
    label: "AWS & Cloud",
    sub: "Skill Delta",
    icon: Cloud,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
    positionClass: "top-20 left-[36%] hidden xl:flex",
    delay: 0.35,
  },
  {
    label: "Docker / K8s",
    sub: "Containers",
    icon: Boxes,
    color: "text-sky-500",
    bg: "bg-sky-500/10 border-sky-500/20",
    positionClass: "top-20 right-[36%] hidden xl:flex",
    delay: 0.4,
  },
  {
    label: "PostgreSQL",
    sub: "Vector DB",
    icon: Database,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    positionClass: "top-14 right-[24%] hidden sm:flex",
    delay: 0.45,
  },
  {
    label: "Greenhouse / ATS",
    sub: "Job Requisite",
    icon: Layers,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    positionClass: "top-4 right-[14%] hidden md:flex",
    delay: 0.5,
  },
  {
    label: "Verified Curricula",
    sub: "Docs & Labs",
    icon: BookOpen,
    color: "text-orange-500",
    bg: "bg-orange-500/10 border-orange-500/20",
    positionClass: "-top-6 right-[4%] hidden lg:flex",
    delay: 0.55,
  },
];

export default function HeroIntegrationArc() {
  return (
    <div className="relative w-full max-w-6xl mx-auto h-16 sm:h-20 pointer-events-none select-none">
      {ARC_BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: badge.delay,
              ease: "easeOut",
            }}
            className={`absolute ${badge.positionClass} items-center gap-2 px-3 py-1.5 rounded-2xl border bg-card/85 dark:bg-card/70 backdrop-blur-md shadow-lg shadow-black/5 pointer-events-auto hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center border ${badge.bg}`}>
              <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-foreground leading-tight">
                {badge.label}
              </span>
              <span className="text-[9px] font-medium text-muted-foreground leading-tight">
                {badge.sub}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

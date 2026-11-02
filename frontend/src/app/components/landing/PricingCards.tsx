import React from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function PricingCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      {/* Free Plan */}
      <div className="p-7 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Community
            </span>
            <h3 className="text-xl font-black text-foreground mt-1">Free Scan</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Perfect for exploring your immediate gap for a single target job.
            </p>
          </div>

          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-4xl font-black text-foreground">$0</span>
            <span className="text-xs text-muted-foreground">/ forever</span>
          </div>

          <ul className="space-y-2.5 pt-4 border-t border-border/60 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full resume vs target job spec delta</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Contextual missing vs upgrade skills</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Adaptive 4-stage DAG learning pathway</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Verified oEmbed tutorials & documentation</span>
            </li>
          </ul>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/upload")}
          className="w-full h-11 rounded-2xl text-xs font-bold border-border/80 hover:bg-muted/60"
        >
          Start Free Analysis
        </Button>
      </div>

      {/* Pro Plan (Highlighted, similar to Lindy's highlighted center card) */}
      <div className="p-7 rounded-3xl border-2 border-amber-500/80 bg-card/95 dark:bg-card/80 backdrop-blur-2xl shadow-2xl relative flex flex-col justify-between space-y-6 -translate-y-1 sm:-translate-y-2">
        {/* Most Popular Pill */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Most Popular
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Individual Pro
            </span>
            <h3 className="text-xl font-black text-foreground mt-1">
              Career Accelerator
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              For engineers actively applying and preparing for high-stakes loops.
            </p>
          </div>

          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-4xl font-black text-foreground">$19</span>
            <span className="text-xs text-muted-foreground">/ month</span>
            <span className="ml-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              7-Day Free Trial
            </span>
          </div>

          <ul className="space-y-2.5 pt-4 border-t border-border/60 text-xs text-muted-foreground">
            <li className="flex items-center gap-2 text-foreground font-semibold">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Unlimited resume & job gap analyses</span>
            </li>
            <li className="flex items-center gap-2 text-foreground font-semibold">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Interactive checkpoint quizzes & telemetry</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Session persistence & historical progress</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Export to Notion, PDF, and Markdown</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Direct GitHub repo & code sandbox links</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={() => navigate("/upload")}
          className="w-full h-11 rounded-2xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 gap-1.5"
        >
          Start Pro Free Trial
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Enterprise Plan */}
      <div className="p-7 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Teams & Bootcamps
            </span>
            <h3 className="text-xl font-black text-foreground mt-1">Cohort Onboarding</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Custom competency maps for engineering orgs and university cohorts.
            </p>
          </div>

          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-4xl font-black text-foreground">Custom</span>
            <span className="text-xs text-muted-foreground">/ team</span>
          </div>

          <ul className="space-y-2.5 pt-4 border-t border-border/60 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Bulk candidate & employee resume parsing</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Internal tech stack competency benchmarking</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Engineering manager cohort telemetry dashboard</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Custom LMS and Greenhouse/Lever ATS integration</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Dedicated customer success engineer & SLA</span>
            </li>
          </ul>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/upload")}
          className="w-full h-11 rounded-2xl text-xs font-bold border-border/80 hover:bg-muted/60"
        >
          Request Team Demo
        </Button>
      </div>
    </div>
  );
}

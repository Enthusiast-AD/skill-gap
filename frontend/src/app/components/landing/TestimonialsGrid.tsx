import React from "react";
import { CheckCircle2, Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  handle: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  highlightMetric: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Rivera",
    handle: "@arivera_dev",
    role: "Senior AI Engineer",
    company: "Series B AI Startup",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    content:
      "Most courses try to teach you JavaScript loops before teaching you LLM streaming. PrepGrap recognized my 5 years of React experience and skipped right to Vercel AI SDK and vector embeddings. Saved me at least a month.",
    highlightMetric: "Cut prep time by 4 weeks",
    rating: 5,
  },
  {
    name: "Marcus Vance",
    handle: "@vance_tech",
    role: "Engineering Director",
    company: "CloudScale Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    content:
      "We onboarded 14 new engineers onto our platform team. Instead of assigning a generic 80-hour internal wiki checklist, PrepGrap mapped each engineer's specific resume against our Kubernetes stack. Incredible mentor time savings.",
    highlightMetric: "Saved ~120 mentor hours",
    rating: 5,
  },
  {
    name: "Dr. Elena Rostova",
    handle: "@elena_ml",
    role: "ML Platform Lead",
    company: "FinTech Global",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    content:
      "The Directed Acyclic Graph (DAG) sequencing is brilliant. It didn't just give me links; it placed containerization before FastAPI serving and Kafka streaming. Every concept built directly on the prior one.",
    highlightMetric: "Zero prerequisite confusion",
    rating: 5,
  },
  {
    name: "David Chen",
    handle: "@dchen_cloud",
    role: "Staff DevOps Engineer",
    company: "DataVantage",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    content:
      "I was transitioning from on-prem infrastructure to cloud-native Terraform and AWS. PrepGrap generated a precise gap analysis that matched my technical interview questions almost verbatim.",
    highlightMetric: "Passed AWS Staff Architect loop",
    rating: 5,
  },
  {
    name: "Sarah Lindqvist",
    handle: "@slindqvist",
    role: "Product Manager (Technical)",
    company: "NextGen SaaS",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    content:
      "I needed to upskill on system design and RAG pipelines for our upcoming AI roadmap. PrepGrap broke down the exact concepts without bogging me down in low-level syntax. Butter smooth experience.",
    highlightMetric: "80% faster roadmap mastery",
    rating: 5,
  },
  {
    name: "Karan Patel",
    handle: "@karan_codes",
    role: "Full-Stack Developer",
    company: "Venture Studios",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    content:
      "What stood out immediately: the resources actually worked. No broken YouTube 404 links, no outdated tutorial code from 2019. It links directly to verified current docs and live tutorials.",
    highlightMetric: "100% working resource links",
    rating: 5,
  },
];

export default function TestimonialsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t, idx) => (
        <div
          key={idx}
          className="p-6 rounded-3xl border border-border/70 bg-card/80 dark:bg-card/50 backdrop-blur-xl shadow-md hover:shadow-xl hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            {/* User Profile Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-border/80 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">
                      {t.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.role} • {t.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              "{t.content}"
            </p>
          </div>

          {/* Bottom Metric Badge */}
          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-500/20">
              {t.highlightMetric}
            </span>
            <span className="text-muted-foreground font-mono">{t.handle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

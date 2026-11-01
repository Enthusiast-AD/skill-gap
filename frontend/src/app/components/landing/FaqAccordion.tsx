import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQS = [
  {
    id: "item-1",
    question: "How does PrepGrap determine what skills I'm actually missing?",
    answer:
      "PrepGrap utilizes Gemini 2.5 with semantic vector reasoning. Instead of relying on brittle keyword matching (which docks points if your resume says 'FastAPI' while the job description asks for 'REST APIs'), our engine maps competencies into conceptual clusters. It recognizes underlying proficiencies, differentiates between 'hard prerequisites' and 'nice-to-haves', and isolates only the true skill delta.",
  },
  {
    id: "item-2",
    question: "Are the recommended learning resources free or paywalled?",
    answer:
      "PrepGrap prioritizes high-signal, accessible engineering resources: official documentation (e.g. MDN, Kubernetes.io, Python.org), interactive code labs, and curated YouTube video masterclasses. Every multimedia asset is verified via live oEmbed endpoints to ensure zero broken 404s or defunct tutorials.",
  },
  {
    id: "item-3",
    question: "What file formats are supported for resume upload?",
    answer:
      "We support PDF, DOCX, and raw text files. You can also paste your LinkedIn profile export or copy-paste text directly. The parser handles complex multi-column layouts, work histories, project bullet points, and certifications effortlessly.",
  },
  {
    id: "item-4",
    question: "Is my resume or target job description kept private?",
    answer:
      "Yes, completely. We enforce strict enterprise privacy standards: all communications are encrypted with TLS 1.3 / AES-256, and data is processed ephemerally. Your resumes and corporate requisites are never used to train or fine-tune public foundation models.",
  },
  {
    id: "item-5",
    question: "Can I export my learning roadmap to Notion or Markdown?",
    answer:
      "Yes. You can export your personalized Directed Acyclic Graph (DAG) roadmap, complete with milestone checkboxes, estimated timelines, and verified learning links, to structured JSON or clean Markdown for direct import into Notion or Obsidian.",
  },
  {
    id: "item-6",
    question: "How long does a typical skill-gap pathway take to complete?",
    answer:
      "Most pathways span between 15 to 30 focused hours over 2 to 4 weeks. Because PrepGrap eliminates the 70% of material you already know from past experience, it accelerates your time-to-readiness significantly compared to generic 60-hour bootcamps.",
  },
];

export default function FaqAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-3">
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border border-border/70 rounded-2xl px-5 sm:px-6 bg-card/60 dark:bg-card/40 backdrop-blur-md shadow-xs transition-all duration-200"
          >
            <AccordionTrigger className="text-left font-bold text-sm sm:text-base py-4 hover:no-underline hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4 pt-1">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

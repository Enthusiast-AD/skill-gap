import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle2,
  X,
  Loader2,
  Sparkles,
  ArrowRight,
  FileCode,
  Briefcase,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import Navbar from "../components/Navbar";
import { uploadFiles, SAMPLE_PROFILES } from "../services/api";
import { useAppContext } from "../context/AppContext";

export default function Upload() {
  const navigate = useNavigate();
  const { setSessionId, setJobTitle: setContextJobTitle } = useAppContext();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [jdMode, setJdMode] = useState<"text" | "file">("text");

  // Drag over states
  const [resumeDragOver, setResumeDragOver] = useState(false);
  const [jdDragOver, setJdDragOver] = useState(false);

  // Quick preset loader
  const handleApplySampleProfile = (profileId: string) => {
    const profile = SAMPLE_PROFILES.find((p) => p.id === profileId);
    if (!profile) return;

    setJobTitle(profile.jobTitle);
    setJdText(profile.jdText);
    setJdMode("text");
    setJdFile(null);

    // Create a client-side synthetic File object for the sample resume
    const blob = new Blob([profile.resumeText], { type: "text/plain" });
    const syntheticFile = new File([blob], `${profile.id}-sample-resume.txt`, {
      type: "text/plain",
      lastModified: Date.now(),
    });
    setResumeFile(syntheticFile);
    setError("");
  };

  const handleResumeDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setResumeDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleJdDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setJdDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setJdFile(file);
      setJdMode("file");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("Please upload your candidate resume.");
      return;
    }
    if (jdMode === "file" && !jdFile) {
      setError("Please upload a job description document or switch to paste text.");
      return;
    }
    if (jdMode === "text" && !jdText.trim()) {
      setError("Please enter or paste the target job description.");
      return;
    }
    if (!jobTitle.trim()) {
      setError("Please enter the target job title.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const jdData = jdMode === "file" && jdFile ? jdFile : jdText;
      const response = await uploadFiles(resumeFile, jdData, jobTitle.trim());

      setSessionId(response.session_id);
      setContextJobTitle(jobTitle.trim());

      navigate("/analyzing");
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.detail ||
          "Failed to process files. Please verify the document format and try again."
      );
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Header Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              AI Onboarding & Skill Gap Engine
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Map Your Growth Pathway
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Upload your resume and the target role description to pinpoint skill gaps and generate a step-by-step roadmap.
            </p>
          </div>

          {/* Quick Preset Selector Pill Bar */}
          <div className="p-4 rounded-3xl border border-border/60 bg-card/60 dark:bg-card/40 backdrop-blur-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Test instantly with demo profiles:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROFILES.map((profile) => (
                  <Button
                    key={profile.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleApplySampleProfile(profile.id)}
                    className="rounded-full text-xs font-semibold h-8 border-border/60 hover:border-primary/50 hover:bg-primary/5"
                  >
                    {profile.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Target Job Title */}
            <Card className="p-6 rounded-3xl border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="jobTitle" className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Target Job Title <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[11px] text-muted-foreground">The position you are aiming for</span>
                </div>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Cloud Architect, Full Stack Lead, ML Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="h-12 px-4 rounded-2xl bg-background/80 border-border/60 text-sm font-medium focus:ring-primary/20"
                  required
                />
              </div>
            </Card>

            {/* Step 2: Resume File Upload Zone */}
            <Card className="p-6 rounded-3xl border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <FileText className="w-4 h-4 text-primary" />
                    Candidate Resume <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[11px] text-muted-foreground">PDF, DOCX, or TXT (Max 10MB)</span>
                </div>

                {resumeFile ? (
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.04] transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{resumeFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(resumeFile.size)} • Ready for analysis
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setResumeFile(null)}
                      className="rounded-full w-8 h-8 text-muted-foreground hover:text-destructive"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setResumeDragOver(true);
                    }}
                    onDragLeave={() => setResumeDragOver(false)}
                    onDrop={handleResumeDrop}
                    className={`relative flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                      resumeDragOver
                        ? "border-primary bg-primary/10 scale-[0.99]"
                        : "border-border/60 hover:border-primary/50 bg-muted/20 hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="file"
                      id="resume-input"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => e.target.files?.[0] && setResumeFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                      <UploadIcon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-foreground mb-1">
                      Drag & drop your resume here, or <span className="text-primary underline">browse</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Supports PDF, DOCX, DOC, or TXT formats</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Step 3: Target Job Description */}
            <Card className="p-6 rounded-3xl border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-md">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <FileCode className="w-4 h-4 text-primary" />
                    Job Description <span className="text-destructive">*</span>
                  </Label>

                  {/* Mode switch pills */}
                  <div className="flex items-center gap-1 p-1 rounded-full bg-muted/40 border border-border/40 text-xs self-start">
                    <button
                      type="button"
                      onClick={() => setJdMode("text")}
                      className={`px-3 py-1 rounded-full font-semibold transition-all ${
                        jdMode === "text"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Paste Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setJdMode("file")}
                      className={`px-3 py-1 rounded-full font-semibold transition-all ${
                        jdMode === "file"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {jdMode === "text" ? (
                  <Textarea
                    placeholder="Paste the job requirements, responsibilities, and required competencies here..."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    className="min-h-[180px] p-4 rounded-2xl bg-background/80 border-border/60 text-sm font-mono leading-relaxed"
                    required={!jdFile}
                  />
                ) : jdFile ? (
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.04]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{jdFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(jdFile.size)} • Job description attached
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setJdFile(null)}
                      className="rounded-full w-8 h-8 text-muted-foreground hover:text-destructive"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setJdDragOver(true);
                    }}
                    onDragLeave={() => setJdDragOver(false)}
                    onDrop={handleJdDrop}
                    className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                      jdDragOver
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/50 bg-muted/20 hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="file"
                      id="jd-file-input"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => e.target.files?.[0] && setJdFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-bold text-foreground mb-0.5">
                      Upload job description document
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Error Message Alert */}
            {error && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={uploading || !resumeFile || (!jdFile && !jdText.trim()) || !jobTitle.trim()}
                className="w-full sm:w-auto px-10 h-14 rounded-2xl text-base font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all gap-2 group"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    Analyze Skill Gaps & Generate Roadmap
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, FileText, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

export default function Upload() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleJdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJdFile(e.target.files[0]);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        setJdText(event.target?.result as string);
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile || (!jdFile && !jdText) || !jobTitle) return;

    setUploading(true);

    // Simulate upload and processing
    setTimeout(() => {
      // Store session data in localStorage for mock functionality
      const sessionData = {
        sessionId: crypto.randomUUID(),
        jobTitle,
        resumeFileName: resumeFile.name,
        jdText: jdText || "Job description uploaded",
      };
      localStorage.setItem("gapzero_session", JSON.stringify(sessionData));
      
      navigate("/analyzing");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <span className="text-xl font-semibold">GapZero AI</span>
          <div className="w-20"></div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Your Documents</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and job description to get started with your personalized learning pathway
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8">
              {/* Job Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-6 border-border/50">
                  <Label htmlFor="jobTitle" className="text-lg mb-3 block">
                    Target Job Title *
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Software Engineer, Product Manager"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="text-lg py-6"
                    required
                  />
                </Card>
              </motion.div>

              {/* Resume Upload */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6 border-border/50">
                  <Label className="text-lg mb-3 block">Resume *</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="resume"
                      className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20 hover:bg-muted/30"
                    >
                      {resumeFile ? (
                        <>
                          <CheckCircle className="w-12 h-12 text-green-600" />
                          <div className="text-center">
                            <p className="font-medium">{resumeFile.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">Click to change file</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <UploadIcon className="w-12 h-12 text-muted-foreground" />
                          <div className="text-center">
                            <p className="font-medium">Click to upload resume</p>
                            <p className="text-sm text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </Card>
              </motion.div>

              {/* Job Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6 border-border/50">
                  <Label className="text-lg mb-3 block">Job Description *</Label>
                  
                  {/* File Upload Option */}
                  <div className="mb-4">
                    <input
                      type="file"
                      id="jd"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleJdUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="jd"
                      className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20 hover:bg-muted/30"
                    >
                      {jdFile ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-medium">{jdFile.name}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <FileText className="w-6 h-6 text-muted-foreground" />
                          <p>Upload JD file (PDF, DOC, DOCX, or TXT)</p>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mb-4">OR</div>

                  {/* Text Input Option */}
                  <Textarea
                    placeholder="Paste the job description here..."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    className="min-h-[200px] text-base"
                    required={!jdFile}
                  />
                </Card>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center"
              >
                <Button
                  type="submit"
                  size="lg"
                  className="px-12 py-6 text-lg"
                  disabled={uploading || !resumeFile || (!jdFile && !jdText) || !jobTitle}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Analyze Skill Gaps
                      <UploadIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

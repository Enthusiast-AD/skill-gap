import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getMyRoadmaps, logoutUser, getSessionData } from "../services/api";
import { Button } from "../components/ui/button";
import {
  LogOut,
  Brain,
  LayoutDashboard,
  Calendar,
  Briefcase,
  Sparkles,
  ArrowRight,
  Trash2,
  Loader2,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";

export default function Profile() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingSessionId, setLoadingSessionId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSessionId, setAnalysisData, setPathwayData, setJobTitle, clearSession } = useAppContext();

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const data = await getMyRoadmaps();
      setRoadmaps(data);
    } catch (err) {
      setError("Failed to load your roadmap history. Please verify your session.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    clearSession();
    navigate("/signin");
  };

  const viewRoadmap = async (sessionId: string, jobTitle: string) => {
    setLoadingSessionId(sessionId);
    try {
      const fullData = await getSessionData(sessionId);
      setSessionId(sessionId);
      setJobTitle(fullData.job_title || jobTitle);

      setAnalysisData({
        session_id: fullData.session_id,
        resume_skills: fullData.resume_skills,
        required_skills: fullData.required_skills,
        skill_gaps: fullData.skill_gaps,
        reasoning_trace: fullData.reasoning_trace,
      });

      if (fullData.pathway) {
        setPathwayData(fullData.pathway);
        navigate("/roadmap");
      } else {
        navigate("/results");
      }
    } catch (err) {
      console.warn("Could not load stored session directly, falling back to analyzing:", err);
      setSessionId(sessionId);
      setJobTitle(jobTitle);
      navigate("/analyzing");
    } finally {
      setLoadingSessionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-10 max-w-5xl space-y-8">
        {/* Profile Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-xl shadow-lg">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Your Career Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Saved Analyses & Pathways
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Review, track progress, and revisit generated learning roadmaps anytime.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate("/upload")}
              className="rounded-full text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-md shadow-primary/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Scan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full text-xs font-semibold gap-1.5 hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-sm font-medium text-muted-foreground">Loading your analysis history...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center rounded-3xl border border-destructive/30 bg-destructive/5 text-destructive space-y-3">
            <p className="font-semibold text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/signin")}
              className="rounded-xl text-xs"
            >
              Sign In Again
            </Button>
          </div>
        ) : roadmaps.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-border/70 bg-card/40 backdrop-blur-xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Brain className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">No Roadmaps Saved Yet</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Upload your resume and a job description to generate your first adaptive learning pathway.
              </p>
            </div>
            <Button
              onClick={() => navigate("/upload")}
              className="rounded-2xl px-6 h-11 text-xs font-bold bg-primary text-primary-foreground"
            >
              Start First Analysis
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmaps.map((rm) => {
              const isLoading = loadingSessionId === rm.session_id;

              return (
                <div
                  key={rm.session_id}
                  className="p-6 rounded-3xl border border-border/70 bg-card/70 dark:bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-bold">
                        <Briefcase className="w-3 h-3" />
                        Target Role
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(rm.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {rm.job_title || "Untitled Role"}
                    </h3>
                  </div>

                  <Button
                    onClick={() => viewRoadmap(rm.session_id, rm.job_title)}
                    disabled={isLoading}
                    className="w-full rounded-2xl text-xs font-bold gap-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Open Roadmap
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

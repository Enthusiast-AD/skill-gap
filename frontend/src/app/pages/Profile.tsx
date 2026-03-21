import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getMyRoadmaps, logoutUser } from "../services/api";
import { Button } from "../components/ui/button";
import { LogOut, Brain, LayoutDashboard, Calendar, Briefcase } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Profile() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setSessionId, clearSession } = useAppContext();

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const data = await getMyRoadmaps();
      setRoadmaps(data);
    } catch (err) {
      setError("Failed to load your roadmaps. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    clearSession();
    navigate("/signin");
  };

  const viewRoadmap = (sessionId: string) => {
    clearSession();
    setSessionId(sessionId);
    // Go to analyzing so it can fetch (or retrieve from DB) the results and pathway, 
    // then navigate to /results
    navigate("/analyzing"); 
  };

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-card/50 p-6 rounded-3xl border border-border/50 shadow-sm backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
              <Brain className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              PrepGrap <span className="text-primary italic">AI</span>
            </span>
          </Link>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/")} className="rounded-xl font-bold">
              New Scan
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="rounded-xl font-bold gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </header>

        <main className="space-y-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              Your Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">Access your previous skill-gap analyses and roadmaps.</p>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading your history...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-medium">{error}</div>
          ) : roadmaps.length === 0 ? (
            <div className="text-center py-20 border border-border/50 rounded-3xl bg-card/30">
              <h3 className="text-2xl font-bold mb-4">No Roadmaps Found</h3>
              <p className="text-muted-foreground mb-6">You haven't generated any learning roadmaps yet.</p>
              <Button onClick={() => navigate("/upload")} className="rounded-xl font-bold h-12 px-8">
                Start First Analysis
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((rm) => (
                <div key={rm.session_id} className="p-6 rounded-3xl border border-border/50 bg-card/50 shadow-sm hover:shadow-md transition-all group flex flex-col gap-4">
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-primary font-bold bg-primary/10 w-fit px-3 py-1 rounded-full">
                      <Briefcase className="h-4 w-4" />
                      Role
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2">{rm.job_title || 'Untitled Role'}</h3>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(rm.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    onClick={() => viewRoadmap(rm.session_id)}
                    className="w-full rounded-xl font-bold bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    variant="secondary"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  Brain,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import Navbar from "../components/Navbar";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI parses your resume and job description to identify exact skill gaps",
    },
    {
      icon: Target,
      title: "Personalized Pathways",
      description:
        "Get a tailored learning roadmap that addresses only what you need to learn",
    },
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Skip content you already know and focus on bridging your specific gaps",
    },
    {
      icon: TrendingUp,
      title: "Faster Onboarding",
      description:
        "Reduce time-to-productivity with adaptive, role-specific training",
    },
    {
      icon: Users,
      title: "For All Levels",
      description:
        "Whether you're a new grad or experienced hire, get the right training",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get your personalized learning pathway in seconds, not weeks",
    },
  ];

  const stats = [
    { value: "80%", label: "Time Saved" },
    { value: "95%", label: "Accuracy" },
    { value: "10x", label: "Faster Onboarding" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-40 relative overflow-hidden">
        {/* Background blur elements */}
        {/* <div className="absolute top-10 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" /> */}
        <div className="absolute bottom-10 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-6"
          >
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent leading-tight"
          >
            Stop Training What People Already Know
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            PrepGrap analyzes your resume against any job description and
            generates a personalized learning pathway to close the exact skill
            gaps.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate("/upload")}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:shadow-primary/30 px-8 py-6 text-lg group transition-all duration-300"
              >
                Start Your Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-md bg-white/50 border border-white/20 hover:text-black hover:bg-white/20 hover:shadow-lg px-8 py-6 text-lg transition-all duration-300"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-10 mt-20 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 hover:bg-white/20 shadow-lg transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Feature Section with Image */}
      <section className="container mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-sm font-semibold text-primary">
                  ✨ Advanced Technology
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground/70 bg-clip-text text-transparent">
                  Powered by Advanced AI
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Our state-of-the-art AI engine uses cutting-edge natural
                language processing and machine learning to deeply understand
                the nuances of your professional experience and job
                requirements, ensuring highly accurate skill matching and gap
                identification.
              </p>

              <div className="space-y-6 mb-8">
                <motion.div
                  whileHover={{ x: 12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 hover:border-primary/50 hover:bg-white/20 shadow-lg transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-12 h-12 bg-gradient-to-br from-primary/40 to-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <Brain className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-foreground">
                        Smart Skill Extraction
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Advanced AI automatically identifies, categorizes, and
                        weighs both technical and soft skills from your
                        documents with contextual understanding
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 hover:border-primary/50 hover:bg-white/20 shadow-lg transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      className="w-12 h-12 bg-gradient-to-br from-primary/40 to-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <Target className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-foreground">
                        Precision Gap Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Identifies not just missing skills, but also areas
                        needing improvement with detailed proficiency scoring
                        and priority ranking
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-3xl overflow-hidden  backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 mx-auto"
              >
                <img
                  src="landingvec.jpg"
                  alt="vector_image"
                  className="w-5xl h-5xl"
                />
              </motion.div>

              {/* Floating accent elements */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="container mx-auto px-6 py-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your personalized learning pathway
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Documents",
                description:
                  "Upload your resume and the target job description. We support PDF, DOCX, and TXT formats.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our AI engine extracts skills from both documents and identifies gaps with precision scoring.",
              },
              {
                step: "03",
                title: "Get Your Roadmap",
                description:
                  "Receive a personalized, ordered learning pathway with module recommendations and timelines.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl shadow-xl backdrop-blur-xl hover:border-primary/40 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary/40 to-primary/20 bg-clip-text text-transparent mb-4 group-hover:from-primary/60 group-hover:to-primary/40 transition-all duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="container mx-auto px-6 py-20 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent  ">
              Why PrepGrap?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Intelligent features designed for modern corporate onboarding
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl shadow-xl backdrop-blur-xl group hover:border-primary/40 hover:shadow-2xl hover:bg-white/15 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/50 group-hover:to-primary/30 transition-all duration-300 shadow-lg"
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-3xl" />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-12 md:p-16 text-center bg-gray-100 border border-white/20 shadow-2xl rounded-3xl backdrop-blur-xl hover:shadow-3xl transition-all duration-300">
            <motion.h2
              whileInView={{ scale: 1.05 }}
              transition={{ type: "spring" }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Ready to Bridge Your Skill Gaps?
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are accelerating their career
              growth with AI-powered personalized learning.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate("/upload")}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:shadow-primary/40 px-8 py-6 text-lg group transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="about"
        className="border-t border-white/10 bg-gradient-to-b from-transparent via-white/5 to-white/10 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src="/favicon.ico" alt="PrepGrap Logo" className="w-6 h-6 rounded-lg shadow-lg" />
              <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                PrepGrap
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              © 2026 PrepGrap. Bridging skills gaps with intelligent
              onboarding.
            </p>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}

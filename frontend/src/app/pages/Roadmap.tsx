import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { ArrowLeft, Clock, BookOpen, CheckCircle, Info } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface Module {
  id: string;
  order: number;
  title: string;
  skill: string;
  type: string;
  duration_hours: number;
  difficulty: string;
  prerequisite: number | null;
  description: string;
  rationale: string;
}

export default function Roadmap() {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    // Generate mock pathway data
    const mockModules: Module[] = [
      {
        id: "1",
        order: 1,
        title: "Docker Fundamentals",
        skill: "Docker",
        type: "video + hands-on",
        duration_hours: 4,
        difficulty: "beginner",
        prerequisite: null,
        description: "Learn the basics of containerization with Docker, including images, containers, and basic commands.",
        rationale: "Foundation skill needed before Kubernetes",
      },
      {
        id: "2",
        order: 2,
        title: "Docker Compose & Multi-Container Apps",
        skill: "Docker",
        type: "hands-on lab",
        duration_hours: 3,
        difficulty: "intermediate",
        prerequisite: 1,
        description: "Master Docker Compose to orchestrate multi-container applications and manage complex environments.",
        rationale: "Builds on Docker basics, prepares for Kubernetes",
      },
      {
        id: "3",
        order: 3,
        title: "Kubernetes Essentials",
        skill: "Kubernetes",
        type: "video + quiz",
        duration_hours: 5,
        difficulty: "intermediate",
        prerequisite: 2,
        description: "Introduction to Kubernetes architecture, pods, services, and deployments.",
        rationale: "Core K8s concepts needed for the role",
      },
      {
        id: "4",
        order: 4,
        title: "SQL Joins & Advanced Queries",
        skill: "SQL",
        type: "hands-on lab",
        duration_hours: 3,
        difficulty: "intermediate",
        prerequisite: null,
        description: "Master complex SQL queries, joins, subqueries, and query optimization techniques.",
        rationale: "Upgrade from beginner to intermediate SQL level",
      },
      {
        id: "5",
        order: 5,
        title: "AWS Core Services Overview",
        skill: "AWS",
        type: "video + reading",
        duration_hours: 4,
        difficulty: "beginner",
        prerequisite: null,
        description: "Introduction to AWS core services: EC2, S3, RDS, Lambda, and IAM.",
        rationale: "Foundation for cloud infrastructure skills",
      },
      {
        id: "6",
        order: 6,
        title: "Kubernetes in Production",
        skill: "Kubernetes",
        type: "hands-on project",
        duration_hours: 6,
        difficulty: "intermediate",
        prerequisite: 3,
        description: "Deploy and manage production-grade Kubernetes clusters with monitoring and scaling.",
        rationale: "Practical application of K8s for the target role",
      },
      {
        id: "7",
        order: 7,
        title: "AWS + Kubernetes Integration",
        skill: "AWS",
        type: "hands-on project",
        duration_hours: 5,
        difficulty: "intermediate",
        prerequisite: 5,
        description: "Learn to deploy Kubernetes clusters on AWS using EKS and integrate with AWS services.",
        rationale: "Combines AWS and K8s skills for comprehensive cloud expertise",
      },
    ];

    setModules(mockModules);

    // Create nodes for React Flow
    const flowNodes: Node[] = mockModules.map((module, index) => {
      const col = module.prerequisite === null ? 0 : module.prerequisite === 1 ? 1 : module.prerequisite === 2 ? 2 : module.prerequisite === 3 ? 3 : module.prerequisite === 5 ? 2 : 3;
      const rowsInCol = mockModules.filter(m => {
        const mCol = m.prerequisite === null ? 0 : m.prerequisite === 1 ? 1 : m.prerequisite === 2 ? 2 : m.prerequisite === 3 ? 3 : m.prerequisite === 5 ? 2 : 3;
        return mCol === col;
      });
      const rowIndex = rowsInCol.findIndex(m => m.id === module.id);
      
      return {
        id: module.id,
        data: { 
          label: (
            <div className="px-4 py-3 min-w-[220px]">
              <div className="font-semibold text-sm mb-1">{module.title}</div>
              <div className="text-xs text-muted-foreground mb-2">{module.skill}</div>
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3 h-3" />
                {module.duration_hours}h
              </div>
            </div>
          )
        },
        position: { x: col * 300, y: rowIndex * 200 },
        style: {
          background: module.difficulty === "beginner" ? "#dcfce7" : module.difficulty === "intermediate" ? "#fef9c3" : "#fecaca",
          border: "2px solid",
          borderColor: module.difficulty === "beginner" ? "#16a34a" : module.difficulty === "intermediate" ? "#ca8a04" : "#dc2626",
          borderRadius: "8px",
          fontSize: "12px",
          width: 240,
        },
      };
    });

    const flowEdges: Edge[] = mockModules
      .filter((module) => module.prerequisite !== null)
      .map((module) => ({
        id: `e${module.prerequisite}-${module.id}`,
        source: module.prerequisite!.toString(),
        target: module.id,
        type: "smoothstep",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: {
          stroke: "#6b7280",
          strokeWidth: 2,
        },
      }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [setNodes, setEdges]);

  const onNodeClick = useCallback((_: any, node: Node) => {
    const module = modules.find((m) => m.id === node.id);
    if (module) {
      setSelectedModule(module);
    }
  }, [modules]);

  const totalHours = modules.reduce((acc, m) => acc + m.duration_hours, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/results")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Button>
          <span className="text-xl font-semibold">GapZero AI</span>
          <Button variant="outline" onClick={() => navigate("/")}>
            New Analysis
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Roadmap</h1>
            <p className="text-xl text-muted-foreground mb-6">
              A personalized pathway designed to close your skill gaps efficiently
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Card className="px-6 py-3 border-border/50 bg-card inline-flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{modules.length}</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
              </Card>
              <Card className="px-6 py-3 border-border/50 bg-card inline-flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{totalHours}h</div>
                  <div className="text-sm text-muted-foreground">Total Duration</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Interactive Roadmap</p>
                  <p className="text-muted-foreground">
                    Click on any module to see detailed information. Arrows show prerequisites. Colors indicate difficulty: 
                    <span className="text-green-600 mx-1">Green = Beginner</span>
                    <span className="text-yellow-600 mx-1">Yellow = Intermediate</span>
                    <span className="text-red-600 mx-1">Red = Advanced</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* React Flow Visualization */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="p-0 border-border/50 bg-card overflow-hidden">
              <div style={{ height: "600px" }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onNodeClick={onNodeClick}
                  fitView
                  attributionPosition="bottom-left"
                >
                  <Background />
                  <Controls />
                  <MiniMap nodeStrokeWidth={3} zoomable pannable />
                </ReactFlow>
              </div>
            </Card>
          </motion.div>

          {/* Module Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Module Details</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <AccordionItem
                    value={module.id}
                    className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-all"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 text-left flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">{module.order}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{module.title}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {module.skill}
                            </Badge>
                            <Badge className={getDifficultyColor(module.difficulty) + " text-xs"}>
                              {module.difficulty}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {module.duration_hours}h
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <div className="space-y-4 pl-14">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-muted-foreground">{module.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Why This Module?</h4>
                          <p className="text-muted-foreground">{module.rationale}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Module Type:</span>
                          <Badge variant="outline">{module.type}</Badge>
                        </div>
                        {module.prerequisite && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-muted-foreground">
                              Prerequisite: Module {module.prerequisite}
                            </span>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-8 text-center bg-gradient-to-br from-primary via-primary/95 to-primary/90 border-0">
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">
                Ready to Start Learning?
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Follow this pathway to bridge your skill gaps and become job-ready
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/")}
                className="bg-background text-foreground hover:bg-background/90"
              >
                Start Another Analysis
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

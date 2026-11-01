import React, { useMemo, useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import confetti from 'canvas-confetti';
import { Maximize2, LayoutGrid, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import RoadmapNode, { RoadmapNodeData } from './RoadmapNode';
import { useAppContext } from '../context/AppContext';

const nodeTypes = {
  roadmap: RoadmapNode,
};

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';

  dagreGraph.setGraph({
    rankdir: direction,
    align: 'DL',
    nodesep: 90,
    ranksep: 110,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 270, height: 160 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top' as any,
      sourcePosition: isHorizontal ? 'right' : 'bottom' as any,
      position: {
        x: nodeWithPosition.x - 270 / 2,
        y: nodeWithPosition.y - 160 / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export interface ModuleData {
  order: number;
  title: string;
  skill: string;
  type: string;
  duration_hours: number;
  difficulty: string;
  prerequisite?: number | null;
  rationale?: string;
  description?: string;
  resource_url?: string;
  dependencies?: (number | string)[];
  status?: string;
}

export interface PathwayData {
  modules: ModuleData[];
}

interface LearningPathProps {
  pathwayData: PathwayData;
  selectedOrder?: number | null;
  onSelectModule?: (order: number) => void;
}

function LearningPathFlow({ pathwayData, selectedOrder, onSelectModule }: LearningPathProps) {
  const { completedModules, toggleModuleCompletion } = useAppContext();
  const [direction, setDirection] = useState<'TB' | 'LR'>('TB');
  const { fitView } = useReactFlow();

  const handleToggleComplete = useCallback(
    (order: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const nowDone = toggleModuleCompletion(order);
      if (nowDone) {
        // Trigger celebratory confetti burst from the click coordinates
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x, y },
          colors: ['#10b981', '#3b82f6', '#6366f1', '#ec4899'],
        });
      }
    },
    [toggleModuleCompletion]
  );

  const initialNodes: Node[] = useMemo(() => {
    if (!pathwayData?.modules) return [];
    return pathwayData.modules.map((mod) => {
      const order = mod.order;
      const isDone = completedModules.includes(order);
      const isSelected = selectedOrder === order;

      const nodeData: RoadmapNodeData = {
        order: mod.order,
        title: mod.title,
        skill: mod.skill,
        type: mod.type,
        difficulty: mod.difficulty,
        duration_hours: mod.duration_hours,
        isCompleted: isDone,
        isSelected,
        onToggleComplete: handleToggleComplete,
      };

      return {
        id: order.toString(),
        type: 'roadmap',
        data: nodeData,
        position: { x: 0, y: 0 },
      };
    });
  }, [pathwayData, completedModules, selectedOrder, handleToggleComplete]);

  const initialEdges: Edge[] = useMemo(() => {
    if (!pathwayData?.modules) return [];
    const edges: Edge[] = [];
    pathwayData.modules.forEach((mod) => {
      // Connect explicit prerequisites
      if (mod.prerequisite !== undefined && mod.prerequisite !== null) {
        const sourceId = mod.prerequisite.toString();
        const targetId = mod.order.toString();
        edges.push({
          id: `e${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: 'rgba(99, 102, 241, 0.65)',
            strokeWidth: 2.5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'rgb(99, 102, 241)',
            width: 16,
            height: 16,
          },
        });
      } else if (mod.order > 1 && !mod.prerequisite) {
        // Connect sequential previous step if no explicit prerequisite exists
        const prevId = (mod.order - 1).toString();
        edges.push({
          id: `e${prevId}-${mod.order}`,
          source: prevId,
          target: mod.order.toString(),
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: 'rgba(148, 163, 184, 0.45)',
            strokeWidth: 2,
            strokeDasharray: '5,5',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'rgba(148, 163, 184, 0.7)',
            width: 14,
            height: 14,
          },
        });
      }
    });
    return edges;
  }, [pathwayData]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges, direction),
    [initialNodes, initialEdges, direction]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    const { nodes: n, edges: e } = getLayoutedElements(initialNodes, initialEdges, direction);
    setNodes(n);
    setEdges(e);
  }, [initialNodes, initialEdges, direction, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const order = parseInt(node.id, 10);
      if (onSelectModule && !isNaN(order)) {
        onSelectModule(order);
      }
    },
    [onSelectModule]
  );

  const toggleDirection = () => {
    setDirection((d) => (d === 'TB' ? 'LR' : 'TB'));
    setTimeout(() => fitView({ padding: 0.2, duration: 600 }), 50);
  };

  const handleFitView = () => {
    fitView({ padding: 0.25, duration: 500 });
  };

  const completedCount = pathwayData.modules.filter((m) =>
    completedModules.includes(m.order)
  ).length;

  return (
    <div className="relative w-full h-[620px] rounded-3xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        className="transition-colors"
      >
        <Controls
          className="!bg-background/90 !backdrop-blur-md !border !border-border/60 !rounded-2xl !shadow-lg [&>button]:!border-b-border/40 [&>button]:!text-foreground [&>button:hover]:!bg-muted"
          showInteractive={false}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          className="opacity-40 dark:opacity-30"
          color="currentColor"
        />

        {/* Top Control Bar Panel */}
        <Panel position="top-right" className="flex items-center gap-2 m-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-xs font-semibold shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {completedCount} of {pathwayData.modules.length} Completed
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleDirection}
            className="rounded-full h-8 px-3 text-xs font-medium gap-1.5 bg-background/80 backdrop-blur-md border-border/60 shadow-sm hover:bg-muted"
            title="Toggle Layout Direction (Vertical / Horizontal)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {direction === 'TB' ? 'Horizontal' : 'Vertical'}
            </span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleFitView}
            className="rounded-full w-8 h-8 bg-background/80 backdrop-blur-md border-border/60 shadow-sm hover:bg-muted"
            title="Reset Zoom & Fit to Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </Panel>

        {/* Bottom Helper Hint Panel */}
        <Panel position="bottom-center" className="mb-3">
          <div className="px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/50 text-[11px] text-muted-foreground shadow-sm">
            💡 Click on any node to view module details • Check mark to complete
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default function LearningPath(props: LearningPathProps) {
  if (!props.pathwayData?.modules || props.pathwayData.modules.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl border border-dashed border-border/60 bg-muted/20">
        <p className="text-muted-foreground font-medium">No pathway modules available yet.</p>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <LearningPathFlow {...props} />
    </ReactFlowProvider>
  );
}

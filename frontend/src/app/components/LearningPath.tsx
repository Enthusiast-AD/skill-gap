import React, { useMemo, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Connection,
  Edge,
  Node
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import RoadmapNode from './RoadmapNode';

const nodeTypes = {
  roadmap: RoadmapNode
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, align: 'UL', nodesep: 100, ranksep: 150 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 250, height: 80 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top' as any;
    node.sourcePosition = isHorizontal ? 'right' : 'bottom' as any;
    
    node.position = {
      x: nodeWithPosition.x - 250 / 2,
      y: nodeWithPosition.y - 80 / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export interface ModuleData {
  id?: number | string;
  order?: number;
  title: string;
  type: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  dependencies: (number | string)[];
  status?: string;
  prerequisite?: number | null; // Support for the other format
}

export interface PathwayData {
  modules: ModuleData[];
}

export default function LearningPath({ pathwayData }: { pathwayData: PathwayData }) {
  const initialNodes: Node[] = useMemo(() => {
    if (!pathwayData?.modules) return [];
    return pathwayData.modules.map(mod => ({
      id: (mod.id || mod.order)!.toString(),
      type: 'roadmap',
      data: {
        title: mod.title,
        type: mod.type,
        difficulty: mod.difficulty,
        duration_hours: mod.duration_hours,
        status: mod.status || 'pending',
      },
      position: { x: 0, y: 0 }
    }));
  }, [pathwayData]);

  const initialEdges: Edge[] = useMemo(() => {
    if (!pathwayData?.modules) return [];
    const edges: Edge[] = [];
    pathwayData.modules.forEach(mod => {
      // Connect existing dependencies array
      if (mod.dependencies && mod.dependencies.length > 0) {
        mod.dependencies.forEach(dep => {
          edges.push({
            id: `e${dep}-${mod.id || mod.order}`,
            source: dep.toString(),
            target: (mod.id || mod.order)!.toString(),
            type: 'smoothstep',
            animated: true,
            style: { stroke: 'black', strokeWidth: 3 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: 'black',
            }
          });
        });
      }
      
      // Fallback: connect pre-requisites if present instead
      if (mod.prerequisite !== undefined && mod.prerequisite !== null && (!mod.dependencies || mod.dependencies.length === 0)) {
        edges.push({
          id: `e${mod.prerequisite}-${mod.id || mod.order}`,
          source: mod.prerequisite.toString(),
          target: (mod.id || mod.order)!.toString(),
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'black', strokeWidth: 3 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'black',
          }
        });
      }
    });
    return edges;
  }, [pathwayData]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges, 'TB'),
    [initialNodes, initialEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // Re-run layout if data changes
  React.useEffect(() => {
    const { nodes: n, edges: e } = getLayoutedElements(initialNodes, initialEdges, 'TB');
    setNodes(n);
    setEdges(e);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
    [setEdges]
  );

  if (!pathwayData?.modules) {
    return <div className="p-8 text-center text-gray-500">No pathway data available</div>;
  }

  return (
    <div className="w-full h-[800px] border-4 border-black rounded-xl bg-[#fafafa] shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="font-sans"
        minZoom={0.2}
      >
        <Controls 
          className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] [&>button]:border-b-2 [&>button]:border-black"
        />
        <Background color="#ccc" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
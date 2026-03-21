import React, { useMemo, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import RoadmapNode from './RoadmapNode';
import { defaultPathway } from '../api/mockData';

const nodeTypes = {
  roadmap: RoadmapNode
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Function to generate nodes and edges and layout them with dagre
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, align: 'UL', nodesep: 100, ranksep: 150 });

  nodes.forEach((node) => {
    // Arbitrary size matching our tailwind class roughly
    dagreGraph.setNode(node.id, { width: 250, height: 80 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - 250 / 2,
      y: nodeWithPosition.y - 80 / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export default function LearningPath({ pathwayData = defaultPathway }) {
  // Convert API pathway output into ReactFlow format
  const initialNodes = useMemo(() => {
    return pathwayData.modules.map(mod => ({
      id: mod.id.toString(),
      type: 'roadmap',
      data: {
        title: mod.title,
        type: mod.type,
        difficulty: mod.difficulty,
        duration_hours: mod.duration_hours,
        status: mod.status || 'pending',
      },
      position: { x: 0, y: 0 } // handled by layout
    }));
  }, [pathwayData]);

  const initialEdges = useMemo(() => {
    const edges = [];
    pathwayData.modules.forEach(mod => {
      if (mod.dependencies && mod.dependencies.length > 0) {
        mod.dependencies.forEach(dep => {
          edges.push({
            id: `e${dep}-${mod.id}`,
            source: dep.toString(),
            target: mod.id.toString(),
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
    });
    return edges;
  }, [pathwayData]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges, 'TB'),
    [initialNodes, initialEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[800px] border-4 border-black rounded-xl bg-[#fafafa] shadow-[8px_8px_0_0_rgba(0,0,0,1)] inset-0 overflow-hidden">
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
import React from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCircle2, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RoadmapNodeProps {
  data: {
    difficulty?: string;
    status?: string;
    title?: string;
    duration_hours?: number;
    type?: string;
  };
}

export default function RoadmapNode({ data }: RoadmapNodeProps) {
  let bgColor = 'bg-[#ffe600]'; // default to roadmap yellow
  if (data.difficulty === 'beginner') bgColor = 'bg-green-300';
  else if (data.difficulty === 'advanced') bgColor = 'bg-red-300';
  
  if (data.status === 'completed') bgColor = 'bg-gray-200';

  return (
    <div 
      className={cn(
        "relative rounded-md border-2 border-black px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
        "flex min-w-[200px] flex-col items-center justify-center text-center font-bold font-sans transition-transform hover:-translate-y-1 hover:shadow-[4px_6px_0_0_rgba(0,0,0,1)]",
        bgColor
      )}
    >
      <Handle type="target" position={Position.Top} className="!w-0 !h-0 !border-none !bg-transparent" />
      
      {/* Status Check icon */}
      <div className="absolute -left-3 -top-3 bg-white rounded-full">
        {data.status === 'completed' ? (
          <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-100" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400 fill-white" />
        )}
      </div>

      <div className="text-sm sm:text-base leading-snug">{data.title || "Module Name"}</div>
      
      {data.duration_hours && (
        <span className="mt-1 block text-xs font-normal opacity-80">
          {data.duration_hours} hrs • {data.type}
        </span>
      )}

      <Handle type="source" position={Position.Bottom} className="!w-0 !h-0 !border-none !bg-transparent" />
    </div>
  );
}

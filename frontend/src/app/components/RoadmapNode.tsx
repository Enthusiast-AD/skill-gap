import React from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCircle2, Circle, Clock, Video, Code, BookOpen, HelpCircle, Layers } from 'lucide-react';
import { cn } from './ui/utils';

export interface RoadmapNodeData {
  id?: number | string;
  order?: number;
  title?: string;
  skill?: string;
  duration_hours?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | string;
  type?: string;
  status?: string;
  isCompleted?: boolean;
  isSelected?: boolean;
  onToggleComplete?: (order: number, e: React.MouseEvent) => void;
}

export interface RoadmapNodeProps {
  data: RoadmapNodeData;
  selected?: boolean;
}

export default function RoadmapNode({ data, selected }: RoadmapNodeProps) {
  const difficulty = data.difficulty?.toLowerCase() || 'beginner';
  const isCompleted = data.isCompleted || data.status === 'completed';

  const getTypeIcon = (type?: string) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('video')) return <Video className="w-3.5 h-3.5" />;
    if (t.includes('hands-on') || t.includes('project') || t.includes('code')) return <Code className="w-3.5 h-3.5" />;
    if (t.includes('reading') || t.includes('doc')) return <BookOpen className="w-3.5 h-3.5" />;
    if (t.includes('quiz') || t.includes('test')) return <HelpCircle className="w-3.5 h-3.5" />;
    return <Layers className="w-3.5 h-3.5" />;
  };

  const getDifficultyTheme = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return {
          badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500',
          borderHover: 'hover:border-emerald-500/50',
          glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        };
      case 'intermediate':
        return {
          badge: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
          dot: 'bg-sky-500',
          borderHover: 'hover:border-sky-500/50',
          glow: 'group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]',
        };
      case 'advanced':
        return {
          badge: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
          dot: 'bg-violet-500',
          borderHover: 'hover:border-violet-500/50',
          glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
        };
      default:
        return {
          badge: 'bg-muted text-muted-foreground border-border',
          dot: 'bg-muted-foreground',
          borderHover: 'hover:border-primary/50',
          glow: 'group-hover:shadow-md',
        };
    }
  };

  const theme = getDifficultyTheme(difficulty);

  return (
    <div
      className={cn(
        "group relative min-w-[240px] max-w-[280px] rounded-2xl p-4 text-left transition-all duration-300",
        "backdrop-blur-xl bg-card/95 dark:bg-card/90 border shadow-md",
        isCompleted
          ? "border-emerald-500/50 bg-emerald-500/[0.04] dark:bg-emerald-950/20 shadow-emerald-500/10"
          : selected
            ? "border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/10 -translate-y-1"
            : "border-border/70 hover:border-primary/60 hover:-translate-y-1 hover:shadow-xl",
        theme.glow
      )}
    >
      {/* ReactFlow Target Connection Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !-top-1.5 !bg-primary/80 !border-2 !border-background rounded-full transition-transform group-hover:scale-125"
      />

      {/* Header Row: Order Badge & Status */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold bg-primary/10 text-primary dark:bg-primary/20">
            {data.order || 1}
          </span>
          <span className={cn(
            "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1",
            theme.badge
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", theme.dot)} />
            {difficulty}
          </span>
        </div>

        {/* Completion Checkmark */}
        <button
          type="button"
          onClick={(e) => data.onToggleComplete?.(data.order || 1, e)}
          className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-transform active:scale-90"
          title={isCompleted ? "Mark as in-progress" : "Mark as completed"}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-primary transition-colors" />
          )}
        </button>
      </div>

      {/* Title */}
      <h4 className={cn(
        "text-sm font-bold tracking-tight text-foreground line-clamp-2 leading-snug mb-2 transition-colors",
        isCompleted && "line-through text-muted-foreground"
      )}>
        {data.title || "Module Step"}
      </h4>

      {/* Skill addressed */}
      {data.skill && (
        <div className="text-[11px] font-medium text-muted-foreground truncate mb-3">
          Addresses: <span className="text-foreground font-semibold">{data.skill}</span>
        </div>
      )}

      {/* Footer Info: Duration & Type */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
        <span className="flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3 text-muted-foreground/70" />
          {data.duration_hours || 2}h
        </span>
        <span className="flex items-center gap-1 capitalize font-medium px-2 py-0.5 rounded-md bg-muted/60 dark:bg-muted/40">
          {getTypeIcon(data.type)}
          {data.type || "Lesson"}
        </span>
      </div>

      {/* ReactFlow Source Connection Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !-bottom-1.5 !bg-primary/80 !border-2 !border-background rounded-full transition-transform group-hover:scale-125"
      />
    </div>
  );
}

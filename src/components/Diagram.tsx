'use client';

import { Diagram as DiagramType } from '@/lib/types';
import { diagrams } from '@/lib/chapters';

interface DiagramProps {
  diagramId: string;
}

export default function Diagram({ diagramId }: DiagramProps) {
  const diagram = diagrams.find(d => d.id === diagramId);
  
  if (!diagram) {
    return null;
  }

  return (
    <div className="my-6 bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 bg-[#16162a] border-b border-slate-700 flex items-center justify-between">
        <h4 className="text-sm font-medium text-white">{diagram.title}</h4>
        <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-800 rounded">
          {diagram.type}
        </span>
      </div>
      <div className="p-4 flex justify-center bg-[#1e1e2e]">
        <div
          className="w-full max-w-3xl"
          dangerouslySetInnerHTML={{ __html: diagram.svg }}
        />
      </div>
      {diagram.caption && (
        <div className="px-4 py-2 bg-[#16162a] border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">{diagram.caption}</p>
        </div>
      )}
    </div>
  );
}

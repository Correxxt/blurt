import { useState } from 'react';

interface NoteCardProps {
  intensity: 'off' | 'gentle' | 'full';
  text: string;
  x: number;
  y: number;
  onDragStart: () => void;
  onDrag: (x: number, y: number) => void;
}

export function NoteCard({ intensity, text, x, y, onDragStart, onDrag }: NoteCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Generate slight random rotation for "full" intensity
  const rotation = intensity === 'full' ? (Math.random() - 0.5) * 4 : 0;

  return (
    <div
      className={`absolute cursor-move transition-all ${
        isDragging ? 'z-50 scale-105' : 'z-10'
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: intensity === 'full' ? `rotate(${rotation}deg)` : 'none',
      }}
      onMouseDown={() => {
        setIsDragging(true);
        onDragStart();
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div className={`p-4 rounded-lg max-w-xs ${
        intensity === 'full'
          ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-l-4 border-amber-400 shadow-2xl'
          : intensity === 'gentle'
          ? 'bg-neutral-700 border border-neutral-600 shadow-lg'
          : 'bg-neutral-800/90 border border-neutral-700/60 shadow-md'
      }`}>
        {/* Top edge highlight (Full only) */}
        {intensity === 'full' && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}
        
        <p className={`text-sm leading-relaxed ${
          intensity === 'full'
            ? 'text-neutral-900 font-medium'
            : intensity === 'gentle'
            ? 'text-neutral-100'
            : 'text-neutral-300'
        }`}>
          {text}
        </p>
        
        {/* Tape effect for Full intensity */}
        {intensity === 'full' && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border-l border-r border-white/30 shadow-sm" 
            style={{ transform: 'translateX(-50%) rotate(-1deg)' }}
          />
        )}
        
        {/* Shadow accent for Full */}
        {intensity === 'full' && (
          <div className="absolute inset-0 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] pointer-events-none" />
        )}
      </div>
    </div>
  );
}

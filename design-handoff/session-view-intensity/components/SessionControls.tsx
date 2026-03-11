import { Pause, StopCircle, Image, Download } from 'lucide-react';

interface SessionControlsProps {
  intensity: 'off' | 'gentle' | 'full';
}

export function SessionControls({ intensity }: SessionControlsProps) {
  return (
    <div className={`px-8 py-4 border-b ${
      intensity === 'full'
        ? 'border-white/5'
        : intensity === 'gentle'
        ? 'border-neutral-700/30'
        : 'border-neutral-800/50'
    }`}>
      <div className="flex items-center gap-3">
        {/* Pause */}
        <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
          intensity === 'full'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
            : intensity === 'gentle'
            ? 'bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700'
            : 'bg-neutral-800/70 text-neutral-300 border border-neutral-700/50 hover:bg-neutral-700/70'
        }`}>
          <Pause className="w-4 h-4" />
          Pause
        </button>
        
        {/* Stop Early */}
        <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
          intensity === 'full'
            ? 'bg-neutral-800/70 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            : intensity === 'gentle'
            ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
            : 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50 hover:bg-neutral-700/50'
        }`}>
          <StopCircle className="w-4 h-4" />
          Stop Early
        </button>
        
        <div className="w-px h-6 bg-neutral-700/50 mx-2" />
        
        {/* Export View PNG */}
        <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
          intensity === 'full'
            ? 'bg-neutral-800/70 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            : intensity === 'gentle'
            ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
            : 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50 hover:bg-neutral-700/50'
        }`}>
          <Image className="w-4 h-4" />
          Export View PNG
        </button>
        
        {/* Export Full PNG */}
        <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
          intensity === 'full'
            ? 'bg-neutral-800/70 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            : intensity === 'gentle'
            ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
            : 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50 hover:bg-neutral-700/50'
        }`}>
          <Download className="w-4 h-4" />
          Export Full PNG
        </button>
      </div>
    </div>
  );
}

import { Timer } from 'lucide-react';

interface SessionHeaderProps {
  intensity: 'off' | 'gentle' | 'full';
  title: string;
  timeRemaining: string;
}

export function SessionHeader({ intensity, title, timeRemaining }: SessionHeaderProps) {
  return (
    <div className={`flex items-center justify-between px-8 py-6 border-b ${
      intensity === 'full'
        ? 'border-white/10 bg-neutral-900/50 backdrop-blur-sm'
        : intensity === 'gentle'
        ? 'border-neutral-700/50 bg-neutral-900/30'
        : 'border-neutral-800'
    }`}>
      {/* Session Title */}
      <div>
        <h1 className={`text-2xl font-bold ${
          intensity === 'full'
            ? 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'
            : intensity === 'gentle'
            ? 'text-white'
            : 'text-neutral-200'
        }`}>
          {title}
        </h1>
        {intensity !== 'off' && (
          <p className="text-sm text-neutral-500 mt-1">Active session in progress</p>
        )}
      </div>
      
      {/* Timer */}
      <div className={`flex items-center gap-3 px-6 py-3 rounded-xl ${
        intensity === 'full'
          ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-700/50 shadow-lg shadow-purple-900/20'
          : intensity === 'gentle'
          ? 'bg-neutral-800 border border-neutral-700'
          : 'bg-neutral-800/50 border border-neutral-700/50'
      }`}>
        <Timer className={`w-5 h-5 ${
          intensity === 'full'
            ? 'text-purple-400'
            : intensity === 'gentle'
            ? 'text-neutral-400'
            : 'text-neutral-500'
        }`} />
        <span className={`text-3xl font-mono font-bold tabular-nums ${
          intensity === 'full'
            ? 'text-white'
            : intensity === 'gentle'
            ? 'text-white'
            : 'text-neutral-300'
        }`}>
          {timeRemaining}
        </span>
      </div>
    </div>
  );
}

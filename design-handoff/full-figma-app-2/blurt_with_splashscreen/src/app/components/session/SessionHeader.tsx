import { Pause, Play, StopCircle, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

interface SessionHeaderProps {
  title: string;
  timeLeft: string;
  isPaused: boolean;
  isCompleted: boolean;
  onPauseResume: () => void;
  onStopEarly: () => void;
  onExportView: () => void;
  onExportFull: () => void;
}

export function SessionHeader({
  title,
  timeLeft,
  isPaused,
  isCompleted,
  onPauseResume,
  onStopEarly,
  onExportView,
  onExportFull,
}: SessionHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 px-8 py-6">
      {/* Top Row: Back + Title + Timer */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        </div>
        
        <div className={`text-5xl font-bold tabular-nums ${
          isCompleted 
            ? 'text-neutral-400' 
            : isPaused 
            ? 'text-yellow-600' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
        }`}>
          {timeLeft}
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center gap-3">
        {!isCompleted && (
          <>
            <button
              onClick={onPauseResume}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium transition-all flex items-center gap-2 active:scale-95"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              )}
            </button>
            
            <button
              onClick={onStopEarly}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-medium transition-all flex items-center gap-2 active:scale-95"
            >
              <StopCircle className="w-4 h-4" />
              Stop Early
            </button>
          </>
        )}
        
        <div className="flex-1" />
        
        <button
          onClick={onExportView}
          className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg font-medium transition-all flex items-center gap-2 active:scale-95"
        >
          <Download className="w-4 h-4" />
          Export View PNG
        </button>
        
        <button
          onClick={onExportFull}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white rounded-lg font-medium transition-all flex items-center gap-2 active:scale-95"
        >
          <Download className="w-4 h-4" />
          Export Full PNG
        </button>
      </div>
    </header>
  );
}

import { Clock, FileText, BookOpen } from 'lucide-react';

interface SessionSummaryProps {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
  duration: string;
  noteCount: number;
  subject: string;
}

export function SessionSummary({ intensity, theme, duration, noteCount, subject }: SessionSummaryProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-2xl p-8 border ${
      intensity === 'full'
        ? isDark
          ? 'bg-gradient-to-br from-purple-950/40 to-blue-950/40 border-purple-800/50 shadow-2xl'
          : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-xl'
        : intensity === 'gentle'
        ? isDark
          ? 'bg-neutral-800/50 border-neutral-700 shadow-lg backdrop-blur-sm'
          : 'bg-white border-neutral-200 shadow-lg'
        : isDark
        ? 'bg-neutral-800 border-neutral-700'
        : 'bg-white border-neutral-200'
    }`}>
      <div className="grid grid-cols-3 gap-6 text-center">
        {/* Duration */}
        <div>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
            intensity === 'full'
              ? isDark
                ? 'bg-purple-900/50'
                : 'bg-purple-100'
              : intensity === 'gentle'
              ? isDark
                ? 'bg-neutral-700'
                : 'bg-neutral-50'
              : isDark
              ? 'bg-neutral-700'
              : 'bg-neutral-100'
          }`}>
            <Clock className={`w-5 h-5 ${
              intensity === 'full'
                ? isDark
                  ? 'text-purple-400'
                  : 'text-purple-600'
                : isDark
                ? 'text-neutral-400'
                : 'text-neutral-600'
            }`} />
          </div>
          <div className={`text-2xl font-bold mb-1 ${
            intensity === 'full'
              ? isDark
                ? 'text-purple-300'
                : 'text-purple-700'
              : isDark
              ? 'text-white'
              : 'text-neutral-900'
          }`}>
            {duration}
          </div>
          <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Duration
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
            intensity === 'full'
              ? isDark
                ? 'bg-blue-900/50'
                : 'bg-blue-100'
              : intensity === 'gentle'
              ? isDark
                ? 'bg-neutral-700'
                : 'bg-neutral-50'
              : isDark
              ? 'bg-neutral-700'
              : 'bg-neutral-100'
          }`}>
            <FileText className={`w-5 h-5 ${
              intensity === 'full'
                ? isDark
                  ? 'text-blue-400'
                  : 'text-blue-600'
                : isDark
                ? 'text-neutral-400'
                : 'text-neutral-600'
            }`} />
          </div>
          <div className={`text-2xl font-bold mb-1 ${
            intensity === 'full'
              ? isDark
                ? 'text-blue-300'
                : 'text-blue-700'
              : isDark
              ? 'text-white'
              : 'text-neutral-900'
          }`}>
            {noteCount}
          </div>
          <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Notes
          </div>
        </div>
        
        {/* Subject */}
        <div>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
            intensity === 'full'
              ? isDark
                ? 'bg-purple-900/50'
                : 'bg-purple-100'
              : intensity === 'gentle'
              ? isDark
                ? 'bg-neutral-700'
                : 'bg-neutral-50'
              : isDark
              ? 'bg-neutral-700'
              : 'bg-neutral-100'
          }`}>
            <BookOpen className={`w-5 h-5 ${
              intensity === 'full'
                ? isDark
                  ? 'text-purple-400'
                  : 'text-purple-600'
                : isDark
                ? 'text-neutral-400'
                : 'text-neutral-600'
            }`} />
          </div>
          <div className={`text-lg font-semibold mb-1 truncate ${
            intensity === 'full'
              ? isDark
                ? 'text-purple-300'
                : 'text-purple-700'
              : isDark
              ? 'text-white'
              : 'text-neutral-900'
          }`}>
            {subject}
          </div>
          <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Subject
          </div>
        </div>
      </div>

      {/* Motion note comment */}
      {/* 
        MOTION NOTES:
        - Off: Static
        - Gentle: Stats fade in sequentially with slight delay
        - Full: Stats scale-in sequentially with bounce easing
      */}
    </div>
  );
}

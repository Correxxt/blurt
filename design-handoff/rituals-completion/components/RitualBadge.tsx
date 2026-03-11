import { Sparkles } from 'lucide-react';

interface RitualBadgeProps {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
}

export function RitualBadge({ intensity, theme }: RitualBadgeProps) {
  const isDark = theme === 'dark';
  
  if (intensity !== 'full') return null;
  
  return (
    <div className="flex justify-center mb-4">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
        isDark
          ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700 shadow-lg shadow-purple-900/50'
          : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300 shadow-lg shadow-purple-500/20'
      }`}>
        <Sparkles className={`w-4 h-4 ${
          isDark ? 'text-purple-400' : 'text-purple-600'
        }`} />
        <span className={`text-sm font-semibold ${
          isDark ? 'text-purple-300' : 'text-purple-700'
        }`}>
          Session complete
        </span>
      </div>

      {/* Motion note comment */}
      {/* 
        MOTION NOTES:
        - Full: Badge fades in from top with slight bounce, sparkle icon gentle rotate
      */}
    </div>
  );
}

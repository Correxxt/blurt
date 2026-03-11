import { Sparkles } from 'lucide-react';

type Props = {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
  reducedMotion?: boolean;
};

export const RitualBadge = ({ intensity, theme, reducedMotion = false }: Props) => {
  const isDark = theme === 'dark';

  if (intensity !== 'full') {
    return null;
  }

  return (
    <div className="mb-4 flex justify-center">
      <div
        className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 ${
          isDark
            ? 'border-purple-700 bg-gradient-to-r from-purple-900/30 to-blue-900/30 shadow-lg shadow-purple-900/50'
            : 'border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg shadow-purple-500/20'
        } ${!reducedMotion ? 'ritual-badge-enter' : ''}`}
      >
        <Sparkles className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        <span className={`text-sm font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Session complete</span>
      </div>
    </div>
  );
};

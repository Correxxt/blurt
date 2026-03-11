import { CheckCircle, Sparkles } from 'lucide-react';

type Props = {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
  title: string;
  subtitle: string;
  reducedMotion?: boolean;
};

export const CompletionHero = ({ intensity, theme, title, subtitle, reducedMotion = false }: Props) => {
  const isDark = theme === 'dark';
  const iconSize = intensity === 'full' ? 'h-16 w-16' : intensity === 'gentle' ? 'h-14 w-14' : 'h-12 w-12';

  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <div
          className={`flex items-center justify-center rounded-full ${
            intensity === 'full'
              ? isDark
                ? 'bg-gradient-to-br from-purple-900 to-blue-900 p-5 shadow-2xl shadow-purple-900/50'
                : 'bg-gradient-to-br from-purple-500 to-blue-500 p-5 shadow-2xl shadow-purple-500/30'
              : intensity === 'gentle'
                ? isDark
                  ? 'bg-gradient-to-br from-purple-900/70 to-blue-900/70 p-4 shadow-xl shadow-purple-900/30'
                  : 'bg-gradient-to-br from-purple-100 to-blue-100 p-4 shadow-lg'
                : isDark
                  ? 'bg-neutral-800 p-4'
                  : 'border-2 border-neutral-200 bg-white p-4'
          } ${!reducedMotion && intensity === 'gentle' ? 'ritual-pulse' : ''} ${!reducedMotion && intensity === 'full' ? 'ritual-rotate-glow' : ''}`}
        >
          {intensity === 'full' ? (
            <Sparkles className={`${iconSize} text-white`} />
          ) : (
            <CheckCircle
              className={`${iconSize} ${
                intensity === 'gentle'
                  ? isDark
                    ? 'text-purple-300'
                    : 'text-purple-600'
                  : isDark
                    ? 'text-neutral-300'
                    : 'text-neutral-700'
              }`}
            />
          )}
        </div>
      </div>

      <h1
        className={`mb-3 text-3xl font-bold ${
          intensity === 'full'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
            : isDark
              ? 'text-white'
              : 'text-neutral-900'
        } ${!reducedMotion && intensity !== 'off' ? 'ritual-fade-up' : ''}`}
      >
        {title}
      </h1>
      <p className={`text-lg ${intensity === 'full' ? (isDark ? 'text-purple-300' : 'text-purple-700') : intensity === 'gentle' ? (isDark ? 'text-neutral-300' : 'text-neutral-600') : isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
        {subtitle}
      </p>
    </div>
  );
};

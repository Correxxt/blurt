import { CheckCircle, Sparkles } from 'lucide-react';

interface CompletionHeroProps {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
  title: string;
  subtitle: string;
}

export function CompletionHero({ intensity, theme, title, subtitle }: CompletionHeroProps) {
  const isDark = theme === 'dark';
  
  const iconSize = intensity === 'full' ? 'w-16 h-16' : intensity === 'gentle' ? 'w-14 h-14' : 'w-12 h-12';
  
  return (
    <div className="text-center">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className={`rounded-full flex items-center justify-center ${
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
            : 'bg-white p-4 border-2 border-neutral-200'
        }`}>
          {intensity === 'full' ? (
            <Sparkles className={`${iconSize} text-white`} />
          ) : (
            <CheckCircle className={`${iconSize} ${
              intensity === 'gentle'
                ? isDark
                  ? 'text-purple-300'
                  : 'text-purple-600'
                : isDark
                ? 'text-neutral-300'
                : 'text-neutral-700'
            }`} />
          )}
        </div>
      </div>
      
      {/* Title */}
      <h1 className={`text-3xl font-bold mb-3 ${
        intensity === 'full'
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
          : isDark
          ? 'text-white'
          : 'text-neutral-900'
      }`}>
        {title}
      </h1>
      
      {/* Subtitle */}
      <p className={`text-lg ${
        intensity === 'full'
          ? isDark
            ? 'text-purple-300'
            : 'text-purple-700'
          : intensity === 'gentle'
          ? isDark
            ? 'text-neutral-400'
            : 'text-neutral-600'
          : isDark
          ? 'text-neutral-500'
          : 'text-neutral-600'
      }`}>
        {subtitle}
      </p>

      {/* Motion note comment */}
      {/* 
        MOTION NOTES:
        - Off: Static, no animation
        - Gentle: Soft pulse on icon (subtle scale 1.0 to 1.05), gentle fade-in
        - Full: Icon gentle rotation + glow pulse, title fade-in with slight scale
      */}
    </div>
  );
}

interface CelebrationBackgroundProps {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
}

export function CelebrationBackground({ intensity, theme }: CelebrationBackgroundProps) {
  const isDark = theme === 'dark';
  
  if (intensity === 'off') return null;
  
  return (
    <>
      {/* Gradient orbs */}
      <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl ${
        intensity === 'full'
          ? isDark
            ? 'bg-purple-900/30'
            : 'bg-purple-300/20'
          : isDark
          ? 'bg-purple-900/10'
          : 'bg-purple-200/10'
      }`} />
      
      <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${
        intensity === 'full'
          ? isDark
            ? 'bg-blue-900/30'
            : 'bg-blue-300/20'
          : isDark
          ? 'bg-blue-900/10'
          : 'bg-blue-200/10'
      }`} />
      
      {intensity === 'full' && (
        <>
          <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-purple-800/20' : 'bg-purple-400/15'
          }`} />
          
          <div className={`absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl ${
            isDark ? 'bg-blue-800/20' : 'bg-blue-400/15'
          }`} />
        </>
      )}

      {/* Motion note comment */}
      {/* 
        MOTION NOTES:
        - Gentle: Soft pulse on orbs (opacity 0.8 to 1.0, 4s duration)
        - Full: Gentle drift + pulse on all orbs, slightly faster (3s duration)
      */}
    </>
  );
}

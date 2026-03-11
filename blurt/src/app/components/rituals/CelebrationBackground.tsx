type Props = {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
  reducedMotion?: boolean;
};

export const CelebrationBackground = ({ intensity, theme, reducedMotion = false }: Props) => {
  const isDark = theme === 'dark';

  if (intensity === 'off') {
    return null;
  }

  return (
    <>
      <div
        className={`absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl ${
          intensity === 'full'
            ? isDark
              ? 'bg-purple-900/30'
              : 'bg-purple-300/20'
            : isDark
              ? 'bg-purple-900/10'
              : 'bg-purple-200/10'
        } ${!reducedMotion ? 'ritual-orb ritual-orb--slow' : ''}`}
      />
      <div
        className={`absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl ${
          intensity === 'full'
            ? isDark
              ? 'bg-blue-900/30'
              : 'bg-blue-300/20'
            : isDark
              ? 'bg-blue-900/10'
              : 'bg-blue-200/10'
        } ${!reducedMotion ? 'ritual-orb ritual-orb--offset' : ''}`}
      />
      {intensity === 'full' ? (
        <>
          <div
            className={`absolute right-1/4 top-1/3 h-64 w-64 rounded-full blur-3xl ${
              isDark ? 'bg-purple-800/20' : 'bg-purple-400/15'
            } ${!reducedMotion ? 'ritual-orb ritual-orb--medium' : ''}`}
          />
          <div
            className={`absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full blur-3xl ${
              isDark ? 'bg-blue-800/20' : 'bg-blue-400/15'
            } ${!reducedMotion ? 'ritual-orb ritual-orb--offset' : ''}`}
          />
        </>
      ) : null}
    </>
  );
};

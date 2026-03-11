import { ToggleRow } from '../ToggleRow';

interface SoundSectionProps {
  theme: 'light' | 'dark';
  sessionSounds: boolean;
  onSessionSoundsChange: (value: boolean) => void;
  startupChime: boolean;
  onStartupChimeChange: (value: boolean) => void;
}

export function SoundSection({
  theme,
  sessionSounds,
  onSessionSoundsChange,
  startupChime,
  onStartupChimeChange,
}: SoundSectionProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-xl p-6 border ${
      isDark 
        ? 'bg-neutral-800/50 border-neutral-700' 
        : 'bg-white border-neutral-200'
    }`}>
      <h2 className={`text-lg font-semibold mb-1 ${
        isDark ? 'text-white' : 'text-neutral-900'
      }`}>
        Sound
      </h2>
      <p className={`text-sm mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        Control audio feedback
      </p>
      
      <div className="space-y-1">
        <ToggleRow
          label="Session sounds"
          description="Note entry and timer alerts"
          checked={sessionSounds}
          onChange={onSessionSoundsChange}
          theme={theme}
        />
        <ToggleRow
          label="Startup chime"
          description="Plays when app launches"
          checked={startupChime}
          onChange={onStartupChimeChange}
          theme={theme}
        />
      </div>
    </div>
  );
}

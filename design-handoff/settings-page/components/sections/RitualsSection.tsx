import { SegmentedControl } from '../SegmentedControl';
import { ToggleRow } from '../ToggleRow';
import { Sparkles } from 'lucide-react';

interface RitualsSectionProps {
  theme: 'light' | 'dark';
  celebrationIntensity: 'off' | 'gentle' | 'full';
  onCelebrationIntensityChange: (value: 'off' | 'gentle' | 'full') => void;
  encouragementMode: boolean;
  onEncouragementModeChange: (value: boolean) => void;
  focusAmbience: boolean;
  onFocusAmbienceChange: (value: boolean) => void;
}

export function RitualsSection({
  theme,
  celebrationIntensity,
  onCelebrationIntensityChange,
  encouragementMode,
  onEncouragementModeChange,
  focusAmbience,
  onFocusAmbienceChange,
}: RitualsSectionProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-xl p-6 border-2 ${
      isDark 
        ? 'bg-gradient-to-br from-purple-950/30 to-blue-950/30 border-purple-800/50' 
        : 'bg-gradient-to-br from-purple-50/50 to-blue-50/50 border-purple-200'
    }`}>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className={`w-5 h-5 ${
          isDark ? 'text-purple-400' : 'text-purple-600'
        }`} />
        <h2 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}>
          Rituals
        </h2>
      </div>
      <p className={`text-sm mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        Small moments that make studying feel special
      </p>
      
      <div className="space-y-4">
        <div>
          <label className={`text-sm font-medium mb-2 block ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Celebration intensity
          </label>
          <SegmentedControl
            options={[
              { value: 'off' as const, label: 'Off' },
              { value: 'gentle' as const, label: 'Gentle' },
              { value: 'full' as const, label: 'Full' },
            ]}
            value={celebrationIntensity}
            onChange={onCelebrationIntensityChange}
            theme={theme}
          />
        </div>
        
        <div className="space-y-1 pt-2">
          <ToggleRow
            label="Encouragement mode"
            description="Occasional supportive messages"
            checked={encouragementMode}
            onChange={onEncouragementModeChange}
            theme={theme}
          />
          <ToggleRow
            label="Focus ambience"
            description="Subtle background atmosphere"
            checked={focusAmbience}
            onChange={onFocusAmbienceChange}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

import { SegmentedControl } from '../SegmentedControl';
import { ToggleRow } from '../ToggleRow';

interface AccessibilitySectionProps {
  theme: 'light' | 'dark';
  motionMode: 'system' | 'reduce' | 'full';
  onMotionModeChange: (value: 'system' | 'reduce' | 'full') => void;
  highContrast: boolean;
  onHighContrastChange: (value: boolean) => void;
  largeText: boolean;
  onLargeTextChange: (value: boolean) => void;
}

export function AccessibilitySection({
  theme,
  motionMode,
  onMotionModeChange,
  highContrast,
  onHighContrastChange,
  largeText,
  onLargeTextChange,
}: AccessibilitySectionProps) {
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
        Accessibility
      </h2>
      <p className={`text-sm mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        Adjust for comfort and clarity
      </p>
      
      <div className="space-y-4">
        <div>
          <label className={`text-sm font-medium mb-2 block ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Motion
          </label>
          <SegmentedControl
            options={[
              { value: 'system' as const, label: 'System' },
              { value: 'reduce' as const, label: 'Reduce' },
              { value: 'full' as const, label: 'Full' },
            ]}
            value={motionMode}
            onChange={onMotionModeChange}
            theme={theme}
          />
        </div>
        
        <div className="space-y-1 pt-2">
          <ToggleRow
            label="High contrast"
            checked={highContrast}
            onChange={onHighContrastChange}
            theme={theme}
          />
          <ToggleRow
            label="Large text"
            checked={largeText}
            onChange={onLargeTextChange}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

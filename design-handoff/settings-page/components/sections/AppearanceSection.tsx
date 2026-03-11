import { ThemeCard } from '../ThemeCard';

interface AppearanceSectionProps {
  theme: 'light' | 'dark';
  value: 'system' | 'light' | 'dark';
  onChange: (value: 'system' | 'light' | 'dark') => void;
}

export function AppearanceSection({ theme, value, onChange }: AppearanceSectionProps) {
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
        Appearance
      </h2>
      <p className={`text-sm mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        Choose how Blurt looks on your device
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        <ThemeCard
          mode="system"
          selected={value === 'system'}
          onClick={() => onChange('system')}
          theme={theme}
        />
        <ThemeCard
          mode="light"
          selected={value === 'light'}
          onClick={() => onChange('light')}
          theme={theme}
        />
        <ThemeCard
          mode="dark"
          selected={value === 'dark'}
          onClick={() => onChange('dark')}
          theme={theme}
        />
      </div>
    </div>
  );
}

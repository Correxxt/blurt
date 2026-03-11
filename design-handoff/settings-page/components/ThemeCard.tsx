import { Monitor, Sun, Moon } from 'lucide-react';

interface ThemeCardProps {
  mode: 'system' | 'light' | 'dark';
  selected: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
}

export function ThemeCard({ mode, selected, onClick, theme }: ThemeCardProps) {
  const isDark = theme === 'dark';
  
  const icons = {
    system: Monitor,
    light: Sun,
    dark: Moon,
  };
  
  const labels = {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
  };
  
  const Icon = icons[mode];
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
        selected
          ? isDark
            ? 'border-purple-500 bg-gradient-to-br from-purple-900/30 to-blue-900/30 shadow-lg'
            : 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
          : isDark
          ? 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
      }`}
    >
      {/* Preview */}
      <div className={`w-full aspect-video rounded-lg flex items-center justify-center ${
        mode === 'dark'
          ? 'bg-neutral-900'
          : mode === 'light'
          ? 'bg-white border border-neutral-200'
          : isDark
          ? 'bg-gradient-to-br from-neutral-800 to-neutral-700'
          : 'bg-gradient-to-br from-neutral-100 to-neutral-200'
      }`}>
        <Icon className={`w-6 h-6 ${
          mode === 'dark'
            ? 'text-neutral-400'
            : mode === 'light'
            ? 'text-neutral-600'
            : isDark
            ? 'text-neutral-500'
            : 'text-neutral-500'
        }`} />
      </div>
      
      {/* Label */}
      <span className={`text-sm font-medium ${
        selected
          ? isDark
            ? 'text-purple-300'
            : 'text-purple-700'
          : isDark
          ? 'text-neutral-300'
          : 'text-neutral-700'
      }`}>
        {labels[mode]}
      </span>
    </button>
  );
}

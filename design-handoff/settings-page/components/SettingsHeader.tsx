import { Settings } from 'lucide-react';

interface SettingsHeaderProps {
  theme: 'light' | 'dark';
}

export function SettingsHeader({ theme }: SettingsHeaderProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isDark 
            ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50' 
            : 'bg-gradient-to-br from-purple-50 to-blue-50'
        }`}>
          <Settings className={`w-5 h-5 ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </div>
        <h1 className={`text-3xl font-bold ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}>
          Settings
        </h1>
      </div>
      <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        Customize your Blurt experience
      </p>
    </div>
  );
}

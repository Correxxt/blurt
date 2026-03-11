import { Info } from 'lucide-react';

interface AppInfoCardProps {
  theme: 'light' | 'dark';
}

export function AppInfoCard({ theme }: AppInfoCardProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-xl p-6 border ${
      isDark 
        ? 'bg-neutral-800/50 border-neutral-700' 
        : 'bg-white border-neutral-200'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Info className={`w-4 h-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
        <h3 className={`text-sm font-semibold ${
          isDark ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          About this app
        </h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Version</span>
          <span className={`font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-900'}`}>
            1.0.0
          </span>
        </div>
        <div className="flex justify-between">
          <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Storage mode</span>
          <span className={`font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-900'}`}>
            Local
          </span>
        </div>
      </div>
    </div>
  );
}

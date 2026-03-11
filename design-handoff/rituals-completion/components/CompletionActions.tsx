import { Download, Home, Share2 } from 'lucide-react';

interface CompletionActionsProps {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
}

export function CompletionActions({ intensity, theme }: CompletionActionsProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Export Button */}
      <button className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${
        intensity === 'full'
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
          : intensity === 'gentle'
          ? isDark
            ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-purple-300 border border-purple-800 hover:bg-purple-900/70'
            : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
          : isDark
          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
      }`}>
        <Download className="w-5 h-5" />
        Export notes
      </button>
      
      {/* Share Button */}
      <button className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${
        isDark
          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
      }`}>
        <Share2 className="w-5 h-5" />
        Share
      </button>
      
      {/* Home Button */}
      <button className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${
        isDark
          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
      }`}>
        <Home className="w-5 h-5" />
        Home
      </button>
    </div>
  );
}

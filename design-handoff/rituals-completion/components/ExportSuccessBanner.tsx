import { CheckCircle, Download, Sparkles, X } from 'lucide-react';

interface ExportSuccessBannerProps {
  intensity: 'off' | 'gentle' | 'full';
}

export function ExportSuccessBanner({ intensity }: ExportSuccessBannerProps) {
  return (
    <div className={`rounded-xl p-4 flex items-center gap-4 shadow-lg border ${
      intensity === 'full'
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-purple-500/30'
        : intensity === 'gentle'
        ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
        : 'bg-white border-neutral-200'
    }`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        intensity === 'full'
          ? 'bg-white/20'
          : intensity === 'gentle'
          ? 'bg-purple-100'
          : 'bg-neutral-100'
      }`}>
        {intensity === 'full' ? (
          <Sparkles className="w-5 h-5 text-white" />
        ) : (
          <CheckCircle className={`w-5 h-5 ${
            intensity === 'gentle' ? 'text-purple-600' : 'text-neutral-600'
          }`} />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div className={`font-semibold ${
          intensity === 'full'
            ? 'text-white'
            : intensity === 'gentle'
            ? 'text-purple-900'
            : 'text-neutral-900'
        }`}>
          {intensity === 'full' 
            ? 'Notes exported successfully'
            : intensity === 'gentle'
            ? 'Exported successfully'
            : 'Export complete'
          }
        </div>
        <div className={`text-sm ${
          intensity === 'full'
            ? 'text-white/80'
            : intensity === 'gentle'
            ? 'text-purple-700'
            : 'text-neutral-600'
        }`}>
          {intensity === 'full' 
            ? 'Your work is saved and ready to share.'
            : 'Saved to your documents'
          }
        </div>
      </div>
      
      {/* Action */}
      <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
        intensity === 'full'
          ? 'bg-white/20 text-white hover:bg-white/30'
          : intensity === 'gentle'
          ? 'bg-purple-600 text-white hover:bg-purple-700'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
      }`}>
        <Download className="w-4 h-4" />
      </button>
      
      {/* Close */}
      <button className={`p-2 rounded-lg transition-all ${
        intensity === 'full'
          ? 'text-white/60 hover:text-white hover:bg-white/10'
          : intensity === 'gentle'
          ? 'text-purple-600 hover:bg-purple-100'
          : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
      }`}>
        <X className="w-5 h-5" />
      </button>

      {/* Motion note comment */}
      {/* 
        MOTION NOTES:
        - Off: Slide in from top, no extra animation
        - Gentle: Slide in + soft glow pulse
        - Full: Slide in + glow pulse + subtle scale on icon
      */}
    </div>
  );
}

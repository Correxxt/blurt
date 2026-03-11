import { CheckCircle, Download, Sparkles, X } from 'lucide-react';

type Props = {
  intensity: 'off' | 'gentle' | 'full';
  title: string;
  message: string;
  onDismiss: () => void;
  reducedMotion?: boolean;
};

export const ExportSuccessBanner = ({ intensity, title, message, onDismiss, reducedMotion = false }: Props) => {
  return (
    <div
      className={`rounded-xl border p-4 shadow-lg ${
        intensity === 'full'
          ? `border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 shadow-purple-500/30 ${!reducedMotion ? 'ritual-banner-pop' : ''}`
          : intensity === 'gentle'
            ? `border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 ${!reducedMotion ? 'ritual-banner-slide' : ''}`
            : `border-neutral-200 bg-white ${!reducedMotion ? 'ritual-banner-slide' : ''}`
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          intensity === 'full' ? 'bg-white/20' : intensity === 'gentle' ? 'bg-purple-100' : 'bg-neutral-100'
        }`}>
          {intensity === 'full' ? (
            <Sparkles className={`h-5 w-5 text-white ${!reducedMotion ? 'ritual-pulse' : ''}`} />
          ) : (
            <CheckCircle className={`h-5 w-5 ${intensity === 'gentle' ? 'text-purple-600' : 'text-neutral-600'}`} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-semibold ${intensity === 'full' ? 'text-white' : intensity === 'gentle' ? 'text-purple-900' : 'text-neutral-900'}`}>{title}</div>
          <div className={`text-sm ${intensity === 'full' ? 'text-white/80' : intensity === 'gentle' ? 'text-purple-700' : 'text-neutral-600'}`}>{message}</div>
        </div>
        <button
          type="button"
          className={`rounded-lg px-3 py-2 transition-all ${
            intensity === 'full'
              ? 'bg-white/20 text-white hover:bg-white/30'
              : intensity === 'gentle'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
          aria-label="Download export"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className={`rounded-lg p-2 transition-all ${
            intensity === 'full'
              ? 'text-white/60 hover:bg-white/10 hover:text-white'
              : intensity === 'gentle'
                ? 'text-purple-600 hover:bg-purple-100'
                : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600'
          }`}
          aria-label="Dismiss export feedback"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

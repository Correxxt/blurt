import { BookOpen, Clock, FileText } from 'lucide-react';

type Props = {
  intensity: 'off' | 'gentle' | 'full';
  theme: 'light' | 'dark';
  duration: string;
  noteCount: number;
  subject: string;
  reducedMotion?: boolean;
};

export const SessionSummaryCard = ({ intensity, theme, duration, noteCount, subject, reducedMotion = false }: Props) => {
  const isDark = theme === 'dark';

  const iconShell = (tone: 'purple' | 'blue') =>
    intensity === 'full'
      ? isDark
        ? tone === 'purple'
          ? 'bg-purple-900/50'
          : 'bg-blue-900/50'
        : tone === 'purple'
          ? 'bg-purple-100'
          : 'bg-blue-100'
      : intensity === 'gentle'
        ? isDark
          ? 'bg-neutral-700'
          : 'bg-neutral-50'
        : isDark
          ? 'bg-neutral-700'
          : 'bg-neutral-100';

  const textTone = (tone: 'purple' | 'blue') =>
    intensity === 'full'
      ? isDark
        ? tone === 'purple'
          ? 'text-purple-300'
          : 'text-blue-300'
        : tone === 'purple'
          ? 'text-purple-700'
          : 'text-blue-700'
      : isDark
        ? 'text-white'
        : 'text-neutral-900';

  return (
    <div
      className={`rounded-2xl border p-8 ${
        intensity === 'full'
          ? isDark
            ? 'border-purple-800/50 bg-gradient-to-br from-purple-950/40 to-blue-950/40 shadow-2xl'
            : 'border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl'
          : intensity === 'gentle'
            ? isDark
              ? 'border-neutral-700 bg-neutral-800/50 shadow-lg backdrop-blur-sm'
              : 'border-neutral-200 bg-white shadow-lg'
            : isDark
              ? 'border-neutral-700 bg-neutral-800'
              : 'border-neutral-200 bg-white'
      } ${!reducedMotion && intensity !== 'off' ? 'ritual-fade-up' : ''}`}
    >
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className={!reducedMotion && intensity !== 'off' ? 'ritual-stagger ritual-stagger-1' : ''}>
          <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconShell('purple')}`}>
            <Clock className={`h-5 w-5 ${intensity === 'full' ? (isDark ? 'text-purple-400' : 'text-purple-600') : isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
          </div>
          <div className={`mb-1 text-2xl font-bold ${textTone('purple')}`}>{duration}</div>
          <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Duration</div>
        </div>
        <div className={!reducedMotion && intensity !== 'off' ? 'ritual-stagger ritual-stagger-2' : ''}>
          <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconShell('blue')}`}>
            <FileText className={`h-5 w-5 ${intensity === 'full' ? (isDark ? 'text-blue-400' : 'text-blue-600') : isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
          </div>
          <div className={`mb-1 text-2xl font-bold ${textTone('blue')}`}>{noteCount}</div>
          <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Notes</div>
        </div>
        <div className={!reducedMotion && intensity !== 'off' ? 'ritual-stagger ritual-stagger-3' : ''}>
          <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconShell('purple')}`}>
            <BookOpen className={`h-5 w-5 ${intensity === 'full' ? (isDark ? 'text-purple-400' : 'text-purple-600') : isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
          </div>
          <div className={`mb-1 truncate text-lg font-semibold ${textTone('purple')}`}>{subject}</div>
          <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Subject</div>
        </div>
      </div>
    </div>
  );
};

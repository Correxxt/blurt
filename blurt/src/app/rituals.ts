import { AppPreferences, CelebrationIntensity } from './preferences';

const SETTINGS_LINES = [
  'Keep the room quiet, keep the ideas loud.',
  'You do not need a perfect thought to catch a useful one.',
  'Small blurts still count as momentum.',
  'Make the app feel like a place you want to return to.',
];

const EMPTY_STATE_LINES = [
  'A quiet board is still an invitation.',
  'Start with one clumsy thought and let it open the room.',
  'You do not need momentum before you begin.',
];

const COMPLETION_LINES = [
  'You kept going long enough to leave a trail.',
  'The session is over. The useful part stays.',
  'What landed is worth keeping, even if it arrived messy.',
];

const EXPORT_LINES = [
  'Captured cleanly. Keep moving.',
  'Board exported. Nothing gets lost.',
  'Saved outside your head now.',
];

const hashSeed = (seed: string) =>
  Array.from(seed).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);

export const getEncouragementLine = (
  pool: 'settings' | 'empty' | 'completion' | 'export',
  seed: string,
  enabled: boolean,
  fallback: string
) => {
  if (!enabled) {
    return fallback;
  }

  const lines =
    pool === 'settings'
      ? SETTINGS_LINES
      : pool === 'empty'
        ? EMPTY_STATE_LINES
        : pool === 'completion'
          ? COMPLETION_LINES
          : EXPORT_LINES;

  return lines[hashSeed(seed) % lines.length];
};

export const getCelebrationTone = (intensity: CelebrationIntensity) => {
  if (intensity === 'off') {
    return {
      headline: 'Session complete',
      cardClass: 'border-neutral-200 bg-white',
      glowClass: '',
      badge: 'Clean finish',
    };
  }

  if (intensity === 'full') {
    return {
      headline: 'Session complete',
      cardClass: 'border-fuchsia-300 bg-gradient-to-br from-fuchsia-50 via-white to-blue-50',
      glowClass: 'shadow-[0_0_0_1px_rgba(216,180,254,0.5),0_24px_60px_rgba(124,58,237,0.18)]',
      badge: 'Full bloom',
    };
  }

  return {
    headline: 'Session complete',
    cardClass: 'border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/80',
    glowClass: 'shadow-[0_18px_40px_rgba(76,81,191,0.12)]',
    badge: 'Gentle glow',
  };
};

export const getExportFeedback = (preferences: AppPreferences, label: string) => {
  const baseMessage = getEncouragementLine('export', label, preferences.encouragementMode, `${label} exported.`);

  if (preferences.celebrationIntensity === 'off') {
    return { title: `${label} exported`, message: baseMessage, tone: 'quiet' as const };
  }

  if (preferences.celebrationIntensity === 'full') {
    return { title: `${label} exported`, message: `${baseMessage} The moment is yours to keep.`, tone: 'bright' as const };
  }

  return { title: `${label} exported`, message: baseMessage, tone: 'soft' as const };
};

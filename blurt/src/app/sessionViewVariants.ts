import { CelebrationIntensity } from './preferences';

type SessionChromeStyles = {
  shellClass: string;
  headerClass: string;
  titleClass: string;
  timerWrapClass: string;
  timerClass: string;
  timerStateClass: string;
  controlsClass: string;
  primaryButtonClass: string;
  secondaryButtonClass: string;
  dangerButtonClass: string;
  exportButtonClass: string;
  exportPrimaryButtonClass: string;
  promptClass: string;
  inputShellClass: string;
  inputIconClass: string;
  inputClass: string;
  inputHintClass: string;
};

type BoardStyles = {
  boardClass: string;
  boardSurfaceClass: string;
  emptyClass: string;
  launchGhostClass: string;
  exportBackgroundColor: string;
};

type NoteStyles = {
  cardClass: string;
  bodyClass: string;
  tapeClass: string;
  accentClass: string;
  shadowClass: string;
};

export type NoteDecoration = {
  rotationDeg: number;
  toneClass: string;
  tapeWidthClass: string;
  tapeOffsetClass: string;
};

const joinClasses = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const hashSeed = (seed: string) =>
  Array.from(seed).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 17), 0);

export const getSessionChromeStyles = (
  intensity: CelebrationIntensity,
  isDark: boolean,
  isPaused: boolean,
  isComplete: boolean
): SessionChromeStyles => {
  const timerStateClass = isComplete
    ? 'text-[#94a3b8]'
    : isPaused
      ? isDark
        ? 'text-[#fbbf24]'
        : 'text-[#b45309]'
      : intensity === 'full'
        ? 'bg-gradient-to-r from-fuchsia-400 via-violet-300 to-blue-300 bg-clip-text text-transparent'
        : intensity === 'gentle'
          ? isDark
            ? 'text-[#f8fafc]'
            : 'text-[#1d4ed8]'
          : isDark
            ? 'text-[#dbe4ff]'
            : 'text-[#1f2a44]';

  if (!isDark) {
    return {
      shellClass: joinClasses(
        'border',
        intensity === 'full'
          ? 'border-[#c9d5ff] bg-[linear-gradient(180deg,#f6f8ff_0%,#ecf2ff_44%,#edf3ff_100%)]'
          : intensity === 'gentle'
            ? 'border-[#d8deed] bg-[linear-gradient(180deg,#f8fbff_0%,#f2f6ff_100%)]'
            : 'border-[#d8deed] bg-[#f6f8fc]'
      ),
      headerClass: joinClasses(
        'border-b',
        intensity === 'full'
          ? 'border-[#d8e0ff] bg-white/75 backdrop-blur-sm'
          : intensity === 'gentle'
            ? 'border-[#d7ddee] bg-white'
            : 'border-[#d7ddee] bg-[#fbfcff]'
      ),
      titleClass:
        intensity === 'full'
          ? 'bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 bg-clip-text text-transparent'
          : intensity === 'gentle'
            ? 'text-[#172554]'
            : 'text-[#1a2340]',
      timerWrapClass: joinClasses(
        'rounded-[22px] border px-5 py-3 shadow-sm',
        intensity === 'full'
          ? 'border-[#d7ddff] bg-[radial-gradient(circle_at_top,#ffffff_0%,#eef2ff_100%)] shadow-[0_18px_40px_rgba(76,81,191,0.16)]'
          : intensity === 'gentle'
            ? 'border-[#d6ddf2] bg-white shadow-[0_10px_24px_rgba(37,99,235,0.08)]'
            : 'border-[#dde3f1] bg-white'
      ),
      timerClass: 'text-5xl font-bold tabular-nums tracking-[-0.04em]',
      timerStateClass,
      controlsClass: joinClasses('flex flex-wrap items-center gap-3', intensity === 'full' ? 'pt-1' : ''),
      primaryButtonClass: joinClasses(
        'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-medium transition-all',
        intensity === 'full'
          ? 'border-[#d8dcff] bg-[linear-gradient(135deg,#7c3aed_0%,#2563eb_100%)] text-white shadow-[0_12px_28px_rgba(76,81,191,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(76,81,191,0.28)]'
          : intensity === 'gentle'
            ? 'border-[#d2d7e8] bg-white text-[#1d2848] shadow-[0_8px_16px_rgba(30,41,59,0.08)] hover:bg-[#eef3ff]'
            : 'border-[#d2d7e8] bg-[#f7f9fd] text-[#1d2848] hover:bg-[#eef2f8]'
      ),
      secondaryButtonClass:
        'inline-flex items-center gap-2 rounded-xl border border-[#d2d7e8] bg-white px-4 py-2.5 font-medium text-[#1d2848] transition-all hover:bg-[#f4f6fc]',
      dangerButtonClass:
        'inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-medium text-red-700 transition-all hover:bg-red-100',
      exportButtonClass:
        'inline-flex items-center gap-2 rounded-xl border border-[#d2d7e8] bg-white px-4 py-2.5 font-medium text-[#1d2848] transition-all hover:bg-[#f4f6fc]',
      exportPrimaryButtonClass:
        'inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-4 py-2.5 font-medium text-white shadow-[0_10px_24px_rgba(76,81,191,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(76,81,191,0.28)]',
      promptClass: 'border-[#d6ddf0] bg-[#eef2ff] text-[#2f3f69]',
      inputShellClass: joinClasses(
        'session-input-shell rounded-[24px] border',
        intensity === 'full'
          ? 'border-[#d9d4ff] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(238,242,255,0.9))] shadow-[0_18px_38px_rgba(76,81,191,0.16)]'
          : intensity === 'gentle'
            ? 'border-[#d7def5] bg-white shadow-[0_12px_28px_rgba(37,99,235,0.08)]'
            : 'border-[#d9dfef] bg-white'
      ),
      inputIconClass:
        intensity === 'full'
          ? 'bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white shadow-[0_10px_24px_rgba(76,81,191,0.28)]'
          : intensity === 'gentle'
            ? 'bg-[#eef3ff] text-[#3855d6]'
            : 'bg-[#f0f3fa] text-[#64748b]',
      inputClass: joinClasses(
        'w-full bg-transparent text-lg outline-none transition-all',
        intensity === 'full'
          ? 'text-[#1e1b4b] placeholder:text-[#7c3aed]/35'
          : intensity === 'gentle'
            ? 'text-[#172554] placeholder:text-[#64748b]'
            : 'text-[#1f2a44] placeholder:text-[#7f8aa5]'
      ),
      inputHintClass: intensity === 'full' ? 'text-[#6d28d9]/70' : intensity === 'gentle' ? 'text-[#64748b]' : 'text-[#94a3b8]',
    };
  }

  return {
    shellClass: joinClasses(
      'border',
      intensity === 'full'
        ? 'border-[#3b4674] bg-[linear-gradient(180deg,#081224_0%,#0a1730_38%,#0b1730_100%)]'
        : intensity === 'gentle'
          ? 'border-[#31415f] bg-[linear-gradient(180deg,#0c1728_0%,#10192b_100%)]'
          : 'border-[#31415f] bg-[#111827]'
    ),
    headerClass: joinClasses(
      'border-b',
      intensity === 'full'
        ? 'border-[#26335a] bg-[linear-gradient(180deg,rgba(11,22,47,0.96),rgba(10,20,39,0.9))]'
        : intensity === 'gentle'
          ? 'border-[#2f3b56] bg-[#0f1728]'
          : 'border-[#2f3b56] bg-[#0f1728]'
    ),
    titleClass:
      intensity === 'full'
        ? 'bg-gradient-to-r from-[#f5f3ff] via-[#c4b5fd] to-[#93c5fd] bg-clip-text text-transparent'
        : intensity === 'gentle'
          ? 'text-[#f8fafc]'
          : 'text-[#eef2ff]',
    timerWrapClass: joinClasses(
      'rounded-[24px] border px-5 py-3',
      intensity === 'full'
        ? 'border-[#3d3f7c] bg-[radial-gradient(circle_at_top,rgba(58,67,128,0.55),rgba(14,22,46,0.92))] shadow-[0_20px_44px_rgba(30,41,99,0.36)]'
        : intensity === 'gentle'
          ? 'border-[#31415f] bg-[#111a2d] shadow-[0_14px_32px_rgba(3,7,18,0.34)]'
          : 'border-[#32415f] bg-[#111a2d]'
    ),
    timerClass: 'text-5xl font-bold tabular-nums tracking-[-0.04em]',
    timerStateClass,
    controlsClass: joinClasses('flex flex-wrap items-center gap-3', intensity === 'full' ? 'pt-1' : ''),
    primaryButtonClass: joinClasses(
      'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-medium transition-all',
      intensity === 'full'
        ? 'border-[#4c4f98] bg-[linear-gradient(135deg,#7c3aed_0%,#2563eb_100%)] text-white shadow-[0_14px_34px_rgba(76,81,191,0.3)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(76,81,191,0.38)]'
        : intensity === 'gentle'
          ? 'border-[#32415f] bg-[#192235] text-[#eef2ff] hover:bg-[#222e47]'
          : 'border-[#32415f] bg-[#192235] text-[#eef2ff] hover:bg-[#222e47]'
    ),
    secondaryButtonClass:
      'inline-flex items-center gap-2 rounded-xl border border-[#32415f] bg-[#10192b] px-4 py-2.5 font-medium text-[#d9e3ff] transition-all hover:bg-[#172339]',
    dangerButtonClass:
      'inline-flex items-center gap-2 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-2.5 font-medium text-red-300 transition-all hover:bg-red-950/60',
    exportButtonClass:
      'inline-flex items-center gap-2 rounded-xl border border-[#32415f] bg-[#10192b] px-4 py-2.5 font-medium text-[#d9e3ff] transition-all hover:bg-[#172339]',
    exportPrimaryButtonClass:
      'inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-4 py-2.5 font-medium text-white shadow-[0_14px_32px_rgba(76,81,191,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(76,81,191,0.4)]',
    promptClass: 'border-[#30405c] bg-[#162238] text-[#c8d6f7]',
    inputShellClass: joinClasses(
      'session-input-shell rounded-[24px] border',
      intensity === 'full'
        ? 'border-[#423e78] bg-[linear-gradient(135deg,rgba(18,25,52,0.96),rgba(14,24,47,0.96))] shadow-[0_20px_40px_rgba(2,6,23,0.42)]'
        : intensity === 'gentle'
          ? 'border-[#32415f] bg-[#10192b] shadow-[0_16px_36px_rgba(2,6,23,0.32)]'
          : 'border-[#32415f] bg-[#10192b]'
    ),
    inputIconClass:
      intensity === 'full'
        ? 'bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white shadow-[0_12px_30px_rgba(76,81,191,0.38)]'
        : intensity === 'gentle'
          ? 'bg-[#1b2740] text-[#d8e4ff]'
          : 'bg-[#162238] text-[#94a3c7]',
    inputClass: joinClasses(
      'w-full bg-transparent text-lg outline-none transition-all',
      intensity === 'full'
        ? 'text-[#f8fafc] placeholder:text-[#a78bfa]/45'
        : intensity === 'gentle'
          ? 'text-[#eef2ff] placeholder:text-[#7080a7]'
          : 'text-[#eef2ff] placeholder:text-[#7080a7]'
    ),
    inputHintClass: intensity === 'full' ? 'text-[#c4b5fd]/70' : intensity === 'gentle' ? 'text-[#94a3c7]' : 'text-[#7f8aa5]',
  };
};

export const getSessionBoardStyles = (
  intensity: CelebrationIntensity,
  isDark: boolean
): BoardStyles => {
  if (!isDark) {
    return {
      boardClass: joinClasses(
        'session-board relative flex-1 overflow-hidden rounded-[28px] border',
        `session-board--${intensity}`,
        'session-board--light',
        intensity === 'full'
          ? 'border-[#cad4ff] bg-[linear-gradient(180deg,#eef2ff_0%,#e8eefc_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(76,81,191,0.12)]'
          : intensity === 'gentle'
            ? 'border-[#d9e0f3] bg-[#f8fbff] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]'
            : 'border-[#dde3f1] bg-[#fbfcff]'
      ),
      boardSurfaceClass: 'absolute inset-0 session-board__surface',
      emptyClass: intensity === 'full' ? 'text-[#6d28d9]/45' : intensity === 'gentle' ? 'text-[#64748b]' : 'text-[#94a3b8]',
      launchGhostClass: joinClasses('launch-ghost', `launch-ghost--${intensity}`, 'launch-ghost--light'),
      exportBackgroundColor: intensity === 'full' ? '#eef2ff' : intensity === 'gentle' ? '#f8fbff' : '#fbfcff',
    };
  }

  return {
    boardClass: joinClasses(
      'session-board relative flex-1 overflow-hidden rounded-[28px] border',
      `session-board--${intensity}`,
      'session-board--dark',
      intensity === 'full'
        ? 'border-[#334677] bg-[linear-gradient(180deg,#081224_0%,#0a1326_38%,#0c1730_100%)] shadow-[inset_0_1px_0_rgba(148,163,184,0.06),0_18px_44px_rgba(2,6,23,0.3)]'
        : intensity === 'gentle'
          ? 'border-[#31415f] bg-[#0d1627] shadow-[inset_0_1px_0_rgba(148,163,184,0.05)]'
          : 'border-[#31415f] bg-[#0f1728]'
    ),
    boardSurfaceClass: 'absolute inset-0 session-board__surface',
    emptyClass: intensity === 'full' ? 'text-[#c4b5fd]/42' : intensity === 'gentle' ? 'text-[#64748b]' : 'text-[#46567e]',
    launchGhostClass: joinClasses('launch-ghost', `launch-ghost--${intensity}`, 'launch-ghost--dark'),
    exportBackgroundColor: intensity === 'full' ? '#081224' : intensity === 'gentle' ? '#0d1627' : '#0f1728',
  };
};

export const getSessionNoteStyles = (
  intensity: CelebrationIntensity,
  isDark: boolean,
  decoration: NoteDecoration
): NoteStyles => {
  if (intensity === 'full') {
    return {
      cardClass: joinClasses(
        'session-note__card',
        decoration.toneClass,
        isDark ? 'session-note__card--full-dark' : 'session-note__card--full-light'
      ),
      bodyClass: 'session-note__body text-[#2b1c0d]',
      tapeClass: joinClasses('session-note__tape', decoration.tapeWidthClass, decoration.tapeOffsetClass),
      accentClass: 'session-note__accent',
      shadowClass: '',
    };
  }

  if (intensity === 'gentle') {
    return {
      cardClass: joinClasses(
        'session-note__card',
        isDark ? 'session-note__card--gentle-dark' : 'session-note__card--gentle-light'
      ),
      bodyClass: joinClasses('session-note__body', isDark ? 'text-[#eef2ff]' : 'text-[#172554]'),
      tapeClass: 'hidden',
      accentClass: 'session-note__accent session-note__accent--gentle',
      shadowClass: '',
    };
  }

  return {
    cardClass: joinClasses(
      'session-note__card',
      isDark ? 'session-note__card--off-dark' : 'session-note__card--off-light'
    ),
    bodyClass: joinClasses('session-note__body', isDark ? 'text-[#dce6ff]' : 'text-[#1f2a44]'),
    tapeClass: 'hidden',
    accentClass: 'hidden',
    shadowClass: '',
  };
};

export const getNoteDecoration = (noteId: string): NoteDecoration => {
  const seed = hashSeed(noteId);
  const rotationDeg = ((seed % 9) - 4) * 0.6;
  const tones = ['session-note__tone--amber', 'session-note__tone--gold', 'session-note__tone--cream'];
  const widths = ['session-note__tape--sm', 'session-note__tape--md', 'session-note__tape--lg'];
  const offsets = ['session-note__tape-offset--left', 'session-note__tape-offset--center', 'session-note__tape-offset--right'];

  return {
    rotationDeg,
    toneClass: tones[seed % tones.length],
    tapeWidthClass: widths[Math.floor(seed / 7) % widths.length],
    tapeOffsetClass: offsets[Math.floor(seed / 17) % offsets.length],
  };
};

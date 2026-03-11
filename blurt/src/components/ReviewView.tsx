import { MouseEvent, useMemo, useRef, useState } from 'react';
import { CelebrationBackground } from '../app/components/rituals/CelebrationBackground';
import { CompletionHero } from '../app/components/rituals/CompletionHero';
import { RitualBadge } from '../app/components/rituals/RitualBadge';
import { SessionSummaryCard } from '../app/components/rituals/SessionSummaryCard';
import { usePreferences } from '../app/preferences';
import { getCelebrationTone, getEncouragementLine } from '../app/rituals';
import { prefersReducedMotion } from '../utils/motion';
import { getNoteHeight, GRID_PADDING, MIN_CANVAS_HEIGHT, NOTE_WIDTH } from '../utils/arrangeNotesIntoGrid';
import { Session, SessionNote, SessionSummary } from '../types/session';

type Props = {
  session: Session;
  summary: SessionSummary;
  onBack: () => void;
  onSave: (session: Session) => void;
};

export const ReviewView = ({ session, summary, onBack, onSave }: Props) => {
  const { preferences, resolvedAppearance } = usePreferences();
  const isDark = resolvedAppearance === 'dark';
  const [notes, setNotes] = useState(session.notes);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const celebration = getCelebrationTone(preferences.celebrationIntensity);
  const intensity = preferences.celebrationIntensity;
  const encouragement = getEncouragementLine(
    'completion',
    session.id,
    preferences.encouragementMode,
    'Review what you caught while it is still warm.'
  );
  const reduceMotion = prefersReducedMotion();

  const endedAtText = useMemo(() => {
    if (!session.endedAtMs) {
      return 'Not finished';
    }
    return new Date(session.endedAtMs).toLocaleString();
  }, [session.endedAtMs]);

  const boardHeight = useMemo(() => {
    const maxBottom = notes.reduce((max, note) => Math.max(max, note.y + getNoteHeight(note.text)), 0);
    return Math.max(MIN_CANVAS_HEIGHT, maxBottom + GRID_PADDING);
  }, [notes]);

  const beginDrag = (event: MouseEvent<HTMLDivElement>, note: SessionNote) => {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    dragRef.current = {
      id: note.id,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
  };

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current) {
      return;
    }

    const canvas = event.currentTarget.getBoundingClientRect();
    const nextNotes = notes.map((note) => {
      if (note.id !== dragRef.current?.id) {
        return note;
      }

      return {
        ...note,
        x: Math.max(0, Math.min(canvas.width - NOTE_WIDTH, event.clientX - canvas.left - dragRef.current.offsetX)),
        y: Math.max(
          0,
          Math.min(canvas.height - getNoteHeight(note.text), event.clientY - canvas.top - dragRef.current.offsetY)
        )
      };
    });

    setNotes(nextNotes);
  };

  const endDrag = () => {
    dragRef.current = null;
    onSave({ ...session, notes });
  };

  return (
    <div
      className={`mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1480px] flex-col overflow-hidden rounded-3xl border shadow-[0_20px_40px_rgba(17,27,55,0.1)] ${
        isDark ? 'border-[#30405c] bg-[#0d1627]' : 'border-[#d8deed] bg-[#f3f5fb]'
      }`}
    >
      <header className={`flex items-center justify-between border-b px-8 py-6 ${isDark ? 'border-[#2f3b56] bg-[#0d1627]' : 'border-[#d7ddee] bg-white'}`}>
        <div>
          <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
            {celebration.badge}
          </p>
          <h2 className={`text-3xl font-semibold ${isDark ? 'text-[#eef2ff]' : 'text-[#1a2340]'}`}>{celebration.headline}</h2>
        </div>
        <button
          className={`rounded-lg border px-4 py-2 font-medium ${
            isDark ? 'border-[#32415f] bg-[#162238] text-[#dce6ff] hover:bg-[#1b2940]' : 'border-[#d2d7e8] bg-[#f2f4fb] text-[#1d2848] hover:bg-[#e8ecf7]'
          }`}
          onClick={onBack}
        >
          Back to Setup
        </button>
      </header>

      <section
        className={`relative overflow-hidden border-b px-8 py-8 ${isDark ? 'border-[#2f3b56]' : 'border-[#d7ddee]'} ${
          isDark
            ? intensity === 'off'
              ? 'bg-[#101827]'
              : intensity === 'gentle'
                ? 'bg-[#14192b]'
                : 'bg-[#120f23]'
            : celebration.cardClass
        } ${!reduceMotion && intensity !== 'off' ? celebration.glowClass : ''}`}
      >
        <CelebrationBackground intensity={intensity} theme={isDark ? 'dark' : 'light'} reducedMotion={reduceMotion} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <RitualBadge intensity={intensity} theme={isDark ? 'dark' : 'light'} reducedMotion={reduceMotion} />
          <CompletionHero
            intensity={intensity}
            theme={isDark ? 'dark' : 'light'}
            title={intensity === 'off' ? 'Session complete' : encouragement}
            subtitle={intensity === 'full' ? "The work exists now. It wasn't there before." : intensity === 'gentle' ? 'Saved outside your head now.' : 'The useful part stays.'}
            reducedMotion={reduceMotion}
          />
          <div className="mt-8">
            <SessionSummaryCard
              intensity={intensity}
              theme={isDark ? 'dark' : 'light'}
              duration={`${Math.round(session.durationSec / 60)} min`}
              noteCount={summary.totalNotes}
              subject={session.title}
              reducedMotion={reduceMotion}
            />
          </div>
          <div className={`mt-5 grid grid-cols-2 gap-3 text-sm md:grid-cols-4 ${isDark ? 'text-[#d3def7]' : 'text-[#2f3f69]'}`}>
            <p>Completed: {endedAtText}</p>
            <p>Total notes: {summary.totalNotes}</p>
            <p>Total words: {summary.totalWords}</p>
            <p>Notes/minute: {summary.notesPerMinute}</p>
          </div>
        </div>
      </section>

      <div
        className={`canvas m-8 mt-6 rounded-2xl border-2 shadow-inner ${isDark ? 'border-[#30405c] bg-[#0f1728]' : 'border-[#d8ddea] bg-white'}`}
        style={{ minHeight: boardHeight, height: boardHeight }}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            className="note draggable"
            style={{ left: note.x, top: note.y, height: getNoteHeight(note.text) }}
            onMouseDown={(event) => beginDrag(event, note)}
          >
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
};

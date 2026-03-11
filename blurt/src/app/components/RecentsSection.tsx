import { ArrowRight, Pin, PinOff, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from './ConfirmDialog';
import { usePreferences } from '../preferences';
import { getEncouragementLine } from '../rituals';
import { formatRemaining, useAppState } from '../state';

export const RecentsSection = () => {
  const navigate = useNavigate();
  const { folders, latestSession, sessions, deleteSession, toggleSessionPin } = useAppState();
  const { preferences, resolvedAppearance } = usePreferences();
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const isDark = resolvedAppearance === 'dark';
  const emptyStateLine = getEncouragementLine(
    'empty',
    'recents-empty',
    preferences.encouragementMode,
    'Start a new session from Quick Start.'
  );

  const continueLatest = () => {
    if (!latestSession) {
      return;
    }
    navigate(latestSession.endedAtMs ? `/session/${latestSession.id}/review` : `/session/${latestSession.id}`);
  };

  const requestDelete = (sessionId: string, title: string) => setPendingDelete({ id: sessionId, title });
  const folderNameById = new Map(folders.map((folder) => [folder.id, folder.name]));
  const surfaceClass = isDark ? 'bg-[#0d1627] border-[#24324a] shadow-[0_18px_60px_rgba(0,0,0,0.28)]' : 'bg-white border-neutral-200 shadow-sm';
  const headingClass = isDark ? 'text-slate-50' : 'text-neutral-900';
  const bodyClass = isDark ? 'text-slate-400' : 'text-neutral-500';
  const mutedBorderClass = isDark ? 'border-[#31415d] bg-[#0f1a2f] text-slate-200 hover:bg-[#13213a]' : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50';

  return (
    <>
      <div className="max-w-4xl">
        <h2 className={`mb-6 text-2xl font-semibold ${headingClass}`}>Recents</h2>

        {latestSession ? (
          <div className={`mb-8 rounded-2xl border p-6 transition-shadow hover:shadow-md ${surfaceClass}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`mb-2 text-lg font-semibold ${headingClass}`}>{latestSession.title}</h3>
                <p className={`mb-3 text-sm ${bodyClass}`}>{latestSession.prompt || 'No prompt provided'}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={isDark ? 'font-medium text-slate-200' : 'font-medium text-neutral-700'}>{latestSession.notes.length} Blurts</span>
                  <span className="text-purple-600 font-medium">{formatRemaining(latestSession)}</span>
                  {latestSession.folderId ? <span className={bodyClass}>{folderNameById.get(latestSession.folderId)}</span> : null}
                  {latestSession.isPinned ? <span className="text-amber-600 font-medium">Pinned</span> : null}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => void toggleSessionPin(latestSession.id)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${mutedBorderClass}`}
                >
                  {latestSession.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                  {latestSession.isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button
                  type="button"
                  onClick={() => requestDelete(latestSession.id, latestSession.title)}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <button
                  onClick={continueLatest}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`mb-8 rounded-2xl border p-6 ${surfaceClass}`}>
            <h3 className={`mb-2 text-lg font-semibold ${headingClass}`}>No recent sessions</h3>
            <p className={`text-sm ${bodyClass}`}>{emptyStateLine}</p>
          </div>
        )}

        <div className={`mb-8 rounded-2xl border p-8 ${surfaceClass}`}>
          <div className="flex gap-6">
            <div className="flex items-center justify-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer hover:shadow-md transition-all ${isDark ? 'bg-gradient-to-br from-violet-500/15 to-blue-500/15' : 'bg-gradient-to-br from-purple-50 to-blue-50'}`}>
                <Plus className="w-10 h-10 text-purple-600" />
              </div>
            </div>

            <div className={`w-px ${isDark ? 'bg-[#24324a]' : 'bg-neutral-200'}`} />

            <div className="flex-1 grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  className={`aspect-square rounded-xl border flex items-center justify-center transition-all group ${
                    isDark
                      ? 'border-[#24324a] bg-[#0f1a2f] hover:bg-gradient-to-br hover:from-violet-500/15 hover:to-blue-500/15 hover:border-violet-400/40'
                      : 'border-neutral-200 bg-neutral-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 hover:border-purple-200'
                  }`}
                >
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 ${surfaceClass}`}>
          <h3 className={`mb-4 text-lg font-semibold ${headingClass}`}>Past Sessions</h3>
          {sessions.length === 0 && <p className={bodyClass}>No sessions yet.</p>}
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`w-full rounded-lg border px-4 py-3 transition-colors ${
                  isDark
                    ? 'border-[#24324a] hover:border-violet-400/40 hover:bg-violet-500/5'
                    : 'border-neutral-200 hover:border-purple-300 hover:bg-purple-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(session.endedAtMs ? `/session/${session.id}/review` : `/session/${session.id}`)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <strong className={headingClass}>{session.title}</strong>
                      <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-neutral-400'}`}>{new Date(session.startedAtMs).toLocaleString()}</span>
                    </div>
                    <div className={`text-sm ${bodyClass}`}>{session.notes.length} notes</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => requestDelete(session.id, session.title)}
                    className={`rounded-lg border px-3 py-2 text-red-600 transition-colors ${
                      isDark ? 'border-red-500/30 bg-[#0f1a2f] hover:bg-red-500/10 text-red-300' : 'border-red-200 bg-white hover:bg-red-50'
                    }`}
                    aria-label={`Delete ${session.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete blurt?"
        message={pendingDelete ? `Delete "${pendingDelete.title}"? This cannot be undone.` : ''}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            return;
          }
          void deleteSession(pendingDelete.id);
          setPendingDelete(null);
        }}
      />
    </>
  );
};

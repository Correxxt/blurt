import { FolderOpen, Pin, PinOff, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { usePreferences } from '../preferences';
import { useAppState } from '../state';

export const LibraryPage = () => {
  const {
    createFolder,
    deleteFolder,
    deleteSession,
    folders,
    moveSessionToFolder,
    sessions,
    toggleSessionPin,
    renameFolder,
  } = useAppState();
  const { resolvedAppearance } = usePreferences();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string; type: 'session' | 'folder' } | null>(null);
  const [folderDraft, setFolderDraft] = useState('');
  const [renameDraft, setRenameDraft] = useState('');
  const [isRenamingFolder, setIsRenamingFolder] = useState(false);
  const isDark = resolvedAppearance === 'dark';

  const scope = searchParams.get('scope') ?? 'all';
  const activeFolderId = searchParams.get('folderId') ?? '';
  const activeFolder = folders.find((folder) => folder.id === activeFolderId) ?? null;

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  useEffect(() => {
    setRenameDraft(activeFolder?.name ?? '');
    setIsRenamingFolder(false);
  }, [activeFolder?.id, activeFolder?.name]);

  const folderNameById = useMemo(() => new Map(folders.map((folder) => [folder.id, folder.name])), [folders]);

  const filteredSessions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const inScope = sessions.filter((session) => {
      if (scope === 'folder') {
        return session.folderId === activeFolderId;
      }
      if (scope === 'unfiled') {
        return !session.folderId;
      }
      return true;
    });

    const searched = normalizedQuery
      ? inScope.filter((session) => {
          const haystack = `${session.title} ${session.prompt ?? ''}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : inScope;

    return [...searched].sort((a, b) => {
      if (Boolean(b.isPinned) !== Boolean(a.isPinned)) {
        return Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned));
      }
      const aSort = a.endedAtMs ?? a.startedAtMs;
      const bSort = b.endedAtMs ?? b.startedAtMs;
      return bSort - aSort;
    });
  }, [activeFolderId, query, scope, sessions]);

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    const nextParams = new URLSearchParams(searchParams);
    if (nextQuery.trim()) {
      nextParams.set('q', nextQuery);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams);
  };

  const submitFolder = () => {
    const nextName = folderDraft.trim();
    if (!nextName) {
      return;
    }
    void createFolder(nextName);
    setFolderDraft('');
  };

  const activeLabel =
    scope === 'folder' && activeFolder
      ? activeFolder.name
      : scope === 'unfiled'
        ? 'Unfiled Sessions'
        : 'All Sessions';

  const pageTitleClass = isDark ? 'text-slate-50' : 'text-neutral-900';
  const bodyClass = isDark ? 'text-slate-400' : 'text-neutral-500';
  const surfaceClass = isDark ? 'border-[#24324a] bg-[#0d1627] shadow-[0_18px_60px_rgba(0,0,0,0.28)]' : 'border-neutral-200 bg-white shadow-sm';
  const inputClass = isDark
    ? 'border-[#31415d] bg-[#0f1a2f] text-slate-100 placeholder:text-slate-500'
    : 'border-neutral-200 bg-white text-neutral-700';
  const subtleButtonClass = isDark
    ? 'border-[#31415d] bg-[#0f1a2f] text-slate-200 hover:bg-[#14213a]'
    : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50';
  const activeFolderButtonClass = (active: boolean) =>
    `w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
      active
        ? isDark
          ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-100 font-medium'
          : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-medium'
        : isDark
          ? 'text-slate-300 hover:bg-white/5'
          : 'text-neutral-600 hover:bg-neutral-50'
    }`;

  return (
    <>
      <div className="max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-2xl">
            <h2 className={`text-2xl font-semibold ${pageTitleClass}`}>Your Library</h2>
            <p className={`mt-1 text-sm ${bodyClass}`}>Organize blurts into folders, pin priorities, and find what matters fast.</p>
          </div>
          <div className="w-full xl:max-w-sm">
            <label className="relative block">
              <Search className={`pointer-events-none absolute left-5 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-neutral-400'}`} />
              <input
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search title or prompt"
                className={`w-full rounded-xl border py-3 pl-14 pr-4 text-sm ${inputClass}`}
              />
            </label>
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className={`rounded-2xl border p-5 ${surfaceClass}`}>
            <h3 className={`text-sm font-semibold uppercase tracking-[0.14em] ${isDark ? 'text-slate-500' : 'text-neutral-500'}`}>Folders</h3>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => navigate('/library?scope=all')}
                className={activeFolderButtonClass(scope === 'all')}
              >
                All Sessions
              </button>
              <button
                type="button"
                onClick={() => navigate('/library?scope=unfiled')}
                className={activeFolderButtonClass(scope === 'unfiled')}
              >
                Unfiled
              </button>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => navigate(`/library?scope=folder&folderId=${folder.id}`)}
                  className={activeFolderButtonClass(scope === 'folder' && activeFolderId === folder.id)}
                >
                  {folder.name}
                </button>
              ))}
            </div>

            <div className={`mt-5 border-t pt-4 ${isDark ? 'border-[#24324a]' : 'border-neutral-200'}`}>
              <label className={`mb-2 block text-xs font-semibold uppercase tracking-[0.14em] ${isDark ? 'text-slate-500' : 'text-neutral-500'}`}>Create folder</label>
              <div className="flex items-center gap-2">
                <input
                  value={folderDraft}
                  onChange={(event) => setFolderDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      submitFolder();
                    }
                  }}
                  placeholder="e.g. Thesis"
                  className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm ${inputClass}`}
                />
                <button
                  type="button"
                  onClick={submitFolder}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${subtleButtonClass}`}
                >
                  Add
                </button>
              </div>
            </div>
          </aside>

          <section className={`rounded-2xl border p-5 ${surfaceClass}`}>
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${pageTitleClass}`}>{activeLabel}</h3>
                <p className={`text-sm ${bodyClass}`}>
                  {filteredSessions.length} {filteredSessions.length === 1 ? 'session' : 'sessions'}
                </p>
              </div>

              {activeFolder ? (
                <div className="flex flex-wrap items-center gap-2">
                  {isRenamingFolder ? (
                    <>
                      <input
                        value={renameDraft}
                        onChange={(event) => setRenameDraft(event.target.value)}
                        className={`min-w-[12rem] rounded-lg border px-3 py-2 text-sm ${inputClass}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          void renameFolder(activeFolder.id, renameDraft);
                          setIsRenamingFolder(false);
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium ${subtleButtonClass}`}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsRenamingFolder(true)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium ${subtleButtonClass}`}
                    >
                      Rename folder
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setPendingDelete({ id: activeFolder.id, title: activeFolder.name, type: 'folder' })}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    Delete folder
                  </button>
                </div>
              ) : null}
            </div>

            {filteredSessions.length === 0 ? (
              <div className={`rounded-2xl border border-dashed p-8 text-center ${isDark ? 'border-[#31415d] bg-[#0f1a2f]/70' : 'border-neutral-200 bg-neutral-50/70'}`}>
                <FolderOpen className={`mx-auto h-6 w-6 ${isDark ? 'text-slate-500' : 'text-neutral-400'}`} />
                <h4 className={`mt-3 text-lg font-semibold ${pageTitleClass}`}>Nothing here yet</h4>
                <p className={`mt-2 text-sm ${bodyClass}`}>
                  {query.trim() ? 'Try a different search term.' : scope === 'folder' ? 'Move sessions into this folder from the library controls below.' : 'Start a new session or create a folder to begin organizing your work.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-xl border p-4 transition-colors ${
                      isDark
                        ? 'border-[#24324a] hover:border-violet-400/40 hover:bg-violet-500/5'
                        : 'border-neutral-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <button
                        type="button"
                        onClick={() => navigate(session.endedAtMs ? `/session/${session.id}/review` : `/session/${session.id}`)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`break-words font-semibold ${pageTitleClass}`}>{session.title}</h4>
                          {session.isPinned ? (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Pinned</span>
                          ) : null}
                          {session.folderId ? (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                              {folderNameById.get(session.folderId) ?? 'Folder'}
                            </span>
                          ) : (
                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">Unfiled</span>
                          )}
                        </div>
                        <p className={`mt-2 break-words text-sm ${bodyClass}`}>{session.prompt || 'No prompt provided'}</p>
                        <div className={`mt-3 flex flex-wrap items-center gap-4 text-xs ${isDark ? 'text-slate-500' : 'text-neutral-400'}`}>
                          <span>{new Date(session.startedAtMs).toLocaleString()}</span>
                          <span>{session.notes.length} blurts</span>
                          <span>{session.endedAtMs ? 'Completed' : 'In progress'}</span>
                        </div>
                      </button>

                      <div className="flex min-w-0 flex-wrap items-center gap-2 xl:max-w-[19rem] xl:justify-end">
                        <button
                          type="button"
                          onClick={() => void toggleSessionPin(session.id)}
                          className={`shrink-0 rounded-lg border px-3 py-2 ${subtleButtonClass}`}
                          aria-label={session.isPinned ? `Unpin ${session.title}` : `Pin ${session.title}`}
                        >
                          {session.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                        </button>
                        <select
                          value={session.folderId ?? ''}
                          onChange={(event) => void moveSessionToFolder(session.id, event.target.value || undefined)}
                          className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm xl:min-w-[8.5rem] ${inputClass}`}
                        >
                          <option value="">Unfiled</option>
                          {folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                              {folder.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setPendingDelete({ id: session.id, title: session.title, type: 'session' })}
                          className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-2 text-red-600 hover:bg-red-50"
                          aria-label={`Delete ${session.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={pendingDelete?.type === 'folder' ? 'Delete folder?' : 'Delete blurt?'}
        message={
          pendingDelete
            ? pendingDelete.type === 'folder'
              ? `Delete folder "${pendingDelete.title}"? Sessions inside it will be kept and moved to Unfiled.`
              : `Delete "${pendingDelete.title}"? This cannot be undone.`
            : ''
        }
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            return;
          }
          if (pendingDelete.type === 'folder') {
            void deleteFolder(pendingDelete.id);
            if (scope === 'folder' && activeFolderId === pendingDelete.id) {
              navigate('/library?scope=all');
            }
          } else {
            void deleteSession(pendingDelete.id);
          }
          setPendingDelete(null);
        }}
      />
    </>
  );
};

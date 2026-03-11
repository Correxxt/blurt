import { Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useAppState } from '../state';

export const NotificationsPage = () => {
  const { sessions, templates, deleteSession } = useAppState();
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  const events = [
    ...sessions.slice(0, 6).map((session) => ({
      id: `session-${session.id}`,
      sessionId: session.id,
      title: session.endedAtMs ? 'Session completed' : 'Session in progress',
      message: `${session.title} • ${session.notes.length} blurts`,
      time: new Date(session.endedAtMs ?? session.startedAtMs).toLocaleString(),
      read: Boolean(session.endedAtMs),
      canDelete: true
    })),
    ...templates.slice(0, 3).map((template) => ({
      id: `template-${template.id}`,
      sessionId: null,
      title: 'Template updated',
      message: template.name,
      time: new Date(template.updatedAtMs).toLocaleString(),
      read: true,
      canDelete: false
    }))
  ];

  return (
    <>
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Notifications</h2>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl border p-5 ${event.read ? 'border-neutral-200' : 'border-purple-200 bg-purple-50/30'}`}
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  {event.read ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-neutral-600 mb-2">{event.message}</p>
                  <span className="text-xs text-neutral-400">{event.time}</span>
                </div>
                {event.canDelete && event.sessionId ? (
                  <button
                    type="button"
                    onClick={() => setPendingDelete({ id: event.sessionId, title: event.message.split(' • ')[0] })}
                    className="self-start rounded-lg border border-red-200 bg-white px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    aria-label={`Delete ${event.message}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="text-neutral-500">No notifications yet.</p>}
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

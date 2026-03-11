import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SessionSetupView } from '../../components/SessionSetupView';
import { usePreferences } from '../preferences';
import { useAppState } from '../state';

export const QuickStartPanel = () => {
  const navigate = useNavigate();
  const { preferences, resolvedAppearance } = usePreferences();
  const { folders, templates, startSession, saveTemplate, updateTemplate, deleteTemplate, offlineReadOnly } = useAppState();
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const isDark = resolvedAppearance === 'dark';

  return (
    <aside
      className={`w-80 border-l p-8 ${
        isDark ? 'border-[#27324a] bg-[#0d1627]' : 'border-neutral-200 bg-white'
      } ${
        preferences.focusAmbienceEnabled
          ? isDark
            ? 'bg-[linear-gradient(180deg,#0d1627_0%,#101a2f_100%)]'
            : 'bg-[linear-gradient(180deg,#ffffff_0%,#f7f7ff_100%)]'
          : ''
      }`}
    >
      <SessionSetupView
        variant="compact"
        folders={folders}
        templates={templates}
        startDisabled={offlineReadOnly || isStarting}
        startError={startError}
        onStart={async ({ title, prompt, durationSec, folderId }) => {
          setStartError(null);
          setIsStarting(true);
          try {
            const session = await startSession({ title, prompt, durationSec, folderId });
            navigate(`/session/${session.id}`);
          } catch (error) {
            setStartError(error instanceof Error ? error.message : 'Unable to start session right now.');
          } finally {
            setIsStarting(false);
          }
        }}
        onSaveTemplate={saveTemplate}
        onUpdateTemplate={updateTemplate}
        onDeleteTemplate={deleteTemplate}
      />
    </aside>
  );
};

import { useState } from 'react';
import { CompletionOffLight } from './screens/CompletionOffLight';
import { CompletionOffDark } from './screens/CompletionOffDark';
import { CompletionGentleLight } from './screens/CompletionGentleLight';
import { CompletionGentleDark } from './screens/CompletionGentleDark';
import { CompletionFullLight } from './screens/CompletionFullLight';
import { CompletionFullDark } from './screens/CompletionFullDark';
import { ExportSuccessDemo } from './screens/ExportSuccessDemo';

type Intensity = 'off' | 'gentle' | 'full';
type Theme = 'light' | 'dark';
type View = 'completion' | 'export';

export default function App() {
  const [intensity, setIntensity] = useState<Intensity>('gentle');
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<View>('completion');

  const renderScreen = () => {
    if (view === 'export') {
      return <ExportSuccessDemo intensity={intensity} />;
    }

    if (intensity === 'off' && theme === 'light') return <CompletionOffLight />;
    if (intensity === 'off' && theme === 'dark') return <CompletionOffDark />;
    if (intensity === 'gentle' && theme === 'light') return <CompletionGentleLight />;
    if (intensity === 'gentle' && theme === 'dark') return <CompletionGentleDark />;
    if (intensity === 'full' && theme === 'light') return <CompletionFullLight />;
    if (intensity === 'full' && theme === 'dark') return <CompletionFullDark />;
  };

  return (
    <div className="min-h-screen">
      {/* Demo Controls */}
      <div className="fixed top-4 right-4 bg-white rounded-xl shadow-lg p-4 z-50 border border-neutral-200 space-y-3">
        <div>
          <p className="text-xs font-semibold text-neutral-700 mb-2">View</p>
          <div className="flex gap-2">
            <button
              onClick={() => setView('completion')}
              className={`px-3 py-1.5 rounded text-xs font-medium ${
                view === 'completion'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              Completion
            </button>
            <button
              onClick={() => setView('export')}
              className={`px-3 py-1.5 rounded text-xs font-medium ${
                view === 'export'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              Export
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-neutral-700 mb-2">Ritual Intensity</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIntensity('off')}
              className={`px-3 py-1.5 rounded text-xs font-medium ${
                intensity === 'off'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              Off
            </button>
            <button
              onClick={() => setIntensity('gentle')}
              className={`px-3 py-1.5 rounded text-xs font-medium ${
                intensity === 'gentle'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              Gentle
            </button>
            <button
              onClick={() => setIntensity('full')}
              className={`px-3 py-1.5 rounded text-xs font-medium ${
                intensity === 'full'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              Full
            </button>
          </div>
        </div>

        {view === 'completion' && (
          <div>
            <p className="text-xs font-semibold text-neutral-700 mb-2">Theme</p>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1.5 rounded text-xs font-medium ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1.5 rounded text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        )}
      </div>

      {renderScreen()}
    </div>
  );
}

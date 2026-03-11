import { useState } from 'react';
import { AuthPageShell } from './components/AuthPageShell';
import { AuthCard } from './components/AuthCard';

export default function App() {
  const [view, setView] = useState<'default' | 'loading' | 'success' | 'error' | 'local'>('default');

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-8">
      {/* State Switcher - For Demo Purposes */}
      <div className="fixed top-4 right-4 bg-white rounded-lg shadow-md p-4 z-50">
        <p className="text-xs font-semibold text-neutral-700 mb-2">View States:</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setView('default')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'default' ? 'bg-purple-600 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setView('loading')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'loading' ? 'bg-purple-600 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Loading
          </button>
          <button
            onClick={() => setView('success')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'success' ? 'bg-purple-600 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Success
          </button>
          <button
            onClick={() => setView('error')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'error' ? 'bg-purple-600 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            Error
          </button>
        </div>
      </div>

      <AuthPageShell>
        <AuthCard currentState={view} />
      </AuthPageShell>
    </div>
  );
}

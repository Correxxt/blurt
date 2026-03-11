import { useState } from 'react';
import { SettingsPageLight } from './pages/SettingsPageLight';
import { SettingsPageDark } from './pages/SettingsPageDark';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="min-h-screen">
      {/* Theme Switcher - For Demo */}
      <div className="fixed top-4 right-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-3 z-50 border border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              theme === 'light'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {theme === 'light' ? <SettingsPageLight /> : <SettingsPageDark />}
    </div>
  );
}

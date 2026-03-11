import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { QuickStartPanel } from '../components/QuickStartPanel';
import { Sidebar } from '../components/Sidebar';
import { usePreferences } from '../preferences';

export const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { preferences, resolvedAppearance } = usePreferences();
  const isDark = resolvedAppearance === 'dark';

  return (
    <div className={`flex h-screen relative overflow-hidden ${isDark ? 'bg-[#081225]' : 'bg-neutral-50'}`}>
      {preferences.focusAmbienceEnabled ? (
        <>
          <div
            className={`pointer-events-none absolute inset-0 ${
              isDark
                ? 'bg-[radial-gradient(circle_at_12%_0%,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.14),transparent_24%),linear-gradient(180deg,rgba(5,10,24,0.12),transparent_46%)]'
                : 'bg-[radial-gradient(circle_at_14%_0%,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(96,165,250,0.12),transparent_24%)]'
            }`}
          />
          <div className="pointer-events-none absolute inset-y-0 left-[17rem] w-px bg-gradient-to-b from-transparent via-purple-300/30 to-transparent" />
        </>
      ) : null}
      {!sidebarOpen && (
        <div
          className={`h-full w-12 shrink-0 flex items-start justify-center pt-6 relative z-20 ${
            isDark ? 'border-r border-[#27324a] bg-[#0e1728]' : 'border-r border-neutral-200 bg-white'
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Show sidebar"
            className={`rounded-lg border p-2 shadow-sm ${
              isDark
                ? 'border-[#32415f] bg-[#162238] text-[#c6d2f1] hover:text-white'
                : 'border-neutral-200 bg-white text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className={`h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
      </div>
      <main className="relative z-10 flex-1 overflow-auto px-12 py-8">
        <Outlet />
      </main>
      <QuickStartPanel />
    </div>
  );
};

import { Outlet } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { QuickStartForm } from '../components/QuickStartForm';

export function RootLayout() {
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Center Main Area */}
      <main className="flex-1 overflow-auto px-12 py-8">
        <Outlet />
      </main>
      
      {/* Right Panel */}
      <aside className="w-80 bg-white border-l border-neutral-200 p-8">
        <QuickStartForm />
      </aside>
    </div>
  );
}

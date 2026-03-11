import { SidebarBold } from './SidebarBold';
import { RecentsSectionBold } from './RecentsSectionBold';
import { QuickStartFormBold } from './QuickStartFormBold';

export function AppBoldVariant() {
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Left Sidebar */}
      <SidebarBold />
      
      {/* Center Main Area */}
      <main className="flex-1 overflow-auto px-12 py-8">
        <RecentsSectionBold />
      </main>
      
      {/* Right Panel */}
      <aside className="w-80 bg-white border-l border-neutral-200 p-8">
        <QuickStartFormBold />
      </aside>
    </div>
  );
}

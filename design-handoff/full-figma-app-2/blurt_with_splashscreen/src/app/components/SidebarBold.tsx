import { Home, Library, Users, Bell, Settings, User, Menu, Plus } from 'lucide-react';

export function SidebarBold() {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <Menu className="w-5 h-5 text-neutral-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          blurt.
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={Library} label="Your Library" />
        <NavItem icon={Users} label="Collaborate" />
        <NavItem icon={Bell} label="Notifications" />

        {/* Divider */}
        <div className="my-6 border-t border-neutral-200" />

        {/* Folders Section */}
        <div className="px-3 mb-2 text-xs font-bold text-neutral-600 uppercase tracking-wider">
          Your Folders
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors font-semibold">
          <Plus className="w-5 h-5" />
          <span className="text-sm">Add New</span>
        </button>
      </nav>

      {/* Bottom Profile */}
      <div className="p-3 border-t border-neutral-200">
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-neutral-700 flex-1">Profile</span>
          <Settings className="w-4 h-4 text-neutral-400" />
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

function NavItem({ icon: Icon, label, active }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        active
          ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-bold shadow-sm'
          : 'text-neutral-600 hover:bg-neutral-50 font-semibold'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </button>
  );
}

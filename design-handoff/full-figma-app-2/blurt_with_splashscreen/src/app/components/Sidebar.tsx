import { Home, Library, Users, Bell, Settings, User, Menu, Plus } from 'lucide-react';
import { NavLink } from 'react-router';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <Menu className="w-5 h-5 text-neutral-400" />
        <h1 className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          blurt.
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/library" icon={Library} label="Your Library" />
        <NavItem to="/collaborate" icon={Users} label="Collaborate" />
        <NavItem to="/notifications" icon={Bell} label="Notifications" />

        {/* Divider */}
        <div className="my-6 border-t border-neutral-200" />

        {/* Folders Section */}
        <div className="px-3 mb-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Your Folders
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors">
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
          <span className="text-sm font-medium text-neutral-700 flex-1">Profile</span>
          <Settings className="w-4 h-4 text-neutral-400" />
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          isActive
            ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-medium shadow-sm'
            : 'text-neutral-600 hover:bg-neutral-50'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}
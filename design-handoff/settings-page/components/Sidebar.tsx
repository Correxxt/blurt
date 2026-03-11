import { Home, Library, Users, Bell, Settings, User, Menu } from 'lucide-react';

interface SidebarProps {
  theme: 'light' | 'dark';
}

export function Sidebar({ theme }: SidebarProps) {
  const isDark = theme === 'dark';
  
  return (
    <aside className={`w-64 border-r flex flex-col ${
      isDark 
        ? 'bg-neutral-950 border-neutral-800' 
        : 'bg-white border-neutral-200'
    }`}>
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <Menu className={`w-5 h-5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} />
        <h1 className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          blurt.
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1">
        <NavItem icon={Home} label="Home" theme={theme} />
        <NavItem icon={Library} label="Your Library" theme={theme} />
        <NavItem icon={Users} label="Collaborate" theme={theme} />
        <NavItem icon={Bell} label="Notifications" theme={theme} />
        <NavItem icon={Settings} label="Settings" active theme={theme} />
      </nav>

      {/* Bottom Profile */}
      <div className={`p-3 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          isDark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-50'
        }`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className={`text-sm font-medium flex-1 ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Profile
          </span>
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  theme: 'light' | 'dark';
}

function NavItem({ icon: Icon, label, active, theme }: NavItemProps) {
  const isDark = theme === 'dark';
  
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
        active
          ? isDark
            ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-purple-300 font-medium shadow-lg'
            : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-medium shadow-sm'
          : isDark
          ? 'text-neutral-400 hover:bg-neutral-900'
          : 'text-neutral-600 hover:bg-neutral-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </button>
  );
}

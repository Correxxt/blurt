import { Bell, Folder, FolderOpen, Home, Library, Menu, Settings, Users } from 'lucide-react';
import { ElementType, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { usePreferences } from '../preferences';
import { useAppState } from '../state';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ isOpen, onToggle }: Props) => {
  const { authUser, authRequired, folders, signOut, storageMode } = useAppState();
  const { resolvedAppearance } = usePreferences();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const settingsActive = location.pathname === '/settings';
  const libraryScope = searchParams.get('scope') ?? 'all';
  const activeFolderId = searchParams.get('folderId');
  const isDark = resolvedAppearance === 'dark';

  const navButtonClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      active
        ? isDark
          ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-100 font-medium'
          : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-medium'
        : isDark
          ? 'text-slate-300 hover:bg-white/5'
          : 'text-neutral-600 hover:bg-neutral-50'
    }`;

  const folderNavActive = (scope: 'all' | 'unfiled' | 'folder', folderId?: string) =>
    location.pathname === '/library' &&
    libraryScope === scope &&
    (scope !== 'folder' || activeFolderId === folderId);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!profileMenuRef.current) {
        return;
      }
      if (!profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, []);

  return (
    <aside
      className={`h-full w-64 border-r flex flex-col transition-transform duration-300 ease-out ${
        isDark ? 'bg-[#08111f] border-[#24324a]' : 'bg-white border-neutral-200'
      } ${
        isOpen ? 'translate-x-0' : '-translate-x-[110%]'
      }`}
    >
      <div className="p-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className={isDark ? 'text-slate-500 hover:text-slate-300' : 'text-neutral-400 hover:text-neutral-600'}
        >
          <Menu className="w-5 h-5" />
        </button>
        <img src="/branding/blurt-logo.svg" alt="blurt." className="h-8 w-auto" />
      </div>

      <nav className="px-3 flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/library" icon={Library} label="Your Library" />
        <NavItem to="/collaborate" icon={Users} label="Collaborate" />
        <NavItem to="/notifications" icon={Bell} label="Notifications" />

        <div className={`my-6 border-t ${isDark ? 'border-[#24324a]' : 'border-neutral-200'}`} />

        <div className={`px-3 mb-2 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-neutral-500'}`}>Your Folders</div>
        <button
          type="button"
          onClick={() => navigate('/library?scope=all')}
          className={navButtonClass(folderNavActive('all'))}
        >
          <Library className="w-5 h-5" />
          <span className="text-sm">All Sessions</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/library?scope=unfiled')}
          className={navButtonClass(folderNavActive('unfiled'))}
        >
          <FolderOpen className="w-5 h-5" />
          <span className="text-sm">Unfiled</span>
        </button>
        {folders.map((folder) => (
          <button
            key={folder.id}
            type="button"
            onClick={() => navigate(`/library?scope=folder&folderId=${folder.id}`)}
            className={navButtonClass(folderNavActive('folder', folder.id))}
          >
            <Folder className="w-5 h-5" />
            <span className="truncate text-sm">{folder.name}</span>
          </button>
        ))}
      </nav>

      <div className={`p-3 border-t mt-auto shrink-0 relative ${isDark ? 'border-[#24324a]' : 'border-neutral-200'}`} ref={profileMenuRef}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 rounded-lg transition-colors"
            onClick={() => setProfileMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              OG
            </div>
            <span className={`text-sm font-medium flex-1 text-left ${isDark ? 'text-slate-100' : 'text-neutral-700'}`}>Profile</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setProfileMenuOpen(false);
              navigate('/settings');
            }}
            aria-label="Open settings"
            className={`rounded-lg border p-2 transition-colors ${
              settingsActive
                ? isDark
                  ? 'border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-100'
                  : 'border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700'
                : isDark
                  ? 'border-[#31415d] bg-[#0d1627] text-slate-400 hover:text-slate-200 hover:bg-[#121f35]'
                  : 'border-neutral-200 bg-white text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {profileMenuOpen && (
          <div className={`absolute left-3 right-3 bottom-full mb-2 rounded-lg border shadow-sm overflow-hidden z-20 ${
            isDark ? 'border-[#24324a] bg-[#0d1627]' : 'border-neutral-200 bg-white'
          }`}>
            <div className={`px-3 py-2 text-xs border-b ${isDark ? 'text-slate-400 border-[#1b263a]' : 'text-neutral-500 border-neutral-100'}`}>
              Mode: {storageMode}
            </div>
            <div className={`px-3 py-2 text-xs border-b truncate ${isDark ? 'text-slate-400 border-[#1b263a]' : 'text-neutral-500 border-neutral-100'}`}>
              {authRequired ? authUser?.email ?? authUser?.phone ?? 'Not signed in' : 'Local mode (no cloud account)'}
            </div>
            <button
              type="button"
              className={`w-full text-left px-3 py-2 text-sm border-b ${
                isDark
                  ? 'text-slate-100 hover:bg-white/5 border-[#1b263a]'
                  : 'text-neutral-700 hover:bg-neutral-50 border-neutral-100'
              }`}
              onClick={() => {
                setProfileMenuOpen(false);
                navigate('/settings');
              }}
            >
              Settings
            </button>
            {authRequired ? (
              <button
                type="button"
                className={`w-full text-left px-3 py-2 text-sm ${
                  isDark
                    ? 'text-red-300 hover:bg-red-500/10 border-t border-[#1b263a]'
                    : 'text-red-600 hover:bg-red-50 border-t border-neutral-100'
                }`}
                onClick={() => {
                  setProfileMenuOpen(false);
                  void signOut();
                }}
              >
                Sign out
              </button>
            ) : (
              <div className={`px-3 py-2 text-xs ${isDark ? 'text-slate-400' : 'text-neutral-500'}`}>Switch to cloud mode in `.env` to enable account actions.</div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

type NavItemProps = {
  to: string;
  icon: ElementType;
  label: string;
};

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  const { resolvedAppearance } = usePreferences();
  const isDark = resolvedAppearance === 'dark';

  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all block ${
          isActive
            ? isDark
              ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-100 font-medium shadow-sm'
              : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-medium shadow-sm'
            : isDark
              ? 'text-slate-300 hover:bg-white/5'
              : 'text-neutral-600 hover:bg-neutral-50'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );
};

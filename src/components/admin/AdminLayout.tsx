import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, loading, logout, user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add noindex meta tag for admin protection
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    if (!loading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-400">Verifying session credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
    { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (itemPath: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === itemPath;
    }
    return location.pathname.startsWith(itemPath);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex flex-col md:flex-row selection:bg-sky-500/30 selection:text-sky-300">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-[#090d16]/95 p-6 justify-between sticky top-0 h-screen z-30 shrink-0">
        
        <div className="space-y-8">
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white tracking-tight leading-none">
                Chetan Web Studio
              </h1>
              <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase block mt-1">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.path, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-lg shadow-sky-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions / Admin Profile */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              View Public Website
            </span>
          </a>

          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-sky-400 shrink-0">
                A
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">
                  {user?.email ? user.email.split('@')[0] : 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.email || 'admin@chetanwebstudio.com'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Mobile Topbar Navigation */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-[#090d16] sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">Chetan Web Studio</span>
            <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">Admin</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[#090d16]/95 backdrop-blur-xl p-6 flex flex-col justify-between pt-20">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.path, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white bg-slate-900/40'
                  }`}
                >
                  <Icon className="w-5 h-5 text-sky-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 border border-slate-700"
            >
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>View Public Website</span>
            </a>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

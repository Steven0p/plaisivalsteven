import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LINKS = [
  { to: '/admin', key: 'dashboard', label: 'Tablo Bò', end: true },
  { to: '/admin/profile', key: 'profile', label: 'Pwofil' },
  { to: '/admin/projects', key: 'projects', label: 'Pwojè' },
  { to: '/admin/messages', key: 'messages', label: 'Mesaj' },
  { to: '/admin/account', key: 'account', label: 'Kont' },
];

function SidebarContent({ user, onNavigate, onLogout }) {
  const linkClass = ({ isActive }) =>
    [
      'block rounded-sm px-4 py-2 text-sm transition-colors',
      isActive ? 'tk-accent-bg font-semibold' : 'tk-ink-muted hover:tk-surface hover:tk-ink',
    ].join(' ');

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <p className="font-display text-lg">Panèl Admin</p>
        <p className="mt-1 text-xs tk-ink-muted">{user?.username}</p>

        <nav className="mt-8 space-y-1">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass} onClick={onNavigate}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        <NavLink to="/" className="block text-xs tk-ink-muted hover:tk-ink" onClick={onNavigate}>
          ← Retounen sou sit la
        </NavLink>
        <button
          type="button"
          onClick={onLogout}
          className="w-full border px-4 py-2 text-sm tk-border tk-radius transition-colors hover:tk-surface"
        >
          Dekonekte
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = 'editorial';
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const currentLabel = LINKS.find((link) => link.to === location.pathname)?.label || 'Panèl Admin';

  return (
    <div className="min-h-screen tk-bg tk-ink md:flex">
      {/* Tèt-baton mobil */}
      <div className="flex items-center justify-between border-b tk-border px-4 py-3 md:hidden">
        <p className="font-display text-base">{currentLabel}</p>
        <button
          type="button"
          className="tk-ink"
          aria-label="Meni admin"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Sidebar — toujou vizib sou desktop, meni deplyan sou mobil */}
      <aside
        className={[
          'z-30 border-r tk-border tk-bg md:static md:block md:w-60 md:shrink-0',
          open ? 'block' : 'hidden',
        ].join(' ')}
      >
        <SidebarContent user={user} onLogout={handleLogout} onNavigate={() => setOpen(false)} />
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

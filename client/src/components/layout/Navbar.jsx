import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { useProfile } from '../../context/ProfileContext';

const NAV_ITEMS = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/projects', key: 'projects' },
  { to: '/contact', key: 'contact' },
];

function initialsFrom(fullName) {
  if (!fullName) return '••';
  const parts = fullName.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join('');
}

export default function Navbar() {
  const { t, language, setLanguage, languages } = useLanguage();
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    [
      'text-sm tracking-wide uppercase transition-colors',
      isActive ? 'tk-accent' : 'tk-ink-muted hover:tk-ink',
    ].join(' ');

  return (
    <header className="sticky top-0 z-40 border-b tk-border tk-bg backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg tk-ink" onClick={() => setOpen(false)}>
          {profile?.photo ? (
            <img
              src={profile.photo}
              alt=""
              aria-hidden="true"
              className="h-8 w-8 shrink-0 border tk-border object-cover tk-radius"
            />
          ) : (
            <span
              className="flex h-8 w-8 items-center justify-center text-xs font-bold tk-accent-bg tk-radius"
              aria-hidden="true"
            >
              {initialsFrom(profile?.full_name)}
            </span>
          )}
          <span className="hidden sm:inline">{profile?.full_name || '—'}</span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {profile?.cv_url && (
            <a
              href={profile.cv_url}
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm tracking-wide uppercase tk-ink-muted hover:tk-ink transition-colors sm:inline"
            >
              {t('common.downloadCV')}
            </a>
          )}

          <div className="flex overflow-hidden border tk-border tk-radius" role="group" aria-label="Lang">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={[
                  'px-2 py-1 text-xs font-medium transition-colors',
                  language === code ? 'tk-accent-bg' : 'tk-ink-muted hover:tk-ink',
                ].join(' ')}
                aria-pressed={language === code}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="tk-ink md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t tk-border px-6 py-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'} onClick={() => setOpen(false)}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

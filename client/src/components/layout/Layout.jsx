import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const THEME_BY_PATH = {
  '/': 'editorial',
  '/about': 'ayiti',
  '/projects': 'terminal',
  '/contact': 'brutalist',
};

export function themeForPath(pathname) {
  return THEME_BY_PATH[pathname] || 'editorial';
}

export default function Layout() {
  const { pathname } = useLocation();
  const theme = themeForPath(pathname);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col tk-bg tk-ink">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

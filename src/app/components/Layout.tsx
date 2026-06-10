import { Link, Outlet, useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

export default function Layout() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="size-full flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-card border-b border-border px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl" style={{ color: '#5b5bff', fontWeight: 700 }}>Twin-Market</h1>
        </Link>

        {/* Navigation Menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className={`text-sm ${location.pathname === '/' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t('nav.home')}
          </Link>
          <Link to="/sell" className={`text-sm ${location.pathname === '/sell' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t('nav.sell')}
          </Link>
          <div className="w-px h-5 bg-border"></div>
          <Link to="/generate" className={`text-sm ${location.pathname === '/generate' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t('nav.generate')}
          </Link>
          <Link to="/gallery" className={`text-sm ${location.pathname === '/gallery' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t('nav.gallery')}
          </Link>
          <Link to="/settings" className={`text-sm ${location.pathname === '/settings' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t('nav.settings')}
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

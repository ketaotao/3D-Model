import { Link, Outlet, useLocation } from 'react-router';
import { Box, Image, Settings, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Box, label: '생성' },
    { path: '/gallery', icon: Image, label: '갤러리' },
    { path: '/settings', icon: Settings, label: '설정' },
  ];

  return (
    <div className="size-full flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-20 border-b border-[var(--panel-border)] backdrop-blur-xl bg-[var(--panel-bg)]/80 px-8 flex items-center justify-between relative z-10"
        style={{
          boxShadow: '0 4px 24px rgba(0, 212, 255, 0.08)'
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#6366f1] flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ffa3] rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl tracking-tight">제네시스 3D</h1>
            <p className="text-xs text-muted-foreground">AI 모델 스튜디오</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative px-6 py-2.5 rounded-lg transition-all group"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-[#6366f1]/10 border border-primary/30 rounded-lg"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className={`text-sm transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-lg bg-input-background border border-border">
            <span className="text-sm text-muted-foreground">크레딧: </span>
            <span className="text-sm text-primary">245</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#6366f1] flex items-center justify-center border-2 border-primary/30 cursor-pointer hover:scale-105 transition-transform">
            <span className="text-sm">김</span>
          </div>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

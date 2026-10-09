import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ActiveTab } from '../../types';
import { LayoutDashboard, BookOpen, Sliders, Compass, MapPin, Award } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Today', icon: <LayoutDashboard size={18} /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen size={18} /> },
    { id: 'games', label: 'Simulators', icon: <Sliders size={18} /> },
    { id: 'quiz', label: 'Quiz', icon: <Compass size={18} /> },
    { id: 'scenarios', label: 'Stories', icon: <MapPin size={18} /> },
    { id: 'progress', label: 'Progress', icon: <Award size={18} /> },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '64px',
      zIndex: 900,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.03)'
    }} className="mobile-only-nav">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              color: isActive ? 'var(--black)' : 'var(--text-muted)',
              fontSize: '0.68rem',
              fontWeight: isActive ? 600 : 500,
              padding: '6px 8px',
              borderTop: isActive ? '2px solid var(--black)' : '2px solid transparent',
              marginTop: isActive ? '-2px' : '0',
              flex: 1
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}

      <style>{`
        @media (min-width: 861px) {
          .mobile-only-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

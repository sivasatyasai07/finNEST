import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ActiveTab } from '../../types';
import { Flame, BookOpen, Compass, Sliders, MapPin, Sparkles, LogIn, LogOut, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userState, 
    openAuthModal, 
    signOut 
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Changed 'Play' to 'Simulators' as requested
  const navLinks: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'learn', label: 'Learn', icon: <BookOpen size={15} /> },
    { id: 'games', label: 'Simulators', icon: <Sliders size={15} /> },
    { id: 'quiz', label: 'Quiz', icon: <Compass size={15} /> },
    { id: 'scenarios', label: 'Scenarios', icon: <MapPin size={15} /> },
    { id: 'progress', label: 'Progress', icon: <Sparkles size={15} /> },
  ];

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--background)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(6px)',
      background: 'rgba(231, 231, 226, 0.96)'
    }}>
      <div className="container-editorial" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Brand / Logo with the given logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.85rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Logo Image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img 
              src="/logo.png" 
              alt="finNEST Logo" 
              style={{
                height: '38px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <span 
            className="brand-pill"
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.66rem', 
              letterSpacing: '0.14em', 
              textTransform: 'uppercase', 
              color: 'var(--accent-earth)',
              fontWeight: 700,
              borderLeft: '1px solid var(--border)',
              paddingLeft: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            THE MONEY MANAGEMENT APP
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ 
          display: 'none', 
          alignItems: 'center', 
          gap: '1.75rem' 
        }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--black)' : 'var(--text-secondary)',
                  padding: '0.4rem 0',
                  position: 'relative',
                  borderBottom: isActive ? '1.5px solid var(--black)' : '1.5px solid transparent',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Streak indicator (Starts strictly at 0) */}
          <div 
            onClick={() => setActiveTab('progress')}
            title="Current Learning Streak (starts at 0)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              backgroundColor: 'var(--surface)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Flame size={14} color={userState.streakDays > 0 ? '#C25E38' : 'var(--text-muted)'} />
            <span>{userState.streakDays}d</span>
          </div>

          {/* XP Badge (Starts strictly at 0) */}
          <div 
            onClick={() => setActiveTab('progress')}
            title="Real-Time XP Points"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              backgroundColor: 'var(--surface)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            className="desktop-xp"
          >
            <span style={{ color: 'var(--accent-earth)' }}>✦</span>
            <span>{userState.xp} XP</span>
          </div>

          {/* User Auth or Profile Button (NO EMOJIS - Clean Monogram Badge) */}
          {userState.isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.85rem',
                  border: '1px solid var(--border-dark)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--surface)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--black)'
                }}
              >
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--black)',
                  color: '#FAF9F5',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '0.04em'
                }}>
                  {userState.avatarInitials || userState.name.slice(0, 2).toUpperCase()}
                </span>
                <span>{userState.name}</span>
              </button>

              {isUserMenuOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '115%',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-dark)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                    borderRadius: '2px',
                    minWidth: '220px',
                    zIndex: 200,
                    padding: '0.5rem 0'
                  }}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600 }}>{userState.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{userState.email}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--accent-earth)', marginTop: '0.2rem' }}>
                      {userState.xp} XP · {userState.streakDays}d Streak
                    </p>
                  </div>

                  <button
                    onClick={() => { setActiveTab('dashboard'); setIsUserMenuOpen(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <BookOpen size={14} /> Student Dashboard
                  </button>

                  <button
                    onClick={() => { setActiveTab('settings'); setIsUserMenuOpen(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Settings size={14} /> Profile Settings
                  </button>

                  <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                    <button
                      onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.6rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.82rem',
                        color: 'var(--error)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => openAuthModal('signin')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--surface)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--black)'
                }}
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="btn-solid"
                style={{
                  fontSize: '0.78rem',
                  padding: '0.45rem 0.85rem'
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-xp {
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          .brand-pill {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

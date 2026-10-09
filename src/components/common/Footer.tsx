import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--surface)',
      marginTop: '6rem',
      paddingTop: '4rem',
      paddingBottom: '3.5rem'
    }}>
      <div className="container-editorial">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand & Editorial Ethos */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.45rem', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}>
                finNEST
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              An interactive, calm, and trustworthy financial literacy studio designed specifically for Indian teenagers. Building healthy money habits through real choices and zero jargon.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '0.35rem 0.75rem',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface-muted)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)'
            }}>
              THE MONEY MANAGEMENT APP · Bharat Gen-Z
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '1.2rem', color: 'var(--black)' }}>
              Curriculum Hub
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <button 
                  onClick={() => setActiveTab('learn')} 
                  style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Essential Lessons Library
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('games')} 
                  style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Financial Decision Simulators
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('scenarios')} 
                  style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Money, Where You Are (Regional)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('quiz')} 
                  style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Financial Confidence Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Principles */}
          <div>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '1.2rem', color: 'var(--black)' }}>
              Our Editorial Principles
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.88rem' }}>Small choices. Stronger futures.</strong>
                <span style={{ fontSize: '0.8rem' }}>Daily discipline matters more than big windfalls.</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.88rem' }}>Pause. Check. Then pay.</strong>
                <span style={{ fontSize: '0.8rem' }}>Protecting yourself from digital fraud is step one.</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.88rem' }}>Every rupee has a role.</strong>
                <span style={{ fontSize: '0.8rem' }}>Intentional allocation removes money guilt.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="editorial-divider" style={{ marginBottom: '2rem' }} />

        {/* Bottom Bar with required exact text */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong>FinNest</strong> — The Money Management App.
          </div>
          <div>
            Designed for educational exploration · Local simulated state · No actual transactions
          </div>
        </div>
      </div>
    </footer>
  );
};

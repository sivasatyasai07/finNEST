import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, MapPin, IndianRupee, Target, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    openAuthModal, 
    signIn, 
    signUp
  } = useApp();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gradeOrAge, setGradeOrAge] = useState('11th Grade · 16 yrs');
  const [city, setCity] = useState('Bengaluru');
  const [monthlyPocketMoney, setMonthlyPocketMoney] = useState('2000');
  const [primaryGoal, setPrimaryGoal] = useState('Build smart savings & avoid digital UPI scams');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn(email, password);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await signUp({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        avatarInitials: name.trim().slice(0, 2).toUpperCase(),
        gradeOrAge,
        city,
        monthlyPocketMoney: Number(monthlyPocketMoney) || 1500,
        primaryGoal
      });

      if (!res.success) {
        setErrorMessage(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal} style={{ zIndex: 1200, padding: '1rem', overflowY: 'auto' }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '490px',
          width: '100%',
          maxHeight: 'min(90vh, 680px)',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-dark)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
          backgroundColor: 'var(--surface)',
          borderRadius: '4px',
          overflow: 'hidden',
          margin: 'auto'
        }}
      >
        {/* Modal Header: Clean Typography Only (Logo removed as requested: only in title) */}
        <div style={{
          padding: '1rem 1.25rem 0.8rem 1.25rem',
          backgroundColor: '#0F0F0F',
          color: '#FAF9F5',
          borderBottom: '1px solid #2B2A27',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          textAlign: 'center',
          flexShrink: 0
        }}>
          <button 
            onClick={closeAuthModal}
            style={{ 
              position: 'absolute',
              right: '12px',
              top: '12px',
              background: 'transparent',
              color: '#A8A69E',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            color: '#FAF9F5',
            letterSpacing: '-0.02em',
            marginBottom: '0.15rem'
          }}>
            finNEST
          </h2>

          <span style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '0.64rem', 
            letterSpacing: '0.14em', 
            textTransform: 'uppercase', 
            color: '#BDB9AD',
            fontWeight: 700 
          }}>
            THE MONEY MANAGEMENT APP
          </span>

          {/* Database indicator badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: '0.35rem',
            padding: '0.18rem 0.6rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            fontSize: '0.64rem',
            color: '#E2E0D8'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            <span>Supabase Cloud Database Auth</span>
          </div>
        </div>

        {/* Tab switch (Fixed header, does not scroll away) */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface-muted)',
          flexShrink: 0
        }}>
          <button
            onClick={() => { openAuthModal('signin'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '0.8rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: authModalMode === 'signin' ? 'var(--surface)' : 'transparent',
              borderBottom: authModalMode === 'signin' ? '2.5px solid var(--black)' : 'none',
              color: authModalMode === 'signin' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { openAuthModal('signup'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '0.8rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: authModalMode === 'signup' ? 'var(--surface)' : 'transparent',
              borderBottom: authModalMode === 'signup' ? '2.5px solid var(--black)' : 'none',
              color: authModalMode === 'signup' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body: Fully Scrollable so all fields and buttons are reachable */}
        <div 
          className="modal-scroll-area"
          style={{
            padding: '1.25rem 1.5rem',
            overflowY: 'auto',
            flex: '1 1 auto',
            minHeight: 0,
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {errorMessage && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#FDE8E8',
              border: '1px solid var(--error)',
              borderRadius: '2px',
              fontSize: '0.84rem',
              color: 'var(--error)'
            }}>
              {errorMessage}
            </div>
          )}

          {authModalMode === 'signin' ? (
            <form onSubmit={handleSignIn} autoComplete="off">
              <div style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    autoComplete="off"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.9rem',
                      borderRadius: '2px'
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.35rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="off"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.9rem',
                      borderRadius: '2px'
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ paddingBottom: '1.25rem' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-solid"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '0.92rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      <span>Connecting to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Money Dashboard</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Rohan Varma"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.9rem',
                      borderRadius: '2px'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@school.edu"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.9rem',
                      borderRadius: '2px'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Create Password (min. 6 characters)
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    minLength={6}
                    autoComplete="new-password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.9rem',
                      borderRadius: '2px'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Grade & City in 2 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Grade / Age
                  </label>
                  <select
                    value={gradeOrAge}
                    onChange={e => setGradeOrAge(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.85rem',
                      borderRadius: '2px'
                    }}
                  >
                    <option value="9th Grade · 14 yrs">9th Grade · 14 yrs</option>
                    <option value="10th Grade · 15 yrs">10th Grade · 15 yrs</option>
                    <option value="11th Grade · 16 yrs">11th Grade · 16 yrs</option>
                    <option value="12th Grade · 17 yrs">12th Grade · 17 yrs</option>
                    <option value="College 1st Year · 18 yrs">College 1st Year · 18 yrs</option>
                    <option value="Young Adult · 19+ yrs">Young Adult · 19+ yrs</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    City
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '13px', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Pune"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 2.1rem',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--white)',
                        fontSize: '0.85rem',
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Pocket Money */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Monthly Pocket Money (₹)
                </label>
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <input
                    type="number"
                    value={monthlyPocketMoney}
                    onChange={e => setMonthlyPocketMoney(e.target.value)}
                    placeholder="2000"
                    min="200"
                    step="100"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.9rem',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>

              {/* Primary Goal */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Learning Goal
                </label>
                <div style={{ position: 'relative' }}>
                  <Target size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  <select
                    value={primaryGoal}
                    onChange={e => setPrimaryGoal(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--white)',
                      fontSize: '0.85rem',
                      borderRadius: '2px'
                    }}
                  >
                    <option value="Build smart savings & avoid digital UPI scams">Build smart savings & avoid digital UPI scams</option>
                    <option value="Stop impulse online spending & track wants vs needs">Stop impulse online spending & track wants vs needs</option>
                    <option value="Learn compound interest, SIPs & investing fundamentals">Learn compound interest, SIPs & investing fundamentals</option>
                    <option value="Prepare budget for college hostel / student life">Prepare budget for college hostel / student life</option>
                  </select>
                </div>
              </div>

              <div style={{
                padding: '0.65rem 0.85rem',
                backgroundColor: 'var(--surface-muted)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)'
              }}>
                <ShieldCheck size={16} color="var(--success)" />
                <span>All progress metrics start at 0 XP and 0 days.</span>
              </div>

              {/* Register Button: Clean, Visible, and Fully Scrollable */}
              <div style={{ paddingTop: '0.5rem', paddingBottom: '2.5rem' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-solid"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '0.92rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      <span>Creating in Supabase...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Account & Start at 0 XP</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

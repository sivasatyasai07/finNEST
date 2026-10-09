import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw, Check, AlertTriangle, LogIn, LogOut } from 'lucide-react';

export const UserSettings: React.FC = () => {
  const { 
    userState, 
    updateProfile, 
    resetProgress, 
    accounts, 
    switchAccount, 
    openAuthModal, 
    signOut 
  } = useApp();

  const [name, setName] = useState(userState.name);
  const [email, setEmail] = useState(userState.email);
  const [city, setCity] = useState(userState.city);
  const [gradeOrAge, setGradeOrAge] = useState(userState.gradeOrAge);
  const [monthlyPocketMoney, setMonthlyPocketMoney] = useState(userState.monthlyPocketMoney.toString());
  const [primaryGoal, setPrimaryGoal] = useState(userState.primaryGoal || 'Build smart savings & avoid digital UPI scams');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || 'Student',
      email: email.trim(),
      city: city.trim() || 'Bengaluru',
      gradeOrAge,
      avatarInitials: name.trim().slice(0, 2).toUpperCase(),
      monthlyPocketMoney: parseInt(monthlyPocketMoney, 10) || 2000,
      primaryGoal
    });
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: '780px' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        paddingBottom: '2rem',
        marginBottom: '2.5rem'
      }}>
        <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--accent-earth)' }}>
          THE MONEY MANAGEMENT APP · PREFERENCES
        </span>
        <h1 className="heading-section" style={{ marginBottom: '0.75rem' }}>
          Student Profile & Sandbox Settings
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
          Tailor your simulation parameters, manage user accounts, and track your progress baseline.
        </p>
      </div>

      {/* Account Session Card (NO EMOJIS - Clean Monogram) */}
      <div className="editorial-card" style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: 'var(--surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--black)',
              color: '#FAF9F5',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.04em'
            }}>
              {userState.avatarInitials || userState.name.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{userState.name}</h3>
                <span className="editorial-tag" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                  {userState.isAuthenticated ? 'Signed In (Supabase)' : 'Guest Mode'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {userState.email} · {userState.xp} XP · {userState.streakDays}d Streak
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {userState.isAuthenticated ? (
              <button
                onClick={signOut}
                className="btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="btn-solid"
                style={{ fontSize: '0.8rem', padding: '0.55rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <LogIn size={14} /> Sign In / Switch
              </button>
            )}
          </div>
        </div>

        {/* Multi-Account Switcher (NO EMOJIS) */}
        {accounts.length > 1 && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.6rem' }}>
              Switch Between Saved Student Accounts:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {accounts.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => switchAccount(acc.id)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    border: acc.email === userState.email ? '1.5px solid var(--black)' : '1px solid var(--border)',
                    backgroundColor: acc.email === userState.email ? 'var(--black)' : 'var(--surface-card)',
                    color: acc.email === userState.email ? '#fff' : 'var(--text-primary)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: acc.email === userState.email ? 'rgba(255,255,255,0.2)' : 'var(--surface-muted)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {acc.avatarInitials}
                  </span>
                  <span>{acc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Form Card */}
      <div className="editorial-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '1.75rem' }}>
          Personal Details & Budget Parameters
        </h2>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                Grade / Age
              </label>
              <select
                value={gradeOrAge}
                onChange={(e) => setGradeOrAge(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
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
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                City / Region
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru, Mumbai, Jaipur"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Monthly Pocket Money (₹ / Month)
            </label>
            <input
              type="number"
              value={monthlyPocketMoney}
              onChange={(e) => setMonthlyPocketMoney(e.target.value)}
              placeholder="2000"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-card)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Primary Goal */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Primary Financial Learning Goal
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-card)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            >
              <option value="Build smart savings & avoid digital UPI scams">Build smart savings & avoid digital UPI scams</option>
              <option value="Stop impulse online spending & track wants vs needs">Stop impulse online spending & track wants vs needs</option>
              <option value="Learn compound interest, SIPs & investing fundamentals">Learn compound interest, SIPs & investing fundamentals</option>
              <option value="Prepare budget for college hostel / student life">Prepare budget for college hostel / student life</option>
            </select>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
              <Check size={16} /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Simulator Data Management */}
      <div className="editorial-card" style={{ padding: '2.5rem', backgroundColor: 'var(--surface-card)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '0.5rem' }}>
          Data Reset & Sandbox Engine
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          You can return all learning metrics cleanly back to 0 XP, 0 streak days, and reset all completed lessons at any time.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn-secondary"
            style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
          >
            <RotateCcw size={15} /> Reset All Progress to 0
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)', marginBottom: '0.75rem' }}>
              <AlertTriangle size={20} />
              <span className="text-eyebrow" style={{ color: 'var(--error)' }}>Confirm Reset</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.75rem' }}>
              Reset All Progress to 0?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              This will return your XP, learning streak, badges, and completed lessons back to 0 so you can experience the progression anew.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => setShowResetConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button 
                onClick={handleConfirmReset} 
                className="btn-primary"
                style={{ backgroundColor: 'var(--error)', borderColor: 'var(--error)' }}
              >
                Yes, Reset to 0
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

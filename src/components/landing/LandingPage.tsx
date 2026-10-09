import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Sliders, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  PieChart, 
  Award, 
  AlertTriangle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, openAuthModal, userState } = useApp();

  // Unified single student allowance slider (requirement 1: only ONE type, no 3 tabs)
  const [pocketMoney, setPocketMoney] = useState<number>(2500);

  // Interactive SIP Compounding Simulator State
  const [monthlyInvest, setMonthlyInvest] = useState<number>(500);
  const [years, setYears] = useState<number>(5);

  // Interactive Scam Tester Widget State
  const [activeScamTest, setActiveScamTest] = useState<number | null>(null);
  const [scamFeedback, setScamFeedback] = useState<string | null>(null);

  // Calculations for 50/30/20
  const needsAmount = Math.round(pocketMoney * 0.50);
  const wantsAmount = Math.round(pocketMoney * 0.30);
  const savingsAmount = Math.round(pocketMoney * 0.20);

  // SIP Compound Interest Calculation: A = P * [((1 + r)^n - 1) / r] * (1 + r)
  const monthlyRate = 0.12 / 12;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvest * totalMonths;
  const futureValue = Math.round(
    monthlyInvest * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
  );
  const wealthGained = futureValue - totalInvested;

  const handleTestScam = (option: 'scam' | 'safe', _isCorrect: boolean, msg: string) => {
    setActiveScamTest(option === 'scam' ? 1 : 2);
    setScamFeedback(msg);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ 
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle geometric lines */}
        <div 
          className="deco-circle" 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '8%', 
            opacity: 0.6 
          }} 
        />
        <div style={{
          position: 'absolute',
          top: '110px',
          left: '3%',
          width: '80px',
          height: '1px',
          backgroundColor: 'var(--border)',
          opacity: 0.5
        }} />

        <div className="container-editorial">
          {/* Asymmetric Split Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center'
          }}>
            {/* Left Column: Editorial Copy */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Editorial Tag */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="editorial-tag" style={{ 
                  backgroundColor: 'var(--surface-card)', 
                  borderColor: 'var(--border-dark)',
                  color: 'var(--accent-earth)',
                  fontWeight: 700
                }}>
                  THE MONEY MANAGEMENT APP
                </span>
              </div>

              {/* Display Heading */}
              <h1 className="heading-display" style={{ marginBottom: '1.5rem', maxWidth: '640px' }}>
                Master money before the real world tests you.
              </h1>

              {/* Supporting Text */}
              <p style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                marginBottom: '2.25rem',
                maxWidth: '560px'
              }}>
                The smart financial companion built for young Indians. Learn budget discipline, dodge UPI scams, simulate SIP compounding, and build habits from 0 to 100.
              </p>

              {/* Actions CTAs: Only Single Primary Button (requirement 4: removed try interactive games button) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2.75rem'
              }}>
                <button 
                  onClick={() => userState.isAuthenticated ? setActiveTab('dashboard') : openAuthModal('signup')} 
                  className="btn-primary"
                  style={{ padding: '0.9rem 2.2rem', fontSize: '0.88rem' }}
                >
                  <span>{userState.isAuthenticated ? 'Launch Dashboard' : 'Get Started Free'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Zero-Progress Highlights Ticker (requirement 6: Starts at 0) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--black)' }}>
                    0 → 1,000+
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    XP Progression
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--black)' }}>
                    ₹0 Risk
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Sandbox Simulator
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--black)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Indian Context
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Money Management Visualizer (Single type only) */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                border: '1px solid var(--border-dark)',
                padding: '1.5rem',
                backgroundColor: 'var(--surface)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                borderRadius: '2px'
              }}>
                {/* Header bar of interactive card */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PieChart size={18} color="var(--accent-earth)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                      SMART 50/30/20 BUDGET SIMULATOR
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.2rem 0.5rem', 
                    backgroundColor: 'var(--surface-muted)', 
                    border: '1px solid var(--border)',
                    fontWeight: 600
                  }}>
                    LIVE DEMO
                  </span>
                </div>

                {/* Single unified allowance pool (requirement 1: no 3 different types) */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Monthly Student Allowance:
                    </span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--black)' }}>
                      ₹{pocketMoney.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="250"
                    value={pocketMoney}
                    onChange={e => setPocketMoney(Number(e.target.value))}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      accentColor: 'var(--black)'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>₹500</span>
                    <span>Drag slider to test trade-offs</span>
                    <span>₹15,000</span>
                  </div>
                </div>

                {/* Live Allocations Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {/* Needs */}
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600 }}>50% Essentials (Needs)</span>
                      <span style={{ fontWeight: 700 }}>₹{needsAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--black)' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                      Coaching notes, metro card, canteen lunch, mobile recharge
                    </span>
                  </div>

                  {/* Wants */}
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600 }}>30% Comforts (Wants)</span>
                      <span style={{ fontWeight: 700 }}>₹{wantsAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '30%', height: '100%', backgroundColor: 'var(--accent-earth)' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                      Weekend cafes, movie outings, digital subscriptions, treats
                    </span>
                  </div>

                  {/* Savings */}
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--success)' }}>20% Wealth & Buffer</span>
                      <span style={{ fontWeight: 700, color: 'var(--success)' }}>₹{savingsAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '20%', height: '100%', backgroundColor: 'var(--success)' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                      Emergency buffer, gadget sinking fund, index fund SIP
                    </span>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => setActiveTab('games')}
                  className="btn-solid"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.82rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Sliders size={15} /> Open Full Budget Builder Simulator
                </button>
              </div>

              {/* Floating Badge (No emojis) */}
              <div style={{
                position: 'absolute',
                bottom: '-18px',
                right: '-12px',
                backgroundColor: 'var(--black)',
                color: 'var(--white)',
                padding: '0.65rem 1rem',
                borderRadius: '2px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}>
                <Award size={14} color="#D97706" />
                <span>Earn 45+ XP upon balancing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Divider */}
      <div className="container-editorial">
        <div className="editorial-divider" />
      </div>

      {/* Section 2: Three Core Interactive Pillars */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container-editorial">
          <div style={{ maxWidth: '680px', marginBottom: '3rem' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--accent-earth)' }}>
              Interactive Learning Ecosystem
            </span>
            <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
              Real decisions. Relatable contexts. Real confidence.
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Indian teenagers are navigating UPI soundboxes, online sales countdowns, friend group outings, and first freelance earnings earlier than ever. FinNest replaces dry lectures with visceral simulations.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}>
            {/* Pillar 1 */}
            <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="text-eyebrow">Pillar I · Simulation</span>
                <Sliders size={20} color="var(--accent-earth)" />
              </div>
              <h3 className="heading-card" style={{ marginBottom: '0.75rem' }}>
                Tactile Budget Simulator
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                Allocate ₹2,000 monthly pocket money across food, transport, emergency buffer, and savings. Learn how small trade-offs keep you solvent until month-end.
              </p>
              <button 
                onClick={() => setActiveTab('games')}
                className="btn-ghost"
              >
                <span>Try Budget Builder</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Pillar 2 */}
            <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="text-eyebrow">Pillar II · Security</span>
                <ShieldCheck size={20} color="var(--accent-earth)" />
              </div>
              <h3 className="heading-card" style={{ marginBottom: '0.75rem' }}>
                Scam Detective & UPI Hygiene
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                Spot fake KYC SMS, deceptive reward QR codes, and campus job scams. Understand that your UPI PIN is only for deductions, never for receiving cashback.
              </p>
              <button 
                onClick={() => setActiveTab('games')}
                className="btn-ghost"
              >
                <span>Inspect Fraud Examples</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Pillar 3 */}
            <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="text-eyebrow">Pillar III · Regional Bharat</span>
                <Compass size={20} color="var(--accent-earth)" />
              </div>
              <h3 className="heading-card" style={{ marginBottom: '0.75rem' }}>
                Everyday Money Scenarios
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                Explore 8 authentic regional case studies: coaching commute in Mumbai, family craft shops in Jaipur, and first freelance invoices in Hyderabad.
              </p>
              <button 
                onClick={() => setActiveTab('scenarios')}
                className="btn-ghost"
              >
                <span>Read Regional Stories</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive SIP & Compounding Wealth Calculator */}
      <section style={{ 
        backgroundColor: 'var(--surface)', 
        borderTop: '1px solid var(--border)', 
        borderBottom: '1px solid var(--border)', 
        padding: '5rem 0' 
      }}>
        <div className="container-editorial">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Educational Content */}
            <div>
              <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.85rem', color: 'var(--accent-earth)' }}>
                Power of Starting at Age 16
              </span>
              <h2 className="heading-section" style={{ marginBottom: '1.25rem' }}>
                “Compound interest is the eighth wonder of the world.”
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                A teenager who sets aside just ₹500 a month starting at 16 can build more wealth than someone starting with ₹2,000 a month at age 26. Time in the market beats timing the market.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} color="var(--success)" />
                  <span>Start with as little as ₹100 or ₹500 per month</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} color="var(--success)" />
                  <span>Your money earns interest on past interest earned</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} color="var(--success)" />
                  <span>Learn index mutual funds & diversified assets with 0 jargon</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('learn')} 
                className="btn-primary"
                style={{ padding: '0.85rem 1.8rem' }}
              >
                <span>Read Investing Basics Lesson</span>
                <Sparkles size={15} />
              </button>
            </div>

            {/* Right Column: Interactive Compound Growth Simulator Box */}
            <div style={{ 
              border: '1px solid var(--border-dark)', 
              padding: '1.5rem', 
              backgroundColor: 'var(--surface-card)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className="text-eyebrow" style={{ color: 'var(--black)' }}>
                  SIP WEALTH CALCULATOR
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-earth)', fontWeight: 600 }}>
                  EST. 12% ANNUAL RETURN
                </span>
              </div>

              {/* Monthly Amount Slider */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Monthly Investment:</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{monthlyInvest.toLocaleString('en-IN')}/mo</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={monthlyInvest}
                  onChange={e => setMonthlyInvest(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--black)', cursor: 'pointer' }}
                />
              </div>

              {/* Years Selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Investment Horizon:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {[3, 5, 8, 10].map(y => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      style={{
                        padding: '0.45rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        backgroundColor: years === y ? 'var(--black)' : 'var(--surface)',
                        color: years === y ? '#ffffff' : 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '2px',
                        cursor: 'pointer'
                      }}
                    >
                      {y} Years
                    </button>
                  ))}
                </div>
              </div>

              {/* Projected Results Card */}
              <div style={{
                padding: '1.25rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                marginBottom: '1.25rem',
                borderRadius: '2px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Deposited</span>
                    <p style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.2rem' }}>
                      ₹{totalInvested.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--success)', textTransform: 'uppercase' }}>Wealth Gained</span>
                    <p style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--success)', marginTop: '0.2rem' }}>
                      +₹{wealthGained.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Maturity Corpus</span>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--black)', marginTop: '0.1rem' }}>
                    ₹{futureValue.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                *Illustrative compounding projection at 12% CAGR. Mutual fund investments are subject to market risks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Live Interactive Scam Detector Simulator (No Emojis) */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container-editorial">
          <div style={{ maxWidth: '640px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--accent-earth)' }}>
              Live Security Challenge
            </span>
            <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
              Can you spot this UPI transaction fraud?
            </h2>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
              Test your instinct right now. Tap whether this sample message is an authentic bank alert or a predatory cyber scam.
            </p>
          </div>

          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-dark)',
              padding: '1.75rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#FDE8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertTriangle size={16} color="#DC2626" />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block' }}>SMS from "VM-SBINB"</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Received 10 mins ago</span>
                </div>
              </div>

              <div style={{
                padding: '1.25rem',
                backgroundColor: 'var(--surface-card)',
                border: '1px dashed var(--border-dark)',
                fontSize: '0.92rem',
                lineHeight: '1.6',
                fontFamily: 'monospace',
                marginBottom: '1.5rem',
                borderRadius: '2px'
              }}>
                "Dear SBI Customer, your YONO Account is suspended due to expired PAN card. Please update within 2 hours to avoid penalty: http://sbi-kyc-verify-portal.in/pan"
              </div>

              {/* Choice Buttons (NO EMOJIS - Clean Icons) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => handleTestScam('scam', true, 'Correct! Banks NEVER threaten 2-hour suspensions via SMS or use unofficial .in/pan domain links. Official portals end in .sbi.')}
                  style={{
                    padding: '0.85rem',
                    backgroundColor: activeScamTest === 1 ? 'var(--black)' : 'var(--white)',
                    color: activeScamTest === 1 ? '#ffffff' : 'var(--text-primary)',
                    border: '1px solid var(--border-dark)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                >
                  <AlertTriangle size={16} color={activeScamTest === 1 ? '#ffffff' : 'var(--error)'} />
                  <span>Phishing Scam</span>
                </button>

                <button
                  onClick={() => handleTestScam('safe', false, 'Incorrect! Clicking that link will compromise your banking credentials. Real banks never send urgency ultimatum links via SMS.')}
                  style={{
                    padding: '0.85rem',
                    backgroundColor: activeScamTest === 2 ? 'var(--black)' : 'var(--white)',
                    color: activeScamTest === 2 ? '#ffffff' : 'var(--text-primary)',
                    border: '1px solid var(--border-dark)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={16} color={activeScamTest === 2 ? '#ffffff' : 'var(--success)'} />
                  <span>Legitimate SMS</span>
                </button>
              </div>

              {/* Feedback Alert */}
              {scamFeedback && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: activeScamTest === 1 ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${activeScamTest === 1 ? 'var(--success)' : 'var(--error)'}`,
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem'
                }}>
                  {activeScamTest === 1 ? (
                    <CheckCircle2 size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <AlertTriangle size={18} color="var(--error)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <span>{scamFeedback}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '4.5rem 0' }}>
        <div className="container-editorial" style={{ textAlign: 'center' }}>
          <span className="text-eyebrow" style={{ color: 'var(--accent-sand)', marginBottom: '0.75rem', display: 'block' }}>
            START YOUR FINANCIAL EDUCATION TODAY
          </span>
          <h2 className="heading-section" style={{ color: 'var(--white)', marginBottom: '1.25rem', maxWidth: '700px', margin: '0 auto 1.25rem auto' }}>
            Build your money instincts from 0 XP to lifelong confidence.
          </h2>
          <p style={{ color: 'var(--accent-sand)', maxWidth: '540px', margin: '0 auto 2.5rem auto', fontSize: '0.98rem' }}>
            Join smart Indian students taking charge of their budget, UPI security, and future investments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => userState.isAuthenticated ? setActiveTab('dashboard') : openAuthModal('signup')}
              style={{
                padding: '0.9rem 2.2rem',
                backgroundColor: 'var(--white)',
                color: 'var(--black)',
                fontWeight: 600,
                fontSize: '0.88rem',
                borderRadius: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <span>{userState.isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              style={{
                padding: '0.9rem 2rem',
                backgroundColor: 'transparent',
                color: 'var(--white)',
                border: '1px solid var(--border-dark)',
                fontWeight: 600,
                fontSize: '0.88rem',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            >
              Take Money IQ Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

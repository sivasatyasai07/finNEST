import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ACHIEVEMENTS, INITIAL_LESSONS } from '../../data/mockData';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Compass, 
  PiggyBank, 
  ShieldCheck, 
  Sliders, 
  MapPin, 
  Lock
} from 'lucide-react';

export const ProgressAchievements: React.FC = () => {
  const { userState } = useApp();
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const completedLessonsCount = userState.completedLessonIds.length;
  const totalLessons = INITIAL_LESSONS.length;

  const categories = [
    'Saving', 
    'Budgeting', 
    'Digital payments', 
    'Banking', 
    'Investing basics', 
    'Online safety',
    'Earning and entrepreneurship'
  ];

  const getCategoryCompletion = (cat: string) => {
    const totalInCat = INITIAL_LESSONS.filter(l => l.category === cat).length;
    if (totalInCat === 0) return 0;
    const completedInCat = INITIAL_LESSONS.filter(l => l.category === cat && userState.completedLessonIds.includes(l.id)).length;
    return Math.round((completedInCat / totalInCat) * 100);
  };

  const filteredBadges = ACHIEVEMENTS.filter((badge) => {
    const isUnlocked = userState.unlockedBadges.includes(badge.id);
    if (badgeFilter === 'unlocked') return isUnlocked;
    if (badgeFilter === 'locked') return !isUnlocked;
    return true;
  });

  const getBadgeIcon = (id: string) => {
    switch (id) {
      case 'first-step': return <Compass size={22} />;
      case 'saving-starter': return <PiggyBank size={22} />;
      case 'scam-spotter': return <ShieldCheck size={22} />;
      case 'budget-builder': return <Sliders size={22} />;
      case 'consistent-learner': return <Flame size={22} />;
      case 'smart-spender': return <Award size={22} />;
      case 'future-planner': return <MapPin size={22} />;
      default: return <Award size={22} />;
    }
  };

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        paddingBottom: '2rem',
        marginBottom: '2.5rem'
      }}>
        <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem' }}>
          Personal Analytics & Milestones
        </span>
        <h1 className="heading-section" style={{ marginBottom: '0.75rem' }}>
          Financial Growth & Learning Trajectory
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: '1.65' }}>
          Every completed lesson, balanced budget simulation, and resisted impulsive decision strengthens your long-term money mindset.
        </p>
      </div>

      {/* 4 Essential Stat Blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {/* Streak Block */}
        <div className="editorial-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="text-eyebrow">Daily Streak</span>
            <Flame size={18} color="#746454" />
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            {userState.streakDays} Days
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Active consistency record
          </div>
        </div>

        {/* Lessons Completed Block */}
        <div className="editorial-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="text-eyebrow">Lessons Finished</span>
            <CheckCircle2 size={18} color="#687B62" />
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            {completedLessonsCount} / {totalLessons}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {Math.round((completedLessonsCount / totalLessons) * 100)}% of core syllabus
          </div>
        </div>

        {/* Knowledge XP Block */}
        <div className="editorial-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="text-eyebrow">Knowledge XP</span>
            <Sparkles size={18} color="#746454" />
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            {userState.xp} XP
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Earned across lessons & games
          </div>
        </div>

        {/* Money Confidence Block */}
        <div className="editorial-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="text-eyebrow">Confidence Score</span>
            <TrendingUp size={18} color="#746454" />
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            {userState.financialConfidence}%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Based on quizzes & simulations
          </div>
        </div>
      </div>

      {/* Two Column Section: Category Progress & Weekly Habit */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3.5rem'
      }}>
        {/* Category Completion Bars */}
        <div className="editorial-card" style={{ padding: '2.25rem' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Syllabus Mastery
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '1.5rem' }}>
            Subject Categories
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {categories.map((cat) => {
              const pct = getCategoryCompletion(cat);
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 500 }}>{cat}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: pct > 0 ? 'var(--black)' : 'transparent', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Habit & Quiz Accuracy Block */}
        <div className="editorial-card" style={{ padding: '2.25rem' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Assessment Accuracy
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '1.5rem' }}>
            Quiz & Lab Performance
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', border: '1px solid var(--border)', backgroundColor: 'var(--surface-card)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                Latest Quiz Score
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600 }}>
                {userState.quizScores.lastScore} / 6 Questions
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Highest achieved: {userState.quizScores.highestScore} / 6
              </div>
            </div>

            <div style={{ padding: '1.25rem', border: '1px solid var(--border)', backgroundColor: 'var(--surface-card)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                Budget Builder Simulator
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600 }}>
                {userState.gameStats.budgetScore !== null ? `${userState.gameStats.budgetScore} / 100` : 'Not Attempted'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Target: Zero unassigned surplus & 20%+ savings
              </div>
            </div>

            <div style={{ padding: '1.25rem', border: '1px solid var(--border)', backgroundColor: 'var(--surface-card)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                Scam Detective Accuracy
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600 }}>
                {userState.gameStats.scamScore !== null ? `${userState.gameStats.scamScore}%` : 'Not Attempted'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Digital payment vigilance rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.25rem' }}>
              Badges of Honor
            </span>
            <h2 className="heading-section">
              Earned Milestones
            </h2>
          </div>

          {/* Badges Filter */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setBadgeFilter('all')}
              style={{
                fontSize: '0.75rem',
                fontWeight: badgeFilter === 'all' ? 700 : 500,
                padding: '0.4rem 0.8rem',
                border: badgeFilter === 'all' ? '1px solid var(--black)' : '1px solid var(--border)',
                backgroundColor: badgeFilter === 'all' ? 'var(--black)' : 'var(--surface)',
                color: badgeFilter === 'all' ? 'var(--surface)' : 'var(--text-secondary)'
              }}
            >
              All ({ACHIEVEMENTS.length})
            </button>
            <button
              onClick={() => setBadgeFilter('unlocked')}
              style={{
                fontSize: '0.75rem',
                fontWeight: badgeFilter === 'unlocked' ? 700 : 500,
                padding: '0.4rem 0.8rem',
                border: badgeFilter === 'unlocked' ? '1px solid var(--black)' : '1px solid var(--border)',
                backgroundColor: badgeFilter === 'unlocked' ? 'var(--black)' : 'var(--surface)',
                color: badgeFilter === 'unlocked' ? 'var(--surface)' : 'var(--text-secondary)'
              }}
            >
              Unlocked ({userState.unlockedBadges.length})
            </button>
            <button
              onClick={() => setBadgeFilter('locked')}
              style={{
                fontSize: '0.75rem',
                fontWeight: badgeFilter === 'locked' ? 700 : 500,
                padding: '0.4rem 0.8rem',
                border: badgeFilter === 'locked' ? '1px solid var(--black)' : '1px solid var(--border)',
                backgroundColor: badgeFilter === 'locked' ? 'var(--black)' : 'var(--surface)',
                color: badgeFilter === 'locked' ? 'var(--surface)' : 'var(--text-secondary)'
              }}
            >
              In Progress ({ACHIEVEMENTS.length - userState.unlockedBadges.length})
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredBadges.map((badge) => {
            const isUnlocked = userState.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className="editorial-card"
                style={{
                  opacity: isUnlocked ? 1 : 0.65,
                  backgroundColor: isUnlocked ? 'var(--surface)' : 'var(--surface-muted)',
                  border: isUnlocked ? '1px solid var(--border-dark)' : '1px dashed var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '2px',
                    border: '1px solid var(--border-dark)',
                    backgroundColor: isUnlocked ? 'var(--surface-card)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isUnlocked ? 'var(--accent-earth)' : 'var(--text-muted)'
                  }}>
                    {getBadgeIcon(badge.id)}
                  </div>

                  {isUnlocked ? (
                    <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Unlocked
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Lock size={12} /> Locked
                    </span>
                  )}
                </div>

                <h3 className="heading-card" style={{ fontSize: '1.25rem', marginBottom: '0.45rem' }}>
                  {badge.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {badge.description}
                </p>

                <div style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  <strong>Criteria:</strong> {badge.criteria}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

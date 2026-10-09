import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_LESSONS, ACHIEVEMENTS, TODAY_DECISION_SCENARIO } from '../../data/mockData';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  ShieldCheck, 
  Sliders, 
  ChevronRight,
  TrendingUp,
  Award,
  Target,
  LogIn
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    userState, 
    setActiveTab, 
    openLesson, 
    todayDecisionChoice, 
    makeTodayDecision,
    openAuthModal
  } = useApp();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(todayDecisionChoice);
  const [feedbackRevealed, setFeedbackRevealed] = useState<boolean>(!!todayDecisionChoice);

  // Dynamic next uncompleted lesson
  const nextLesson = INITIAL_LESSONS.find(l => !userState.completedLessonIds.includes(l.id)) || INITIAL_LESSONS[0];
  const recommendedLessons = INITIAL_LESSONS.filter(l => l.id !== nextLesson.id).slice(0, 3);
  const completionPercent = Math.round((userState.completedLessonIds.length / INITIAL_LESSONS.length) * 100);

  const getConfidenceLabel = (score: number) => {
    if (score >= 85) return 'Confident & Disciplined';
    if (score >= 70) return 'Getting there';
    if (score >= 50) return 'Building Foundations';
    if (score > 0) return 'First Steps';
    return 'Starting at 0%';
  };

  const handleDecisionSubmit = (option: typeof TODAY_DECISION_SCENARIO.options[0]) => {
    setSelectedOptionId(option.id);
    setFeedbackRevealed(true);
    makeTodayDecision(option.id, option.scoreChange, option.xpGain);
  };

  const selectedDecision = TODAY_DECISION_SCENARIO.options.find(
    o => o.id === (selectedOptionId || todayDecisionChoice)
  );

  const unlockedBadgesList = ACHIEVEMENTS.filter(b => userState.unlockedBadges.includes(b.id));

  // Dynamic 7-day activity bar based on user's real streak & activity
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIndex = (new Date().getDay() + 6) % 7; // 0 for Mon, 6 for Sun
  const weeklyDays = daysOfWeek.map((day, idx) => {
    const isToday = idx === todayIndex;
    const isActive = (isToday && userState.xp > 0) || (idx < todayIndex && idx >= todayIndex - userState.streakDays);
    return {
      day,
      active: isActive,
      height: isActive ? Math.min(100, Math.max(35, userState.xp > 0 ? 55 + (idx * 8) : 40)) : 14,
      isToday
    };
  });

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Top Greeting & Metric Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.75rem'
      }}>
        <div>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--accent-earth)' }}>
            THE MONEY MANAGEMENT APP · DAILY LEDGER
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--black)',
              color: '#FAF9F5',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.04em',
              flexShrink: 0
            }}>
              {userState.avatarInitials || userState.name.slice(0, 2).toUpperCase()}
            </span>
            <h1 className="heading-section">
              {userState.xp === 0 ? 'Welcome to your money journey,' : 'Keep building,'} {userState.name}.
            </h1>
          </div>
          {userState.primaryGoal && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              <Target size={14} color="var(--accent-earth)" />
              <span>Goal: {userState.primaryGoal}</span>
            </div>
          )}
        </div>

        {/* Essential Metric Blocks (All real-time starting from 0) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {/* Streak block */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '0.75rem 1.25rem',
            borderRadius: '2px',
            minWidth: '110px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: userState.streakDays > 0 ? '#C25E38' : 'var(--text-muted)', marginBottom: '0.2rem' }}>
              <Flame size={15} />
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Streak
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>
              {userState.streakDays} {userState.streakDays === 1 ? 'day' : 'days'}
            </div>
          </div>

          {/* XP points block */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '0.75rem 1.25rem',
            borderRadius: '2px',
            minWidth: '110px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-earth)', marginBottom: '0.2rem' }}>
              <Sparkles size={15} />
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                XP Points
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>
              {userState.xp} XP
            </div>
          </div>

          {/* Confidence Score block */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '0.75rem 1.25rem',
            borderRadius: '2px',
            minWidth: '160px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', marginBottom: '0.2rem' }}>
              <TrendingUp size={15} />
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Confidence
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>
                {userState.financialConfidence}%
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                ({getConfidenceLabel(userState.financialConfidence)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Authentication Prompt Banner if not logged in */}
      {!userState.isAuthenticated && (
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: 'var(--surface-card)',
          border: '1px solid var(--border-dark)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block' }}>
              Currently exploring as Guest (Progress saved locally)
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Sign in or create a student account to sync across devices and save achievements.
            </span>
          </div>
          <button
            onClick={() => openAuthModal('signup')}
            className="btn-solid"
            style={{ fontSize: '0.78rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LogIn size={14} /> Create Free Account
          </button>
        </div>
      )}

      {/* Main Asymmetric Editorial Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Left 7 Columns: Hero Continue Learning Card & Today's Decision */}
        <div style={{ gridColumn: 'span 12' }} className="dash-col-left">
          {/* Continue / Start First Lesson Prominent Card */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-dark)',
            padding: '2.25rem',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="editorial-tag" style={{ backgroundColor: 'var(--black)', color: 'var(--surface)', borderColor: 'var(--black)' }}>
                  {userState.completedLessonIds.length === 0 ? 'Start First Lesson' : 'Next Lesson'}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                  {userState.completedLessonIds.length} of {INITIAL_LESSONS.length} Completed
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <Clock size={14} />
                <span>{nextLesson.estimatedTime}</span>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem', lineHeight: '1.2' }}>
              {nextLesson.title}
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '1.75rem', maxWidth: '640px' }}>
              {nextLesson.description}
            </p>

            {/* Progress indicator */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>Curriculum Completion</span>
                <span>{completionPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)', borderRadius: '0' }}>
                <div style={{ width: `${completionPercent}%`, height: '100%', backgroundColor: 'var(--black)', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => openLesson(nextLesson)}
                className="btn-primary"
                style={{ padding: '0.8rem 1.8rem' }}
              >
                <span>{userState.completedLessonIds.length === 0 ? 'Start Lesson (+50 XP)' : 'Continue Reading'}</span>
                <ArrowRight size={15} />
              </button>

              <button 
                onClick={() => setActiveTab('learn')}
                className="btn-secondary"
                style={{ padding: '0.8rem 1.4rem' }}
              >
                View All Lessons
              </button>
            </div>
          </div>

          {/* Today's Money Decision Interactive Card */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border)',
            padding: '2rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="text-eyebrow" style={{ color: 'var(--accent-earth)' }}>Daily Exercise</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>· Instant feedback</span>
              </div>
              <span className="editorial-tag" style={{ backgroundColor: 'var(--surface)' }}>
                +35 XP Potential
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: '0.75rem' }}>
              {TODAY_DECISION_SCENARIO.prompt}
            </h3>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem', marginBottom: '1.5rem' }}>
              {TODAY_DECISION_SCENARIO.options.map((option) => {
                const isSelected = (selectedOptionId || todayDecisionChoice) === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => !feedbackRevealed && handleDecisionSubmit(option)}
                    style={{
                      border: isSelected ? '1.5px solid var(--black)' : '1px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--surface)' : 'var(--background)',
                      padding: '1.1rem 1.25rem',
                      cursor: feedbackRevealed ? 'default' : 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          {option.label}
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          {option.detail}
                        </div>
                      </div>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '1.5px solid var(--border-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isSelected ? 'var(--black)' : 'transparent',
                        flexShrink: 0
                      }}>
                        {isSelected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--surface)' }} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instant Feedback Panel */}
            {feedbackRevealed && selectedDecision && (
              <div style={{
                padding: '1.25rem',
                border: '1px solid var(--border-dark)',
                backgroundColor: 'var(--surface)',
                borderLeft: '3px solid var(--accent-earth)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={16} color="var(--success)" />
                  <span className="text-eyebrow" style={{ color: 'var(--black)' }}>Pedagogical Insight</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.55' }}>
                  {selectedDecision.feedback}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Columns: Weekly Progress & Quick Simulator Hub */}
        <div style={{ gridColumn: 'span 12' }} className="dash-col-right">
          {/* Weekly Progress Visualization */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '1.75rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.2rem' }}>
                  Consistency Audit
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>
                  Weekly Learning Habit
                </h3>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {userState.streakDays} Day Streak
              </span>
            </div>

            {/* Bar chart */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '130px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              {weeklyDays.map((col, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                  <div 
                    title={`${col.day}: ${col.active ? 'Active' : 'Pending'}`}
                    style={{
                      width: '24px',
                      height: `${col.height}px`,
                      backgroundColor: col.active ? 'var(--accent-earth)' : 'var(--surface-muted)',
                      border: '1px solid var(--border)',
                      transition: 'height 0.3s ease'
                    }} 
                  />
                  <span style={{ fontSize: '0.72rem', color: col.isToday ? 'var(--black)' : 'var(--text-muted)', fontWeight: col.isToday ? 700 : 400 }}>
                    {col.day}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
              {userState.streakDays === 0 ? 'Complete today’s decision or 1 lesson to start your streak!' : `${userState.streakDays}-day streak active. Keep it going tomorrow!`}
            </div>
          </div>

          {/* Quick Simulation Shortcuts */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '1.75rem',
            marginBottom: '2rem'
          }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Interactive Lab
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              Practice Financial Decisions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div 
                onClick={() => setActiveTab('games')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Sliders size={18} color="var(--accent-earth)" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Budget Builder</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Allocate ₹2,000 monthly allowance</div>
                  </div>
                </div>
                <ChevronRight size={16} />
              </div>

              <div 
                onClick={() => setActiveTab('games')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ShieldCheck size={18} color="var(--accent-earth)" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Scam Detective</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Spot fake KYC & fraudulent UPI requests</div>
                  </div>
                </div>
                <ChevronRight size={16} />
              </div>

              <div 
                onClick={() => setActiveTab('scenarios')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Compass size={18} color="var(--accent-earth)" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Regional Scenarios</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>8 real stories across Indian cities</div>
                  </div>
                </div>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

          {/* Real Milestones Row (Starts at 0 unlocked) */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="text-eyebrow">Milestones</span>
              <button onClick={() => setActiveTab('progress')} className="btn-ghost" style={{ padding: '0', fontSize: '0.75rem' }}>
                All Badges ({userState.unlockedBadges.length}/{ACHIEVEMENTS.length})
              </button>
            </div>
            
            {unlockedBadgesList.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {unlockedBadgesList.map((badge) => (
                  <div 
                    key={badge.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.75rem',
                      border: '1px solid var(--border-dark)',
                      backgroundColor: 'var(--surface-card)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    <Award size={14} color="var(--accent-earth)" />
                    <span>{badge.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '0.85rem',
                border: '1px dashed var(--border)',
                backgroundColor: 'var(--surface-card)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textAlign: 'center'
              }}>
                Complete your first lesson or simulator to unlock your first milestone badge!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Lessons Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.2rem' }}>
              Curated For You
            </span>
            <h2 className="heading-section">
              Recommended Next Steps
            </h2>
          </div>
          <button onClick={() => setActiveTab('learn')} className="btn-ghost">
            <span>Browse Full Library</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}>
          {recommendedLessons.map((lesson) => {
            const isDone = userState.completedLessonIds.includes(lesson.id);
            return (
              <div 
                key={lesson.id} 
                className="editorial-card editorial-card-interactive"
                onClick={() => openLesson(lesson)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="editorial-tag">{lesson.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {lesson.estimatedTime}
                  </span>
                </div>

                <h3 className="heading-card" style={{ marginBottom: '0.65rem' }}>
                  {lesson.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '1.5rem' }}>
                  {lesson.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                    {lesson.difficulty}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isDone ? 'var(--success)' : 'var(--black)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {isDone ? 'Completed' : 'Start Lesson (+50 XP)'} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .dash-col-left {
            grid-column: span 7 !important;
          }
          .dash-col-right {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </div>
  );
};

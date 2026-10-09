import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Clock, BarChart2, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonModal: React.FC = () => {
  const { activeLesson, closeLesson, completeLesson, userState } = useApp();

  if (!activeLesson) return null;

  const isCompleted = userState.completedLessonIds.includes(activeLesson.id);

  const handleComplete = () => {
    completeLesson(activeLesson.id);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#746454', '#9A8067', '#B9B6AC', '#687B62']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="modal-overlay" onClick={closeLesson} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '0', overflow: 'hidden' }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.75rem 2rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="editorial-tag">{activeLesson.category}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <Clock size={13} /> {activeLesson.estimatedTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <BarChart2 size={13} /> {activeLesson.difficulty}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', lineHeight: '1.15', fontWeight: 600 }}>
              {activeLesson.title}
            </h2>
          </div>
          <button 
            onClick={closeLesson}
            style={{
              padding: '0.5rem',
              borderRadius: '2px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-primary)'
            }}
            aria-label="Close lesson"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* Overview */}
          <div style={{ 
            fontSize: '1.05rem', 
            color: 'var(--text-primary)', 
            lineHeight: '1.65', 
            fontStyle: 'italic',
            borderLeft: '2px solid var(--accent-earth)',
            paddingLeft: '1.25rem'
          }}>
            "{activeLesson.content.overview}"
          </div>

          {/* Key Concept Box */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '1.5rem',
            borderRadius: '2px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <Lightbulb size={16} color="#746454" />
              <span className="text-eyebrow" style={{ color: 'var(--accent-earth)' }}>The Core Principle</span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
              {activeLesson.content.keyConcept}
            </p>
          </div>

          {/* Real Indian Teen Case Story */}
          <div style={{
            backgroundColor: 'var(--surface-muted)',
            border: '1px solid var(--border)',
            padding: '1.5rem',
            borderRadius: '2px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <BookOpen size={16} color="#171717" />
              <span className="text-eyebrow">Real Indian Scenario</span>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              {activeLesson.content.realIndianStory}
            </p>
          </div>

          {/* Practical Tip & Rule of Thumb */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: '2px' }}>
              <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--success)' }}>
                Actionable Habit
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {activeLesson.content.practicalTip}
              </p>
            </div>
            <div style={{ padding: '1.25rem', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: '2px' }}>
              <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--accent-clay)' }}>
                Rule of Thumb
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {activeLesson.content.ruleOfThumb}
              </p>
            </div>
          </div>

          {/* Reflection Question */}
          <div style={{
            border: '1px dashed var(--border-dark)',
            padding: '1.25rem',
            backgroundColor: 'var(--surface)',
            borderRadius: '2px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
              <Sparkles size={14} color="#746454" />
              <span className="text-eyebrow">Quiet Reflection</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              {activeLesson.content.reflectionQuestion}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button onClick={closeLesson} className="btn-secondary" style={{ fontSize: '0.78rem' }}>
            Close
          </button>

          {isCompleted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} />
              <span>Lesson Completed</span>
            </div>
          ) : (
            <button onClick={handleComplete} className="btn-primary" style={{ fontSize: '0.78rem' }}>
              <span>Mark as Completed (+40 XP)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

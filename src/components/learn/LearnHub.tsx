import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_LESSONS } from '../../data/mockData';
import type { LessonCategory } from '../../types';
import { Clock, BarChart2, CheckCircle2, ArrowRight, Search } from 'lucide-react';

const CATEGORIES: LessonCategory[] = [
  'All',
  'Saving',
  'Budgeting',
  'Digital payments',
  'Banking',
  'Investing basics',
  'Borrowing',
  'Online safety',
  'Earning and entrepreneurship'
];

export const LearnHub: React.FC = () => {
  const { openLesson, userState } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = INITIAL_LESSONS.filter((lesson) => {
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedCount = INITIAL_LESSONS.filter(l => userState.completedLessonIds.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / INITIAL_LESSONS.length) * 100);

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '2rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '2rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Curriculum & Reference Library
          </span>
          <h1 className="heading-section" style={{ marginBottom: '0.85rem' }}>
            Foundational Lessons in Personal Finance
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            Structured, bite-sized readings grounded in real Indian teenager scenarios. Written in clear language with zero financial jargon.
          </p>
        </div>

        {/* Course completion progress pill */}
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-dark)',
          padding: '1.25rem 1.5rem',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
              Completed
            </span>
            <span>{completedCount} / {INITIAL_LESSONS.length} ({progressPercent}%)</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--black)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ marginBottom: '2.5rem' }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '0.75rem 1.25rem',
          marginBottom: '1.5rem',
          maxWidth: '520px'
        }}>
          <Search size={16} color="#7E7C74" />
          <input 
            type="text"
            placeholder="Search lessons (e.g. UPI, pocket money, interest)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.88rem',
              width: '100%',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: '0.76rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: isSelected ? 700 : 500,
                  padding: '0.45rem 0.95rem',
                  border: isSelected ? '1px solid var(--black)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--black)' : 'var(--surface)',
                  color: isSelected ? 'var(--surface)' : 'var(--text-secondary)',
                  borderRadius: '2px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Cards Grid */}
      {filteredLessons.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)'
        }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            No lessons match your query.
          </p>
          <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="btn-secondary" style={{ marginTop: '1rem' }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredLessons.map((lesson) => {
            const isCompleted = userState.completedLessonIds.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="editorial-card editorial-card-interactive"
                onClick={() => openLesson(lesson)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: isCompleted ? '3px solid var(--success)' : '1px solid var(--border)'
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="editorial-tag">{lesson.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {lesson.estimatedTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <BarChart2 size={12} /> {lesson.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="heading-card" style={{ marginBottom: '0.75rem' }}>
                    {lesson.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {lesson.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ fontSize: '0.76rem', color: isCompleted ? 'var(--success)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                    {isCompleted ? (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Completed (+40 XP)</span>
                      </>
                    ) : (
                      <span>Unread</span>
                    )}
                  </div>

                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--black)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    {isCompleted ? 'Review Lesson' : 'Start Reading'}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

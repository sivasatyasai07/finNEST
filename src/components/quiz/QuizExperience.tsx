import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizExperience: React.FC = () => {
  const { recordQuizScore, setActiveTab } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answersRecord, setAnswersRecord] = useState<{ questionIndex: number; selected: number; isCorrect: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    const correct = idx === currentQ.correctAnswer;
    if (correct) {
      setScore(prev => prev + 1);
    }
    setAnswersRecord(prev => [
      ...prev,
      { questionIndex: currentIndex, selected: idx, isCorrect: correct }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctAnswer ? 0 : 0);
      recordQuizScore(finalScore, QUIZ_QUESTIONS.length);
      if (finalScore >= 4) {
        try {
          confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#746454', '#9A8067', '#687B62', '#E7E7E2']
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswersRecord([]);
    setIsFinished(false);
  };

  const progressPercent = Math.round(((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: '820px' }}>
      {/* Quiz Progress Header */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span className="text-eyebrow">Financial Literacy Assessment</span>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
            {isFinished ? 'Assessment Complete' : `Question ${currentIndex + 1} of ${QUIZ_QUESTIONS.length}`}
          </div>
        </div>

        {!isFinished && (
          <div style={{ minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
                Progress
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--border)' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--black)', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="editorial-card" style={{ padding: '2.5rem' }}>
          {/* Tag & Context */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="editorial-tag">{currentQ.tag}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              1 Answer Choice
            </span>
          </div>

          {/* Question Text */}
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', lineHeight: '1.25', marginBottom: '0.65rem' }}>
            {currentQ.question}
          </h2>

          {currentQ.context && (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '2rem' }}>
              {currentQ.context}
            </p>
          )}

          {/* 4 Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswer;
              
              let borderColor = 'var(--border)';
              let bgColor = 'var(--surface-card)';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  borderColor = 'var(--success)';
                  bgColor = 'rgba(104, 123, 98, 0.1)';
                } else if (isSelected) {
                  borderColor = 'var(--error)';
                  bgColor = 'rgba(141, 98, 90, 0.1)';
                }
              } else if (isSelected) {
                borderColor = 'var(--black)';
                bgColor = 'var(--surface)';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  style={{
                    textAlign: 'left',
                    padding: '1.15rem 1.35rem',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: bgColor,
                    borderRadius: '2px',
                    transition: 'var(--transition-smooth)',
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnswered) {
                      e.currentTarget.style.borderColor = 'var(--black)';
                      e.currentTarget.style.backgroundColor = 'var(--surface)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnswered && !isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.backgroundColor = 'var(--surface-card)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--surface)'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span style={{ fontSize: '0.94rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {option}
                    </span>
                  </div>

                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 size={18} color="#687B62" style={{ flexShrink: 0 }} />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle size={18} color="#8D625A" style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Panel */}
          {isAnswered && (
            <div style={{
              border: '1px solid var(--border-dark)',
              backgroundColor: 'var(--surface)',
              padding: '1.5rem',
              borderLeft: selectedOption === currentQ.correctAnswer ? '3px solid var(--success)' : '3px solid var(--error)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="text-eyebrow" style={{ color: selectedOption === currentQ.correctAnswer ? 'var(--success)' : 'var(--error)' }}>
                  {selectedOption === currentQ.correctAnswer ? 'Well Reasoned!' : 'Core Principle to Remember'}
                </span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Action */}
          {isAnswered && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleNext} className="btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                <span>{currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Score & Review Card */
        <div className="editorial-card" style={{ padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Award size={48} color="#746454" style={{ margin: '0 auto 1rem' }} />
            <span className="text-eyebrow">Assessment Results</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
              {score} of {QUIZ_QUESTIONS.length} Correct ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
              {score >= 5
                ? 'Outstanding financial comprehension! You understand the difference between cash flow and consumer temptations.'
                : score >= 3
                ? 'Good practical intuition. A quick review of the lessons will sharpen your financial armor.'
                : 'Learning takes time and curiosity. Explore the Learn Hub readings to fortify your fundamentals.'}
            </p>
          </div>

          {/* Question by question recap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Question Breakdown
            </h3>
            {QUIZ_QUESTIONS.map((q, idx) => {
              const record = answersRecord.find(r => r.questionIndex === idx);
              const isCorrect = record?.isCorrect;
              return (
                <div key={q.id} style={{
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-card)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {idx + 1}. {q.question}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Correct answer: {q.options[q.correctAnswer]}
                    </div>
                  </div>
                  <div>
                    {isCorrect ? (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle2 size={14} /> Correct (+20 XP)
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <XCircle size={14} /> Review
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={handleRestart} className="btn-secondary">
              <RefreshCw size={15} /> Try Again
            </button>
            <button onClick={() => setActiveTab('learn')} className="btn-primary">
              <BookOpen size={15} /> Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

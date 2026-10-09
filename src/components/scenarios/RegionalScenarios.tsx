import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REGIONAL_SCENARIOS } from '../../data/mockData';
import type { RegionalScenario } from '../../types';
import { MapPin, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegionalScenarios: React.FC = () => {
  const { userState, resolveScenario } = useApp();
  const [selectedScenario, setSelectedScenario] = useState<RegionalScenario | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const handleOpenScenario = (scen: RegionalScenario) => {
    setSelectedScenario(scen);
    setSelectedChoiceId(null);
  };

  const handleChoose = (choice: RegionalScenario['choices'][0]) => {
    if (!selectedScenario) return;
    setSelectedChoiceId(choice.id);
    resolveScenario(selectedScenario.id, choice.financialHealthImpact);
    if (choice.isOptimal) {
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#746454', '#9A8067', '#687B62']
        });
      } catch {
        // ignore
      }
    }
  };

  const resolvedCount = REGIONAL_SCENARIOS.filter(s => userState.scenariosResolved.includes(s.id)).length;

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Editorial Header */}
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
            Money, Where You Are
          </span>
          <h1 className="heading-section" style={{ marginBottom: '0.85rem' }}>
            Regional Case Studies Across Bharat
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            Explore how everyday life, local transportation, community trade, and regional cultural habits shape money decisions for students across India.
          </p>
        </div>

        {/* Progress tracker */}
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-dark)',
          padding: '1.25rem 1.5rem',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
              Scenarios Solved
            </span>
            <span>{resolvedCount} / {REGIONAL_SCENARIOS.length}</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)' }}>
            <div style={{ width: `${Math.round((resolvedCount / REGIONAL_SCENARIOS.length) * 100)}%`, height: '100%', backgroundColor: 'var(--black)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* Editorial Notice Banner */}
      <div style={{
        backgroundColor: 'var(--surface-muted)',
        border: '1px solid var(--border)',
        padding: '0.85rem 1.25rem',
        marginBottom: '2.5rem',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem'
      }}>
        <span style={{ fontWeight: 600, color: 'var(--black)' }}>EDUCATIONAL NOTE:</span>
        <span>The characters and narratives below are fictional educational case studies designed to reflect diverse urban and regional student environments across India without stereotypes.</span>
      </div>

      {/* Regional Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.75rem'
      }}>
        {REGIONAL_SCENARIOS.map((scen) => {
          const isResolved = userState.scenariosResolved.includes(scen.id);
          return (
            <div
              key={scen.id}
              className="editorial-card editorial-card-interactive"
              onClick={() => handleOpenScenario(scen)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: isResolved ? '3px solid var(--success)' : '1px solid var(--border)'
              }}
            >
              <div>
                {/* Location & Character */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-earth)' }}>
                    <MapPin size={13} />
                    <span>{scen.location}, {scen.state}</span>
                  </div>
                  <span className="editorial-tag">{scen.characterName} ({scen.age}y)</span>
                </div>

                <h3 className="heading-card" style={{ marginBottom: '0.65rem' }}>
                  {scen.moneyDecision}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {scen.story}
                </p>

                {scen.regionalPhrase && (
                  <div style={{
                    padding: '0.6rem 0.85rem',
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    fontSize: '0.78rem',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    marginBottom: '1.25rem'
                  }}>
                    ✦ "{scen.regionalPhrase}"
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.78rem', color: isResolved ? 'var(--success)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                  {isResolved ? (
                    <>
                      <CheckCircle2 size={14} /> Solved (+45 XP)
                    </>
                  ) : (
                    <span>Pending Decision</span>
                  )}
                </span>

                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {isResolved ? 'Re-examine' : 'Solve Case'}
                  <ChevronRight size={15} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scenario Solver Modal */}
      {selectedScenario && (
        <div className="modal-overlay" onClick={() => setSelectedScenario(null)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '680px' }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.75rem 2rem',
              backgroundColor: 'var(--surface-card)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <MapPin size={15} color="#746454" />
                  <span className="text-eyebrow" style={{ color: 'var(--accent-earth)' }}>
                    {selectedScenario.location}, {selectedScenario.state}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    · {selectedScenario.characterName}, {selectedScenario.role}
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', lineHeight: '1.2' }}>
                  {selectedScenario.moneyDecision}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedScenario(null)}
                style={{
                  padding: '0.4rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  borderRadius: '2px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '68vh', overflowY: 'auto' }}>
              {/* Narrative Story */}
              <div style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '1.5rem',
                fontSize: '0.96rem',
                lineHeight: '1.65',
                color: 'var(--text-primary)'
              }}>
                {selectedScenario.story}
              </div>

              {selectedScenario.regionalPhrase && (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderLeft: '2px solid var(--border-dark)', paddingLeft: '1rem' }}>
                  <strong>Cultural Touchpoint:</strong> "{selectedScenario.regionalPhrase}" — {selectedScenario.phraseMeaning}
                </div>
              )}

              {/* Choices List */}
              <div>
                <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--black)' }}>
                  How should {selectedScenario.characterName} proceed?
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {selectedScenario.choices.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    return (
                      <div
                        key={choice.id}
                        onClick={() => handleChoose(choice)}
                        style={{
                          border: isSelected ? '1.5px solid var(--black)' : '1px solid var(--border)',
                          backgroundColor: isSelected ? 'var(--surface-muted)' : 'var(--surface-card)',
                          padding: '1.2rem',
                          cursor: 'pointer',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <div style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          {choice.text}
                        </div>

                        {isSelected && (
                          <div style={{
                            marginTop: '0.75rem',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid var(--border)',
                            fontSize: '0.88rem',
                            color: 'var(--text-primary)',
                            lineHeight: '1.55'
                          }}>
                            <strong>Outcome:</strong> {choice.consequence}
                            <div style={{
                              marginTop: '0.5rem',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              color: choice.isOptimal ? 'var(--success)' : 'var(--warning)'
                            }}>
                              {choice.isOptimal ? '✓ Highly balanced decision (+45 XP)' : '⚠ Notice the hidden compromise'}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lesson Learned */}
              <div style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--border-dark)',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <BookOpen size={15} color="#746454" />
                  <span className="text-eyebrow" style={{ color: 'var(--black)' }}>Key Takeaway</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {selectedScenario.lessonLearned}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '1.25rem 2rem',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--surface-card)',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button onClick={() => setSelectedScenario(null)} className="btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

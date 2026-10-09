import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCAM_ITEMS } from '../../data/mockData';
import { 
  Sliders, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  RefreshCw, 
  ArrowRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

type GameTab = 'budget' | 'maze' | 'scam';

export const InteractiveGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameTab>('budget');

  return (
    <div className="container-editorial" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Game Selector Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        paddingBottom: '2rem',
        marginBottom: '2.5rem'
      }}>
        <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem' }}>
          Interactive Simulations
        </span>
        <h1 className="heading-section" style={{ marginBottom: '1rem' }}>
          Financial Labs & Decision Games
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '1.75rem', lineHeight: '1.65' }}>
          Test your instincts in realistic sandboxes before making decisions with real money. Experience consequences risk-free.
        </p>

        {/* Tab switchers */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => setActiveGame('budget')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              border: activeGame === 'budget' ? '1px solid var(--black)' : '1px solid var(--border)',
              backgroundColor: activeGame === 'budget' ? 'var(--black)' : 'var(--surface)',
              color: activeGame === 'budget' ? 'var(--surface)' : 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            <Sliders size={16} />
            <span>1. Budget Builder (₹2,000)</span>
          </button>

          <button
            onClick={() => setActiveGame('maze')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              border: activeGame === 'maze' ? '1px solid var(--black)' : '1px solid var(--border)',
              backgroundColor: activeGame === 'maze' ? 'var(--black)' : 'var(--surface)',
              color: activeGame === 'maze' ? 'var(--surface)' : 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            <Compass size={16} />
            <span>2. Money Maze</span>
          </button>

          <button
            onClick={() => setActiveGame('scam')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              border: activeGame === 'scam' ? '1px solid var(--black)' : '1px solid var(--border)',
              backgroundColor: activeGame === 'scam' ? 'var(--black)' : 'var(--surface)',
              color: activeGame === 'scam' ? 'var(--surface)' : 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            <ShieldCheck size={16} />
            <span>3. Scam Detective</span>
          </button>
        </div>
      </div>

      {/* Render Active Game */}
      {activeGame === 'budget' && <BudgetBuilderGame />}
      {activeGame === 'maze' && <MoneyMazeGame />}
      {activeGame === 'scam' && <ScamDetectiveGame />}
    </div>
  );
};

/* ----------------------------------------------------
   GAME 1: BUDGET BUILDER
---------------------------------------------------- */
const BudgetBuilderGame: React.FC = () => {
  const { recordBudgetScore, userState } = useApp();
  const TOTAL_MONTHLY = 2000;

  const [allocations, setAllocations] = useState<{ [key: string]: number }>({
    food: 450,
    transport: 400,
    entertainment: 350,
    savings: 400,
    emergency: 200,
    gifts: 200
  });

  const [submittedScore, setSubmittedScore] = useState<number | null>(userState.gameStats.budgetScore);

  const categories = [
    { key: 'food', label: 'Food & Snacks', note: 'Canteen samosas, chai, casual street eats' },
    { key: 'transport', label: 'Transport', note: 'Metro smartcard recharge, auto/bus fares' },
    { key: 'entertainment', label: 'Entertainment & Fun', note: 'Weekend cinema, gaming recharge, outings' },
    { key: 'savings', label: 'Dedicated Savings', note: 'Untouched fund for phone or future course' },
    { key: 'emergency', label: 'Emergency Fund', note: 'Safety reserve for unexpected urgent expenses' },
    { key: 'gifts', label: 'Gifts & Family Duties', note: 'Friend birthdays, small family contributions' }
  ];

  const totalAllocated = Object.values(allocations).reduce((acc, curr) => acc + curr, 0);
  const remaining = TOTAL_MONTHLY - totalAllocated;
  const savingsSum = allocations.savings + allocations.emergency;
  const savingsPercent = Math.round((savingsSum / TOTAL_MONTHLY) * 100);

  const handleSliderChange = (key: string, value: number) => {
    setAllocations(prev => ({
      ...prev,
      [key]: value
    }));
    setSubmittedScore(null);
  };

  const calculateScore = () => {
    // Evaluation criteria:
    // 1. Must not be over budget
    // 2. Ideally remaining is 0 (every rupee has a role)
    // 3. Savings + emergency should ideally be 20% - 35%
    // 4. Essentials (food + transport) reasonable (30% - 50%)
    if (totalAllocated > TOTAL_MONTHLY) return 30; // over budget penalty

    let score = 50;
    // Perfect zero-balance budget
    if (remaining === 0) score += 20;
    else if (remaining > 0 && remaining <= 100) score += 15;

    // Savings discipline
    if (savingsPercent >= 20 && savingsPercent <= 40) score += 30;
    else if (savingsPercent > 10 && savingsPercent < 20) score += 15;
    else if (savingsPercent > 40) score += 20; // good but perhaps too austere

    return Math.min(100, Math.max(20, score));
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setSubmittedScore(score);
    recordBudgetScore(score);
    if (score >= 75) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#746454', '#9A8067', '#687B62']
        });
      } catch {
        // ignore
      }
    }
  };

  const resetDefaults = () => {
    setAllocations({
      food: 450,
      transport: 400,
      entertainment: 350,
      savings: 400,
      emergency: 200,
      gifts: 200
    });
    setSubmittedScore(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
      {/* Left 7 Columns: Sliders & Allocation */}
      <div style={{ gridColumn: 'span 12' }} className="game-col-left">
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <span className="text-eyebrow" style={{ color: 'var(--accent-earth)' }}>Scenario Prompt</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '0.2rem' }}>
                Your Monthly Pocket Allowance: ₹{TOTAL_MONTHLY.toLocaleString('en-IN')}
              </h2>
            </div>
            <button onClick={resetDefaults} className="btn-ghost" style={{ fontSize: '0.78rem' }}>
              <RefreshCw size={13} /> Reset
            </button>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
            In personal finance, every rupee needs a planned purpose before the month begins. Drag the sliders below to balance your expenses and savings.
          </p>

          {/* Allocation Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {categories.map((cat) => {
              const currentVal = allocations[cat.key];
              const pct = Math.round((currentVal / TOTAL_MONTHLY) * 100);
              return (
                <div key={cat.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                    <div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {cat.label}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.6rem' }}>
                        {cat.note}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                        ₹{currentVal}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ({pct}%)
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={currentVal}
                    onChange={(e) => handleSliderChange(cat.key, parseInt(e.target.value, 10))}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Real-Time Balance & Score Report */}
      <div style={{ gridColumn: 'span 12' }} className="game-col-right">
        <div style={{
          backgroundColor: 'var(--surface-card)',
          border: '1px solid var(--border-dark)',
          padding: '2rem',
          position: 'sticky',
          top: '90px'
        }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem' }}>
            Financial Health Monitor
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            Budget Ledger Summary
          </h3>

          {/* Key Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Total Monthly Allowance</span>
              <span style={{ fontWeight: 600 }}>₹{TOTAL_MONTHLY}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Total Allocated</span>
              <span style={{ fontWeight: 600, color: totalAllocated > TOTAL_MONTHLY ? 'var(--error)' : 'var(--text-primary)' }}>
                ₹{totalAllocated}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Remaining Unassigned</span>
              <span style={{ 
                fontWeight: 700, 
                color: remaining === 0 ? 'var(--success)' : remaining < 0 ? 'var(--error)' : 'var(--warning)' 
              }}>
                {remaining >= 0 ? `₹${remaining}` : `-₹${Math.abs(remaining)} (Over budget)`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Future & Safety Fund</span>
              <span style={{ fontWeight: 600, color: savingsPercent >= 20 ? 'var(--success)' : 'var(--accent-earth)' }}>
                ₹{savingsSum} ({savingsPercent}%)
              </span>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div style={{
            padding: '1rem',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem'
          }}>
            {remaining === 0 ? (
              <>
                <CheckCircle2 size={18} color="#687B62" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                  <strong>Balanced Budget:</strong> Every single rupee has a clear job. Your future self has a cushion.
                </div>
              </>
            ) : remaining > 0 ? (
              <>
                <AlertTriangle size={18} color="#A8885F" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                  <strong>Surplus ₹{remaining}:</strong> You have unassigned cash. In real life, unassigned cash leaks into unplanned snacks. Allocate it to savings!
                </div>
              </>
            ) : (
              <>
                <XCircle size={18} color="#8D625A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                  <strong>Over Budget:</strong> You are spending ₹{Math.abs(remaining)} more than you receive. This leads to borrowing or stress.
                </div>
              </>
            )}
          </div>

          {/* Action button */}
          <button 
            onClick={handleSubmit}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <span>Submit Budget for Evaluation</span>
            <Sparkles size={16} />
          </button>

          {/* Score Reveal Report */}
          {submittedScore !== null && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              border: '1px solid var(--border-dark)',
              backgroundColor: 'var(--surface)',
              borderTop: '3px solid var(--accent-earth)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span className="text-eyebrow">Evaluation Result</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700 }}>
                  {submittedScore} / 100
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                {submittedScore >= 80 
                  ? 'Superb discipline! You honored the 50/30/20 guideline and avoided debt.' 
                  : submittedScore >= 60 
                  ? 'Good foundation. Try eliminating loose remaining cash to hit 100% balance.' 
                  : 'Needs rebalancing. Reduce non-essential entertainment or food to balance.'}
              </p>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)' }}>
                ✦ Badge Unlocked: Budget Builder (+60 XP)
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .game-col-left { grid-column: span 7 !important; }
          .game-col-right { grid-column: span 5 !important; }
        }
      `}</style>
    </div>
  );
};

/* ----------------------------------------------------
   GAME 2: MONEY MAZE (Branching Decisions)
---------------------------------------------------- */
interface MazeStep {
  id: number;
  scenarioTitle: string;
  situation: string;
  choices: {
    text: string;
    healthImpact: number;
    moneyImpact: number;
    explanation: string;
  }[];
}

const MAZE_STEPS: MazeStep[] = [
  {
    id: 1,
    scenarioTitle: 'The Limited Drop Sneaker',
    situation: 'A popular sneaker brand drops a flash sale on Instagram. All your classmates are talking about it. Price: ₹1,800. You have ₹2,200 saved specifically for your college application fees.',
    choices: [
      {
        text: 'Buy the sneakers now; tell yourself you will make up the college fund later.',
        healthImpact: -25,
        moneyImpact: -1800,
        explanation: 'Dip into long-term goals for fast fashion creates instant buyer’s remorse when the college deadline arrives.'
      },
      {
        text: 'Apply the 48-Hour Pause rule. If you still want them, look for a second-hand pair next month.',
        healthImpact: 20,
        moneyImpact: 0,
        explanation: 'Splendid emotional discipline! Protecting your core priorities keeps you calm and solvent.'
      }
    ]
  },
  {
    id: 2,
    scenarioTitle: 'Friend Borrowing at the Multiplex',
    situation: 'Your friend Rahul forgot his wallet at the movie counter and asks to borrow ₹450 via UPI. He still owes you ₹200 from last month which he forgot to return.',
    choices: [
      {
        text: 'Send him the ₹450 without saying anything to avoid awkwardness.',
        healthImpact: -15,
        moneyImpact: -450,
        explanation: 'Failing to communicate boundaries fosters resentment and puts your own allowance at risk.'
      },
      {
        text: 'Politely say: "Rahul, I have a strict monthly budget and my ₹200 from last time is pending. I can spot you a ₹50 juice, but I can’t cover the ticket today."',
        healthImpact: 25,
        moneyImpact: -50,
        explanation: 'Kind, firm, and honest. True friendships respect transparent boundaries about money.'
      }
    ]
  },
  {
    id: 3,
    scenarioTitle: 'The "Buy Now, Pay Later" Temptation',
    situation: 'You are buying a scientific calculator online for ₹650. At checkout, a banner offers: "Pay ₹0 today! 3 easy EMIs of ₹230 with 1-click KYC".',
    choices: [
      {
        text: 'Choose BNPL. It feels like getting the calculator for free today.',
        healthImpact: -20,
        moneyImpact: -40,
        explanation: '3 × ₹230 = ₹690. You paid an extra ₹40 hidden convenience charge and mortgaged future pocket money.'
      },
      {
        text: 'Pay the full ₹650 from your current debit/cash account upfront.',
        healthImpact: 20,
        moneyImpact: -650,
        explanation: 'Zero debt, zero hidden processing fees, zero monthly reminders. Clean and done.'
      }
    ]
  },
  {
    id: 4,
    scenarioTitle: 'Suspicious UPI ₹1 Cashback Request',
    situation: 'An SMS arrives: "Dear User, verify your Google Pay reward of ₹400. Accept collect request of ₹1 to authenticate account."',
    choices: [
      {
        text: 'Tap Approve and enter your 6-digit UPI PIN because it is only ₹1.',
        healthImpact: -35,
        moneyImpact: -1,
        explanation: 'Never enter your PIN to receive money! Entering your PIN authorizes deductions and compromises your account.'
      },
      {
        text: 'Decline the request and block the sender immediately.',
        healthImpact: 30,
        moneyImpact: 0,
        explanation: 'Brilliant scam defense. You protected both your hard-earned funds and your digital hygiene.'
      }
    ]
  }
];

const MoneyMazeGame: React.FC = () => {
  const { recordMazeCompletion } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [healthScore, setHealthScore] = useState(75);
  const [history, setHistory] = useState<{ step: MazeStep; choice: MazeStep['choices'][0] }[]>([]);
  const [completed, setCompleted] = useState(false);

  const step = MAZE_STEPS[currentStepIndex];

  const handleChoice = (choice: MazeStep['choices'][0]) => {
    const newHealth = Math.max(0, Math.min(100, healthScore + choice.healthImpact));
    setHealthScore(newHealth);
    const newHistory = [...history, { step, choice }];
    setHistory(newHistory);

    if (currentStepIndex + 1 < MAZE_STEPS.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setCompleted(true);
      recordMazeCompletion(newHealth);
    }
  };

  const restartMaze = () => {
    setCurrentStepIndex(0);
    setHealthScore(75);
    setHistory([]);
    setCompleted(false);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Maze Progress & Health Bar */}
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span className="text-eyebrow">Money Maze Progress</span>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
            {completed ? 'Journey Concluded' : `Scenario ${currentStepIndex + 1} of ${MAZE_STEPS.length}`}
          </div>
        </div>

        <div style={{ minWidth: '220px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
              Money Health Index
            </span>
            <span style={{ color: healthScore >= 70 ? 'var(--success)' : healthScore >= 45 ? 'var(--warning)' : 'var(--error)' }}>
              {healthScore} / 100
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)' }}>
            <div 
              style={{ 
                width: `${healthScore}%`, 
                height: '100%', 
                backgroundColor: healthScore >= 70 ? 'var(--success)' : healthScore >= 45 ? 'var(--warning)' : 'var(--error)',
                transition: 'all 0.3s ease' 
              }} 
            />
          </div>
        </div>
      </div>

      {!completed ? (
        <div className="editorial-card" style={{ padding: '2.5rem' }}>
          <span className="text-eyebrow" style={{ color: 'var(--accent-earth)', display: 'block', marginBottom: '0.5rem' }}>
            Decision Junction
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
            {step.scenarioTitle}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
            {step.situation}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {step.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(choice)}
                style={{
                  textAlign: 'left',
                  padding: '1.25rem 1.5rem',
                  border: '1px solid var(--border-dark)',
                  backgroundColor: 'var(--surface-card)',
                  borderRadius: '2px',
                  transition: 'var(--transition-smooth)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)';
                  e.currentTarget.style.borderColor = 'var(--black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-card)';
                  e.currentTarget.style.borderColor = 'var(--border-dark)';
                }}
              >
                <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Option {idx === 0 ? 'A' : 'B'}: {choice.text}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Click to choose this path
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="editorial-card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Award size={48} color="#746454" style={{ margin: '0 auto 1rem' }} />
            <span className="text-eyebrow">Simulation Summary</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>
              Final Health: {healthScore} / 100
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
              {healthScore >= 75 
                ? 'Outstanding judgment! You resisted peer pressure, avoided toxic debt, and safeguarded your digital credentials.' 
                : 'Good effort! Reflect on the trade-offs below to build an even stronger financial shield.'}
            </p>
          </div>

          {/* Breakdown of decisions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Your Decisions & Pedagogical Consequences
            </h3>
            {history.map((h, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', padding: '1.25rem', backgroundColor: 'var(--surface-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <strong>{h.step.scenarioTitle}</strong>
                  <span style={{ 
                    fontSize: '0.78rem', 
                    fontWeight: 600, 
                    color: h.choice.healthImpact >= 0 ? 'var(--success)' : 'var(--error)' 
                  }}>
                    {h.choice.healthImpact >= 0 ? `+${h.choice.healthImpact} Health` : `${h.choice.healthImpact} Health`}
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <em>Your choice:</em> "{h.choice.text}"
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {h.choice.explanation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={restartMaze} className="btn-secondary">
              <RefreshCw size={15} /> Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------
   GAME 3: SCAM DETECTIVE
---------------------------------------------------- */
const ScamDetectiveGame: React.FC = () => {
  const { recordScamScore } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVerdict, setSelectedVerdict] = useState<'safe' | 'suspicious' | 'scam' | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [gameDone, setGameDone] = useState(false);

  const currentItem = SCAM_ITEMS[currentIndex];

  const handleVerdict = (verdict: 'safe' | 'suspicious' | 'scam') => {
    setSelectedVerdict(verdict);
    const isCorrect = verdict === currentItem.type;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnsweredCount(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < SCAM_ITEMS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedVerdict(null);
    } else {
      setGameDone(true);
      const finalPercent = Math.round(((score + (selectedVerdict === currentItem.type ? 1 : 0)) / SCAM_ITEMS.length) * 100);
      recordScamScore(finalPercent);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedVerdict(null);
    setScore(0);
    setAnsweredCount(0);
    setGameDone(false);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Game Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '1.25rem 2rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span className="text-eyebrow">Digital Fraud Simulation</span>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
            {gameDone ? 'Investigation Complete' : `Case File ${currentIndex + 1} of ${SCAM_ITEMS.length}`}
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
          Score: {score} / {answeredCount}
        </div>
      </div>

      {!gameDone ? (
        <div className="editorial-card" style={{ padding: '2.5rem' }}>
          {/* Simulated Mobile Device Message Box */}
          <div style={{
            backgroundColor: '#1E1E1E',
            color: '#FFFFFF',
            borderRadius: '4px',
            padding: '1.75rem',
            marginBottom: '2rem',
            fontFamily: 'monospace',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '0.82rem', color: '#BBB' }}>
              <span>CHANNEL: [{currentItem.channel}]</span>
              <span>FROM: {currentItem.sender}</span>
              <span>{currentItem.timestamp}</span>
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#E8E8E8', fontFamily: 'var(--font-sans)', whiteSpace: 'pre-wrap' }}>
              {currentItem.messageContent}
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '1rem' }}>
            What is your verdict on this incoming message?
          </h3>

          {/* 3 Verdict Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => !selectedVerdict && handleVerdict('safe')}
              disabled={!!selectedVerdict}
              style={{
                padding: '1rem',
                border: selectedVerdict === 'safe' ? '2px solid var(--success)' : '1px solid var(--border-dark)',
                backgroundColor: selectedVerdict === 'safe' ? 'var(--surface-muted)' : 'var(--surface)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: selectedVerdict ? 'default' : 'pointer'
              }}
            >
              ✓ Safe / Authentic
            </button>

            <button
              onClick={() => !selectedVerdict && handleVerdict('suspicious')}
              disabled={!!selectedVerdict}
              style={{
                padding: '1rem',
                border: selectedVerdict === 'suspicious' ? '2px solid var(--warning)' : '1px solid var(--border-dark)',
                backgroundColor: selectedVerdict === 'suspicious' ? 'var(--surface-muted)' : 'var(--surface)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: selectedVerdict ? 'default' : 'pointer'
              }}
            >
              ⚠ Suspicious
            </button>

            <button
              onClick={() => !selectedVerdict && handleVerdict('scam')}
              disabled={!!selectedVerdict}
              style={{
                padding: '1rem',
                border: selectedVerdict === 'scam' ? '2px solid var(--error)' : '1px solid var(--border-dark)',
                backgroundColor: selectedVerdict === 'scam' ? 'var(--surface-muted)' : 'var(--surface)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: selectedVerdict ? 'default' : 'pointer'
              }}
            >
              ✕ Outright Scam
            </button>
          </div>

          {/* Feedback & Red Flags Panel */}
          {selectedVerdict && (
            <div style={{
              border: '1px solid var(--border-dark)',
              backgroundColor: 'var(--surface-card)',
              padding: '1.75rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {selectedVerdict === currentItem.type ? (
                  <>
                    <CheckCircle2 size={18} color="#687B62" />
                    <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.9rem' }}>Correct Analysis!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} color="#8D625A" />
                    <span style={{ fontWeight: 700, color: 'var(--error)', fontSize: '0.9rem' }}>
                      Incorrect. The actual status is: {currentItem.type.toUpperCase()}
                    </span>
                  </>
                )}
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                {currentItem.explanation}
              </p>

              {currentItem.redFlags.length > 0 && currentItem.redFlags[0] !== 'None. This is an authentic transactional verification message.' && (
                <div>
                  <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--error)' }}>
                    Red Flags to Remember:
                  </span>
                  <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {currentItem.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button onClick={handleNext} className="btn-primary">
                  <span>{currentIndex + 1 < SCAM_ITEMS.length ? 'Next Case' : 'View Final Score'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results */
        <div className="editorial-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <ShieldCheck size={52} color="#746454" style={{ margin: '0 auto 1rem' }} />
          <span className="text-eyebrow">Investigation Complete</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>
            Score: {score} of {SCAM_ITEMS.length} ({Math.round((score / SCAM_ITEMS.length) * 100)}%)
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem' }}>
            {score >= 5 
              ? 'Excellent vigilance! You have earned the Scam Spotter badge. Your digital funds are safe from social engineering.'
              : 'Awareness is a muscle. Review the red flags and remember: legitimate banks never ask for OTPs or PINs to receive money.'}
          </p>

          <button onClick={resetGame} className="btn-primary">
            <RefreshCw size={15} /> Re-try Scam Detective
          </button>
        </div>
      )}
    </div>
  );
};

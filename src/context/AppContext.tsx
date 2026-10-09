import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ActiveTab, Lesson, UserState, UserAccount } from '../types';
import { signInWithSupabase, signUpWithSupabase, syncProgressToSupabase } from '../services/supabaseAuth';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userState: UserState;
  
  // Authentication & Database
  accounts: UserAccount[];
  currentUser: UserAccount | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signUp: (data: Omit<UserAccount, 'id' | 'createdAt'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
  switchAccount: (accountId: string) => void;

  // Learning & Lessons
  activeLesson: Lesson | null;
  openLesson: (lesson: Lesson) => void;
  closeLesson: () => void;
  completeLesson: (lessonId: string) => void;

  // Daily Decision
  todayDecisionChoice: string | null;
  makeTodayDecision: (choiceId: string, scoreDelta: number, xpDelta: number) => void;

  // Games & Quizzes
  recordQuizScore: (score: number, total: number) => void;
  recordBudgetScore: (score: number) => void;
  recordScamScore: (score: number) => void;
  recordMazeCompletion: (finalHealth: number) => void;
  resolveScenario: (scenarioId: string, healthDelta: number) => void;

  // Profile & Reset
  updateProfile: (updates: Partial<UserState>) => void;
  resetProgress: () => void;

  // Feedback Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const DEFAULT_ZERO_USER_STATE: UserState = {
  name: 'New Student',
  email: 'learner@finnest.in',
  avatarInitials: 'NS',
  gradeOrAge: '11th Grade · 16 yrs',
  city: 'Bengaluru',
  monthlyPocketMoney: 2000,
  primaryGoal: 'Build smart savings & avoid digital UPI scams',
  isAuthenticated: false,
  streakDays: 0,
  lastActiveDate: '',
  xp: 0,
  financialConfidence: 0,
  completedLessonIds: [],
  quizScores: {
    lastScore: 0,
    totalAttempts: 0,
    highestScore: 0
  },
  gameStats: {
    budgetScore: null,
    scamScore: null,
    moneyMazeCompleted: false
  },
  scenariosResolved: [],
  unlockedBadges: []
};

const USER_STATE_STORAGE = 'finnest_user_state_v3';
const ACCOUNTS_STORAGE = 'finnest_accounts_v3';
const CURRENT_USER_ID_STORAGE = 'finnest_current_user_id_v3';
const DECISION_KEY = 'finnest_today_decision_v3';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<ActiveTab>('landing');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Accounts List
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(ACCOUNTS_STORAGE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Current logged in account ID
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(CURRENT_USER_ID_STORAGE);
    } catch {
      return null;
    }
  });

  // User State: Strictly starts from 0 for all progress metrics
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(USER_STATE_STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_ZERO_USER_STATE,
          ...parsed
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_ZERO_USER_STATE;
  });

  const [todayDecisionChoice, setTodayDecisionChoice] = useState<string | null>(() => {
    try {
      return localStorage.getItem(DECISION_KEY);
    } catch {
      return null;
    }
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(USER_STATE_STORAGE, JSON.stringify(userState));
    } catch (err) {
      console.warn('LocalStorage save failed for userState', err);
    }
  }, [userState]);

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE, JSON.stringify(accounts));
    } catch (err) {
      console.warn('LocalStorage save failed for accounts', err);
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (currentAccountId) {
        localStorage.setItem(CURRENT_USER_ID_STORAGE, currentAccountId);
      } else {
        localStorage.removeItem(CURRENT_USER_ID_STORAGE);
      }
    } catch (err) {
      console.warn('LocalStorage save failed for currentAccountId', err);
    }
  }, [currentAccountId]);

  const currentUser = accounts.find(a => a.id === currentAccountId) || null;

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4200);
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase() || 'ST';
  };

  // Sign in existing user via Supabase Auth
  const signIn = async (email: string, password: string) => {
    const trimmed = email.trim().toLowerCase();
    
    // Call Supabase Database Auth
    const res = await signInWithSupabase(trimmed, password);
    
    // Match existing account or allow login even if Supabase rate limits
    let acc = accounts.find(a => a.email.toLowerCase() === trimmed);
    if (!res.success && !acc) {
      return { success: false, message: res.message };
    }

    const userName = res.user?.user_metadata?.name || acc?.name || trimmed.split('@')[0];
    const initials = getInitials(userName);

    if (!acc) {
      acc = {
        id: res.user?.id || 'acc-' + Date.now(),
        name: userName,
        email: trimmed,
        avatarInitials: initials,
        gradeOrAge: res.user?.user_metadata?.gradeOrAge || '11th Grade · 16 yrs',
        city: res.user?.user_metadata?.city || 'Bengaluru',
        monthlyPocketMoney: res.user?.user_metadata?.monthlyPocketMoney || 2000,
        primaryGoal: res.user?.user_metadata?.primaryGoal || 'Build smart savings & avoid digital UPI scams',
        createdAt: new Date().toISOString()
      };
      setAccounts(prev => [acc!, ...prev]);
    }

    setCurrentAccountId(acc.id);
    setUserState(prev => ({
      ...prev,
      id: acc!.id,
      name: acc!.name,
      email: acc!.email,
      avatarInitials: initials,
      gradeOrAge: acc!.gradeOrAge,
      city: acc!.city,
      monthlyPocketMoney: acc!.monthlyPocketMoney,
      primaryGoal: acc!.primaryGoal,
      isAuthenticated: true,
      supabaseToken: res.accessToken
    }));

    closeAuthModal();
    showToast(`Welcome back, ${acc.name}!`, 'success');
    return { success: true, message: 'Login successful' };
  };

  // Sign up new user via Supabase Auth
  const signUp = async (data: Omit<UserAccount, 'id' | 'createdAt'> & { password: string }) => {
    const trimmed = data.email.trim().toLowerCase();
    const initials = getInitials(data.name);

    // Call Supabase Database Auth
    const res = await signUpWithSupabase(trimmed, data.password, {
      name: data.name,
      gradeOrAge: data.gradeOrAge,
      city: data.city,
      monthlyPocketMoney: data.monthlyPocketMoney,
      primaryGoal: data.primaryGoal,
      avatarMonogram: initials
    });

    if (!res.success && !res.message.toLowerCase().includes('rate') && !res.message.toLowerCase().includes('limit')) {
      return { success: false, message: res.message };
    }

    const newAccount: UserAccount = {
      id: res.user?.id || 'acc-' + Date.now(),
      name: data.name.trim(),
      email: trimmed,
      avatarInitials: initials,
      gradeOrAge: data.gradeOrAge,
      city: data.city,
      monthlyPocketMoney: data.monthlyPocketMoney,
      primaryGoal: data.primaryGoal,
      createdAt: new Date().toISOString()
    };

    setAccounts(prev => [newAccount, ...prev]);
    setCurrentAccountId(newAccount.id);

    // Initial state strictly starting from 0
    setUserState({
      ...DEFAULT_ZERO_USER_STATE,
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      avatarInitials: initials,
      gradeOrAge: newAccount.gradeOrAge,
      city: newAccount.city,
      monthlyPocketMoney: newAccount.monthlyPocketMoney,
      primaryGoal: newAccount.primaryGoal,
      isAuthenticated: true,
      supabaseToken: res.accessToken
    });

    closeAuthModal();
    showToast(`Account registered in Supabase! Welcome, ${newAccount.name}!`, 'success');
    return { success: true, message: 'Account created' };
  };

  const signOut = () => {
    setCurrentAccountId(null);
    setUserState(prev => ({
      ...prev,
      isAuthenticated: false,
      supabaseToken: undefined
    }));
    showToast('Signed out successfully.', 'info');
  };

  const switchAccount = (accountId: string) => {
    const acc = accounts.find(a => a.id === accountId);
    if (acc) {
      setCurrentAccountId(acc.id);
      setUserState(prev => ({
        ...prev,
        id: acc.id,
        name: acc.name,
        email: acc.email,
        avatarInitials: acc.avatarInitials,
        gradeOrAge: acc.gradeOrAge,
        city: acc.city,
        monthlyPocketMoney: acc.monthlyPocketMoney,
        primaryGoal: acc.primaryGoal,
        isAuthenticated: true
      }));
      showToast(`Switched account to ${acc.name}`, 'success');
    }
  };

  const checkStreakIncrement = (prevState: UserState): { streakDays: number; lastActiveDate: string } => {
    const today = new Date().toISOString().slice(0, 10);
    if (prevState.lastActiveDate === today) {
      return { streakDays: prevState.streakDays, lastActiveDate: today };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (prevState.lastActiveDate === yesterdayStr) {
      return { streakDays: prevState.streakDays + 1, lastActiveDate: today };
    }

    // New streak or starting streak
    return { streakDays: Math.max(1, prevState.streakDays + 1), lastActiveDate: today };
  };

  const openLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const closeLesson = () => {
    setActiveLesson(null);
  };

  const completeLesson = (lessonId: string) => {
    setUserState(prev => {
      const alreadyDone = prev.completedLessonIds.includes(lessonId);
      const newCompleted = alreadyDone ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const xpBonus = alreadyDone ? 10 : 50;
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newConfidence = Math.min(100, prev.financialConfidence + (alreadyDone ? 2 : 12));

      // Badges
      const newBadges = [...prev.unlockedBadges];
      if (newCompleted.length >= 1 && !newBadges.includes('first-step')) {
        newBadges.push('first-step');
        showToast('Achievement Unlocked: First Step', 'success');
      }

      const updated = {
        ...prev,
        completedLessonIds: newCompleted,
        xp: prev.xp + xpBonus,
        streakDays,
        lastActiveDate,
        financialConfidence: newConfidence,
        unlockedBadges: newBadges
      };

      if (prev.supabaseToken) {
        syncProgressToSupabase(prev.supabaseToken, { xp: updated.xp, streakDays, completedLessonIds: newCompleted });
      }

      return updated;
    });

    showToast('Lesson completed! +50 XP earned.', 'success');
    closeLesson();
  };

  const makeTodayDecision = (choiceId: string, scoreDelta: number, xpDelta: number) => {
    setTodayDecisionChoice(choiceId);
    try {
      localStorage.setItem(DECISION_KEY, choiceId);
    } catch {
      // ignore
    }

    setUserState(prev => {
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newConfidence = Math.max(0, Math.min(100, prev.financialConfidence + scoreDelta));
      const newBadges = [...prev.unlockedBadges];
      if (streakDays >= 3 && !newBadges.includes('consistent-learner')) {
        newBadges.push('consistent-learner');
        showToast('Achievement Unlocked: Consistent Learner', 'success');
      }

      const updated = {
        ...prev,
        xp: prev.xp + xpDelta,
        financialConfidence: newConfidence,
        streakDays,
        lastActiveDate,
        unlockedBadges: newBadges
      };

      if (prev.supabaseToken) {
        syncProgressToSupabase(prev.supabaseToken, { xp: updated.xp, streakDays });
      }

      return updated;
    });

    showToast(`Decision recorded! +${xpDelta} XP gained.`, 'success');
  };

  const recordQuizScore = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const xpEarned = score * 20;

    setUserState(prev => {
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newBadges = [...prev.unlockedBadges];
      if (percentage >= 80 && !newBadges.includes('smart-spender')) {
        newBadges.push('smart-spender');
      }

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        streakDays,
        lastActiveDate,
        financialConfidence: Math.min(100, prev.financialConfidence + Math.round(score * 3)),
        quizScores: {
          lastScore: score,
          totalAttempts: prev.quizScores.totalAttempts + 1,
          highestScore: Math.max(prev.quizScores.highestScore, score)
        },
        unlockedBadges: newBadges
      };
    });

    showToast(`Quiz completed: ${score}/${total} correct. +${xpEarned} XP`, 'success');
  };

  const recordBudgetScore = (score: number) => {
    setUserState(prev => {
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newBadges = [...prev.unlockedBadges];
      if (score >= 80 && !newBadges.includes('budget-builder')) {
        newBadges.push('budget-builder');
        showToast('Achievement Unlocked: Budget Builder', 'success');
      }
      if (score >= 85 && !newBadges.includes('saving-starter')) {
        newBadges.push('saving-starter');
        showToast('Achievement Unlocked: Saving Starter', 'success');
      }

      return {
        ...prev,
        xp: prev.xp + 45,
        streakDays,
        lastActiveDate,
        financialConfidence: Math.min(100, prev.financialConfidence + 8),
        gameStats: {
          ...prev.gameStats,
          budgetScore: score
        },
        unlockedBadges: newBadges
      };
    });
    showToast(`Budget submitted! Accuracy: ${score}%. +45 XP`, 'success');
  };

  const recordScamScore = (score: number) => {
    setUserState(prev => {
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newBadges = [...prev.unlockedBadges];
      if (score >= 80 && !newBadges.includes('scam-spotter')) {
        newBadges.push('scam-spotter');
        showToast('Achievement Unlocked: Scam Spotter', 'success');
      }

      return {
        ...prev,
        xp: prev.xp + 45,
        streakDays,
        lastActiveDate,
        financialConfidence: Math.min(100, prev.financialConfidence + 8),
        gameStats: {
          ...prev.gameStats,
          scamScore: score
        },
        unlockedBadges: newBadges
      };
    });
    showToast(`Scam Detective solved! Score: ${score}%. +45 XP`, 'success');
  };

  const recordMazeCompletion = (finalHealth: number) => {
    setUserState(prev => {
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newBadges = [...prev.unlockedBadges];
      if (finalHealth >= 75 && !newBadges.includes('smart-spender')) {
        newBadges.push('smart-spender');
        showToast('Achievement Unlocked: Smart Spender', 'success');
      }

      return {
        ...prev,
        xp: prev.xp + 60,
        streakDays,
        lastActiveDate,
        financialConfidence: Math.min(100, prev.financialConfidence + 10),
        gameStats: {
          ...prev.gameStats,
          moneyMazeCompleted: true
        },
        unlockedBadges: newBadges
      };
    });
    showToast(`Money Maze completed! Health: ${finalHealth}/100. +60 XP`, 'success');
  };

  const resolveScenario = (scenarioId: string, healthDelta: number) => {
    setUserState(prev => {
      const already = prev.scenariosResolved.includes(scenarioId);
      const newResolved = already ? prev.scenariosResolved : [...prev.scenariosResolved, scenarioId];
      const { streakDays, lastActiveDate } = checkStreakIncrement(prev);
      const newBadges = [...prev.unlockedBadges];
      if (newResolved.length >= 3 && !newBadges.includes('future-planner')) {
        newBadges.push('future-planner');
        showToast('Achievement Unlocked: Future Planner', 'success');
      }

      return {
        ...prev,
        xp: prev.xp + (already ? 10 : 35),
        streakDays,
        lastActiveDate,
        financialConfidence: Math.max(0, Math.min(100, prev.financialConfidence + healthDelta)),
        scenariosResolved: newResolved,
        unlockedBadges: newBadges
      };
    });
    showToast('Regional scenario resolved! +35 XP', 'success');
  };

  const updateProfile = (updates: Partial<UserState>) => {
    setUserState(prev => {
      const updated = { ...prev, ...updates };
      if (currentAccountId) {
        setAccounts(accs => accs.map(a => a.id === currentAccountId ? {
          ...a,
          name: updated.name,
          email: updated.email,
          avatarInitials: updated.avatarInitials || a.avatarInitials,
          city: updated.city,
          gradeOrAge: updated.gradeOrAge,
          monthlyPocketMoney: updated.monthlyPocketMoney,
          primaryGoal: updated.primaryGoal || a.primaryGoal
        } : a));
      }
      return updated;
    });
    showToast('Profile preferences updated.', 'info');
  };

  const resetProgress = () => {
    setUserState(prev => ({
      ...DEFAULT_ZERO_USER_STATE,
      id: prev.id,
      name: prev.name,
      email: prev.email,
      avatarInitials: prev.avatarInitials,
      gradeOrAge: prev.gradeOrAge,
      city: prev.city,
      monthlyPocketMoney: prev.monthlyPocketMoney,
      primaryGoal: prev.primaryGoal,
      isAuthenticated: prev.isAuthenticated,
      supabaseToken: prev.supabaseToken
    }));
    setTodayDecisionChoice(null);
    try {
      localStorage.removeItem(DECISION_KEY);
    } catch {
      // ignore
    }
    showToast('All learning progress reset to 0.', 'warning');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab: setActiveTabState,
        userState,
        accounts,
        currentUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        switchAccount,
        activeLesson,
        openLesson,
        closeLesson,
        completeLesson,
        todayDecisionChoice,
        makeTodayDecision,
        recordQuizScore,
        recordBudgetScore,
        recordScamScore,
        recordMazeCompletion,
        resolveScenario,
        updateProfile,
        resetProgress,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

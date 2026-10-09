export type ActiveTab = 
  | 'landing' 
  | 'dashboard' 
  | 'learn' 
  | 'games' 
  | 'quiz' 
  | 'scenarios' 
  | 'progress' 
  | 'settings';

export type LessonCategory = 
  | 'All' 
  | 'Saving' 
  | 'Budgeting' 
  | 'Digital payments' 
  | 'Banking' 
  | 'Investing basics' 
  | 'Borrowing' 
  | 'Online safety' 
  | 'Earning and entrepreneurship';

export interface Lesson {
  id: string;
  title: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: LessonCategory;
  description: string;
  content: {
    overview: string;
    keyConcept: string;
    realIndianStory: string;
    practicalTip: string;
    ruleOfThumb: string;
    reflectionQuestion: string;
  };
}

export interface QuizQuestionData {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tag: string;
}

export interface RegionalScenario {
  id: string;
  location: string;
  state: string;
  characterName: string;
  age: number;
  role: string;
  story: string;
  moneyDecision: string;
  regionalPhrase?: string;
  phraseMeaning?: string;
  choices: {
    id: string;
    text: string;
    consequence: string;
    financialHealthImpact: number;
    isOptimal: boolean;
  }[];
  lessonLearned: string;
}

export interface ScamItem {
  id: string;
  channel: 'SMS' | 'WhatsApp' | 'UPI App' | 'Instagram DM' | 'Phone Call';
  sender: string;
  timestamp: string;
  messageContent: string;
  type: 'safe' | 'suspicious' | 'scam';
  explanation: string;
  redFlags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarInitials: string;
  gradeOrAge: string;
  city: string;
  monthlyPocketMoney: number;
  primaryGoal: string;
  createdAt: string;
}

export interface UserState {
  id?: string;
  name: string;
  email: string;
  avatarInitials: string;
  gradeOrAge: string;
  city: string;
  monthlyPocketMoney: number;
  primaryGoal?: string;
  isAuthenticated: boolean;
  supabaseToken?: string;
  streakDays: number;
  lastActiveDate: string;
  xp: number;
  financialConfidence: number; // 0 - 100
  completedLessonIds: string[];
  quizScores: {
    lastScore: number;
    totalAttempts: number;
    highestScore: number;
  };
  gameStats: {
    budgetScore: number | null;
    scamScore: number | null;
    moneyMazeCompleted: boolean;
  };
  scenariosResolved: string[];
  unlockedBadges: string[];
}

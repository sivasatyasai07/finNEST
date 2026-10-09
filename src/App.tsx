import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { LessonModal } from './components/common/LessonModal';
import { AuthModal } from './components/common/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { LearnHub } from './components/learn/LearnHub';
import { InteractiveGames } from './components/games/InteractiveGames';
import { QuizExperience } from './components/quiz/QuizExperience';
import { RegionalScenarios } from './components/scenarios/RegionalScenarios';
import { ProgressAchievements } from './components/progress/ProgressAchievements';
import { UserSettings } from './components/settings/UserSettings';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, toast } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
      {/* Top Navigation */}
      <Header />

      {/* Main Content View */}
      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'dashboard' && <StudentDashboard />}
        {activeTab === 'learn' && <LearnHub />}
        {activeTab === 'games' && <InteractiveGames />}
        {activeTab === 'quiz' && <QuizExperience />}
        {activeTab === 'scenarios' && <RegionalScenarios />}
        {activeTab === 'progress' && <ProgressAchievements />}
        {activeTab === 'settings' && <UserSettings />}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Lesson Reading Modal */}
      <LessonModal />

      {/* User Authentication Modal */}
      <AuthModal />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Toast Alert */}
      {toast && (
        <div className="toast-bar">
          {toast.type === 'success' && <CheckCircle2 size={16} color="var(--success)" />}
          {toast.type === 'warning' && <AlertCircle size={16} color="var(--warning)" />}
          {toast.type === 'info' && <Info size={16} color="var(--accent-earth)" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

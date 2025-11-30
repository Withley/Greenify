import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { WelcomePage } from './components/pages/WelcomePage';
import { MapPage } from './components/pages/MapPage';
import { PlantRecognitionPage } from './components/pages/PlantRecognitionPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { TasksPage } from './components/pages/TasksPage';
import { GamesSelectionPage } from './components/pages/GamesSelectionPage';
import { QuestionsPage } from './components/pages/EducationalGamesPage';
import { InteractiveGamesPage } from './components/pages/InteractiveGamesPage';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { type Language } from './utils/translations';

type Page = 'home' | 'welcome' | 'login' | 'register' | 'map' | 'plant' | 'profile' | 'about' | 'contact' | 'tasks' | 'games' | 'games-questions' | 'games-interactive';

interface User {
  name: string;
  email: string;
  points: number;
  tasksCompleted: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang as Language) || 'az';
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('ecoUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ecoUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('ecoUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    const savedUser = localStorage.getItem('ecoUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        setCurrentPage('welcome');
        return;
      }
    }
    setUser({
      name: email.split('@')[0],
      email: email,
      points: 0,
      tasksCompleted: 0
    });
    setCurrentPage('welcome');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulate registration
    setUser({
      name: name,
      email: email,
      points: 0,
      tasksCompleted: 0
    });
    setCurrentPage('welcome');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handlePointsEarned = (points: number, tasksCompleted: number = 0) => {
    if (user) {
      setUser({
        ...user,
        points: user.points + points,
        tasksCompleted: user.tasksCompleted + tasksCompleted
      });
      
      // Show toast notification
      if (points > 0) {
        toast.success(`🎉 Təbriklər! +${points} xal qazandınız!`, {
          description: tasksCompleted > 0 ? `${tasksCompleted} tapşırıq tamamlandı` : 'Bal profilinizə əlavə edildi',
          duration: 3000,
        });
      }
    }
  };

  const handleNavigate = (page: string) => {
    // Redirect to login if trying to access protected pages
    if (!user && (page === 'welcome' || page === 'profile')) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page as Page);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      <Toaster 
        position="top-center"
        theme={isDarkMode ? "dark" : "light"}
        toastOptions={{
          style: {
            background: isDarkMode ? '#1A2324' : '#ffffff',
            color: isDarkMode ? '#E1E1E1' : '#1A2324',
            border: '1px solid #00C57A',
          },
        }}
      />
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={!!user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        language={language}
        onLanguageChange={changeLanguage}
      />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'register' && <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'map' && <MapPage isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'welcome' && user && <WelcomePage userName={user.name} onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'map' && <MapPage isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'plant' && <PlantRecognitionPage isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'profile' && user && <ProfilePage userName={user.name} userEmail={user.email} userPoints={user.points} tasksCompleted={user.tasksCompleted} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'about' && <AboutPage isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'contact' && <ContactPage isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'tasks' && <TasksPage onPointsEarned={handlePointsEarned} onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'games' && <GamesSelectionPage onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'games-questions' && <QuestionsPage onPointsEarned={handlePointsEarned} onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
      {currentPage === 'games-interactive' && <InteractiveGamesPage onPointsEarned={handlePointsEarned} onNavigate={handleNavigate} isDarkMode={isDarkMode} language={language} />}
    </div>
  );
}
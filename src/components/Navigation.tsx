import { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/7af1293a77ad635af7592a238503869be2e5fbba.png';
import { type Language, getTranslation } from '../utils/translations';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function Navigation({ currentPage, onNavigate, isLoggedIn = false, onLogout, isDarkMode = true, onToggleTheme, language = 'az', onLanguageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = (key: keyof typeof import('../utils/translations').translations.az) => getTranslation(language, key);

  const menuItems = [
    { label: t('home'), value: 'home' },
    { label: t('about'), value: 'about' },
    { label: t('plantRecognition'), value: 'plant' },
    { label: t('tasks'), value: 'tasks' },
    { label: t('educationalGames'), value: 'games' },
    { label: t('map'), value: 'map' },
    { label: t('contact'), value: 'contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'az', label: 'AZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <nav className={`h-[64px] md:h-[72px] transition-all duration-300 ${isDarkMode ? 'bg-[#101415] border-[#2F3B3C]' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8 lg:px-12 xl:px-[120px] h-full flex items-center justify-between">
        {/* Logo */}
        <motion.button 
          onClick={() => onNavigate(isLoggedIn ? 'welcome' : 'home')}
          className="flex items-center gap-2 md:gap-3 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img 
            src={logo} 
            alt="Greenify Logo" 
            className="h-12 md:h-16 lg:h-20 w-auto flex-shrink-0"
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <motion.button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`transition-colors relative ${
                isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
              } ${
                currentPage === item.value ? 'text-[#00C57A]' : ''
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {currentPage === item.value && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00C57A]"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                isDarkMode ? 'bg-[#1A2324] text-[#00C57A] hover:bg-[#2F3B3C]' : 'bg-gray-100 text-[#00C57A] hover:bg-gray-200'
              }`}
              title="Change Language"
            >
              <Globe size={20} />
              <span className="text-sm">{language.toUpperCase()}</span>
            </button>
            
            {isLangMenuOpen && (
              <motion.div 
                className={`absolute right-0 mt-2 py-2 w-24 rounded-lg shadow-lg z-50 ${
                  isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'
                }`}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange?.(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors ${
                      language === lang.code ? 'text-[#00C57A]' : isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <motion.button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode ? 'bg-[#1A2324] text-[#00C57A] hover:bg-[#2F3B3C]' : 'bg-gray-100 text-[#00C57A] hover:bg-gray-200'
            }`}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          {isLoggedIn ? (
            <>
              <motion.button
                onClick={() => onNavigate('profile')}
                className={`transition-colors ${
                  isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                } ${
                  currentPage === 'profile' ? 'text-[#00C57A]' : ''
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('profile')}
              </motion.button>
              <motion.button
                onClick={onLogout}
                className={`px-5 py-2 rounded-lg border border-[#00C57A] text-[#00C57A] transition-all ${
                  isDarkMode ? 'hover:bg-[#00C57A] hover:text-[#101415]' : 'hover:bg-[#00C57A] hover:text-white'
                }`}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 197, 122, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {t('logout')}
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => onNavigate('login')}
              className={`px-5 py-2 rounded-lg bg-[#00C57A] transition-all ${
                isDarkMode ? 'text-[#101415] hover:bg-[#7DF2C6]' : 'text-white hover:bg-[#7DF2C6]'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 197, 122, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('loginRegister')}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button, Language & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language Selector Mobile */}
          <div className="relative">
            <motion.button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                isDarkMode ? 'bg-[#1A2324] text-[#00C57A]' : 'bg-gray-100 text-[#00C57A]'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe size={18} />
              <span className="text-xs">{language.toUpperCase()}</span>
            </motion.button>
            
            {isLangMenuOpen && (
              <motion.div 
                className={`absolute right-0 mt-2 py-2 w-20 rounded-lg shadow-lg z-50 ${
                  isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'
                }`}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange?.(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left transition-colors text-sm ${
                      language === lang.code ? 'text-[#00C57A]' : isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          <motion.button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode ? 'bg-[#1A2324] text-[#00C57A]' : 'bg-gray-100 text-[#00C57A]'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-800'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={`md:hidden transition-colors ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-gray-50 border-gray-200'} border-t`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col py-4 px-6 gap-4">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left transition-colors ${
                  isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                } ${
                  currentPage === item.value ? 'text-[#00C57A]' : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            {isLoggedIn ? (
              <>
                <motion.button
                  onClick={() => {
                    onNavigate('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors ${
                    isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                  } ${
                    currentPage === 'profile' ? 'text-[#00C57A]' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('profile')}
                </motion.button>
                <motion.button
                  onClick={() => {
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left px-5 py-2 rounded-lg border border-[#00C57A] text-[#00C57A] transition-all hover:bg-[#00C57A] hover:text-[#101415]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (menuItems.length + 1) * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('logout')}
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => {
                  onNavigate('login');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-5 py-2 rounded-lg bg-[#00C57A] transition-all ${
                  isDarkMode ? 'text-[#101415] hover:bg-[#7DF2C6]' : 'text-white hover:bg-[#7DF2C6]'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('loginRegister')}
              </motion.button>
            )}
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
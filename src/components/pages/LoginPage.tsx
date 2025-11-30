import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { type Language, getTranslation } from '../../utils/translations';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

export function LoginPage({ onLogin, onNavigate, isDarkMode, language }: LoginPageProps) {
  const t = (key: keyof typeof import('../../utils/translations').translations.az) => getTranslation(language, key);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      try {
        // Check if user exists in localStorage
        const savedUsers = localStorage.getItem('ecoUsers');
        const users = savedUsers ? JSON.parse(savedUsers) : [];
        
        const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
        
        if (!user) {
          setError(language === 'az' ? 'Email və ya şifrə düzgün deyil' : language === 'en' ? 'Email or password is incorrect' : 'Email или пароль неверны');
        } else {
          localStorage.setItem('token', 'mock-token-' + Date.now());
          setError('');
          onLogin(email, password);
        }
      } catch (err) {
        setError(language === 'az' ? 'Xəta baş verdi' : language === 'en' ? 'An error occurred' : 'Произошла ошибка');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] flex items-center justify-center px-2 xs:px-4 sm480:px-6 sm576:px-8 py-6 xs:py-8 sm480:py-12 ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      <div className="w-full max-w-md px-2 xs:px-0">
        <motion.div 
          className={`rounded-[16px] p-4 xs:p-6 sm480:p-8 relative overflow-hidden ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'}`}
          style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5, boxShadow: isDarkMode ? '0 8px 40px rgba(0, 197, 122, 0.2)' : '0 8px 40px rgba(0, 197, 122, 0.15)' }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#00C57A] to-transparent opacity-0"
            whileHover={{ opacity: 0.05 }}
          />

          <motion.h2 
            className={`text-center mb-8 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('login')}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block mb-2 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                {t('email')}
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'}`} size={20} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isDarkMode ? 'bg-[#2F3B3C] text-[#E1E1E1]' : 'bg-gray-100 text-[#101415] border border-gray-300'} px-4 py-3 pl-14 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
                  placeholder={t('email')}
                  required 
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block mb-2 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                {t('password')}
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'}`} size={20} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${isDarkMode ? 'bg-[#2F3B3C] text-[#E1E1E1]' : 'bg-gray-100 text-[#101415] border border-gray-300'} px-4 py-3 pl-14 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
                  placeholder={t('password')}
                  required 
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="text-red-400 text-center caption bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg p-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#00C57A] text-[#101415] py-3 rounded-[12px] hover:bg-[#7DF2C6] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 10px 30px rgba(0, 197, 122, 0.3)' } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <LogIn size={20} />
                  </motion.div>
                  <span>{language === 'az' ? 'Yüklənir...' : language === 'en' ? 'Loading...' : 'Загрузка...'}</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>{t('loginButton')}</span>
                </>
              )}
            </motion.button>
          </form>

          <motion.div 
            className="mt-6 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className={isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}>{t('noAccount')} </span>
            <button 
              onClick={() => onNavigate('register')} 
              className="text-[#00C57A] hover:text-[#7DF2C6] transition-colors font-medium"
            >
              {t('register')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

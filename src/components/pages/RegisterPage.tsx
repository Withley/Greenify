import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { type Language, getTranslation } from '../../utils/translations';

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string) => void;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

export function RegisterPage({ onRegister, onNavigate, isDarkMode, language }: RegisterPageProps) {
  const t = (key: keyof typeof import('../../utils/translations').translations.az) =>
    getTranslation(language, key);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError(
        language === 'az'
          ? 'Şifrələr uyğun gəlmir'
          : language === 'en'
          ? 'Passwords do not match'
          : 'Пароли не совпадают'
      );
      return;
    }

    if (password.length < 6) {
      setError(
        language === 'az'
          ? 'Şifrə ən azı 6 simvol olmalıdır'
          : language === 'en'
          ? 'Password must be at least 6 characters'
          : 'Пароль должен содержать не менее 6 символов'
      );
      return;
    }

    setIsLoading(true);

    try {
      const cavab = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });

      if (cavab.data.success) {
        setSuccess(
          language === 'az'
            ? 'Uğurla qeydiyyatdan keçdi!'
            : language === 'en'
            ? 'Successfully registered!'
            : 'Успешно зарегистрирован!'
        );
        setTimeout(() => {
          onRegister(name, email, password);
        }, 1000);
      } else {
        setError(cavab.data.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (language === 'az'
            ? 'Server xətası'
            : language === 'en'
            ? 'Server error'
            : 'Ошибка сервера')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] flex items-center justify-center px-2 xs:px-4 sm480:px-6 sm576:px-8 py-6 xs:py-8 sm480:py-12 ${
        isDarkMode ? 'bg-[#101415]' : 'bg-white'
      }`}
    >
      <div className="w-full max-w-md px-2 xs:px-0">
        <motion.div
          className={`rounded-[16px] p-4 xs:p-6 sm480:p-8 relative overflow-hidden ${
            isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
          }`}
          style={{
            boxShadow: isDarkMode
              ? '0 4px 24px rgba(0,0,0,0.35)'
              : '0 4px 24px rgba(0,0,0,0.1)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{
            y: -5,
            boxShadow: isDarkMode
              ? '0 8px 40px rgba(0, 197, 122, 0.2)'
              : '0 8px 40px rgba(0, 197, 122, 0.15)',
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#00C57A] to-transparent opacity-0"
            whileHover={{ opacity: 0.05 }}
          />

          <motion.h2
            className={`text-center mb-8 ${
              isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('registerTitle')}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="name"
                className={`block mb-2 caption ${
                  isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'
                }`}
              >
                {t('name')}
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full ${
                    isDarkMode
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]'
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  } px-4 py-3 pl-14 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="email"
                className={`block mb-2 caption ${
                  isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'
                }`}
              >
                {t('email')}
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${
                    isDarkMode
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]'
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  } px-4 py-3 pl-14 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password"
                className={`block mb-2 caption ${
                  isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'
                }`}
              >
                {t('password')}
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${
                    isDarkMode
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]'
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  } px-4 py-3 pl-14 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="confirmPassword"
                className={`block mb-2 caption ${
                  isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'
                }`}
              >
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'
                  }`}
                  size={20}
                />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full ${
                    isDarkMode
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]'
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  } px-4 py-3 pl-14 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all`}
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
              {success && (
                <motion.div
                  className="text-[#00C57A] text-center caption bg-[#00C57A] bg-opacity-10 border border-[#00C57A] border-opacity-30 rounded-lg p-3 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <CheckCircle size={20} />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00C57A] text-[#101415] py-3 rounded-[12px] hover:bg-[#7DF2C6] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={
                !isLoading
                  ? { scale: 1.02, boxShadow: '0 10px 30px rgba(0, 197, 122, 0.3)' }
                  : {}
              }
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <UserPlus size={20} />
                  </motion.div>
                  <span>
                    {language === 'az'
                      ? 'Yüklənir...'
                      : language === 'en'
                      ? 'Loading...'
                      : 'Загрузка...'}
                  </span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>{t('registerButton')}</span>
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className={isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}>
              {t('haveAccount')}{' '}
            </span>
            <button
              onClick={() => onNavigate('login')}
              className="text-[#00C57A] hover:text-[#7DF2C6] transition-colors font-medium"
            >
              {t('loginLink')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Footer } from '../Footer';
import { translations, type Language } from '../../utils/translations';

// Floating envelope component
const FloatingEnvelope = ({ delay = 0 }: { delay?: number }) => {
  const randomX = Math.random() * 100;
  return (
    <motion.div
      className="absolute text-4xl opacity-10 will-change-transform"
      initial={{ y: '100%', x: `${randomX}%` }}
      animate={{
        y: '-100%',
        rotate: 360
      }}
      transition={{
        duration: 15,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      ✉️
    </motion.div>
  );
};

interface ContactPageProps {
  isDarkMode: boolean;
  language: Language;
}

export function ContactPage({ isDarkMode, language }: ContactPageProps) {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-[calc(100vh-72px)] py-8 md:py-12 relative overflow-hidden ${
      isDarkMode ? 'bg-[#101415]' : 'bg-white'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <FloatingEnvelope key={i} delay={i * 2.5} />
        ))}
      </div>

      {/* Animated Grid Lines */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00C57A 1px, transparent 1px), linear-gradient(90deg, #00C57A 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-3 md:mb-4"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Mail className="text-[#00C57A] mx-auto" size={40} />
          </motion.div>
          <h1 className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.contactTitle}</h1>
          <motion.p 
            className={`opacity-80 text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3 }}
          >
            {t.contactSubtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            className={`rounded-[16px] p-6 md:p-8 relative overflow-hidden ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              y: -5,
              boxShadow: isDarkMode ? '0 8px 40px rgba(0, 197, 122, 0.2)' : '0 8px 40px rgba(0, 197, 122, 0.15)'
            }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#00C57A] to-transparent opacity-0"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.h3 
              className={`mb-4 md:mb-6 relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t.sendMessage}
            </motion.h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="name" className={`block mb-2 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {t.fullName}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all ${
                    isDarkMode 
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]' 
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  }`}
                  placeholder={t.fullName}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" className={`block mb-2 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {t.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all ${
                    isDarkMode 
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]' 
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  }`}
                  placeholder={t.email}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="subject" className={`block mb-2 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Mövzu' : language === 'en' ? 'Subject' : 'Тема'}
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all ${
                    isDarkMode 
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]' 
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  }`}
                  placeholder={language === 'az' ? 'Mövzu' : language === 'en' ? 'Subject' : 'Тема'}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="message" className={`block mb-2 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {t.message}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-[12px] outline-none focus:ring-2 focus:ring-[#00C57A] transition-all min-h-[150px] resize-none ${
                    isDarkMode 
                      ? 'bg-[#2F3B3C] text-[#E1E1E1]' 
                      : 'bg-gray-100 text-[#101415] border border-gray-300'
                  }`}
                  placeholder={t.message}
                  required
                />
              </motion.div>

              <AnimatePresence>
                {submitted && (
                  <motion.div 
                    className="bg-[#000000] bg-opacity-20 border border-[#00C57A] text-[#00C57A] px-4 py-3 rounded-[12px] caption text-center flex items-center justify-center gap-2"
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  >
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={20} />
                    </motion.div>
                    <span>
                      {language === 'az' 
                        ? 'Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.'
                        : language === 'en'
                        ? 'Your message was sent successfully! We will contact you soon.'
                        : 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
                      }
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#00C57A] text-[#101415] py-3 rounded-[12px] hover:bg-[#7DF2C6] transition-all disabled:opacity-50"
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 10px 30px rgba(0, 197, 122, 0.3)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send size={20} />
                    </motion.div>
                    <span>{language === 'az' ? 'Göndərilir...' : language === 'en' ? 'Sending...' : 'Отправка...'}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t.sendMessage}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              className={`rounded-[16px] p-6 md:p-8 ${
                isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
              }`}
              style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                y: -5,
                boxShadow: isDarkMode ? '0 8px 40px rgba(0, 197, 122, 0.2)' : '0 8px 40px rgba(0, 197, 122, 0.15)'
              }}
            >
              <h3 className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.contactInfo}</h3>
              
              <div className="space-y-4 md:space-y-6">
                <motion.div 
                  className="flex items-start gap-3 md:gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center flex-shrink-0 text-xl md:text-2xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    📧
                  </motion.div>
                  <div>
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.email}</p>
                    <p className={`opacity-80 text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>greenify.personal@gmail.com </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-3 md:gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center flex-shrink-0 text-xl md:text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ scale: 1.1 }}
                  >
                    📞
                  </motion.div>
                  <div>
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.phone}</p>
                    <p className={`opacity-80 text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>+994 12 345 67 89</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-3 md:gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center flex-shrink-0 text-xl md:text-2xl"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ scale: 1.1 }}
                  >
                    📍
                  </motion.div>
                  <div>
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.address}</p>
                    <p className={`opacity-80 text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                      {t.addressText}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className={`rounded-[16px] p-6 md:p-8 text-center relative overflow-hidden ${
                isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
              }`}
              style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ 
                y: -5,
                boxShadow: isDarkMode ? '0 8px 40px rgba(0, 197, 122, 0.2)' : '0 8px 40px rgba(0, 197, 122, 0.15)'
              }}
            >
              {/* Animated background sparkles */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(0, 197, 122, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(0, 197, 122, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(0, 197, 122, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div 
                className="text-4xl md:text-5xl mb-3 md:mb-4 relative z-10"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📱
              </motion.div>
              <h3 className={`mb-2 relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                {language === 'az' ? 'Sosial Media' : language === 'en' ? 'Social Media' : 'Социальные сети'}
              </h3>
              <motion.p 
                className={`opacity-70 caption mb-3 md:mb-4 relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
              >
                {language === 'az' ? 'Bizə sosial mediadan da izləyin' : language === 'en' ? 'Follow us on social media' : 'Следите за нами в социальных сетях'}
              </motion.p>
              <div className="flex justify-center gap-3 md:gap-4 relative z-10">
                {[
                  { icon: '📸', name: 'Instagram' },
                  { icon: '📺', name: 'YouTube' },
                  { icon: '🎵', name: 'TikTok' }
                ].map((social, index) => (
                  <motion.button 
                    key={social.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all text-lg md:text-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.2, 
                      backgroundColor: 'rgba(0, 197, 122, 0.3)',
                      rotate: 360
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span>{social.icon}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
}

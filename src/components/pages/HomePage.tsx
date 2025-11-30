import { Map, Scan, MessageCircle } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';
import { Footer } from '../Footer';
import { motion } from 'motion/react';
import { type Language, getTranslation } from '../../utils/translations';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isDarkMode?: boolean;
  language?: Language;
}

export function HomePage({ onNavigate, isDarkMode = true, language = 'az' }: HomePageProps) {
  const t = (key: keyof typeof import('../../utils/translations').translations.az) => getTranslation(language, key);

  const bgOpacity = isDarkMode ? 0.2 : 0.07;
  const sectionBg = isDarkMode ? '#1A2324' : '#f7f9f9';
  const cardBg = isDarkMode ? '#1A2324' : '#ffffff';
  const cardShadow = isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.08)';
  const cardHoverShadow = isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.08)';

  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)]">
      {/* Hero Section */}
      <section className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] py-12 md:py-20 lg:py-32 overflow-hidden">
        {/* Animated Background with Gradient Overlay */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1718307842442-e4c776ecdc96?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(ellipse at top, rgba(0, 197, 122, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(125, 242, 198, 0.1) 0%, transparent 50%)'
                : 'radial-gradient(ellipse at top, rgba(0, 197, 122, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(125, 242, 198, 0.06) 0%, transparent 50%)'
            }}
          ></div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#00C57A] opacity-10 blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#7DF2C6] opacity-10 blur-2xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className={`mb-4 md:mb-6 px-4 font-bold text-4xl md:text-5xl lg:text-6xl ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-800 opacity-95'}`}
            style={{
              textShadow: isDarkMode ? '0 0 40px rgba(0, 197, 122, 0.3)' : 'none'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('welcomeTitle')}
          </motion.h1>
          <motion.p 
            className={`text-base md:text-lg lg:text-xl mb-8 md:mb-12 px-4 ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700 opacity-90'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('welcomeSubtitle')}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => onNavigate('login')}
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#00C57A] to-[#00E68A] text-white rounded-[12px] font-semibold transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,197,122,0.4)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('getStarted')}
            </motion.button>

            <motion.button
              onClick={() => onNavigate('plant')}
              className={`px-6 md:px-8 py-3 md:py-4 border-2 border-[#00C57A] rounded-[12px] font-semibold transition-all backdrop-blur-sm ${
                isDarkMode 
                  ? 'text-[#00C57A] bg-[#00C57A]/10 hover:bg-[#00C57A] hover:text-[#101415] hover:shadow-[0_0_30px_rgba(0,197,122,0.3)]' 
                  : 'text-[#00C57A] bg-[#00C57A]/5 hover:bg-[#00C57A] hover:text-white hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('plantRecognition')}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: sectionBg }}>
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDarkMode ? '#00C57A' : '#00C57A'} 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] relative z-10">
          <motion.h2 
            className={`text-center mb-8 md:mb-12 text-3xl md:text-4xl lg:text-5xl font-bold ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900 opacity-95'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('features')}
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-center items-stretch">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <FeatureCard
                icon={<Map size={48} />}
                title={t('recyclingMapTitle')}
                description={t('recyclingMapDesc')}
                onClick={() => onNavigate('map')}
                isDarkMode={isDarkMode}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <FeatureCard
                icon={<Scan size={48} />}
                title={t('plantRecognitionTitle')}
                description={t('plantRecognitionDesc')}
                onClick={() => onNavigate('plant')}
                isDarkMode={isDarkMode}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <FeatureCard
                icon={<MessageCircle size={48} />}
                title={t('tasksTitle')}
                description={t('tasksDesc')}
                onClick={() => onNavigate('tasks')}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-12 md:py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00C57A] opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#7DF2C6] opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className={`mb-4 md:mb-6 text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900 opacity-95'}`}>{t('ourMission')}</h2>
            <p className={`mb-4 md:mb-6 text-lg ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700 opacity-90'}`}>{t('ourMissionText')}</p>
            <ul className={`space-y-3 ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700 opacity-90'}`}>
              <motion.li className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                <span className="text-[#00C57A] mt-1 text-xl font-bold">✓</span>
                <span>{t('recyclingMapDesc')}</span>
              </motion.li>
              <motion.li className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
                <span className="text-[#00C57A] mt-1 text-xl font-bold">✓</span>
                <span>{t('plantRecognitionDesc')}</span>
              </motion.li>
              <motion.li className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}>
                <span className="text-[#00C57A] mt-1 text-xl font-bold">✓</span>
                <span>{t('communityText')}</span>
              </motion.li>
            </ul>
          </motion.div>
              
          <motion.div 
            className={`rounded-[16px] p-6 md:p-8 text-center relative overflow-hidden`}
            style={{ 
              backgroundColor: cardBg, 
              boxShadow: cardShadow,
              border: isDarkMode ? '1px solid rgba(0, 197, 122, 0.1)' : '1px solid rgba(0, 197, 122, 0.05)'
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, boxShadow: cardHoverShadow }}
          >
            {/* Gradient Background Effect */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.2) 0%, transparent 70%)'
                  : 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.08) 0%, transparent 70%)'
              }}
            />
            
            <motion.div 
              className="text-5xl md:text-7xl mb-4 relative z-10" 
              initial={{ scale: 0, rotate: -180 }} 
              whileInView={{ scale: 1, rotate: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.5 }}
            >
              🌍
            </motion.div>
            <h3 className={`mb-3 md:mb-4 text-2xl md:text-3xl font-bold relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900 opacity-95'}`}>{t('community')}</h3>
            <p className={`caption mb-4 md:mb-6 relative z-10 ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-700 opacity-90'}`}>{t('communityText')}</p>
            <motion.button
              onClick={() => onNavigate('login')}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#00C57A] to-[#00E68A] text-white rounded-[12px] font-semibold transition-all shadow-lg relative z-10 hover:shadow-[0_0_30px_rgba(0,197,122,0.4)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('getStarted')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
}
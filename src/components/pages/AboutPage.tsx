import { motion } from 'motion/react';
import { Footer } from '../Footer';
import globeIcon from '../../assets/Globe.png';
import bookIcon from 'figma:asset/4805f6a74e866be31d68525329cff2e924729172.png';
import peopleIcon from 'figma:asset/a22b7f8dce784524e7ec5cba50d16f401d53c028.png';
import { translations, type Language } from '../../utils/translations';

interface AboutPageProps {
  isDarkMode: boolean;
  language: Language;
}

export function AboutPage({ isDarkMode, language }: AboutPageProps) {
  const t = translations[language];

  return (
    <div className={`min-h-[calc(100vh-72px)] py-8 md:py-12 relative overflow-hidden ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#00C57A] opacity-5 blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-[#7DF2C6] opacity-5 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] relative z-10">
        {/* Hero */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-[#00C57A] opacity-10 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <h1 className={`mb-4 md:mb-6 text-4xl md:text-5xl lg:text-6xl font-bold ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
            style={{
              textShadow: isDarkMode ? '0 0 40px rgba(0, 197, 122, 0.2)' : 'none'
            }}
          >
            {t.aboutTitle}
          </h1>
          <p className={`opacity-80 text-base md:text-xl ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {t.ourMissionText}
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div
            className={`rounded-[16px] p-6 md:p-8 text-center relative overflow-hidden ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ 
              boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)',
              border: isDarkMode ? '1px solid rgba(0, 197, 122, 0.1)' : undefined
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.05) 0%, transparent 70%)'
              }}
            />
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-[#00C57A] to-[#00E68A] bg-opacity-20 flex items-center justify-center shadow-lg relative z-10"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <img src={globeIcon} alt="Globe" className="w-7 h-7" />
            </motion.div>
            <h3 className={`mb-2 md:mb-3 text-xl md:text-2xl font-bold relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.ourMission}
            </h3>
            <p className={`opacity-70 caption relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.ourMissionText}
            </p>
          </motion.div>

          <motion.div
            className={`rounded-[16px] p-6 md:p-8 text-center relative overflow-hidden ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ 
              boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)',
              border: isDarkMode ? '1px solid rgba(0, 197, 122, 0.1)' : undefined
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.05) 0%, transparent 70%)'
              }}
            />
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-[#00C57A] to-[#00E68A] bg-opacity-20 flex items-center justify-center shadow-lg relative z-10"
              whileHover={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            >
              <img src={bookIcon} alt="Book" className="w-7 h-7" />
            </motion.div>
            <h3 className={`mb-2 md:mb-3 text-xl md:text-2xl font-bold relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.ourValues}
            </h3>
            <p className={`opacity-70 caption relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.ourValuesText}
            </p>
          </motion.div>

          <motion.div
            className={`rounded-[16px] p-6 md:p-8 text-center relative overflow-hidden ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ 
              boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)',
              border: isDarkMode ? '1px solid rgba(0, 197, 122, 0.1)' : undefined
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.05) 0%, transparent 70%)'
              }}
            />
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-[#00C57A] to-[#00E68A] bg-opacity-20 flex items-center justify-center shadow-lg relative z-10"
              whileHover={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img src={peopleIcon} alt="People" className="w-7 h-7" />
            </motion.div>
            <h3 className={`mb-2 md:mb-3 text-xl md:text-2xl font-bold relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.community}
            </h3>
            <p className={`opacity-70 caption relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.communityText}
            </p>
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`mb-4 md:mb-6 text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {language === 'az' ? 'Hekayəmiz' : language === 'en' ? 'Our Story' : 'Наша история'}
            </h2>
            <div className={`space-y-4 opacity-80 text-lg ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {language === 'az' 
                  ? '2025-ci ildə bir qrup ekologiya həvəskarı tərəfindən qurulan platformamız, Azərbaycanda ekologiya şüurunun artırılması və təkrar emal mədəniyyətinin inkişafı məqsədilə fəaliyyətə başlamışdır.'
                  : language === 'en'
                  ? 'Founded in 2025 by a group of environmental enthusiasts, our platform started operations with the goal of raising ecological awareness and developing recycling culture in Azerbaijan.'
                  : 'Основанная в 2025 году группой экологических энтузиастов, наша платформа начала свою деятельность с целью повышения экологической осведомленности и развития культуры переработки в Азербайджане.'
                }
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {language === 'az'
                  ? 'Təkrar emal məntəqələrinin tapılmasının çətinliyi və bitkilər haqqında məlumat əldə etmənin mürəkkəbliyi bizə bu platformanı yaratmaq üçün ilham verdi.'
                  : language === 'en'
                  ? 'The difficulty of finding recycling centers and the complexity of obtaining information about plants inspired us to create this platform.'
                  : 'Сложность поиска центров переработки и получения информации о растениях вдохновила нас создать эту платформу.'
                }
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className={`rounded-[16px] p-6 md:p-8 relative overflow-hidden ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ 
              boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)',
              border: isDarkMode ? '1px solid rgba(0, 197, 122, 0.1)' : undefined
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
              y: -8,
              boxShadow: isDarkMode ? '0 12px 40px rgba(0,197,122,0.25)' : '0 12px 40px rgba(0,197,122,0.15)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.2) 0%, transparent 70%)'
                  : 'radial-gradient(circle at 50% 0%, rgba(0, 197, 122, 0.08) 0%, transparent 70%)'
              }}
            />
            <motion.div
              className="text-5xl md:text-7xl mb-3 md:mb-4 text-center relative z-10"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            >
              🌱
            </motion.div>
            <h3 className={`text-center mb-4 md:mb-6 text-2xl md:text-3xl font-bold relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {language === 'az' ? 'Nailiyyətlərimiz' : language === 'en' ? 'Our Achievements' : 'Наши достижения'}
            </h3>
            <div className="space-y-4 relative z-10">
              <motion.div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ 
                  background: isDarkMode ? 'rgba(0, 197, 122, 0.05)' : 'rgba(0, 197, 122, 0.03)' 
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ x: 5 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Aktiv İstifadəçi' : language === 'en' ? 'Active Users' : 'Активных пользователей'}
                </span>
                <span className="text-[#00C57A] font-bold text-xl">15</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ 
                  background: isDarkMode ? 'rgba(0, 197, 122, 0.05)' : 'rgba(0, 197, 122, 0.03)' 
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Təkrar Emal Nöqtəsi' : language === 'en' ? 'Recycling Points' : 'Пунктов переработки'}
                </span>
                <span className="text-[#00C57A] font-bold text-xl">100</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ 
                  background: isDarkMode ? 'rgba(0, 197, 122, 0.05)' : 'rgba(0, 197, 122, 0.03)' 
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Tanınmış Bitki' : language === 'en' ? 'Plants Recognized' : 'Распознано растений'}
                </span>
                <span className="text-[#00C57A] font-bold text-xl">0</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ 
                  background: isDarkMode ? 'rgba(0, 197, 122, 0.05)' : 'rgba(0, 197, 122, 0.03)' 
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Tullantı Toplanması (kg)' : language === 'en' ? 'Waste Collected (kg)' : 'Собрано отходов (кг)'}
                </span>
                <span className="text-[#00C57A] font-bold text-xl">0</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-bold ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {language === 'az' ? 'Komandamız' : language === 'en' ? 'Our Team' : 'Наша команда'}
          </h2>
          <p className={`opacity-80 max-w-2xl mx-auto mb-8 md:mb-12 text-lg ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {language === 'az'
              ? 'Ekologiya, texnologiya və dizayn sahəsində peşəkarlardan ibarət komandamız təbiəti qorumaq üçün çalışır.'
              : language === 'en'
              ? 'Our team of professionals in ecology, technology, and design work to protect nature.'
              : 'Наша команда профессионалов в области экологии, технологий и дизайна работает для защиты природы.'
            }
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['Fərhad Abbaslı', 'Ümid İsmayılov', 'Kərim Əlizadə', 'Ayxan Şadimanpur'].map((name, index) => (
              <motion.div
                key={index}
                className={`rounded-[16px] p-4 md:p-6 text-center relative overflow-hidden ${
                  isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
                }`}
                style={{ 
                  boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)',
                  border: isDarkMode ? '1px solid rgba(0, 197, 122, 0.08)' : undefined
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.25)' : '0 8px 32px rgba(0,197,122,0.15)'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300"
                  style={{
                    background: isDarkMode
                      ? 'radial-gradient(circle at 50% 50%, rgba(0, 197, 122, 0.1) 0%, transparent 70%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(0, 197, 122, 0.05) 0%, transparent 70%)'
                  }}
                />
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-[#00C57A] to-[#00E68A] flex items-center justify-center shadow-lg relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={peopleIcon} alt="Team Member" className="w-8 h-8" />
                </motion.div>
                <p className={`text-sm md:text-base font-semibold relative z-10 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
}
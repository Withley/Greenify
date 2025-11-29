import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Camera, Loader2, Droplet, Sun, AlertTriangle, Leaf, Sparkles, CheckCircle, MessageCircle, X, Send, Paperclip } from 'lucide-react';
import { translations, type Language } from '../../utils/translations';
import telegramIcon from 'src/assets/0b2433cc304d24f11b1e266d5d34bf8456d729d3.pn';

interface PlantInfo {
  name: string;
  family: string;
  waterNeeds: string;
  sunlight: string;
  toxicity: string;
  ecologicalBenefits: string;
  similarPlants: string[];
}

interface ChatMessage {
  text: string;
  sender: 'bot' | 'user';
  image?: string;
}

interface PlantRecognitionPageProps {
  isDarkMode: boolean;
  language: Language;
}

// Floating particle component
const FloatingLeaf = ({ delay = 0 }: { delay?: number }) => {
  const randomX = Math.random() * 100;
  return (
    <motion.div
      className="absolute text-3xl will-change-transform"
      initial={{ y: '100%', x: `${randomX}%`, opacity: 0 }}
      animate={{
        y: '-100%',
        opacity: [0, 0.3, 0],
        rotate: 360
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      🍃
    </motion.div>
  );
};

// Chat responses data
const getChatResponses = (language: Language) => {
  if (language === 'en') {
    return {
      water: '💧 Plant water requirements vary by species:\n\n• Cacti: 1-2 times per month\n• Tropical plants: 2-3 times per week\n• Herbaceous plants: 1-2 times per week\n\nWater when soil is dry and check drainage.',
      light: '☀️ Plant light requirements:\n\n• Bright light: cacti, succulents\n• Medium light: ficus, monstera\n• Low light: zamioculcas, pothos\n\nPlace your plant in the right spot and gradually acclimate it to new light.',
      soil: '🌱 Soil and drainage:\n\n• Good drainage is essential\n• Each plant has its own soil mix\n• For succulents: sandy soil\n• For tropical plants: peat + perlite\n\nChange soil 1-2 times per year.',
      fertilizer: '🌿 Fertilization tips:\n\n• Spring-summer: twice a month\n• Fall-winter: once a month or not at all\n• Liquid fertilizers are more effective\n• Always follow manufacturer instructions\n\nExcess fertilizer damages plants!',
      disease: '🔍 Diseases and problems:\n\n• Yellow leaves: too much water or low light\n• Brown tips: low humidity\n• White spots: fungus or pests\n• Falling leaves: stress or adaptation\n\nIdentify and treat problems early.',
      transplant: '🪴 Transplanting guidelines:\n\n• First sign: roots coming out of pot\n• Best time: spring\n• New pot should be 2-3 cm larger\n• Gently remove old soil\n• Water 1-2 days later\n\nPlant may be stressed during adaptation.',
      propagation: '🌱 Plant propagation methods:\n\n• Cuttings: monstera, pothos\n• Leaf: succulents, zamioculcas\n• Seeds: herbs\n• Division: daisies, sansevierya\n\nRooting takes 2-4 weeks.',
      beginner: '🌿 Plants for beginners:\n\n• Pothos: very hardy\n• Sansevierya: low maintenance\n• Zamioculcas: survives even when forgotten\n• Monstera: large and beautiful\n\nThese plants are ideal for newcomers!',
      tips: '✨ Basic care tips:\n\n• Learn each plant individually\n• Check regularly\n• Avoid over-care\n• Be patient - growth takes time\n• Upload a photo to identify plants!\n\nAsk if you have questions! 🌱',
      toxicity: '⚠️ Toxicity and safety:\n\n• Some plants are toxic to pets\n• Keep away from small children\n• Toxic plants: ficus, monstera, dieffenbachia\n• Safe: spider plant, parlor palm\n\nResearch before buying plants!',
      humidity: '💦 Humidity management:\n\n• Tropical plants need high humidity (60-80%)\n• Use a spray bottle\n• Group plants together\n• Use a humidifier\n• Place water trays\n\nDry air causes leaf browning.',
      temperature: '🌡️ Temperature requirements:\n\n• Most houseplants: 18-24°C\n• Tropical plants: 20-26°C\n• Cacti: 15-25°C\n• Keep away from cold drafts\n• Keep away from air conditioning\n\nTemperature changes cause stress.',
      default: '🌿 Your question should be about plants. I can help you with:\n\n• Watering and care\n• Light and placement\n• Soil and fertilization\n• Diseases and problems\n• Transplanting and propagation\n• Plant identification (upload photo)\n\nAsk a more specific question! 🌱'
    };
  } else if (language === 'ru') {
    return {
      water: '💧 Потребности растений в воде различаются в зависимости от вида:\n\n• Кактусы: 1-2 раза в месяц\n• Тропические растения: 2-3 раза в неделю\n• Травянистые растения: 1-2 раза в неделю\n\nПоливайте, когда почва сухая, и проверяйте дренаж.',
      light: '☀️ Световые требования растений:\n\n• Яркий свет: кактусы, суккуленты\n• Средний свет: фикус, монстера\n• Низкая освещенность: замиокулькас, потос\n\nРазместите растение в правильном месте и постепенно приучите его к новому освещению.',
      soil: '🌱 Почва и дренаж:\n\n• Хороший дренаж необходим\n• У каждого растения своя почвенная смесь\n• Для суккулентов: песчаная почва\n• Для тропических растений: торф + перлит\n\nМеняйте почву 1-2 раза в год.',
      fertilizer: '🌿 Советы по удобрению:\n\n• Весна-лето: два раза в месяц\n• Осень-зима: один раз в месяц или вообще\n• Жидкие удобрения более эффективны\n• Всегда следуйте инструкциям производителя\n\nИзбыток удобрений вредит растениям!',
      disease: '🔍 Болезни и проблемы:\n\n• Желтые листья: слишком много воды или мало света\n• Коричневые кончики: низкая влажность\n• Белые пятна: грибок или вредители\n• Опадающие листья: стресс или адаптация\n\nВыявляйте и лечите проблемы рано.',
      transplant: '🪴 Правила пересадки:\n\n• Первый признак: корни выходят из горшка\n• Лучшее время: весна\n• Новый горшок должен быть на 2-3 см больше\n• Аккуратно удалите старую почву\n• Полейте через 1-2 дня\n\nРастение может испытывать стресс во время адаптации.',
      propagation: '🌱 Методы размножения растений:\n\n• Черенки: монстера, потос\n• Лист: суккуленты, замиокулькас\n• Семена: травы\n• Деление: ромашки, сансевиерия\n\nУкоренение занимает 2-4 недели.',
      beginner: '🌿 Растения для начинающих:\n\n• Потос: очень выносливый\n• Сансевиерия: низкий уход\n• Замиокулькас: выживает даже когда забыт\n• Монстера: большой и красивый\n\nЭти растения идеальны для новичков!',
      tips: '✨ Основные советы по уходу:\n\n• Изучайте каждое растение индивидуально\n• Регулярно проверяйте\n• Избегайте чрезмерного ухода\n• Будьте терпеливы - рост требует времени\n• Загрузите фото для идентификации растений!\n\nЗадавайте вопросы, если есть! 🌱',
      toxicity: '⚠️ Токсичность и безопасность:\n\n• Некоторые растения токсичны для домашних животных\n• Держите подальше от маленьких детей\n• Токсичные растения: фикус, монстера, диффенбахия\n• Безопасные: паучье растение, комнатная пальма\n\nИсследуйте перед покупкой растений!',
      humidity: '💦 Управление влажностью:\n\n• Тропические растения нуждаются в высокой влажности (60-80%)\n• Используйте распылитель\n• Группируйте растения вместе\n• Используйте увлажнитель\n• Размещайте подносы с водой\n\nСухой воздух вызывает потемнение листьев.',
      temperature: '🌡️ Температурные требования:\n\n• Большинство комнатных растений: 18-24°C\n• Тропические растения: 20-26°C\n• Кактусы: 15-25°C\n• Держите подальше от холодных сквозняков\n• Держите подальше от кондиционера\n\nИзменения температуры вызывают стресс.',
      default: '🌿 Ваш вопрос должен быть о растениях. Я могу помочь вам с:\n\n• Полив и уход\n• Свет и размещение\n• Почва и удобрение\n• Болезни и проблемы\n• Пересадка и размножение\n• Идентификация растений (загрузить фото)\n\nЗадайте более конкретный вопрос! 🌱'
    };
  } else {
    return {
      water: '💧 Bitkilərin su ehtiyacı növdən asılıdır:\n\n• Kaktuslar: ayda 1-2 dəfə\n• Tropik bitkilər: həftədə 2-3 dəfə\n• Otsu bitkilər: həftədə 1-2 dəfə\n\nTorpaq quruduqda sulayın və drenajı yoxlayın.',
      light: '☀️ Bitkilərin işıq ehtiyacı:\n\n• Parlaq işıq: kaktuslar, sukulentlər\n• Orta işıq: ficus, monstera\n• Az işıq: zamioculcas, pothos\n\nBitkinizi düzgün yerə qoyun və onu tədricən yeni işığa adətləndirin.',
      soil: '🌱 Torpaq və drenaj:\n\n• Yaxşı drenaj vacibdir\n• Hər bitkinin öz torpaq qarışığı var\n• Sukulentlər üçün: qumlu torpaq\n• Tropik bitkilər üçün: torf + perlit\n\nİldə 1-2 dəfə torpaq dəyişdirin.',
      fertilizer: '🌿 Gübrələmə məsləhətləri:\n\n• Yaz-yay: ayda 2 dəfə\n• Payız-qış: ayda 1 dəfə və ya heç\n• Maye gübrələr daha effektivdir\n• Həmişə istehsalçının təlimatına əməl edin\n\nArtıq gübrə bitkiyə zərər verər!',
      disease: '🔍 Xəstəlik və problemlər:\n\n• Sarı yarpaqlar: çox su və ya az işıq\n• Qəhvəyi uçlar: az rütubət\n• Ağ ləkələr: kif və ya zərərvericilər\n• Düşən yarpaqlar: stress və ya adaptasiya\n\nProblemi erkən müəyyənləşdirin və müalicə edin.',
      transplant: '🪴 Köçürmə qaydaları:\n\n• İlk əlamət: kök qabdan çıxır\n• Ən yaxşı vaxt: yaz\n• Yeni qab 2-3 sm böyük olmalı\n• Köhnə torpağı yumşaq silin\n• 1-2 gün sonra sulayın\n\nBitki adaptasiya dövründə stresslənə bilər.',
      propagation: '🌱 Bitki çoxaltma üsulları:\n\n• Kəsiklər: monstera, pothos\n• Yarpaq: sukulentlər, zamioculcas\n• Toxum: baharatlıq bitkilər\n• Bölmə: papatyalar, sansevierya\n\nKök atması üçün 2-4 həftə lazımdır.',
      beginner: '🌿 Başlanğıc üçün bitkilər:\n\n• Pothos: çox davamlı\n• Sansevierya: az qulluq\n• Zamioculcas: unudulduqda belə yaşayır\n• Monstera: böyük və gözəl\n\nBu bitkilər yeni başlayanlar üçün idealdır!',
      tips: '✨ Əsas qulluq məsləhətləri:\n\n• Hər bitkini fərdi olaraq öyrənin\n• Mütəmadi yoxlayın\n• Artıq qulluqdan çəkinin\n• Səbr edin - artım vaxt tələb edir\n• Şəkil yükləyərək bitkini tanıya bilərsiniz!\n\nSualınız varsa, soruşun! 🌱',
      toxicity: '⚠️ Zəhərlilik və təhlükəsizlik:\n\n• Bəzi bitkilər ev heyvanları üçün zəhərlidir\n• Kiçik uşaqlardan uzaq saxlayın\n• Zəhərli bitkilər: ficus, monstera, dieffenbachia\n• Təhlükəsiz: spider plant, parlor palm\n\nBitki almazdan əvvəl araşdırın!',
      humidity: '💦 Rütubət idarəetməsi:\n\n• Tropik bitkilər yüksək rütubət istəyir (60-80%)\n• Püskürtmə şüşəsi istifadə edin\n• Bitkiləri qrupda yerləşdirin\n• Rütubətləndirici istifadə edin\n• Su qabları qoyun\n\nQuru hava yarpaqların qəhvəyiləşməsinə səbəb olur.',
      temperature: '🌡️ Temperatur tələbləri:\n\n• Əksər ev bitkiləri: 18-24°C\n• Tropik bitkilər: 20-26°C\n• Kaktuslar: 15-25°C\n• Soyuq cərəyandan uzaq saxlayın\n• Kondisionerdən uzaq yerləşdirin\n\nTemperatur dəyişiklikləri stres yaradır.',
      default: '🌿 Sualınız bitkiçiliklə bağlı olmalıdır. Mən sizə aşağıdakı mövzularda kömək edə bilərəm:\n\n• Sulama və qulluq\n• İşıq və yerləşdirmə\n• Torpaq və gübrələmə\n• Xəstəlik və problemlər\n• Köçürmə və çoxaltma\n• Bitki tanıma (şəkil yükləyin)\n\nDaha spesifik sual verin! 🌱'
    };
  }
};

export function PlantRecognitionPage({ isDarkMode, language }: PlantRecognitionPageProps) {
  const t = translations[language];
  const chatResponses = getChatResponses(language);
  const [isUploading, setIsUploading] = useState(false);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: t.chatWelcomeMessage, sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fromChat: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setUploadedImage(imageData);
        
        if (fromChat) {
          setChatMessages(prev => [...prev, { text: '', sender: 'user', image: imageData }]);
        }
      };
      reader.readAsDataURL(file);

      // Simulate API call
      setTimeout(() => {
        const mockPlantData = {
          az: {
            name: 'Ficus Elastica (Kauçuk Ağacı)',
            family: 'Moraceae',
            waterNeeds: 'Orta - həftədə 1-2 dəfə',
            sunlight: 'Parlaq, dolayı işıq',
            toxicity: 'Ev heyvanları üçün zəhərli',
            ecologicalBenefits: 'Havanı təmizləyir, formaldehid və digər toksinləri absorbə edir. CO2 udur və oksigen istehsal edir.',
            similarPlants: ['Ficus Lyrata', 'Ficus Benjamina', 'Monstera Deliciosa']
          },
          en: {
            name: 'Ficus Elastica (Rubber Plant)',
            family: 'Moraceae',
            waterNeeds: 'Medium - 1-2 times per week',
            sunlight: 'Bright, indirect light',
            toxicity: 'Toxic to pets',
            ecologicalBenefits: 'Cleans the air, absorbs formaldehyde and other toxins. Absorbs CO2 and produces oxygen.',
            similarPlants: ['Ficus Lyrata', 'Ficus Benjamina', 'Monstera Deliciosa']
          },
          ru: {
            name: 'Ficus Elastica (Каучуковое дерево)',
            family: 'Moraceae',
            waterNeeds: 'Средний - 1-2 раза в неделю',
            sunlight: 'Яркий, рассеянный свет',
            toxicity: 'Токсичен для домашних животных',
            ecologicalBenefits: 'Очищает воздух, поглощает формальдегид и другие токсины. Поглощает CO2 и производит кислород.',
            similarPlants: ['Ficus Lyrata', 'Ficus Benjamina', 'Monstera Deliciosa']
          }
        };

        setPlantInfo(mockPlantData[language]);
        setIsUploading(false);
        
        if (fromChat) {
          const chatResponse = language === 'en' 
            ? `✅ Plant identified!\n\n🌿 Name: Ficus Elastica (Rubber Plant)\n🧬 Family: Moraceae\n💧 Water: 1-2 times per week\n☀️ Light: bright, indirect\n⚠️ Toxic to pets\n\nDetailed information is shown on the page!`
            : language === 'ru'
            ? `✅ Растение идентифицировано!\n\n🌿 Название: Ficus Elastica (Каучуковое дерево)\n🧬 Семейство: Moraceae\n💧 Вода: 1-2 раза в неделю\n☀️ Свет: яркий, рассеянный\n⚠️ Токсичен для домашних животных\n\nПодробная информация показана на странице!`
            : `✅ Bitkini tanıdım!\n\n🌿 Ad: Ficus Elastica (Kauçuk Ağacı)\n🧬 Ailə: Moraceae\n💧 Su: həftədə 1-2 dəfə\n☀️ İşıq: parlaq, dolayı\n⚠️ Ev heyvanları üçün zəhərli\n\nƏtraflı məlumat səhifədə göstərilir!`;
          
          setChatMessages(prev => [...prev, { text: chatResponse, sender: 'bot' }]);
        }
      }, 2000);
    }
  };

  const handleReset = () => {
    setPlantInfo(null);
    setUploadedImage(null);
    setChatMessages([
      { text: t.chatWelcomeMessage, sender: 'bot' }
    ]);
  };

  const handleChatFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, true);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('su') || lowerMessage.includes('sulama') || lowerMessage.includes('nə qədər') ||
        lowerMessage.includes('water') || lowerMessage.includes('watering') ||
        lowerMessage.includes('вод') || lowerMessage.includes('полив')) {
      return chatResponses.water;
    }
    
    if (lowerMessage.includes('işıq') || lowerMessage.includes('günəş') || lowerMessage.includes('kölgə') ||
        lowerMessage.includes('light') || lowerMessage.includes('sun') || lowerMessage.includes('shade') ||
        lowerMessage.includes('свет') || lowerMessage.includes('солн') || lowerMessage.includes('тень')) {
      return chatResponses.light;
    }
    
    if (lowerMessage.includes('torpaq') || lowerMessage.includes('substrat') || lowerMessage.includes('drenaj') ||
        lowerMessage.includes('soil') || lowerMessage.includes('substrate') || lowerMessage.includes('drainage') ||
        lowerMessage.includes('почв') || lowerMessage.includes('субстрат') || lowerMessage.includes('дренаж')) {
      return chatResponses.soil;
    }
    
    if (lowerMessage.includes('gübrə') || lowerMessage.includes('qidalandır') || lowerMessage.includes('yem') ||
        lowerMessage.includes('fertiliz') || lowerMessage.includes('feed') ||
        lowerMessage.includes('удобр') || lowerMessage.includes('подкорм')) {
      return chatResponses.fertilizer;
    }
    
    if (lowerMessage.includes('xəstə') || lowerMessage.includes('sarı') || lowerMessage.includes('zərərverici') || lowerMessage.includes('bit') ||
        lowerMessage.includes('disease') || lowerMessage.includes('yellow') || lowerMessage.includes('pest') || lowerMessage.includes('bug') ||
        lowerMessage.includes('болезн') || lowerMessage.includes('желт') || lowerMessage.includes('вредит')) {
      return chatResponses.disease;
    }
    
    if (lowerMessage.includes('köçür') || lowerMessage.includes('transplant') || lowerMessage.includes('пересад')) {
      return chatResponses.transplant;
    }
    
    if (lowerMessage.includes('çoxalt') || lowerMessage.includes('kəsik') || lowerMessage.includes('toxum') ||
        lowerMessage.includes('propagat') || lowerMessage.includes('cutting') || lowerMessage.includes('seed') ||
        lowerMessage.includes('размнож') || lowerMessage.includes('черенк') || lowerMessage.includes('семен')) {
      return chatResponses.propagation;
    }
    
    if (lowerMessage.includes('başlanğıc') || lowerMessage.includes('yeni') || lowerMessage.includes('sadə') ||
        lowerMessage.includes('beginner') || lowerMessage.includes('new') || lowerMessage.includes('easy') ||
        lowerMessage.includes('начин') || lowerMessage.includes('нов') || lowerMessage.includes('прост')) {
      return chatResponses.beginner;
    }
    
    if (lowerMessage.includes('məsləhət') || lowerMessage.includes('yardım') || lowerMessage.includes('necə') ||
        lowerMessage.includes('tip') || lowerMessage.includes('help') || lowerMessage.includes('how') ||
        lowerMessage.includes('совет') || lowerMessage.includes('помощ') || lowerMessage.includes('как')) {
      return chatResponses.tips;
    }
    
    if (lowerMessage.includes('zəhər') || lowerMessage.includes('təhlükə') || lowerMessage.includes('heyvan') || lowerMessage.includes('uşaq') ||
        lowerMessage.includes('toxic') || lowerMessage.includes('poison') || lowerMessage.includes('pet') || lowerMessage.includes('child') ||
        lowerMessage.includes('токсич') || lowerMessage.includes('яд') || lowerMessage.includes('животн') || lowerMessage.includes('ребен')) {
      return chatResponses.toxicity;
    }
    
    if (lowerMessage.includes('rütubət') || lowerMessage.includes('quru') || lowerMessage.includes('nəm') ||
        lowerMessage.includes('humidity') || lowerMessage.includes('moist') ||
        lowerMessage.includes('влажн') || lowerMessage.includes('сух')) {
      return chatResponses.humidity;
    }
    
    if (lowerMessage.includes('temperatur') || lowerMessage.includes('isti') || lowerMessage.includes('soyuq') ||
        lowerMessage.includes('temperature') || lowerMessage.includes('hot') || lowerMessage.includes('cold') ||
        lowerMessage.includes('температур') || lowerMessage.includes('тепл') || lowerMessage.includes('холод')) {
      return chatResponses.temperature;
    }
    
    return chatResponses.default;
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const userMessage = userInput.trim();
    setChatMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setUserInput('');
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] py-6 md:py-12 relative overflow-hidden ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <FloatingLeaf key={i} delay={i * 2} />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-3 md:mb-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="text-[#00C57A] mx-auto" size={36} />
          </motion.div>
          <h1 className={`mb-3 md:mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.plantRecognitionPageTitle}</h1>
          <p className={`opacity-80 px-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {t.plantRecognitionSubtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!plantInfo ? (
            /* Upload Section */
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={`relative rounded-[16px] p-12 text-center border-2 border-dashed transition-all overflow-hidden ${
                  isDarkMode 
                    ? 'bg-[#1A2324] border-[#2F3B3C] hover:border-[#00C57A]' 
                    : 'bg-white border-gray-300 hover:border-[#00C57A]'
                }`}
                style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)'
                }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00C57A] to-transparent opacity-0"
                  whileHover={{ opacity: 0.05 }}
                />

                <AnimatePresence mode="wait">
                  {isUploading ? (
                    <motion.div 
                      className="py-12"
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 className="mx-auto text-[#00C57A] mb-4" size={64} />
                      </motion.div>
                      <motion.p 
                        className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {t.plantBeingAnalyzed}
                      </motion.p>
                      <motion.div 
                        className="mt-4 flex justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-[#00C57A]"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Camera className="mx-auto text-[#00C57A] mb-6" size={64} />
                      </motion.div>
                      <h3 className={isDarkMode ? 'text-[#E1E1E1] mb-4' : 'text-[#101415] mb-4'}>{t.uploadImage}</h3>
                      <p className={`opacity-70 mb-8 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                        {t.plantRecognitionSubtitle}
                      </p>
                      
                      <label className="inline-block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <motion.span 
                          className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-[#00C57A] text-[#101415] rounded-[12px] hover:bg-[#7DF2C6] transition-all"
                          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 197, 122, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Upload size={20} />
                          </motion.div>
                          <span>{t.uploadImageAndRecognize}</span>
                        </motion.span>
                      </label>

                      <motion.p 
                        className={`opacity-50 caption mt-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                        animate={{ opacity: [0.5, 0.3, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {t.supportedFormats}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Telegram Bot Info Card */}
              <motion.a
                href="https://t.me/GreenifyBot"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-[16px] p-6 mt-6 block ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
              >
                <motion.div
                  className="flex items-center gap-3 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <img src={telegramIcon} alt="Telegram" className="w-8 h-8" />
                  </motion.div>
                  <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{t.tryTelegramBot}</h3>
                </motion.div>
                <motion.p 
                  className={`opacity-80 caption mb-3 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {t.telegramBotDesc}
                </motion.p>
                <motion.div
                  className="flex items-center gap-2 text-[#00C57A]"
                  whileHover={{ x: 5 }}
                >
                  <span className="caption">{t.telegramBotLink}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.a>
            </motion.div>
          ) : (
            /* Result Section */
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className={`rounded-[16px] p-6 sticky top-24 ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                  style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                  whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
                >
                  {uploadedImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <img
                        src={uploadedImage}
                        alt="Uploaded plant"
                        className="w-full h-[400px] object-cover rounded-[12px] mb-4"
                      />
                      <motion.div
                        className="absolute top-4 right-4 bg-[#00C57A] rounded-full p-2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      >
                        <CheckCircle className="text-[#101415]" size={24} />
                      </motion.div>
                    </motion.div>
                  )}
                  <motion.button
                    onClick={handleReset}
                    className={`w-full px-6 py-3 border-2 border-[#00C57A] text-[#00C57A] rounded-[12px] transition-all ${
                      isDarkMode ? 'hover:bg-[#00C57A] hover:text-[#101415]' : 'hover:bg-[#00C57A] hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.uploadNewImage}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Info Column */}
              <div className="space-y-6">
                {/* Plant Name Card */}
                <motion.div
                  className={`rounded-[16px] p-6 relative overflow-hidden ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                  style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
                >
                  <motion.div
                    className="absolute top-0 right-0 text-6xl opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    🌿
                  </motion.div>
                  <div className="flex items-start gap-3 mb-2 relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Leaf className="text-[#00C57A] flex-shrink-0" size={24} />
                    </motion.div>
                    <div>
                      <motion.h2 
                        className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {plantInfo.name}
                      </motion.h2>
                      <motion.p 
                        className={`opacity-70 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {t.family}: {plantInfo.family}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Care Requirements */}
                <motion.div
                  className={`rounded-[16px] p-6 ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                  style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
                >
                  <h3 className={isDarkMode ? 'text-[#E1E1E1] mb-4' : 'text-[#101415] mb-4'}>{t.careRequirements}</h3>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      >
                        <Droplet className="text-[#00C57A] flex-shrink-0 mt-1" size={20} />
                      </motion.div>
                      <div>
                        <p className={`caption mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.waterNeeds}</p>
                        <p className={`opacity-80 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{plantInfo.waterNeeds}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      >
                        <Sun className="text-[#00C57A] flex-shrink-0 mt-1" size={20} />
                      </motion.div>
                      <div>
                        <p className={`caption mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.lightRequirement}</p>
                        <p className={`opacity-80 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{plantInfo.sunlight}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                      </motion.div>
                      <div>
                        <p className={`caption mb-1 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.toxicity}</p>
                        <p className={`opacity-80 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{plantInfo.toxicity}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Ecological Benefits */}
                <motion.div
                  className={`rounded-[16px] p-6 ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                  style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
                >
                  <motion.div
                    className="flex items-center gap-2 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="text-[#00C57A]" size={20} />
                    </motion.div>
                    <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{t.ecologicalBenefits}</h3>
                  </motion.div>
                  <motion.p 
                    className={`opacity-80 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {plantInfo.ecologicalBenefits}
                  </motion.p>
                </motion.div>

                {/* Similar Plants */}
                <motion.div
                  className={`rounded-[16px] p-6 ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                  style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
                >
                  <h3 className={isDarkMode ? 'text-[#E1E1E1] mb-3' : 'text-[#101415] mb-3'}>{t.similarPlants}</h3>
                  <div className="flex flex-wrap gap-2">
                    {plantInfo.similarPlants.map((plant, index) => (
                      <motion.span
                        key={index}
                        className={`px-4 py-2 rounded-lg caption ${isDarkMode ? 'bg-[#2F3B3C] text-[#E1E1E1]' : 'bg-gray-100 text-[#101415]'}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: '#00C57A',
                          color: '#101415'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {plant}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Telegram Bot Card */}
                <motion.a
                  href="https://t.me/GreenifyBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-[16px] p-6 block ${isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200'}`}
                  style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ y: -5, boxShadow: '0 8px 40px rgba(0, 197, 122, 0.2)' }}
                >
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <img src={telegramIcon} alt="Telegram" className="w-8 h-8" />
                    </motion.div>
                    <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{t.tryTelegramBot}</h3>
                  </motion.div>
                  <motion.p 
                    className={`opacity-80 caption mb-3 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    {t.telegramBotDesc}
                  </motion.p>
                  <motion.div
                    className="flex items-center gap-2 text-[#00C57A]"
                    whileHover={{ x: 5 }}
                  >
                    <span className="caption">{t.telegramBotLink}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className={`fixed bottom-24 right-4 md:right-8 w-[340px] md:w-[380px] rounded-2xl shadow-2xl z-50 overflow-hidden ${
              isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-[#00C57A] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Leaf className="text-[#101415]" size={24} />
                </motion.div>
                <div>
                  <h3 className="text-[#101415]" style={{ fontSize: '16px', fontWeight: 600 }}>{t.plantRecognitionAssistant}</h3>
                  <p className="text-[#101415] opacity-80" style={{ fontSize: '12px' }}>{t.online}</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-[#101415] hover:bg-[#101415] hover:bg-opacity-10 rounded-lg p-1 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-3 scroll-smooth">
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.image ? (
                    <motion.div
                      className="max-w-[70%] rounded-2xl overflow-hidden border-2 border-[#00C57A]"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <img 
                        src={message.image} 
                        alt="Uploaded plant" 
                        className="w-full h-auto max-h-[200px] object-cover"
                      />
                    </motion.div>
                  ) : (
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-[#00C57A] text-[#101415]'
                          : isDarkMode
                          ? 'bg-[#2F3B3C] text-[#E1E1E1]'
                          : 'bg-gray-100 text-[#101415]'
                      }`}
                      style={{ fontSize: '14px', whiteSpace: 'pre-line' }}
                    >
                      {message.text}
                    </div>
                  )}
                </motion.div>
              ))}
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 ${
                    isDarkMode ? 'bg-[#2F3B3C] text-[#E1E1E1]' : 'bg-gray-100 text-[#101415]'
                  }`}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 size={16} className="text-[#00C57A]" />
                    </motion.div>
                    <span style={{ fontSize: '14px' }}>{t.analyzing}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className={`p-4 ${isDarkMode ? 'border-t border-[#2F3B3C]' : 'border-t border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChatFileUpload}
                    className="hidden"
                  />
                  <div className={`p-2 rounded-lg transition-all ${
                    isDarkMode ? 'bg-[#2F3B3C] hover:bg-[#3F4B4C]' : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <Paperclip className="text-[#00C57A]" size={18} />
                  </div>
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'az' ? 'Mesaj yazın...' : language === 'en' ? 'Type a message...' : 'Введите сообщение...'}
                  className={`flex-1 px-4 py-2 rounded-lg border-none outline-none ${
                    isDarkMode ? 'bg-[#2F3B3C] text-[#E1E1E1] placeholder-gray-500' : 'bg-gray-100 text-[#101415] placeholder-gray-400'
                  }`}
                  style={{ fontSize: '14px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim()}
                  className="p-2 rounded-lg bg-[#00C57A] text-[#101415] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[#7DF2C6]"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Button */}
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-4 md:right-8 bg-[#00C57A] text-[#101415] p-4 rounded-full shadow-2xl hover:bg-[#7DF2C6] transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
}

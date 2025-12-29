
import { AITool, Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  ar: {
    appName: 'زمام',
    tagline: 'قوة التحكم في تجارتك',
    subTagline: 'خدماتك تحت يديك، وأكثر من 50 خدمة مدعومة بالذكاء الاصطناعي',
    getStarted: 'ابدأ الآن',
    discoverMore: 'اكتشف المزيد',
    login: 'تسجيل الدخول',
    signup: 'تسجيل',
    dashboard: 'لوحة التحكم',
    overview: 'نظرة عامة',
    projects: 'المشاريع',
    tools: 'أدوات الذاء الاصطناعي',
    chat: 'صديقك AI',
    saved: 'المحفوظات',
    settings: 'الإعدادات',
    plans: 'الخطط والأسعار',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    welcome: 'مساء الخير، زمام',
    quickLinks: 'روابط سريعة:',
    startJourney: 'ابدأ رحلتك الآن',
    myCompanies: 'شركاتي',
    tokensRemaining: 'التوكنز المتبقية',
    activeServices: 'الخدمات المنفذة',
    successRate: 'معدل النجاح',
    recommendedServices: 'خدمات موصى بها',
    useNow: 'استخدم الآن',
    searchTools: 'ابحث عن أداة...',
    typeMessage: 'اكتب رسالتك هنا...',
    send: 'إرسال',
    languageName: 'English'
  },
  en: {
    appName: 'Zamam',
    tagline: 'Control Your Business',
    subTagline: 'Your services at your fingertips, with 50+ AI-powered tools',
    getStarted: 'Get Started',
    discoverMore: 'Discover More',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    overview: 'Overview',
    projects: 'Projects',
    tools: 'AI Tools',
    chat: 'AI Friend',
    saved: 'Saved Results',
    settings: 'Settings',
    plans: 'Plans & Pricing',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    welcome: 'Good Evening, Zamam',
    quickLinks: 'Quick Links:',
    startJourney: 'Start Your Journey',
    myCompanies: 'My Companies',
    tokensRemaining: 'Tokens Remaining',
    activeServices: 'Executed Services',
    successRate: 'Success Rate',
    recommendedServices: 'Recommended Services',
    useNow: 'Use Now',
    searchTools: 'Search for tool...',
    typeMessage: 'Type your message...',
    send: 'Send',
    languageName: 'العربية'
  }
};

export const AI_TOOLS: AITool[] = [
  {
    id: 'link-analyzer',
    name: { ar: 'محلل الروابط الاحترافي', en: 'Pro Link Analyzer' },
    description: { ar: 'تحليل شامل ومفصل لأي رابط - SEO، الأمان، الأداء، المحتوى.', en: 'Comprehensive analysis for any link - SEO, Security, Performance.' },
    icon: 'link',
    category: 'analysis',
    tokens: 150
  },
  {
    id: 'content-writer',
    name: { ar: 'كاتب المحتوى الإبداعي', en: 'Creative Content Writer' },
    description: { ar: 'كتابة مقالات ومنشورات متوافقة مع محركات البحث.', en: 'Write articles and posts optimized for SEO.' },
    icon: 'pen',
    category: 'text',
    tokens: 50
  },
  {
    id: 'image-generator',
    name: { ar: 'مولد الصور الذكي', en: 'Smart Image Generator' },
    description: { ar: 'تحويل الأفكار إلى صور واقعية بجودة عالية.', en: 'Turn ideas into high-quality realistic images.' },
    icon: 'image',
    category: 'image',
    tokens: 200
  },
  {
    id: 'audio-transcriber',
    name: { ar: 'محول الصوت إلى نص', en: 'Audio Transcriber' },
    description: { ar: 'تحويل الملفات الصوتية إلى نصوص مكتوبة بدقة.', en: 'Convert audio files into accurate text.' },
    icon: 'mic',
    category: 'audio',
    tokens: 100
  }
];

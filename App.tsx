
import React, { useState, useEffect } from 'react';
import { Language, View, User, ChatMessage } from './types';
import { TRANSLATIONS, AI_TOOLS } from './constants';
import { Sidebar } from './components/Sidebar';
import { LanguageToggle } from './components/LanguageToggle';
import { gemini } from './services/geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [view, setView] = useState<View>(View.LANDING);
  const [user, setUser] = useState<User | null>(null);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'مرحباً! أنا صديقك AI، مساعدك الذكي. أنا هنا لمساعدتك في أي وقت. كيف يمكنني مساعدتك اليوم؟', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = TRANSLATIONS[lang];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ email: 'user@zamam.ai', name: 'Zamam User' });
    setView(View.DASHBOARD);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newUserMsg: ChatMessage = { role: 'user', content: inputMessage, timestamp: new Date() };
    setChatMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsTyping(true);

    const response = await gemini.sendMessage(inputMessage);
    
    const newAiMsg: ChatMessage = { role: 'model', content: response, timestamp: new Date() };
    setChatMessages(prev => [...prev, newAiMsg]);
    setIsTyping(false);
  };

  // Views
  const LandingPage = () => (
    <div className="min-h-screen gradient-bg flex flex-col">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 card-gradient-purple rounded-xl flex items-center justify-center text-white font-bold text-2xl">Z</div>
          <span className="font-bold text-xl">{t.appName}</span>
        </div>
        <div className="flex items-center gap-6">
          <LanguageToggle currentLang={lang} onToggle={setLang} />
          <button onClick={() => setView(View.LOGIN)} className="hover:text-purple-400 transition-colors">{t.login}</button>
          <button onClick={() => setView(View.LOGIN)} className="px-6 py-2 rounded-full card-gradient-purple font-medium hover:scale-105 transition-transform">{t.signup}</button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          مدعوم بالذكاء الاصطناعي
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-6 max-w-4xl leading-tight text-white drop-shadow-md">{t.appName} - {t.tagline}</h2>
        <button onClick={() => setView(View.LOGIN)} className="px-10 py-4 rounded-xl card-gradient-purple font-bold text-lg shadow-lg hover:scale-105 transition-transform">{t.getStarted}</button>
      </main>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#231d36]/90 backdrop-blur-xl border border-purple-800/40 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-center mb-6">{t.login}</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder={t.email} defaultValue="binawad1@gmail.com" className="w-full bg-[#151221] border border-purple-800/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 text-right text-white" />
          <input type="password" placeholder={t.password} defaultValue="........" className="w-full bg-[#151221] border border-purple-800/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 text-right text-white" />
          <button type="submit" className="w-full py-3.5 rounded-xl card-gradient-purple font-bold text-lg">{t.login}</button>
        </form>
      </div>
    </div>
  );

  const DashboardShell = ({ children }: { children?: React.ReactNode }) => (
    <div className="flex h-screen overflow-hidden bg-[#151221]">
      <Sidebar lang={lang} currentView={view} setView={setView} onLogout={() => setView(View.LANDING)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-purple-800/20 flex items-center justify-between px-6 bg-[#1e1a2e]/60 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <button className="md:hidden text-gray-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
             <h2 className="font-bold text-xl">{TRANSLATIONS[lang][view.toLowerCase()] || t.dashboard}</h2>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle currentLang={lang} onToggle={setLang} />
            <div className="flex items-center gap-3 border-r border-purple-800/30 pr-4 mr-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">Z</div>
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold leading-none">زمام للتسويق</p>
                <p className="text-[10px] text-gray-400">binawad1@gmail.com</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-[#151221]">
          {children}
        </main>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto text-right">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#1e1a2e] rounded-2xl overflow-hidden shadow-lg border border-purple-800/30">
          <div className="bg-[#8b5cf6] p-4 flex justify-between items-center text-white">
             <span className="font-bold flex items-center gap-2">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
               باقتي
             </span>
          </div>
          <div className="p-8 space-y-6 text-center">
             <h3 className="text-3xl font-black text-white">مجانية</h3>
             <p className="text-purple-200/60 font-medium">100 توكن</p>
             <button onClick={() => setView(View.PLANS)} className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-all shadow-lg">ترقية الباقة</button>
          </div>
        </div>
        <div className="bg-[#1e1a2e] rounded-2xl overflow-hidden shadow-lg border border-purple-800/30">
          <div className="bg-[#00c2a8] p-4 flex justify-between items-center text-white">
             <span className="font-bold flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               آخر النشاطات
             </span>
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-gray-500">
             <div className="w-16 h-16 rounded-full bg-[#2a2441] flex items-center justify-center mb-4 border border-purple-800/20">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             </div>
             <p className="font-medium text-purple-200/50">لا يوجد نشاط بعد</p>
          </div>
        </div>
        <div className="bg-[#1e1a2e] rounded-2xl overflow-hidden shadow-lg border border-purple-800/30">
          <div className="bg-[#00c2a8] p-4 flex justify-between items-center text-white">
             <span className="font-bold flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
               الأداء
             </span>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-purple-200/70 text-sm">معدل النجاح</span>
                <span className="text-emerald-400 font-bold">0%</span>
             </div>
             <div className="flex justify-between items-center border-t border-purple-800/20 pt-4">
                <span className="text-purple-200/70 text-sm">مكتملة</span>
                <span className="text-emerald-400 font-bold">0</span>
             </div>
             <div className="flex justify-between items-center border-t border-purple-800/20 pt-4">
                <span className="text-purple-200/70 text-sm">قيد التنفيذ</span>
                <span className="text-emerald-400 font-bold">0</span>
             </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-[#00c2a8] rounded-3xl p-8 shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
               <h2 className="text-4xl font-black text-white">مساء الخير، زمام</h2>
               <span className="text-4xl group-hover:animate-bounce">👋</span>
            </div>
            <p className="text-white/90 font-medium mb-8">مرحباً بك في لوحة التحكم الذكية</p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
               <span className="text-white/70 text-sm">روابط سريعة:</span>
               <button onClick={() => setView(View.TOOLS)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white text-sm backdrop-blur-md flex items-center gap-2 border border-white/20 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  الخدمات
               </button>
               <button onClick={() => setView(View.PROJECTS)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white text-sm backdrop-blur-md flex items-center gap-2 border border-white/20 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"/></svg>
                  المشاريع
               </button>
            </div>
            <button className="w-full py-5 rounded-2xl bg-[#151221]/40 text-white font-bold text-xl backdrop-blur-md border border-white/20 flex items-center justify-center gap-3 hover:bg-[#151221]/50 transition-all group">
               <span className="text-emerald-200 group-hover:animate-spin">✨</span> ابدأ رحلتك الآن <span className="text-emerald-200">⚡</span>
            </button>
          </div>
          <div className="absolute top-0 left-0 w-64 h-full bg-white/5 skew-x-12 -translate-x-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e1a2e] p-6 rounded-3xl border border-purple-800/30 shadow-lg flex flex-col items-center">
             <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 014.75-2.906z"/></svg>
             </div>
             <p className="text-4xl font-black text-white">5,000</p>
             <p className="text-sm text-purple-200/50 mt-1">التوكنز المتبقية</p>
             <p className="text-[10px] text-purple-200/30 mt-1">من أصل 10,000</p>
          </div>
          <div className="bg-[#1e1a2e] p-6 rounded-3xl border border-purple-800/30 shadow-lg flex flex-col items-center">
             <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
             </div>
             <p className="text-4xl font-black text-white">0</p>
             <p className="text-sm text-purple-200/50 mt-1">الخدمات المنفذة</p>
          </div>
          <div className="bg-[#1e1a2e] p-6 rounded-3xl border border-purple-800/30 shadow-lg flex flex-col items-center">
             <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             </div>
             <p className="text-4xl font-black text-white">30</p>
             <p className="text-sm text-purple-200/50 mt-1">أيام متبقية</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="max-w-[1400px] mx-auto space-y-6 text-right">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between text-white relative z-10 flex-row-reverse">
           <div className="flex items-center gap-3">
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all">
                تحديث
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
              <button className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md">
                + مشروع جديد
              </button>
           </div>
           <div className="flex items-center gap-4 mt-6 md:mt-0">
             <div>
                <h3 className="text-4xl font-black mb-1">مشاريعي</h3>
                <p className="text-purple-100/80 font-medium">إدارة وتنظيم نتائج الخدمات المحفوظة</p>
             </div>
             <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" /></svg>
             </div>
           </div>
        </div>
      </div>
      <div className="bg-[#1e1a2e] border border-purple-800/30 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-purple-800/20 flex items-center justify-between text-purple-300/50 text-xs">
           <span>صفحة 1 من 1</span>
           <div className="flex items-center gap-2 text-white font-bold text-sm">
             المشاريع (0)
             <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
           </div>
        </div>
        <div className="py-24 flex flex-col items-center justify-center text-purple-200/30">
           <p className="font-medium text-lg">لا يوجد مشاريع بعد في هذه القائمة</p>
        </div>
      </div>
    </div>
  );

  const PlansView = () => {
    const plans = [
      {
        name: 'الباقة المجانية',
        price: '0',
        tokens: '100',
        features: ['وصول للأدوات الأساسية', 'محلل الروابط', 'دعم فني محدود', 'تاريخ محفوظ لمدة 7 أيام'],
        color: 'bg-[#1e1a2e]',
        buttonColor: 'bg-[#2a2441] border border-purple-800/30',
        current: true
      },
      {
        name: 'باقة المحترفين',
        price: '29',
        tokens: '5,000',
        features: ['وصول لجميع أدوات AI', 'أولوية في التنفيذ', 'دعم فني 24/7', 'تاريخ محفوظ غير محدود', 'مشاريع غير محدودة'],
        color: 'bg-gradient-to-br from-purple-600 to-indigo-500',
        buttonColor: 'bg-white text-purple-600',
        current: false
      },
      {
        name: 'باقة الشركات',
        price: '99',
        tokens: '25,000',
        features: ['كل ميزات المحترفين', 'تدريب مخصص للفريق', 'مدير حساب خاص', 'تكامل مخصص للـ API', 'حلول ذكاء اصطناعي حصرية'],
        color: 'bg-gradient-to-br from-indigo-500 to-cyan-600',
        buttonColor: 'bg-white text-indigo-600',
        current: false
      }
    ];

    return (
      <div className="max-w-[1400px] mx-auto space-y-6 text-right">
        <div className="bg-[#00c2a8] rounded-[40px] p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between text-white relative z-10 flex-row-reverse">
             <div className="flex items-center gap-4 flex-row-reverse">
                <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                   <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                   <h3 className="text-4xl font-black mb-1">{t.plans}</h3>
                   <p className="text-white/90 font-medium">اختر الخطة المناسبة لنمو تجارتك وسرعة إنجازك</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl transition-all hover:translate-y-[-8px] ${plan.color} ${plan.current ? 'ring-4 ring-emerald-400/50' : ''} border border-purple-800/20`}>
               {plan.current && (
                 <span className="absolute -top-4 bg-emerald-400 text-[#151221] font-black px-6 py-1 rounded-full text-xs shadow-lg">خطتك الحالية</span>
               )}
               <h4 className="text-xl font-bold mb-6 text-white">{plan.name}</h4>
               <div className="flex items-baseline gap-1 mb-2">
                 <span className="text-5xl font-black text-white">${plan.price}</span>
                 <span className="text-white/60 text-sm">/شهرياً</span>
               </div>
               <p className="text-purple-200/70 font-bold text-sm mb-8">{plan.tokens} توكن ذكي</p>
               
               <ul className="space-y-4 mb-10 w-full text-right">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 justify-end text-sm text-purple-100/90">
                      <span>{feature}</span>
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </li>
                  ))}
               </ul>

               <button className={`mt-auto w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:scale-105 active:scale-95 ${plan.buttonColor}`}>
                 {plan.current ? 'باقة نشطة' : 'ترقية الآن'}
               </button>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1a2e] rounded-[30px] p-8 border border-purple-800/30 text-center text-purple-200/60 shadow-lg">
           <p className="font-bold">هل تحتاج إلى خطة مخصصة لفريق عمل أكبر أو لشركات البرمجة؟</p>
           <button className="text-emerald-400 hover:text-emerald-300 mt-2 font-bold flex items-center gap-2 mx-auto transition-colors">تواصل مع قسم المبيعات <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></button>
        </div>
      </div>
    );
  };

  const ToolsView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredTools = AI_TOOLS.filter(tool => 
      tool.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="max-w-[1400px] mx-auto space-y-6 text-right">
        <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between text-white relative z-10 flex-row-reverse">
             <div className="flex items-center gap-4 flex-row-reverse">
                <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                   <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
                </div>
                <div>
                   <h3 className="text-4xl font-black mb-1">{t.tools}</h3>
                   <p className="text-white/90 font-medium">{t.subTagline}</p>
                </div>
             </div>
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder={t.searchTools} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#1e1a2e] border border-purple-800/30 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-purple-500 text-right pr-12 text-white placeholder-purple-300/30" />
          <svg className="w-6 h-6 absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-[#1e1a2e] border border-purple-800/30 rounded-3xl p-6 hover:border-purple-500/50 transition-all group hover:shadow-2xl hover:translate-y-[-4px]">
              <div className="flex items-center justify-between mb-4 flex-row-reverse">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                   {tool.icon === 'link' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>}
                   {tool.icon === 'pen' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>}
                   {tool.icon === 'image' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                   {tool.icon === 'mic' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>}
                </div>
                <span className="text-xs font-bold text-purple-400/60 uppercase tracking-widest">{tool.tokens} Tokens</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{tool.name[lang]}</h4>
              <p className="text-purple-200/60 text-sm mb-6 line-clamp-2">{tool.description[lang]}</p>
              <button className="w-full py-3 rounded-xl bg-[#151221] text-white font-bold group-hover:bg-purple-600 transition-all border border-purple-800/20 group-hover:border-transparent">استخدم الآن</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ChatView = () => (
    <div className="max-w-4xl mx-auto h-full flex flex-col text-right">
      <div className="flex-1 overflow-y-auto space-y-6 pb-6">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} flex-row-reverse gap-3`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-purple-500'}`}>{msg.role === 'user' ? 'U' : 'Z'}</div>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-right shadow-sm ${msg.role === 'user' ? 'bg-indigo-500/10 text-indigo-100 border border-indigo-500/20' : 'bg-[#1e1a2e] text-purple-100 border border-purple-800/20'}`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <span className="text-[10px] text-purple-300/30 mt-1 block">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end flex-row-reverse gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center font-bold text-white flex-shrink-0">Z</div>
            <div className="bg-[#1e1a2e] rounded-2xl px-5 py-3 border border-purple-800/20">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400/50 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400/50 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400/50 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto pt-4 bg-[#151221]">
        <div className="relative">
          <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={t.typeMessage} className="w-full bg-[#1e1a2e] border border-purple-800/30 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-purple-500 text-right pr-16 text-white" />
          <button onClick={handleSendMessage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 shadow-lg transition-all"><svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
        </div>
      </div>
    </div>
  );

  const SavedView = () => (
    <div className="max-w-[1400px] mx-auto space-y-6 text-right">
      <div className="bg-[#00c2a8] rounded-[40px] p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between text-white relative z-10 flex-row-reverse">
           <div className="flex items-center gap-4 flex-row-reverse">
              <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </div>
              <div>
                 <h3 className="text-4xl font-black mb-1">المحفوظات</h3>
                 <p className="text-white/90 font-medium">الوصول السريع إلى كل نتائجك المفضلة</p>
              </div>
           </div>
        </div>
      </div>
      <div className="bg-[#1e1a2e] border border-purple-800/30 rounded-3xl p-24 flex flex-col items-center justify-center text-purple-200/30 text-center">
         <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
         <p className="text-xl font-bold">لم تقم بحفظ أي نتائج حتى الآن</p>
         <p className="text-sm mt-2 opacity-50">استخدم أدوات الذكاء الاصطناعي وابدأ في بناء أرشيفك</p>
      </div>
    </div>
  );

  const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('subscription');
    
    const menuItems = [
      { id: 'subscription', label: 'الاشتراك', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"/></svg>
      ) },
      { id: 'profile', label: 'الملف الشخصي', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      ) },
      { id: 'company', label: 'الشركة', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
      ) },
      { id: 'notifications', label: 'الإشعارات', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
      ) },
      { id: 'security', label: 'الأمان', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      ) },
      { id: 'support', label: 'الدعم الفني', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      ) },
      { id: 'billing', label: 'الفواتير', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V15a2 2 0 01-2 2z"/></svg>
      ) },
    ];

    return (
      <div className="max-w-[1400px] mx-auto space-y-6 text-right">
        <div className="bg-[#00c2a8] rounded-[40px] p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between text-white relative z-10 flex-row-reverse">
             <div className="flex items-center gap-4 flex-row-reverse">
                <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                   <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                </div>
                <div>
                   <h3 className="text-4xl font-black mb-1">الإعدادات</h3>
                   <p className="text-white/90 font-medium">إدارة إعدادات حسابك وشركتك بلمسة واحدة</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           <div className="lg:col-span-9 order-2 lg:order-1">
              <div className="bg-[#1e1a2e]/90 border border-purple-800/20 rounded-[30px] h-[550px] flex items-center justify-center shadow-lg backdrop-blur-sm">
                 <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-[#00c2a8] animate-spin mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    <p className="text-purple-300/60 font-bold text-lg">جاري تحميل بياناتك...</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-[#1e1a2e] border border-purple-800/30 rounded-[30px] p-4 shadow-xl">
                 <div className="space-y-2">
                    {menuItems.map((item) => (
                       <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                             activeTab === item.id
                             ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
                             : 'text-purple-300/50 hover:bg-[#2a2441]/70 hover:text-white'
                          }`}
                       >
                          <span className="flex items-center gap-3 flex-row-reverse w-full">
                             {item.icon}
                             <span className="font-bold text-sm">{item.label}</span>
                          </span>
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dark">
      {view === View.LANDING && <LandingPage />}
      {view === View.LOGIN && <LoginPage />}
      {(view === View.DASHBOARD || view === View.PROJECTS || view === View.PLANS || view === View.CHAT || view === View.TOOLS || view === View.SAVED || view === View.SETTINGS) && (
        <DashboardShell>
          {view === View.DASHBOARD && <HomeView />}
          {view === View.PROJECTS && <ProjectsView />}
          {view === View.PLANS && <PlansView />}
          {view === View.CHAT && <ChatView />}
          {view === View.TOOLS && <ToolsView />}
          {view === View.SAVED && <SavedView />}
          {view === View.SETTINGS && <SettingsView />}
        </DashboardShell>
      )}
    </div>
  );
};

export default App;
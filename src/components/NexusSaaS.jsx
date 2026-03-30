import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  Layers, 
  Zap, 
  Shield, 
  Check, 
  Globe, 
  Users,
  Menu,
  X,
  Sun,
  Moon,
  Languages,
  TrendingUp,
  Activity,
  DollarSign
} from 'lucide-react';

const NexusSaaS = ({ isDark, toggleTheme, lang, onLangToggle, t }) => {
  const [activeFilter, setActiveFilter] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translations = t.nexus;

  useEffect(() => {
    // Dynamic Head Management
    const originalFavicon = document.querySelector('link[rel="icon"]')?.href;
    const originalTitle = document.title;
    
    // Set Nexus Assets
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = 'nexus-favicon.png';
      favicon.type = 'image/png';
    }
    document.title = 'Nexus AI | Data Intelligence Platform';

    // Cleanup: Restore Portfolio Assets
    return () => {
      if (favicon && originalFavicon) {
        favicon.href = 'favicon.svg';
        favicon.type = 'image/svg+xml';
      }
      document.title = originalTitle;
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const demoData = {
    overview: {
      stats: [
        { label: translations.demo.metrics.total, value: '1.2M', icon: Activity, color: 'text-blue-500' },
        { label: translations.demo.metrics.growth, value: '+24%', icon: TrendingUp, color: 'text-emerald-500' },
        { label: 'Uptime', value: '99.9%', icon: Shield, color: 'text-indigo-500' },
      ],
      chart: [60, 85, 45, 90, 70, 100, 80],
    },
    revenue: {
      stats: [
        { label: 'MRR', value: '$128k', icon: DollarSign, color: 'text-emerald-600' },
        { label: 'ARR', value: '$1.5M', icon: TrendingUp, color: 'text-blue-600' },
        { label: 'LTV', value: '$2.4k', icon: Users, color: 'text-indigo-600' },
      ],
      chart: [30, 45, 60, 75, 90, 85, 95],
    },
    access: {
      stats: [
        { label: 'Daily Active', value: '45k', icon: Users, color: 'text-orange-500' },
        { label: 'Requests/s', value: '2.8k', icon: Zap, color: 'text-yellow-500' },
        { label: 'Global nodes', value: '12', icon: Globe, color: 'text-blue-500' },
      ],
      chart: [40, 30, 50, 40, 60, 50, 70],
    }
  };

  return (
    <div className={`font-sans antialiased transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} min-h-screen`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-500 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src="nexus-favicon.png" alt="Nexus Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`text-xl font-black tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Nexus</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['products', 'solutions', 'pricing', 'docs'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  className={`text-sm font-semibold transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'}`}
                >
                  {translations.nav[item]}
                </a>
              ))}
            </div>

            {/* Toggles & CTA */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={onLangToggle}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
                title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              >
                <Languages className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-900 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="hidden sm:block text-sm font-bold text-indigo-600 dark:text-indigo-400 px-4">
                {translations.nav.login}
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                {translations.nav.signup}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <span className={`inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full transition-colors ${isDark ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-600 bg-indigo-50'}`}>
              {translations.hero.tag}
            </span>
            <h1 className={`text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {translations.hero.title.split('.').map((part, i) => (
                <span key={i} className={i === 1 ? 'text-indigo-600 block mt-2' : ''}>{part}{i === 0 ? '.' : ''}</span>
              ))}
            </h1>
            <p className={`max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed font-medium transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {translations.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-2 active:scale-95">
                {translations.hero.ctaPrimary} <ArrowRight className="w-5 h-5" />
              </button>
              <button className={`w-full sm:w-auto border-2 px-10 py-5 rounded-2xl text-lg font-black transition-all active:scale-95 ${isDark ? 'border-slate-800 text-white hover:bg-slate-900' : 'border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
                {translations.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>

          {/* Interactive Demo Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative max-w-5xl mx-auto p-4 md:p-8 rounded-[2.5rem] border transition-all ${isDark ? 'bg-slate-900/50 border-slate-800 shadow-3xl shadow-indigo-500/5' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div className="text-left">
                <h2 className="text-2xl font-black tracking-tight mb-1">{translations.demo.title}</h2>
                <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.demo.subtitle}</p>
              </div>
              
              {/* Dynamic Filters */}
              <div className={`p-1.5 rounded-2xl flex gap-1 ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                {Object.keys(demoData).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeFilter === filter 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                        : `text-slate-500 hover:${isDark ? 'text-white' : 'text-slate-900'}`
                    }`}
                  >
                    {translations.demo.filters[filter]}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Dashboard View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <AnimatePresence mode="wait">
                {demoData[activeFilter].stats.map((stat, i) => (
                  <motion.div
                    key={activeFilter + i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-3xl border transition-colors ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}
                  >
                    <div className={`${stat.color} mb-4`}><stat.icon className="w-6 h-6" /></div>
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</div>
                    <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interactive Chart Mock */}
            <div className={`h-64 md:h-80 w-full p-8 rounded-3xl flex items-end justify-between gap-2 md:gap-4 transition-colors ${isDark ? 'bg-slate-950/30' : 'bg-slate-50/50'}`}>
              {demoData[activeFilter].chart.map((height, i) => (
                <motion.div
                  key={activeFilter + i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ type: "spring", stiffness: 100, delay: i * 0.05 }}
                  className={`w-full max-w-[40px] rounded-t-xl transition-colors ${
                    activeFilter === 'overview' ? 'bg-blue-500' : 
                    activeFilter === 'revenue' ? 'bg-emerald-500' : 'bg-indigo-500'
                  } opacity-80 hover:opacity-100 cursor-pointer relative group`}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={`py-16 border-y transition-colors ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <p className={`text-center text-xs font-black uppercase tracking-[0.3em] mb-12 ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>
            {translations.hero.socialProof}
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center opacity-40 grayscale hover:grayscale-0 transition-all hover:opacity-100">
            {['Acme Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella'].map((company) => (
              <div key={company} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                <span className={`text-xl font-black tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="products" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{translations.features.title}</h2>
            <p className={`max-w-xl mx-auto font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.features.subtitle}</p>
          </div>

          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Feature 1 - Predictive */}
            <motion.div 
              variants={fadeInUp}
              className={`md:col-span-8 p-10 rounded-[2.5rem] border transition-all hover:scale-[1.02] ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-200/50'}`}
            >
              <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-8">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-black mb-4">{translations.features.predictive.title}</h3>
              <p className={`text-lg font-medium max-w-md mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {translations.features.predictive.desc}
              </p>
              <div className={`h-2 text-[10px] items-center flex rounded-full w-full overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-blue-500" />
              </div>
            </motion.div>

            {/* Feature 2 - Integration */}
            <motion.div 
              variants={fadeInUp}
              className={`md:col-span-4 p-10 rounded-[2.5rem] border transition-all hover:scale-[1.02] ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-yellow-500/50' : 'bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-200/50'}`}
            >
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mb-8">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3">{translations.features.integration.title}</h3>
              <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.features.integration.desc}</p>
            </motion.div>

            {/* Feature 3 - Security */}
            <motion.div 
              variants={fadeInUp}
              className={`md:col-span-4 p-10 rounded-[2.5rem] border transition-all hover:scale-[1.02] ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/50' : 'bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-200/50'}`}
            >
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3">{translations.features.security.title}</h3>
              <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.features.security.desc}</p>
            </motion.div>

            {/* Feature 4 - Global */}
            <motion.div 
              variants={fadeInUp}
              className="md:col-span-8 p-10 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform"
            >
              <Globe className="absolute -right-12 -bottom-12 w-64 h-64 text-white/10 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 max-w-sm">
                <h3 className="text-4xl font-black mb-6">{translations.features.global.title}</h3>
                <p className="text-indigo-100 text-lg font-medium mb-10">
                  {translations.features.global.desc}
                </p>
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-indigo-600 bg-white/20 backdrop-blur-sm" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-4 border-indigo-600 bg-white text-indigo-600 flex items-center justify-center text-xs font-black">+120</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-32 px-4 transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{translations.pricing.title}</h2>
            <p className={`max-w-xl mx-auto font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pro Plan */}
            <motion.div 
              {...fadeInUp}
              className={`relative p-10 rounded-[3rem] border-2 shadow-2xl transition-all hover:scale-[1.02] ${
                isDark ? 'bg-slate-900/50 border-indigo-600 shadow-indigo-600/10' : 'bg-white border-indigo-600 shadow-indigo-200/50'
              }`}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                {translations.pricing.popular}
              </div>
              <div className="mb-10">
                <h3 className="text-3xl font-black mb-2">{translations.pricing.pro.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black">{translations.pricing.pro.price}</span>
                  <span className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/month</span>
                </div>
                <p className={`mt-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.pricing.pro.desc}</p>
              </div>

              <ul className="space-y-5 mb-12">
                {translations.pricing.pro.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-6 h-6 bg-indigo-500/20 text-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                {translations.pricing.cta}
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              {...fadeInUp}
              className={`p-10 rounded-[3rem] border transition-all hover:scale-[1.02] ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-100'}`}
            >
              <div className="mb-10">
                <h3 className="text-3xl font-black mb-2">{translations.pricing.enterprise.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black">{translations.pricing.enterprise.price}</span>
                </div>
                <p className={`mt-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{translations.pricing.enterprise.desc}</p>
              </div>

              <ul className="space-y-5 mb-12">
                {translations.pricing.enterprise.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm font-bold opacity-70">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-400'}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 leading-none ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
                {translations.pricing.ctaVendas}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`pt-32 pb-12 px-4 transition-colors ${isDark ? 'bg-slate-950 border-t border-slate-900' : 'bg-slate-50 border-t border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                  <img src="nexus-favicon.png" alt="Nexus Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl font-black tracking-tight">Nexus</span>
              </div>
              <p className={`text-lg font-medium max-w-sm mb-10 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {translations.footer.desc}
              </p>
              <div className="flex gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-600 shadow-sm'}`} />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-12">
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-8">{lang === 'pt' ? 'Navegação' : 'Navigation'}</h4>
                <ul className="space-y-5 text-sm font-bold">
                  {['products', 'solutions', 'pricing', 'docs'].map(item => (
                    <li key={item}><a href={`#${item}`} className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>{translations.nav[item]}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-8">{lang === 'pt' ? 'Suporte' : 'Support'}</h4>
                <ul className="space-y-5 text-sm font-bold">
                  <li><a href="#" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Help Center</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>API Status</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Community</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className={`text-xs font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                © 2026 Nexus AI. All rights reserved.
              </p>
              <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                {translations.footer.madeBy}
              </p>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NexusSaaS;

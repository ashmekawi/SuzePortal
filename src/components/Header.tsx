import { useState, useEffect, SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Award, 
  Calendar, 
  Search,
  Globe,
  Phone,
  Mail,
  Facebook,
  User,
  Languages,
  ArrowRight,
  ExternalLink,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS, SERVICES, NEWS } from '../constants';

function TopBar() {
  return (
    <div className="hidden lg:block bg-blue-950 text-blue-100/80 py-2.5 border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      <div className="container mx-auto px-6 flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
        <div className="flex items-center gap-8 relative z-10">
          <a href="tel:01003530760" className="flex items-center gap-2 hover:text-white transition-colors group">
            <Phone className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="font-mono tracking-normal">01003530760</span>
          </a>
          <a href="mailto:info@suez-coc.com" className="flex items-center gap-2 hover:text-white transition-colors group">
            <Mail className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            info@suez-coc.com
          </a>
          <div className="flex items-center gap-2 text-blue-100/60">
            <MapPin className="w-3.5 h-3.5 text-blue-400/50" />
            السويس، مصر
          </div>
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
            <a 
              href="https://www.facebook.com/p/%D8%A7%D9%84%D8%BA%D8%B1%D9%81%D8%A9-%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%B3%D9%88%D9%8A%D8%B3-100057577025242/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-white transition-all hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          <button className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group px-3 py-1 bg-white/5 rounded-lg border border-white/5 hover:border-white/10">
            <Languages className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-[10px]">Arabic</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setSearchQuery('');
  }, [location]);

  const filteredServices = SERVICES.filter(s => 
    s.title.includes(searchQuery) || s.description.includes(searchQuery)
  );
  const filteredNews = NEWS.filter(n => 
    n.title.includes(searchQuery) || n.summary.includes(searchQuery)
  );

  const isHomePage = location.pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isSearchOpen || isMenuOpen || !isHomePage 
          ? 'bg-white/70 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-slate-200/50' 
          : 'bg-transparent'
      }`}
    >
      <TopBar />
      <div className="container mx-auto px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-8 relative">
          {/* Logo Section */}
          <Link 
            to="/" 
            className={`flex items-center gap-3 md:gap-4 group transition-all duration-500 ${isSearchOpen ? 'opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto scale-95' : 'opacity-100 scale-100'}`}
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/10 transition-all duration-500 overflow-hidden border border-slate-100"
              >
                <img 
                  src="/logo.png" 
                  alt="شعار الغرفة التجارية بالسويس" 
                  className="w-full h-full object-contain p-1 relative z-10"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('bg-gradient-to-br', 'from-blue-900', 'to-slate-900');
                      const globeIcon = parent.querySelector('.fallback-icon');
                      if (globeIcon) (globeIcon as HTMLElement).style.opacity = '1';
                    }
                  }}
                />
                <Globe className="fallback-icon w-6 h-6 md:w-7 md:h-7 text-white absolute opacity-0 transition-opacity duration-500" />
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg border-2 border-white z-20">
                <Award className="w-2.5 h-2.5 md:w-3 md:h-3" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-black text-lg md:text-xl leading-none tracking-tight transition-colors duration-500 ${scrolled || isSearchOpen || isMenuOpen || !isHomePage ? 'text-blue-950' : 'text-blue-950 md:text-white'}`}>
                الغرفة التجارية المصرية
              </h1>
              <p className={`text-[10px] md:text-xs font-bold mt-1.5 transition-colors duration-500 ${scrolled || isSearchOpen || isMenuOpen || !isHomePage ? 'text-blue-600' : 'text-blue-600 md:text-blue-200'}`}>
                بمحافظة السويس
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-1 transition-all duration-500 ${isSearchOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown(item.label);
                  setHoveredItem(item.label);
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setHoveredItem(null);
                }}
              >
                <Link 
                  to={item.href}
                  className={`px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold text-[13px] tracking-wide transition-all duration-300 relative z-10 ${
                    scrolled || !isHomePage ? 'text-slate-600 hover:text-blue-600' : 'text-slate-600 lg:text-white/80 hover:text-white'
                  }`}
onClick={(e) => {
  // لما تدوس الرئيسية
  if (item.label === "الرئيسية") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // السكاشن
  if (item.href.startsWith('/#')) {
    e.preventDefault();
    const id = item.href.replace('/#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = item.href;
    }
  }
}}                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  
                  {hoveredItem === item.label && (
                    <motion.div 
                      layoutId="nav-hover"
                      className={`absolute inset-0 rounded-xl -z-10 ${scrolled || !isHomePage ? 'bg-blue-50/80' : 'bg-white/10'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {location.pathname === item.href && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
                
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="absolute top-full right-0 mt-2 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/50 overflow-hidden p-2 z-50"
                      >
                        <div className="px-4 py-2.5 mb-1 bg-slate-50/50 rounded-xl">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-0.5">
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-blue-600 hover:text-white transition-all group/item"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover/item:bg-white transition-colors" />
                                {child.label}
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar Overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
              >
                <div className="relative group">
                  <input
                    autoFocus
                    type="text"
                    placeholder="ابحث عن الخدمات، الأخبار، أو الفعاليات..."
                    className="w-full bg-white/90 backdrop-blur-xl border border-slate-200 focus:border-blue-500 rounded-2xl py-3.5 px-6 pr-12 outline-none text-slate-800 font-bold text-base transition-all shadow-2xl shadow-blue-900/5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isSearchOpen 
                  ? 'bg-slate-900 text-white rotate-90' 
                  : scrolled || !isHomePage 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-white/10 backdrop-blur-md text-slate-700 lg:text-white hover:bg-white/20'
              }`}
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            
            <Link 
              to="/services/excellence-center" 
              className={`hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-5 h-10 md:h-11 rounded-xl font-black text-[12px] uppercase tracking-wider transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-95 items-center gap-2 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <User className="w-4 h-4" />
              <span>دخول التجار</span>
            </Link>

            <button 
              className={`lg:hidden w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all ${isMenuOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Results */}
        <AnimatePresence>
          {isSearchOpen && searchQuery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-6 right-6 mt-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-slate-200/50 overflow-hidden max-h-[70vh] z-50 flex flex-col"
            >
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                  {/* Services Results */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Award className="w-4.5 h-4.5 text-blue-600" />
                        </div>
                        <h3 className="text-slate-900 font-black text-lg">الخدمات الرقمية</h3>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {filteredServices.length} نتيجة
                      </span>
                    </div>
                    <div className="grid gap-3">
                      {filteredServices.length > 0 ? filteredServices.map(service => (
                        <Link 
                          key={service.id} 
                          to={`/services/${service.id}`} 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-blue-600 transition-all group border border-transparent hover:border-blue-400 shadow-sm"
                        >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-white/20 group-hover:text-white transition-all shadow-sm">
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-black text-slate-900 group-hover:text-white transition-colors text-base">{service.title}</p>
                            <p className="text-xs text-slate-500 group-hover:text-white/80 line-clamp-1 mt-0.5">{service.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-all -translate-x-1 group-hover:translate-x-0" />
                        </Link>
                      )) : (
                        <div className="py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                          <p className="text-slate-400 font-bold text-sm">لا توجد نتائج</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* News Results */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4.5 h-4.5 text-emerald-600" />
                        </div>
                        <h3 className="text-slate-900 font-black text-lg">المركز الإعلامي</h3>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {filteredNews.length} نتيجة
                      </span>
                    </div>
                    <div className="grid gap-3">
                      {filteredNews.length > 0 ? filteredNews.map(item => (
                        <a 
                          key={item.id} 
                          href={item.link} 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-emerald-600 transition-all group border border-transparent hover:border-emerald-400 shadow-sm"
                        >
                          <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-black text-slate-900 line-clamp-1 group-hover:text-white transition-colors text-base">{item.title}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Calendar className="w-3 h-3 text-slate-400 group-hover:text-white/70" />
                              <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/70">{item.date}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-white transition-all" />
                        </a>
                      )) : (
                        <div className="py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                          <p className="text-slate-400 font-bold text-sm">لا توجد نتائج</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950 py-4 px-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Suez Chamber Search</p>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold">
                  <span>نتائج البحث لـ:</span>
                  <span className="text-blue-400">"{searchQuery}"</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-900 rounded-xl flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-black text-slate-900 text-sm">القائمة الرئيسية</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 active:scale-90 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                <div className="grid gap-2">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className={`rounded-xl border transition-all duration-300 ${activeDropdown === item.label ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                        <div 
                          className="flex items-center justify-between p-4 cursor-pointer"
                          onClick={() => {
                            if (item.children) {
                              setActiveDropdown(activeDropdown === item.label ? null : item.label);
                            } else {
                              setIsMenuOpen(false);
                              window.location.href = item.href;
                            }
                          }}
                        >
                          <span className={`text-[15px] font-black ${activeDropdown === item.label ? 'text-blue-700' : 'text-slate-900'}`}>{item.label}</span>
                          {item.children && (
                            <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${activeDropdown === item.label ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                          )}
                        </div>
                        
                        {item.children && (
                          <motion.div 
                            initial={false}
                            animate={{ height: activeDropdown === item.label ? 'auto' : 0, opacity: activeDropdown === item.label ? 1 : 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 grid gap-1.5">
                              {item.children.map((child) => (
                                <a 
                                  key={child.label} 
                                  href={child.href}
                                  className="flex items-center justify-between p-3.5 bg-white rounded-lg text-slate-700 font-bold text-[13px] shadow-sm border border-slate-100 active:scale-95 transition-all group"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-blue-600" />
                                    {child.label}
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-active:translate-x-1 transition-transform" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <Link 
                  to="/services/excellence-center"
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  
                >
                  <User className="w-5 h-5" />
                  دخول التجار
                </Link>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <a href="tel:01003530760" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-100 text-slate-600 shadow-sm active:scale-95 transition-all">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-[9px] font-black uppercase tracking-wider">اتصل بنا</span>
                  </a>
                  <a href="mailto:info@suez-coc.com" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-100 text-slate-600 shadow-sm active:scale-95 transition-all">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span className="text-[9px] font-black uppercase tracking-wider">راسلنا</span>
                  </a>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <a 
                    href="https://www.facebook.com/p/%D8%A7%D9%84%D8%BA%D8%B1%D9%81%D8%A9-%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%B3%D9%88%D9%8A%D8%B3-100057577025242/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 shadow-sm border border-slate-100 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

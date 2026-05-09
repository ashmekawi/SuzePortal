// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Stethoscope, 
  FileCheck, 
  TrendingUp, 
  Users, 
  Mail, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Info,
  Target,
  Plus,
  Minus,
  FileText,
  UserCheck,
  Briefcase,
  Edit3,
  CheckCircle2,
  Phone,
  Send,
  MessageSquare,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  Globe2,
  Settings2,
  Gavel,
  X,
  UserCircle2,
  ArrowUp,
  ChevronDown,
  Zap
} from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import { Link } from 'react-router-dom';
import { SERVICES, NEWS, TRADE_AGREEMENTS, FAQS, EVENTS, CERTIFICATES, COMPETENCIES, BOARD_MEMBERS, TRADE_DIVISIONS_STATUTES, STRATEGY_DATA, SUEZ_DISTRICTS } from '../constants';

const IconMap: Record<string, any> = {
  Award,
  Stethoscope,
  FileCheck,
  TrendingUp,
  Users,
  Mail,
  FileText,
  UserCheck,
  Briefcase,
  Edit3,
  BarChart3,
  Lightbulb,
  Globe2,
  Settings2,
  Gavel
};

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  key?: any;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-right hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-900 text-lg">{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-white text-slate-400'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EventCard({ event }: { event: any; key?: any }) {
  const categoryColors = {
    workshop: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    meeting: 'bg-blue-50 text-blue-700 border-blue-100',
    event: 'bg-purple-50 text-purple-700 border-purple-100',
    deadline: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const categoryLabels = {
    workshop: 'ورشة عمل',
    meeting: 'اجتماع',
    event: 'فعالية',
    deadline: 'موعد نهائي',
  };

  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.toLocaleString('ar-EG', { month: 'short' });
  const time = date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center justify-center w-20 h-24 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <span className="text-2xl font-bold">{day}</span>
          <span className="text-sm font-medium">{month}</span>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryColors[event.category as keyof typeof categoryColors]}`}>
              {categoryLabels[event.category as keyof typeof categoryLabels]}
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{event.title}</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TradeMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Simplified SVG paths for Suez Districts
  const districts = [
    { 
      id: 'ganayen', 
      name: 'حي الجناين', 
      d: 'M 300 50 L 700 50 L 700 150 L 500 200 L 300 150 Z',
      color: '#0369a1'
    },
    { 
      id: 'attaka', 
      name: 'حي عتاقة', 
      d: 'M 100 150 L 300 150 L 500 200 L 450 450 L 100 450 Z',
      color: '#1e3a8a'
    },
    { 
      id: 'faisal', 
      name: 'حي فيصل', 
      d: 'M 500 200 L 700 150 L 800 200 L 750 250 L 550 250 Z',
      color: '#0f766e'
    },
    { 
      id: 'arbaeen', 
      name: 'حي الأربعين', 
      d: 'M 550 250 L 750 250 L 700 300 L 500 300 Z',
      color: '#0891b2'
    },
    { 
      id: 'suez', 
      name: 'حي السويس', 
      d: 'M 500 300 L 700 300 L 650 400 L 450 400 Z',
      color: '#0d9488'
    }
  ];

  return (
    <div className="relative bg-white rounded-3xl lg:rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 relative group/map" onMouseMove={handleMouseMove}>
          <div className="aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-auto xl:h-[500px] w-full relative">
            <svg 
              viewBox="0 0 900 500" 
              className="w-full h-full drop-shadow-2xl"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background/Water effect */}
              <rect width="900" height="500" fill="transparent" />
              
              {districts.map((d) => (
                <motion.path
                  key={d.id}
                  d={d.d}
                  fill={d.color}
                  stroke="#ffffff"
                  strokeWidth={selectedDistrict?.id === d.id ? "4" : "2"}
                  initial={{ opacity: 0.8, scale: 1 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.02,
                    strokeWidth: 4,
                    zIndex: 10
                  }}
                  animate={selectedDistrict?.id === d.id ? {
                    opacity: [1, 0.7, 1],
                    scale: [1.02, 1.04, 1.02],
                    strokeWidth: [4, 6, 4],
                  } : {
                    opacity: 0.8,
                    scale: 1,
                    strokeWidth: 2,
                  }}
                  transition={selectedDistrict?.id === d.id ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : { duration: 0.3 }}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredDistrict(d.name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => {
                    const district = SUEZ_DISTRICTS.find(sd => sd.id === d.id);
                    setSelectedDistrict(district);
                  }}
                />
              ))}
            </svg>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredDistrict && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  style={{ 
                    left: mousePos.x, 
                    top: mousePos.y - 60
                  }}
                  className="absolute pointer-events-none z-30 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md -translate-x-1/2"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">محافظة السويس</p>
                    <p className="font-bold text-lg whitespace-nowrap leading-none">{hoveredDistrict}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 left-4 md:left-auto flex flex-wrap gap-2 md:gap-3 bg-white/80 backdrop-blur p-3 md:p-4 rounded-2xl border border-slate-100 z-10">
              {districts.map(d => (
                <button 
                  key={d.id} 
                  onClick={() => {
                    const district = SUEZ_DISTRICTS.find(sd => sd.id === d.id);
                    setSelectedDistrict(district);
                  }}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors ${selectedDistrict?.id === d.id ? 'bg-blue-50' : 'hover:bg-white/50'}`}
                >
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] md:text-xs font-bold text-slate-700 whitespace-nowrap">{d.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col h-full min-h-[300px]">
          <AnimatePresence mode="wait">
            {selectedDistrict ? (
              <motion.div
                key={selectedDistrict.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col bg-slate-50/50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-8 bg-blue-600 rounded-full" style={{ backgroundColor: selectedDistrict.color }} />
                    <h4 className="text-xl md:text-2xl font-bold text-blue-900">{selectedDistrict.name}</h4>
                  </div>
                  <button 
                    onClick={() => setSelectedDistrict(null)}
                    className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {selectedDistrict.description}
                  </p>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Award className="w-3 h-3 text-blue-600" /> المزايا التنافسية
                      </p>
                      <ul className="space-y-2">
                        {selectedDistrict.benefits.map((b: string, i: number) => (
                          <li key={i} className="text-sm text-slate-600 flex gap-2 items-start">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Target className="w-3 h-3 text-blue-600" /> الفرص الاستثمارية
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDistrict.opportunities.map((o: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white border border-blue-100 text-blue-700 rounded-lg text-xs font-bold shadow-sm">
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto">
                    <button className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                      <Info className="w-4 h-4" /> طلب تفاصيل الفرص الاستثمارية
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                  <MapPin className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">خريطة أحياء السويس</h4>
                <p className="text-slate-500 font-medium text-sm">اختر حياً من الخريطة لاستكشاف المزايا التنافسية والفرص الاستثمارية المتاحة في كل منطقة</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [news, setNews] = useState(NEWS);
  const [events, setEvents] = useState(EVENTS);
  const [isCompetenciesOpen, setIsCompetenciesOpen] = useState(false);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const closeCompetencies = () => {
    setIsCompetenciesOpen(false);
    if (window.location.hash === '#competencies') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const closeDivisions = () => {
    setIsDivisionsOpen(false);
    if (window.location.hash === '#divisions') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const closeStrategy = () => {
    setIsStrategyOpen(false);
    if (window.location.hash === '#strategy') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    if (window.location.hash === '#competencies') {
      setIsCompetenciesOpen(true);
    }
    if (window.location.hash === '#strategy') {
      setIsStrategyOpen(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#competencies') {
        setIsCompetenciesOpen(true);
      }
      if (window.location.hash === '#divisions') {
        setIsDivisionsOpen(true);
      }
      if (window.location.hash === '#strategy') {
        setIsStrategyOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    if (window.location.hash === '#competencies') {
      setIsCompetenciesOpen(true);
    }
    if (window.location.hash === '#divisions') {
      setIsDivisionsOpen(true);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'EVENT_UPDATE') {
          setEvents(prev => [message.data, ...prev]);
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    };

    return () => socket.close();
  }, []);

  const filteredEvents = events.filter(e => 
    eventFilter === 'all' || e.category === eventFilter
  );

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2 }}
            src="https://cdn.al-ain.com/lg/images/2023/8/07/196-134630-suez-canal-space_700x400.jpg" 
            alt="Suez Canal" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wider uppercase">المرور لمستقبل التجارة</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                الغرفة التجارية <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">بمحافظة السويس</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-medium">
                شريكك الاستراتيجي في قلب التجارة العالمية. نقدم حلولاً مبتكرة لدعم نمو أعمالك وتوسيع آفاقك التجارية.
              </p>
              <div className="flex flex-wrap gap-6">
                <a 
                  href="#services"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                >
                  استكشف خدماتنا <ArrowLeft className="w-6 h-6" />
                </a>
                <a 
                  href="#contact"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-md transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                >
                  تواصل معنا <Mail className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em]">اكتشف المزيد</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-slate-950 to-transparent pt-20 pb-10 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-8">
              {[
                { label: 'تاجر مسجل', value: '15,000+', icon: Users },
                { label: 'سنة من الخبرة', value: '50+', icon: Award },
                { label: 'خدمة إلكترونية', value: '30+', icon: Zap },
                { label: 'شعبة تجارية', value: '25+', icon: Briefcase },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (i * 0.1) }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400 font-bold">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Improved */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
              <div className="relative z-10 space-y-8">
                <div>
                  <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-blue-600"></span> عن الغرفة
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                     نعمل من اجل  <span className="text-blue-600">نهضة تجارة </span> السويس
                  </h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  تأسست الغرفة التجارية المصرية بالسويس لتكون المحرك الأساسي للتنمية الاقتصادية في المحافظة. نحن نؤمن بأن قوة السويس تكمن في تجارها ومستثمريها، ولذلك نسخر كافة إمكانياتنا لتذليل العقبات وفتح آفاق جديدة للنمو.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">رؤيتنا</h4>
                      <p className="text-sm text-slate-500">أن نكون الغرفة الأكثر تطوراً ودعماً للتجارة في مصر.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">قيمنا</h4>
                      <p className="text-sm text-slate-500">الشفافية، الابتكار، والالتزام بخدمة التاجر أولاً.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
                  <button 
                    onClick={() => setIsBoardOpen(true)}
                    className="bg-blue-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    تعرف على مجلس الإدارة <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsCompetenciesOpen(true)}
                    className="bg-white text-blue-900 border-2 border-blue-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    اختصاصات الغرفة <ShieldCheck className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsStrategyOpen(true)}
                    className="bg-blue-50 text-blue-700 border-2 border-blue-100 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    أهداف واستراتيجية العمل <Target className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src= "https://www.presidency.eg/media/108985/1jpg.jpg?mode=crop&width=150"
                  alt="Suez Chamber of Commerce" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-900">80 عاماً من الخبرة</p>
                </div>
                <p className="text-sm text-slate-500">نفخر بكوننا الشريك الاستراتيجي الأول لكل تاجر في السويس منذ عقود.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Improved */}
      <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-3">خدماتنا الرقمية</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900">منظومة متكاملة <span className="text-blue-600">لدعم أعمالك</span></h3>
            </div>
            <Link to="/services/excellence-center" className="bg-white text-blue-600 border border-blue-100 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              دليل الخدمات الكامل
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = IconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-600 transition-colors duration-500 opacity-20 group-hover:opacity-10"></div>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                    {service.description}
                  </p>
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-3 font-bold text-blue-600 py-2 group-hover:gap-5 transition-all"
                  >
                    تفاصيل الخدمة <ArrowLeft className="w-5 h-5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificates Section - NEW */}
      <section id="certificates" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-3">الشهادات والمستندات</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">استخرج شهاداتك <span className="text-blue-600">بسهولة وأمان</span></h3>
            <p className="text-slate-600 text-lg">نوفر لك كافة الشهادات الرسمية المطلوبة لمزاولة نشاطك التجاري محلياً ودولياً، مع توضيح كامل للمتطلبات.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CERTIFICATES.map((cert, i) => {
              const Icon = IconMap[cert.icon];
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-blue-200 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-2xl font-bold text-slate-900 mb-3">{cert.title}</h4>
                      <p className="text-slate-600 mb-6 leading-relaxed">{cert.description}</p>
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">المستندات المطلوبة:</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.requirements.map((req, idx) => (
                            <span key={idx} className="flex items-center gap-1 text-sm bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8 flex gap-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                          طلب استخراج
                        </button>
                        <button className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                          تحميل النموذج
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section - Improved with Layout Animations */}
      <section id="news" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-3">المركز الإعلامي</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">نبض الغرفة <span className="text-blue-400">وآخر الفعاليات</span></h3>
              <p className="text-blue-100/60 text-lg">تغطية شاملة لكافة الأنشطة والقرارات التي تهم المجتمع التجاري بالسويس.</p>
            </div>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">
              الأرشيف الإخباري
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {news.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/10 transition-all group"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {item.date}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-blue-100/60 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                    <a 
                      href={item.link}
                      className="inline-flex items-center gap-2 font-bold text-blue-400 group-hover:gap-4 transition-all"
                    >
                      اقرأ المزيد <ArrowLeft className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trade Agreements (Library) */}
      <section id="library" className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3">المكتبة الإلكترونية</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">بوابتك للأسواق العالمية والاتفاقيات الدولية</h3>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                نقدم لك كافة المعلومات والوثائق المتعلقة بالاتفاقيات التجارية الدولية التي وقعتها مصر، لتتمكن من تصدير منتجاتك والاستفادة من الإعفاءات الجمركية والمزايا التنافسية.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRADE_AGREEMENTS.map((item) => (
                  <a 
                    key={item.title}
                    href={item.link}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-between group"
                  >
                    <span className="font-medium">{item.title}</span>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://s.globalsources.com/IMAGES/skc/20240117065151515143918.jpg" 
                  alt="Suez Canal Trade" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">100%</p>
                <p className="text-blue-100 font-medium">دعم فني للمصدرين</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-blue-900 text-sm font-bold uppercase tracking-widest mb-3">أجندة الغرفة</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">الفعاليات والمواعيد القادمة</h3>
              <p className="text-slate-600">ابقَ على اطلاع دائم بآخر الورش التدريبية، الاجتماعات، والفعاليات الاقتصادية في السويس.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'workshop', label: 'ورش عمل' },
                { id: 'meeting', label: 'اجتماعات' },
                { id: 'event', label: 'فعاليات' },
                { id: 'deadline', label: 'مواعيد هامة' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setEventFilter(filter.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    eventFilter === filter.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trade Map Section */}
      <section id="trademap" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-6 font-bold text-sm"
            >
              <Globe2 className="w-4 h-4" />
              <span>خريطة السويس الاستثمارية</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">استكشف الفرص والمزايا في <span className="text-blue-600">أحياء السويس</span></h2>
            <p className="text-xl text-slate-600 leading-relaxed">تفاعل مع الخريطة للتعرف على المزايا التنافسية لكل حي من أحياء محافظة السويس، واكتشف الفرص الاستثمارية والأنشطة الاقتصادية الواعدة في كل منطقة.</p>
          </div>

          <div className="relative bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
            <TradeMap />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-900 text-sm font-bold uppercase tracking-widest mb-3">الأسئلة الشائعة</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">كل ما تريد معرفته عن خدمات الغرفة</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Improved */}
      <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-8 font-bold text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>تواصل معنا</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-tight">نحن هنا <br /><span className="text-blue-600">لخدمتك ودعم أعمالك</span></h2>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  يسعدنا استقبال استفساراتكم ومقترحاتكم. يمكنك التواصل معنا عبر القنوات التالية أو زيارة مقر الغرفة في مواعيد العمل الرسمية.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">المقر الرئيسي</h4>
                    <p className="text-slate-500 leading-relaxed">شارع الجلاء، السويس، مصر</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">الهاتف</h4>
                    <p className="text-slate-500 leading-relaxed">01003530760</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                  <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">البريد الإلكتروني</h4>
                    <p className="text-slate-500 leading-relaxed">info@suez-coc.com</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                  <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-700/20 group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">مواعيد العمل</h4>
                    <p className="text-slate-500 leading-relaxed">الأحد - الخميس<br />8:30 ص - 2:30 م</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative border border-slate-100"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 mr-2">الاسم بالكامل</label>
                    <input 
                      type="text" 
                      placeholder="أدخل اسمك هنا"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-blue-600 focus:bg-white transition-all outline-none text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 mr-2">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      placeholder="example@mail.com"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-blue-600 focus:bg-white transition-all outline-none text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 mr-2">الموضوع</label>
                  <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-blue-600 focus:bg-white transition-all outline-none text-slate-900 font-medium appearance-none">
                    <option>استفسار عام</option>
                    <option>خدمات التجار</option>
                    <option>شكاوى ومقترحات</option>
                    <option>أخرى</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 mr-2">رسالتك</label>
                  <textarea 
                    rows={4} 
                    placeholder="كيف يمكننا مساعدتك؟"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-blue-600 focus:bg-white transition-all outline-none text-slate-900 font-medium resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                  إرسال الرسالة <Send className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competencies Modal */}
      <AnimatePresence>
        {isCompetenciesOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCompetencies}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-6xl bg-white rounded-2xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]"
              >
                <div className="p-6 md:p-12 border-b border-slate-100 flex items-center justify-between bg-blue-900 text-white">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">اختصاصات الغرفة التجارية المصرية</h2>
                    <p className="text-blue-200 text-sm md:text-base">الدور الريادي والمهام الاستراتيجية لخدمة مجتمع الأعمال بالسويس</p>
                  </div>
                  <button 
                    onClick={closeCompetencies}
                    className="p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {COMPETENCIES.map((comp, i) => {
                    const Icon = IconMap[comp.icon];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group"
                      >
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">{comp.title}</h4>
                        <ul className="space-y-4">
                          {comp.items.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-600 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                <button 
                  onClick={closeCompetencies}
                  className="bg-blue-900 text-white px-12 py-4 rounded-full font-bold shadow-xl hover:bg-blue-800 transition-all active:scale-95"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Board Members Modal */}
      <AnimatePresence>
        {isBoardOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBoardOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]"
            >
              <div className="p-6 md:p-12 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-800 text-white">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">مجلس إدارة الغرفة</h2>
                  <p className="text-blue-200 text-sm md:text-base">القيادة الحكيمة لمستقبل التجارة في محافظة السويس</p>
                </div>
                <button 
                  onClick={() => setIsBoardOpen(false)}
                  className="p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-slate-50">
                {/* Executive Board */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-1 bg-blue-600 rounded-full" />
                    <h3 className="text-2xl font-bold text-slate-900">المكتب التنفيذي</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BOARD_MEMBERS.filter(m => m.isExecutive).map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <UserCircle2 className="w-7 h-7" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1 leading-tight">{member.name}</h4>
                            <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Board Members */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-1 bg-slate-300 rounded-full" />
                    <h3 className="text-2xl font-bold text-slate-900">أعضاء مجلس الإدارة</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BOARD_MEMBERS.filter(m => !m.isExecutive).map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="bg-white/60 p-6 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-all flex items-center gap-4"
                      >
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                          <UserCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm leading-tight">{member.name}</h4>
                          <p className="text-slate-500 text-xs mt-1">{member.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white border-t border-slate-100 text-center">
                <button 
                  onClick={() => setIsBoardOpen(false)}
                  className="bg-blue-900 text-white px-12 py-4 rounded-full font-bold shadow-xl hover:bg-blue-800 transition-all active:scale-95"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trade Divisions Modal */}
      <AnimatePresence>
        {isDivisionsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDivisions}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-2xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]"
            >
              <div className="p-6 md:p-12 border-b border-slate-100 flex items-center justify-between bg-blue-900 text-white">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">لائحة النظام الأساسي للشعب النوعية</h2>
                  <p className="text-blue-200 text-sm md:text-base">الضوابط المنظمة لعمل الشعب التجارية بالغرفة</p>
                </div>
                <button 
                  onClick={closeDivisions}
                  className="p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-slate-50">
                <div className="max-w-4xl mx-auto space-y-12">
                  {TRADE_DIVISIONS_STATUTES.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                        <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
                      </div>
                      
                      <div className="grid gap-6">
                        {section.articles.map((article, aIdx) => (
                          <motion.div
                            key={aIdx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="flex items-start gap-6">
                              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                                {article.number}
                              </div>
                              <div className="space-y-4">
                                {article.title && (
                                  <h4 className="text-lg font-bold text-blue-900">{article.title}</h4>
                                )}
                                {Array.isArray(article.content) ? (
                                  <ul className="space-y-3">
                                    {article.content.map((item, iIdx) => (
                                      <li key={iIdx} className="flex gap-3 text-slate-700 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-slate-700 leading-relaxed">{article.content}</p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white border-t border-slate-100 text-center">
                <button 
                  onClick={closeDivisions}
                  className="bg-blue-900 text-white px-12 py-4 rounded-full font-bold shadow-xl hover:bg-blue-800 transition-all active:scale-95"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Strategy Modal */}
      <AnimatePresence>
        {isStrategyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeStrategy}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-5 md:p-10 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Target className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-slate-900">أهداف واستراتيجية العمل</h3>
                    <p className="text-slate-500 text-[10px] md:text-base">رؤية الغرفة التجارية المصرية بالسويس لمستقبل مجتمع الأعمال</p>
                  </div>
                </div>
                <button 
                  onClick={closeStrategy}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-5 md:p-10 custom-scrollbar">
                <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                  {/* Intro Section */}
                  <div className="space-y-4 md:space-y-6">
                    {STRATEGY_DATA.intro.map((para, i) => (
                      <p key={i} className="text-base md:text-xl text-slate-700 leading-relaxed font-medium">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Goals Grid */}
                  <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {STRATEGY_DATA.goals.map((goal, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-blue-200 transition-all group"
                      >
                        <h4 className="text-lg md:text-2xl font-bold text-blue-900 mb-4 md:mb-6 flex items-start gap-3 md:gap-4">
                          <span className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl flex items-center justify-center text-sm md:text-lg shadow-md group-hover:scale-110 transition-transform">
                            {i + 1}
                          </span>
                          {goal.title}
                        </h4>
                        
                        {goal.items && (
                          <ul className="space-y-3 md:space-y-4 mr-11 md:mr-14">
                            {goal.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 md:gap-3 text-slate-600 leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 md:mt-2.5 shrink-0" />
                                <span className="text-base md:text-lg">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Outro Section */}
                  <div className="bg-blue-900 text-white p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl" />
                    <div className="relative z-10">
                      <p className="text-lg md:text-2xl leading-relaxed font-bold text-blue-50">
                        {STRATEGY_DATA.outro}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-600/40 flex items-center justify-center hover:bg-blue-500 transition-all hover:-translate-y-1 active:scale-95 group"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
 
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  Phone, 
  Mail, 
  MapPin,
  Award,
  Stethoscope,
  FileCheck,
  TrendingUp,
  Users,
  Mail as MailIcon
} from 'lucide-react';
import { SERVICES } from '../constants';

const IconMap: Record<string, any> = {
  Award,
  Stethoscope,
  FileCheck,
  TrendingUp,
  Users,
  Mail: MailIcon
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">الخدمة غير موجودة</h2>
        <Link to="/" className="text-blue-600 font-bold flex items-center gap-2">
          <ArrowRight className="w-15 h-15" /> العودة للرئيسية
        </Link>
      </div>
    );
  }

  const Icon = IconMap[service.icon];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 rtl" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
            <ArrowRight className="w-15 h-15" /> العودة للرئيسية
          </Link>

          <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-blue-900 p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur rounded-2xl md:rounded-3xl flex items-center justify-center">
                  <Icon className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="text-center md:text-right">
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{service.title}</h1>
                  <p className="text-blue-100 text-base md:text-lg max-w-2xl">{service.description}</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                <div className="lg:col-span-2 space-y-8 md:space-y-12">
                  <section>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-6 md:w-2 md:h-8 bg-blue-600 rounded-full" />
                      عن الخدمة
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                      {service.longDescription}
                    </p>
                  </section>

                  {service.forms && service.forms.length > 0 && (
                    <section>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 md:w-2 md:h-8 bg-blue-600 rounded-full" />
                        النماذج والمستندات
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.forms.map((form, i) => (
                          <a 
                            key={i} 
                            href={form.link}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                <FileText className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-slate-700 group-hover:text-blue-700 text-sm md:text-base">{form.title}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 rotate-180" />
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6">معلومات التواصل</h3>
                    <div className="space-y-5 md:space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">الهاتف</p>
                          <p className="text-slate-700 font-bold text-sm md:text-base">{service.contactInfo?.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">البريد الإلكتروني</p>
                          <p className="text-slate-700 font-bold text-sm md:text-base">{service.contactInfo?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">الموقع</p>
                          <p className="text-slate-700 font-bold text-sm md:text-base">{service.contactInfo?.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white text-center">
                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">هل لديك استفسار؟</h3>
                    <p className="text-blue-100 text-xs md:text-sm mb-6">فريقنا جاهز للرد على كافة تساؤلاتكم حول هذه الخدمة.</p>
                    <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                      تواصل معنا الآن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { 
  Facebook, 
  Globe,
  Phone,
  Mail,
  MapPin,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl overflow-hidden border border-slate-800">
                <img 
                  src="/logo.png" 
                  alt="شعار الغرفة التجارية بالسويس" 
                  className="w-full h-full object-contain p-1 relative z-10"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('bg-blue-600');
                      const globeIcon = parent.querySelector('.fallback-icon');
                      if (globeIcon) (globeIcon as HTMLElement).style.opacity = '1';
                    }
                  }}
                />
                <Globe className="fallback-icon w-8 h-8 text-white absolute opacity-0 transition-opacity duration-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl leading-tight">الغرفة التجارية المصرية</h4>
                <p className="text-blue-400 text-sm font-bold">بمحافظة السويس</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              المؤسسة الرائدة في دعم وتمثيل المجتمع التجاري بمحافظة السويس منذ أكثر من 80 عاماً.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/p/%D8%A7%D9%84%D8%BA%D8%B1%D9%81%D8%A9-%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%B3%D9%88%D9%8A%D8%B3-100057577025242/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-xl font-bold mb-8">روابط سريعة</h5>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/" className="hover:text-blue-400 transition-colors">الرئيسية</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">عن الغرفة</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">خدماتنا</a></li>
              <li><a href="#news" className="hover:text-blue-400 transition-colors">المركز الإعلامي</a></li>
              <li><a href="#calendar" className="hover:text-blue-400 transition-colors">أجندة الفعاليات</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold mb-8">خدمات التجار</h5>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/services/excellence-center" className="hover:text-blue-400 transition-colors">مركز التميز</Link></li>
              <li><Link to="/services/medical-services" className="hover:text-blue-400 transition-colors">الرعاية الطبية</Link></li>
              <li><Link to="/services/trade-registrations" className="hover:text-blue-400 transition-colors">التسجيلات التجارية</Link></li>
              <li><a href="#certificates" className="hover:text-blue-400 transition-colors">الشهادات والمستندات</a></li>
              <li><a href="#trademap" className="hover:text-blue-400 transition-colors">خريطة التجارة</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold mb-8">النشرة الإخبارية</h5>
            <p className="text-slate-400 mb-6 leading-relaxed">
              اشترك في نشرتنا الإخبارية ليصلك آخر أخبار التجارة والفعاليات في السويس.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-6 outline-none focus:border-blue-500 transition-all text-white"
                />
                <button className="absolute left-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg transition-all active:scale-95">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500">
                بالاشتراك، أنت توافق على سياسة الخصوصية الخاصة بنا.
              </p>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} الغرفة التجارية المصرية بالسويس. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

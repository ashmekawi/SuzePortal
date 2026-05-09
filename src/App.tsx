import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col rtl" dir="rtl">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
document.documentElement.lang = "ar";
document.documentElement.dir = "rtl";

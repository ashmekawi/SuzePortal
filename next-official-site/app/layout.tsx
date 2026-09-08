import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "الغرفة التجارية المصرية بالسويس",
  description: "الموقع الرسمي للغرفة التجارية المصرية بمحافظة السويس",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  );
}

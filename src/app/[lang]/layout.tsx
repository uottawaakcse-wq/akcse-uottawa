import Link from 'next/link';
import Image from 'next/image'; // <-- Add this new import!
import { getDictionary, Locale } from '../dictionaries';
import '@/app/globals.css';
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-[#FAFAFA] text-black font-sans selection:bg-[#8F001A] selection:text-white">
        
        {/* Subtle Engineering Dot Grid Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* Global Unified Navigation */}
        <nav className="w-full border-b border-black/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
            <Link href={`/${lang}`} className="flex items-center gap-4 group">
  {/* The New Real Logo */}
  <Image 
    src="/akcse-logo.png" 
    alt="AKCSE uOttawa Logo" 
    width={32} 
    height={32} 
    className="object-contain group-hover:opacity-80 transition-opacity"
  />
  <span className="font-bold text-lg tracking-tight">
    YG AKCSE <span className="text-[#8F001A]">uOttawa</span>
  </span>
</Link>

              <div className="flex items-center gap-6">
                {/* Main Links */}
                <div className="hidden md:flex items-center gap-6">
                  <Link href={`/${lang}/about`} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{dict.nav.chapter}</Link>
                  <Link href={`/${lang}/events`} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{dict.nav.events}</Link>
                  <Link href={`/${lang}/notices`} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{dict.nav.notices}</Link>
                </div>

                {/* Language Selector */}
                <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-gray-400 border-l border-black/10 pl-6">
                  <Link href="/en" className={`${lang === 'en' ? 'text-black font-bold' : 'hover:text-black'} transition-colors`}>EN</Link>
                  <span>/</span>
                  <Link href="/fr" className={`${lang === 'fr' ? 'text-black font-bold' : 'hover:text-black'} transition-colors`}>FR</Link>
                  <span>/</span>
                  <Link href="/ko" className={`${lang === 'ko' ? 'text-black font-bold' : 'hover:text-black'} transition-colors`}>KR</Link>
                </div>

                {/* Admin Login */}
                <Link href={`/${lang}/login`} className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors ml-2 sm:ml-4">
                  {dict.nav.admin}
                </Link>
              </div>

            </div>
          </div>
        </nav>

        {/* The individual page content gets injected here */}
        {children}
        
      </body>
    </html>
  );
}
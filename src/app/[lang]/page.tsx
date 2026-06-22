import Link from 'next/link';
import { getDictionary, Locale } from '../dictionaries';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  
  // Await the params to extract the lang string
  const { lang } = await params;
  
  // Fetch the dictionary
  const dict = await getDictionary(lang as Locale);

  // Notice how we start DIRECTLY with <main>. 
  // The <nav> and background are now handled automatically by layout.tsx!
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-7">
          <p className="font-mono text-sm text-[#8F001A] mb-4 uppercase tracking-widest">
            {dict.hero.subtitle}
          </p>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6">
            {dict.hero.title_1} <br className="hidden lg:block"/>
            {dict.hero.title_2} <span className="text-[#8F001A]">uOttawa</span>.
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mb-8 leading-relaxed">
            {dict.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${lang}/join`} className="bg-[#8F001A] text-white px-8 py-4 font-bold tracking-wide hover:bg-black transition-colors">
              {dict.hero.join}
            </Link>
            <Link href={`/${lang}/about`} className="px-8 py-4 font-bold border border-black/20 hover:border-black transition-colors">
              {dict.hero.about}
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] bg-gray-200 w-full relative group overflow-hidden">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
              <span className="font-mono text-sm">[ Group Photo Placeholder ]</span>
              <span className="text-xs mt-2">Dimensions: 800x1000</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#8F001A] -z-10"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-black/10 pt-12">
        
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-mono text-sm text-gray-500 uppercase tracking-widest">{dict.ledger.important_notice}</h2>
            <Link href={`/${lang}/notices`} className="text-xs font-mono text-[#8F001A] hover:underline">{dict.ledger.view_all}</Link>
          </div>
          
          <div className="bg-[#8F001A] text-white p-8 sm:p-10">
            <h3 className="text-2xl font-bold mb-4">Fall General Meeting & Scholarship Portal</h3>
            <p className="mb-8 text-white/80 leading-relaxed">
              Join us on September 15th to kick off the new semester. Learn about upcoming technical workshops...
            </p>
            <Link href={`/${lang}/notices/notice-001`} className="inline-flex items-center gap-2 font-mono text-sm hover:underline underline-offset-4">
              READ DETAILS →
            </Link>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-mono text-sm text-gray-500 uppercase tracking-widest">{dict.ledger.events_ledger}</h2>
            <Link href={`/${lang}/events`} className="text-xs font-mono text-[#8F001A] hover:underline">{dict.ledger.view_archive}</Link>
          </div>
          {/* Event list code remains identical here */}
        </div>

      </div>
    </main>
  );
}
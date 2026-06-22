import { getDictionary, Locale } from '../../dictionaries';

export default async function About({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const { about_page } = dict;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
      
      {/* ABOUT AKCSE SECTION */}
      <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-black/10 pb-24">
        <div className="lg:col-span-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight mb-4 whitespace-pre-line">
            {about_page.title}
          </h1>
          <p className="font-mono text-sm text-[#8F001A] uppercase tracking-widest">
            {about_page.subtitle}
          </p>
        </div>
        
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-lg text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-sm font-mono font-bold text-black uppercase tracking-widest mb-4 border-b border-black/10 pb-2">{about_page.national_title}</h2>
            <p>{about_page.national_desc}</p>
          </div>
          <div>
            <h2 className="text-sm font-mono font-bold text-black uppercase tracking-widest mb-4 border-b border-black/10 pb-2">{about_page.chapter_title}</h2>
            <p>{about_page.chapter_desc}</p>
          </div>
        </div>
      </section>

      {/* EXECUTIVES SECTION */}
      <section>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter">
              {about_page.board_title}
            </h2>
            <p className="text-gray-500 mt-2">{about_page.board_subtitle}</p>
          </div>
          <span className="font-mono text-sm text-[#8F001A] uppercase tracking-widest bg-[#8F001A]/10 px-3 py-1">
            {about_page.executives.length} {about_page.active_members}
          </span>
        </div>

        {/* Grid of Executive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {about_page.executives.map((exec: any, index: number) => (
            <div key={index} className="border border-black/10 bg-white group hover:border-black transition-colors flex flex-col">
              
              {/* Portrait Placeholder */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden border-b border-black/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <span className="font-mono text-xs uppercase tracking-widest mb-2">{about_page.portrait_placeholder}</span>
                  <span className="text-[10px]">600 x 600</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>

              {/* Executive Info / Spec Sheet */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold tracking-tight mb-1">{exec.name}</h3>
                <p className="text-[#8F001A] font-medium text-sm mb-6">{exec.role}</p>
                
                {/* Tech-style Stats List */}
                <div className="mt-auto flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400 uppercase">{about_page.labels.major}</span>
                    <span className="text-right font-medium">{exec.major}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400 uppercase">{about_page.labels.year}</span>
                    <span className="text-right font-medium">{exec.year}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-400 uppercase">{about_page.labels.mbti}</span>
                    <span className="text-right font-medium">{exec.mbti}</span>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
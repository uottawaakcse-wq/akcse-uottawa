import { getDictionary, Locale } from '../../dictionaries';

export default async function EventsArchive({ params }: { params: Promise<{ lang: Locale }> }) {
  // Await the params to extract the lang string
  const { lang } = await params;
  
  // Fetch the dictionary
  const dict = await getDictionary(lang);
  const { events_page } = dict;

  // We start directly with <main>. The navigation and background are handled by layout.tsx.
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
      
      <header className="mb-16">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
          {events_page.title}
        </h1>
        <p className="font-mono text-sm text-[#8F001A] uppercase tracking-widest">
          {events_page.subtitle}
        </p>
      </header>

      {/* UPCOMING EVENTS (High Contrast Block) */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-2 h-2 bg-[#8F001A] animate-pulse"></div>
          <h2 className="font-mono text-sm text-black font-bold uppercase tracking-widest">{events_page.upcoming_label}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10">
          {events_page.upcoming_events.map((event: any) => (
            <div key={event.id} className="lg:col-span-12 flex flex-col lg:flex-row bg-white group hover:border-black transition-colors">
              
              <div className="bg-[#8F001A] text-white p-8 lg:w-72 flex flex-col justify-center shrink-0">
                <span className="font-mono text-sm opacity-80 uppercase tracking-widest mb-2">{events_page.target_date_label}</span>
                <span className="text-3xl font-bold tracking-tighter">{event.date}</span>
                <span className="font-mono text-xs mt-2">{event.time}</span>
              </div>

              <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs border border-black/20 px-2 py-1 uppercase">{event.type}</span>
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">{event.location}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                <p className="text-gray-600 max-w-2xl leading-relaxed">
                  {event.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* HISTORICAL ARCHIVE (Ledger List) */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-2 bg-black"></div>
          <h2 className="font-mono text-sm text-black font-bold uppercase tracking-widest">{events_page.archive_label}</h2>
        </div>

        <div className="border-t-4 border-black">
          {events_page.archive_years.map((archiveGroup: any, index: number) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/10">
              
              <div className="lg:col-span-2 py-6 lg:py-8 lg:border-r border-black/10 pr-6">
                <span className="font-extrabold text-3xl tracking-tighter text-gray-300">
                  {archiveGroup.year}
                </span>
              </div>

              <div className="lg:col-span-10 flex flex-col">
                {archiveGroup.events.map((event: any, i: number) => (
                  <div 
                    key={i} 
                    className={`flex flex-col sm:flex-row sm:items-center p-6 lg:p-8 hover:bg-black/5 transition-colors cursor-default ${i !== archiveGroup.events.length - 1 ? 'border-b border-black/5' : ''}`}
                  >
                    <div className="font-mono text-sm text-gray-500 w-32 shrink-0 mb-2 sm:mb-0">
                      {event.date}
                    </div>
                    <div className="w-32 shrink-0 mb-2 sm:mb-0">
                      <span className="font-mono text-xs text-[#8F001A] bg-[#8F001A]/10 px-2 py-1 uppercase tracking-wider">
                        {event.type}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                    </div>
                    <div className="font-mono text-xs text-gray-400 mt-2 sm:mt-0 text-left sm:text-right w-48 shrink-0 uppercase tracking-widest">
                      {event.location}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
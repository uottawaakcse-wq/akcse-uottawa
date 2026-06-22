import Link from 'next/link';
import { Locale } from '../../dictionaries';

// Mock Data for the Bulletins
// Note: You will eventually want to move this data and the hardcoded UI text 
// into your en.json, ko.json, and fr.json files just like the Events page!
const NOTICES = [
  {
    id: 'notice-001',
    priority: 'HIGH',
    date: '2026.06.20',
    category: 'SCHOLARSHIP',
    title: 'AKCSE National Scholarship Application Now Open',
    excerpt: 'The national portal is now accepting applications for the 2026-2027 academic year. Open to all active undergraduate and graduate members in STEM programs.',
    deadline: '2026.08.15',
    pinned: true,
  },
  {
    id: 'notice-002',
    priority: 'NORMAL',
    date: '2026.06.10',
    category: 'ADMIN',
    title: 'Call for 1st Year Representatives',
    excerpt: 'We are looking for motivated incoming first-year students to join the executive team and help coordinate events for the new cohort.',
    deadline: '2026.09.20',
    pinned: false,
  },
  {
    id: 'notice-003',
    priority: 'NORMAL',
    date: '2026.05.01',
    category: 'EVENT',
    title: 'Fall General Meeting Schedule Finalized',
    excerpt: 'Please mark your calendars for the upcoming Fall General Meeting. Attendance is highly encouraged for those looking to participate in mentorship programs.',
    deadline: null,
    pinned: false,
  }
];

export default async function NoticesPage({ params }: { params: Promise<{ lang: String }> }) {
  // Await the params to extract the lang string for the links
  const { lang } = await params;

  const pinnedNotice = NOTICES.find(n => n.pinned);
  const standardNotices = NOTICES.filter(n => !n.pinned);

  // We start directly with <main>. The navigation and background are handled by layout.tsx.
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
      
      <header className="mb-16">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
          Official Bulletins.
        </h1>
        <p className="font-mono text-sm text-[#8F001A] uppercase tracking-widest">
          Important announcements and deadlines.
        </p>
      </header>

      {/* PINNED/PRIORITY NOTICE */}
      {pinnedNotice && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-[#8F001A] animate-pulse"></div>
            <h2 className="font-mono text-sm text-black font-bold uppercase tracking-widest">Priority Broadcast</h2>
          </div>
          
          <div className="border-2 border-[#8F001A] bg-white group hover:bg-[#8F001A]/5 transition-colors relative overflow-hidden">
            <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs bg-[#8F001A] text-white px-2 py-1 uppercase tracking-wider">
                    [{pinnedNotice.category}]
                  </span>
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                    Issued: {pinnedNotice.date}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-4xl font-extrabold tracking-tighter mb-4 text-[#8F001A]">
                  {pinnedNotice.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                  {pinnedNotice.excerpt}
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-black/10 pt-6 lg:pt-0 lg:pl-8">
                {pinnedNotice.deadline && (
                  <div className="text-left lg:text-right">
                    <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Deadline</p>
                    <p className="font-mono font-bold text-lg">{pinnedNotice.deadline}</p>
                  </div>
                )}
                {/* Fixed routing to include the language */}
                <Link href={`/${lang}/notices/${pinnedNotice.id}`} className="bg-[#8F001A] text-white px-6 py-3 font-bold font-mono text-sm uppercase tracking-wider hover:bg-black transition-colors text-center w-full lg:w-auto">
                  Read Full Specs →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STANDARD NOTICES LEDGER */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-2 h-2 bg-black"></div>
          <h2 className="font-mono text-sm text-black font-bold uppercase tracking-widest">General Transmissions</h2>
        </div>

        <div className="border-t-4 border-black">
          {standardNotices.map((notice, index) => (
            <div 
              key={notice.id} 
              className={`flex flex-col lg:flex-row lg:items-center p-6 lg:p-8 bg-white hover:bg-black/5 transition-colors cursor-pointer group ${index !== standardNotices.length - 1 ? 'border-b border-black/10' : ''}`}
            >
              {/* Meta Column */}
              <div className="w-48 shrink-0 flex flex-row lg:flex-col gap-4 lg:gap-2 mb-4 lg:mb-0">
                <span className="font-mono text-sm text-gray-500 group-hover:text-black transition-colors">
                  {notice.date}
                </span>
                <span className="font-mono text-xs text-black border border-black/20 px-2 py-0.5 uppercase tracking-wider inline-block w-fit">
                  {notice.category}
                </span>
              </div>

              {/* Content Column */}
              <div className="flex-1 pr-0 lg:pr-8">
                <h4 className="font-bold text-xl mb-2 group-hover:text-[#8F001A] transition-colors">{notice.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {notice.excerpt}
                </p>
              </div>

              {/* Action/Deadline Column */}
              <div className="w-48 shrink-0 mt-4 lg:mt-0 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center">
                {notice.deadline ? (
                  <div className="text-left lg:text-right">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Deadline</span>
                    <span className="font-mono text-sm font-medium">{notice.deadline}</span>
                  </div>
                ) : (
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">N/A</span>
                )}
                {/* Fixed routing to include the language */}
                <Link href={`/${lang}/notices/${notice.id}`} className="lg:mt-4 font-mono text-xs font-bold text-[#8F001A] hover:underline underline-offset-4 uppercase tracking-widest hidden lg:block">
                  Expand Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
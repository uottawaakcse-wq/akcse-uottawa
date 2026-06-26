import { getDictionary, Locale } from '../../dictionaries';
import JoinForm from './JoinForm';

export default async function JoinPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
      
      <header className="mb-16 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight mb-4">
          Membership Application.
        </h1>
        <p className="font-mono text-sm text-[#8F001A] uppercase tracking-widest">
          Complete your CV and Consent Form below.
        </p>
      </header>

      {/* Insert the Interactive Form Component */}
      <JoinForm dict={dict} />

    </main>
  );
}
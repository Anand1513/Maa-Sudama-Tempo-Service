import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-charcoal-950 pt-32 pb-20 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl mt-10">
          <div className="text-center mb-16 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight relative z-10">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Services</span></h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10">Comprehensive logistics solutions for modern corporate requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left z-10 relative">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-brand-500/40 transition-all group">
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors uppercase tracking-tight">Point-to-Point Freight</h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Rapid, direct transportation of goods across NCR. Optimized routing ensures swift delivery 
                for anything from small packages (Tata Ace) to heavy cargo (Bolero Maxx PU).
              </p>
              <ul className="text-gray-300 text-sm space-y-3 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Real-time tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Instant POD upload</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Precise billing per KM</li>
              </ul>
            </div>

            <div className="bg-charcoal-900 p-8 rounded-3xl border border-brand-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)] relative hover:-translate-y-1 transition-transform group">
              <div className="absolute inset-0 bg-brand-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-4 -right-2 bg-brand-500 text-charcoal-950 font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.5)] text-xs">Popular</div>
              <h2 className="text-2xl font-bold text-white mb-4 relative z-10 uppercase tracking-tight">Corporate Contracts</h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed relative z-10">
                Rent our vehicles for a standard 10 AM – 5 PM window. Perfect for sequential multiple-drop 
                warehouse runs or daily operational distribution.
              </p>
              <ul className="text-gray-300 text-sm space-y-3 font-medium relative z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Fixed daily rates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Up to 100km standard</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Dedicated driver assigned</li>
              </ul>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-brand-500/40 transition-all group">
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors uppercase tracking-tight">Doc & Cheque Runs</h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Highly secure dispatch services designed explicitly for sensitive corporate banking documents, 
                tender submissions, or crucial B2B cheque collections.
              </p>
              <ul className="text-gray-300 text-sm space-y-3 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Vetted runners only</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Timestamped photos</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-500" /> Direct WhatsApp loop</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

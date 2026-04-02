import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Clock, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-charcoal-950 pt-32 pb-20 font-sans relative overflow-hidden">
        
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl glass-panel border border-white/10 rounded-[2rem] p-8 md:p-16 shadow-2xl relative overflow-hidden mt-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-20 h-1.5 bg-brand-500 mb-8 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">MSTS</span></h1>
            
            <div className="prose prose-lg text-gray-400 space-y-6">
              <p>
                <strong className="text-white font-bold">Maa Sudama Tempo Service (MSTS)</strong> was established with a singular vision: to bring absolute reliability and 
                transparency to corporate logistics in the NCR region. Founded by <strong className="text-brand-500 font-bold">Kanchan Mishra</strong>, our proprietor, we have 
                grown from a modest local freight carrier into a trusted partner for over <strong className="text-brand-400">20+ mid-to-large corporate organizations</strong>.
              </p>
              <p>
                With over 8 years of operational excellence, we specialize in high-stakes, time-sensitive deliveries, document transportation, 
                and full-day fleet rentals. Our direct proprietor access means our clients never bounce between call centers—every trip is fully accountable.
              </p>
              <p>
                Spearheading our digital and financial backbone is <strong className="text-brand-500 font-bold">Anand Kumar Mishra</strong>, who expertly manages our tech infrastructure, billing, and fully digital ledger system. This guarantees seamless transactions, instant invoice synchronization, and digital transparency across all our operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
              <div className="flex flex-col gap-4 group cursor-default">
                <div className="p-4 bg-charcoal-900 rounded-2xl w-fit border border-white/5 group-hover:border-brand-500/50 transition-all shadow-sm group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:bg-brand-500/10">
                   <Shield className="w-8 h-8 text-brand-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">Verified Fleet</h3>
                <p className="text-gray-500 text-sm">Every driver and vehicle in our network is meticulously string-checked.</p>
              </div>
              <div className="flex flex-col gap-4 group cursor-default">
                <div className="p-4 bg-charcoal-900 rounded-2xl w-fit border border-white/5 group-hover:border-brand-500/50 transition-all shadow-sm group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:bg-brand-500/10">
                   <Clock className="w-8 h-8 text-brand-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">On-Time Always</h3>
                <p className="text-gray-500 text-sm">Our logistics grid is optimized to beat traffic and maximize uptime.</p>
              </div>
              <div className="flex flex-col gap-4 group cursor-default">
                <div className="p-4 bg-charcoal-900 rounded-2xl w-fit border border-white/5 group-hover:border-brand-500/50 transition-all shadow-sm group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:bg-brand-500/10">
                   <Award className="w-8 h-8 text-brand-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">Premium Support</h3>
                <p className="text-gray-500 text-sm">Direct, dedicated contact for every single dispatch.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

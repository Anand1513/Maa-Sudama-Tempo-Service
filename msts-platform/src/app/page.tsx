import { Map, Truck, ShieldCheck, Clock, FileCheck, ArrowRight, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen font-sans relative overflow-x-hidden selection:bg-brand-500 selection:text-white bg-charcoal-950 text-white">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-20 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-charcoal-950">
             <div className="absolute inset-0 bg-dot-pattern opacity-30" />
             {/* Large glowing gradients */}
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
          </div>

          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full mt-10">
            
            {/* Left Content */}
            <div className="flex flex-col items-start animate-[fade-in_0.8s_ease-out_forwards]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md glass-panel text-brand-500 font-bold tracking-widest text-xs uppercase mb-8 shadow-[0_0_15px_rgba(249,115,22,0.2)] border-brand-500/30">
                <ShieldCheck className="w-4 h-4" /> Freight & Logistics — NCR
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 drop-shadow-2xl">
                FAST <br /> RELIABLE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">LOGISTICS</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-medium leading-relaxed">
                Supercharge your supply chain. We provide cinematic, accountable point-to-point corporate freight. Track your deliveries in real-time with zero friction.
              </p>
              
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <Link href="#contact" className="w-full md:w-auto px-8 py-4 bg-brand-500 text-charcoal-950 font-black rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all flex justify-center items-center gap-2 uppercase tracking-wide">
                  Book a Vehicle <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="https://wa.me/917703976645" target="_blank" rel="noreferrer" className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-lg hover:border-brand-500 hover:text-brand-500 transition-colors flex justify-center items-center gap-2">
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-12 flex items-center gap-6 glass-panel px-6 py-4 rounded-2xl w-full md:w-auto border-white/5">
                <div className="flex -space-x-3">
                   <div className="w-10 h-10 rounded-full bg-charcoal-800 border-2 border-charcoal-950 flex items-center justify-center"><UserCircle2 className="w-5 h-5 text-gray-400" /></div>
                   <div className="w-10 h-10 rounded-full bg-charcoal-800 border-2 border-charcoal-950 flex items-center justify-center"><UserCircle2 className="w-5 h-5 text-gray-400" /></div>
                   <div className="w-10 h-10 rounded-full bg-charcoal-800 border-2 border-charcoal-950 flex items-center justify-center font-bold text-xs text-brand-500">20+</div>
                </div>
                <div>
                  <div className="font-black text-white text-sm uppercase tracking-wider">Trusted Infrastructure</div>
                  <div className="text-xs text-gray-500 font-medium">B2B Partners across NCR</div>
                </div>
              </div>
            </div>

            {/* Right Clean Visual */}
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-auto h-full min-h-[400px] z-10 flex items-center justify-center animate-[fade-in_1s_ease-out_forwards]">
               <div className="absolute inset-0 animate-pulse bg-brand-500/20 rounded-full blur-[120px]" />
               
               <div className="relative z-10 flex items-center justify-center animate-float-slow">
                  <Truck className="w-72 h-72 md:w-96 md:h-96 text-brand-500 drop-shadow-[0_0_60px_rgba(249,115,22,0.8)] transform -scale-x-100" strokeWidth={0.8} />
               </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-charcoal-950 px-6 md:px-12 relative z-10 border-t border-white/5">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">Operational <span className="text-brand-500">Excellence</span></h2>
              <p className="text-gray-400 text-lg">Engineered for corporations that consider delays unacceptable. Our tech-enabled fleet ensures maximum transparency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
              {[
                { icon: <Map className="w-8 h-8 text-brand-500" />, title: "Live Tracking Grid", desc: "Monitor your cargo on a live map from pickup to drop-off. Zero phone calls required." },
                { icon: <FileCheck className="w-8 h-8 text-brand-500" />, title: "Instant POD Sync", desc: "Digital Proof of Delivery uploaded via the internal driver app the second the drop clears." },
                { icon: <Clock className="w-8 h-8 text-brand-500" />, title: "Dedicated Shifts", desc: "Contract vehicles for standard corporate windows. Perfect for sequential multiple-drop distribution." },
              ].map((feature, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-[2rem] border-white/5 hover:border-brand-500/30 hover:bg-white/[0.02] transition-colors group cursor-default">
                  <div className="mb-8 p-4 bg-charcoal-900 rounded-2xl w-fit border border-white/5 group-hover:border-brand-500/20 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-400 transition-colors uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

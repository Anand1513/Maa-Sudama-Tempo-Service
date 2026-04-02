import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ClientsPage() {
  const clients = [
    {
      name: "MegaCorp Manufacturing",
      industry: "Electronics",
      years: "4 Years",
      summary: "We handle their daily sequential warehouse-to-store distributions. Involving multiple Bolero Maxx pickups and zero-delay SLA requirements."
    },
    {
      name: "Nexus Supply Chain",
      industry: "Retail Logistics",
      years: "6 Years",
      summary: "Our longest standing partner. We provide backup fleet capacities during their peak festival seasons, ensuring they never miss a shipment."
    },
    {
      name: "Vertex Pharmaceuticals",
      industry: "Healthcare",
      years: "2 Years",
      summary: "MSTS manages secure, time-sensitive document and tender cheque exchanges between their Faridabad hub and Delhi corporate head office."
    },
    {
      name: "Altus Apparel Group",
      industry: "Textiles",
      years: "3 Years",
      summary: "Full-day contracted runs. We dedicate 4 Tata Ace vehicles to them Monday through Saturday for fabric roll transfers across the city."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-charcoal-950 pt-32 pb-20 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl mt-10">
          <div className="text-center mb-16 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />
             <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight relative z-10">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Clients</span></h1>
            <p className="text-gray-400 text-lg relative z-10">Trusted by industry leaders across the National Capital Region.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {clients.map((client, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/5 shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:border-brand-500/30 transition-all hover:-translate-y-1 group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-brand-400 transition-colors">{client.name}</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">{client.industry}</p>
                  </div>
                  <div className="bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm group-hover:bg-brand-500 group-hover:text-charcoal-950 transition-colors">
                    {client.years}
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {client.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

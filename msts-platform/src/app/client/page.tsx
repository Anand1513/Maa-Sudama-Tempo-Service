import { MapPin, Navigation, Calendar, Package } from "lucide-react";

export default function ClientDashboard() {
  return (
    <div className="animate-fade-in flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black mb-2">Book a Trip</h1>
        <p className="text-gray-400">Request a vehicle, track your freight, and manage your operations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 shadow-xl">
           <h2 className="text-xl font-bold mb-6 text-gold flex items-center gap-2">
             <Navigation className="w-5 h-5" /> Trip Details
           </h2>
           
           <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Pickup Location</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gold" />
                    <input 
                      type="text" 
                      placeholder="Enter pickup address or select saved..." 
                      className="w-full bg-navy-900 border border-navy-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                    />
                 </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Drop Location</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-green-400" />
                    <input 
                      type="text" 
                      placeholder="Enter drop address or select saved..." 
                      className="w-full bg-navy-900 border border-navy-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                    />
                 </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Vehicle Type</label>
                 <select className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                   <option>Maruti Super Carry (7ft, ≤1T)</option>
                   <option>Tata Ace Gold (8ft, ≤1T)</option>
                   <option>Mahindra Supro (8ft, ≤1T)</option>
                   <option>Bolero Maxx PU (9ft, ≤1.8T)</option>
                 </select>
              </div>

              <button className="w-full mt-4 bg-gold hover:bg-gold-400 text-navy-900 font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(245,166,35,0.2)] hover:shadow-[0_0_30px_rgba(245,166,35,0.4)] transition-all">
                Get Estimate & Confirm Booking
              </button>
           </form>
        </div>

        {/* Right side information */}
        <div className="flex flex-col gap-6">
           <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[40px] point-events-none group-hover:bg-gold/10 transition-colors" />
              <div className="flex items-center gap-3 mb-4">
                 <Calendar className="w-5 h-5 text-gold" />
                 <h2 className="text-lg font-bold">Recent History</h2>
              </div>
              <p className="text-gray-400 text-sm mb-4">No recent trips in the last 7 days.</p>
              <button className="text-gold text-sm font-semibold hover:underline">View All Trip History →</button>
           </div>

           <div className="bg-navy-800 rounded-2xl border border-emerald-900/50 p-8 shadow-xl overflow-hidden relative group h-full">
              <div className="flex items-center gap-3 mb-4">
                 <Package className="w-5 h-5 text-emerald-400" />
                 <h2 className="text-lg font-bold">Active Deliveries</h2>
              </div>
              <p className="text-gray-400 text-sm">Your active cargo runs will appear here with live map tracking.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

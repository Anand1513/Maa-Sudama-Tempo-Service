import { Activity, CreditCard, DollarSign, Truck, AlertTriangle, UserPlus, FilePlus, ShieldPlus, Map } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 min-h-screen p-6 md:p-10 bg-charcoal-950 text-white font-sans selection:bg-brand-500 selection:text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Console</span></h1>
          <p className="text-gray-400 font-medium">Welcome back, Super Admin. Here is the operational overview.</p>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-brand-500 text-charcoal-950 font-black rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:bg-brand-400 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all uppercase tracking-wide text-sm">
            <UserPlus className="w-5 h-5" /> Add Driver
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 glass-panel border border-white/10 text-white font-bold rounded-xl shadow-sm hover:border-brand-500/50 hover:bg-white/5 transition-all text-sm">
            <Truck className="w-5 h-5" /> Add Vehicle
          </button>
          <button className="flex items-center gap-2 px-6 py-3.5 glass-panel border border-white/10 text-white font-bold rounded-xl shadow-sm hover:border-brand-500/50 hover:bg-white/5 transition-all text-sm">
            <ShieldPlus className="w-5 h-5" /> Create Sub-Admin
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/5 transition-all hover:border-brand-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] group cursor-default">
            <div className="flex justify-between items-start mb-6">
              <div className="text-gray-500 text-xs uppercase tracking-widest font-bold group-hover:text-gray-400 transition-colors">Monthly Revenue</div>
              <div className="p-2 bg-brand-500/10 rounded-lg text-brand-500 border border-brand-500/20"><DollarSign className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-black text-white">₹4,25,000</div>
            <div className="text-emerald-400 text-xs mt-3 font-bold flex items-center gap-1">↑ 12.5% vs last month</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/5 transition-all hover:border-brand-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] group cursor-default">
            <div className="flex justify-between items-start mb-6">
              <div className="text-gray-500 text-xs uppercase tracking-widest font-bold group-hover:text-gray-400 transition-colors">Active Trips</div>
              <div className="p-2 bg-brand-500/10 rounded-lg text-brand-500 border border-brand-500/20"><Activity className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-black text-white">14</div>
            <div className="text-brand-500 text-xs mt-3 font-bold">Current ongoing runs</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/5 transition-all hover:border-brand-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] group cursor-default">
            <div className="flex justify-between items-start mb-6">
              <div className="text-gray-500 text-xs uppercase tracking-widest font-bold group-hover:text-gray-400 transition-colors">Fleet Status</div>
              <div className="p-2 bg-brand-500/10 rounded-lg text-brand-500 border border-brand-500/20"><Truck className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-black text-white">42 <span className="text-xl text-gray-500">/ 46</span></div>
            <div className="text-brand-500 text-xs mt-3 font-bold">Vehicles online</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-red-500/20 transition-all hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] bg-red-500/5 group cursor-default">
            <div className="flex justify-between items-start mb-6">
              <div className="text-red-400/80 text-xs uppercase tracking-widest font-bold">SOS Alerts</div>
              <div className="p-2 bg-red-500/20 rounded-lg text-red-400 border border-red-500/30"><AlertTriangle className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-black text-red-400">1</div>
            <div className="text-red-400 text-xs mt-3 font-bold flex items-center gap-1">⚠ Vehicle maintenance due</div>
          </div>
        </div>

        {/* Two columns for Map and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main large area */}
          <div className="lg:col-span-2 glass-panel rounded-3xl border-white/10 shadow-2xl flex flex-col p-6 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-white">Active Fleet Live Tracker</h2>
              <button className="text-brand-500 text-sm font-bold hover:underline">Full Screen</button>
            </div>
            <div className="flex-1 bg-charcoal-900 rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden shadow-inner group transition-all">
               <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors" />
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
               <Map className="w-12 h-12 text-gray-600 group-hover:text-brand-500 mb-4 z-10 transition-colors" />
               <p className="text-gray-500 font-mono text-sm max-w-xs text-center z-10">
                 Map Integration module stands ready for API credentials.
                 <br/><br/>
                 Real-time tracking markers will populate here.
               </p>
            </div>
          </div>

          {/* Small area */}
          <div className="glass-panel rounded-3xl border-white/10 shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-white">Recent Bookings</h2>
            </div>
            <div className="flex flex-col gap-4">
              {[
                 { id: "TRP-8032", client: "MegaCorp", status: "In Progress", color: "text-brand-400 bg-brand-500/10 border-brand-500/30" },
                 { id: "TRP-8031", client: "Warehouse A", status: "Completed", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
                 { id: "TRP-8030", client: "Logistics Pro", status: "Billing", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
                 { id: "TRP-8029", client: "MegaCorp", status: "Paid", color: "text-gray-400 bg-gray-500/10 border-gray-500/30" },
              ].map((trip) => (
                 <div key={trip.id} className="flex items-center justify-between p-4 bg-charcoal-900 rounded-2xl border border-white/5 hover:border-brand-500/30 transition-all group shadow-sm hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] cursor-pointer">
                    <div>
                      <div className="font-mono text-xs text-gray-500 font-bold mb-1">{trip.id}</div>
                      <div className="font-bold text-sm text-white group-hover:text-brand-400 transition-colors">{trip.client}</div>
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${trip.color} border px-2.5 py-1 rounded-md`}>
                      {trip.status}
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { MapPin, Navigation, PhoneCall, CheckCircle2, Navigation2, AlertTriangle, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function DriverDashboard() {
  const [status, setStatus] = useState("Assigned");

  return (
    <div className="p-4 md:p-8 animate-fade-in flex flex-col gap-6 max-w-lg mx-auto">
      {/* Earnings & Toggle */}
      <div className="flex justify-between items-center bg-navy-800 p-4 rounded-xl border border-navy-700 shadow-md">
         <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Today's Earnings</div>
            <div className="text-2xl font-black text-white">₹1,850</div>
         </div>
         <div className="flex flex-col items-end">
            <div className="text-xs text-emerald-400 font-bold mb-2">Available for Duties</div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-emerald-500 checked:right-0 checked:border-emerald-500 transition-all duration-300 z-10" />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-emerald-500 cursor-pointer"></label>
            </div>
         </div>
      </div>

      <h2 className="text-lg font-bold mt-2">Current Active Trip</h2>

      {/* Active Trip Card */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl border border-gold/30 shadow-[0_0_30px_rgba(245,166,35,0.1)] overflow-hidden">
         <div className="p-5 flex flex-col gap-6">
            <div className="flex justify-between items-start">
               <div>
                  <div className="font-mono text-sm text-gold mb-1">TRP-8032</div>
                  <div className="font-bold text-lg text-white">MegaCorp Inc.</div>
                  <div className="text-sm text-gray-400">12 km total distance</div>
               </div>
               <div className="bg-navy-700 text-gold-300 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide border border-gold/20">
                  {status}
               </div>
            </div>

            <div className="flex flex-col gap-4 relative">
               <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-navy-600"></div>
               
               <div className="flex gap-4 items-start relative z-10">
                  <div className="w-6 h-6 rounded-full bg-navy-900 border-2 border-gold flex items-center justify-center mt-0.5">
                     <div className="w-2 h-2 rounded-full bg-gold"></div>
                  </div>
                  <div>
                     <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Pickup</div>
                     <div className="font-medium text-white text-sm">MegaCorp Warehouse, Sector 31</div>
                  </div>
               </div>

               <div className="flex gap-4 items-start relative z-10">
                  <div className="w-6 h-6 rounded-full bg-navy-900 border-2 border-emerald-500 flex items-center justify-center mt-0.5">
                  </div>
                  <div>
                     <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Drop</div>
                     <div className="font-medium text-white text-sm">Industrial Box, Phase 2, Noida</div>
                  </div>
               </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-navy-700/50">
               <a href="#" className="flex items-center gap-2 text-gold p-2 hover:bg-gold/10 rounded-lg transition-colors text-sm font-semibold">
                 <MessageSquare className="w-4 h-4" /> Trip Chat
               </a>
               <a href="tel:+917703976645" className="flex items-center gap-2 text-emerald-400 p-2 hover:bg-emerald-400/10 rounded-lg transition-colors text-sm font-semibold">
                 <PhoneCall className="w-4 h-4" /> Call Client
               </a>
            </div>
         </div>

         {/* Action Button */}
         {status === "Assigned" && (
            <div className="grid grid-cols-2">
              <button 
                onClick={() => setStatus("Heading to Pickup")}
                className="bg-gold text-navy-900 font-bold py-4 hover:bg-gold-400 transition-colors text-center">
                Accept Trip
              </button>
              <button className="bg-navy-950 text-red-400 font-bold py-4 hover:bg-red-400/10 transition-colors text-center border-t border-navy-800">
                Reject
              </button>
            </div>
         )}
         
         {status === "Heading to Pickup" && (
            <button 
              onClick={() => setStatus("In Progress")}
              className="w-full bg-blue-500 text-white font-bold py-4 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <Navigation2 className="w-5 h-5" /> Navigate to Pickup
            </button>
         )}

         {status === "In Progress" && (
            <button 
              onClick={() => setStatus("Completed")}
              className="w-full bg-emerald-500 text-navy-900 font-bold py-4 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Complete Delivery & POD
            </button>
         )}
      </div>

      <button className="flex items-center justify-center gap-2 w-full p-4 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/10 transition-colors mt-4 font-bold tracking-widest uppercase text-sm">
        <AlertTriangle className="w-5 h-5" /> SOS / Emergency
      </button>

      {/* Global CSS for the toggle input if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .toggle-checkbox:checked {
          right: 0;
          border-color: #10B981;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10B981;
        }
        .toggle-checkbox {
          right: 24px;
          border-color: #374151;
        }
        .toggle-label {
          background-color: #374151;
        }
      `}} />
    </div>
  );
}

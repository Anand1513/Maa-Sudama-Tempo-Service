import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

const DriverDashboard = () => {
  const [driverName, setDriverName] = useState("");
  const [tripsCount, setTripsCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchDriverStats = async () => {
      try {
        const { data: dData } = await supabase.from('drivers').select('full_name').limit(1).single();
        if (dData) setDriverName(dData.full_name);

        const { data: trips } = await supabase.from('trips').select('total_amount');
        if (trips && trips.length > 0) {
           setTripsCount(trips.length);
           setRevenue(trips.reduce((acc, trip) => acc + (Number(trip.total_amount) || 0), 0));
        }
      } catch (err) {}
    };
    fetchDriverStats();
  }, []);
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 md:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight mb-2">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {driverName}! Check your route assignments.</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available for Duty
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-xl font-medium text-foreground mb-6">Current Trip Assignment</h3>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center"><MapPin className="w-4 h-4"/></div>
                    <div className="w-0.5 h-12 bg-border my-1"></div>
                    <div className="w-8 h-8 rounded-full bg-secondary/80 text-secondary-foreground flex items-center justify-center"><MapPin className="w-4 h-4"/></div>
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold uppercase">Pickup</p>
                      <p className="font-medium text-foreground">Global Logistics Hub, Delhi</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold uppercase mt-4">Dropoff</p>
                      <p className="font-medium text-foreground">Tech Park, Gurugram</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-medium text-foreground mb-4">Earnings this Week</h3>
              <p className="text-4xl font-display font-bold text-foreground">₹{revenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 font-medium mt-2">+15% from last week</p>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-medium text-foreground mb-4">Vehicle Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Level</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Service</span>
                  <span className="font-medium">In 1,200 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Trip Assignments & Monthly Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Upcoming & Assigned Trips (Detailed View) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-display font-medium text-foreground mb-4">Assigned Trips & Documents</h3>
            
            <div className="bg-card p-6 rounded-2xl border border-border flex flex-col items-center justify-center py-10 opacity-60">
               <p className="text-muted-foreground">No trips assigned yet. Please wait for your next dispatch.</p>
            </div>
          </div>

          {/* Monthly Work Stats */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-medium text-foreground mb-4">Monthly Stats (Mar)</h3>
            
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
               <div>
                 <p className="text-muted-foreground text-sm mb-1">Total Trips</p>
                 <p className="text-2xl font-bold text-primary">{tripsCount}</p>
               </div>
               <div className="border-t border-border/50 pt-4">
                 <p className="text-muted-foreground text-sm mb-1">Total Distance</p>
                 <p className="text-2xl font-bold">1,850 <span className="text-lg text-muted-foreground font-normal">km</span></p>
               </div>
               <div className="border-t border-border/50 pt-4">
                 <p className="text-muted-foreground text-sm mb-1">Late Night Duties</p>
                 <p className="text-2xl font-bold text-yellow-600">3</p>
               </div>
               <div className="border-t border-border/50 pt-4 flex justify-between items-end">
                 <div>
                   <p className="text-muted-foreground text-sm mb-1">Leaves (Chutti)</p>
                   <p className="text-2xl font-bold text-red-500">2</p>
                 </div>
                 <button className="text-sm font-semibold text-primary underline underline-offset-2">Apply Leave</button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;

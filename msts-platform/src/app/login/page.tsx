"use client";

import Link from "next/link";
import { useState } from "react";
import { Truck, Briefcase } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"client" | "driver">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder auth
    setTimeout(() => {
      setLoading(false);
      alert(`${isLogin ? "Login" : "Registration"} placeholder reached for ${role}.`);
      window.location.href = role === "client" ? "/client" : "/driver";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-charcoal-950 text-white font-sans">
      {/* Left Decoration */}
      <div className="hidden lg:flex lg:w-1/2 bg-charcoal-900 border-r border-white/5 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-lg text-center">
          <Link href="/" className="inline-flex items-center justify-center p-4 glass-panel rounded-2xl mb-8 border border-white/10 shadow-2xl">
            <Truck className="w-12 h-12 text-brand-500" />
          </Link>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight drop-shadow-lg">MSTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">PLATFORM</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Secure tracking, booking, and operational access for Maa Sudama Tempo Service partners.
          </p>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <Link href="/" className="absolute top-8 left-8 text-sm font-bold text-gray-500 hover:text-brand-500 transition-colors">
          &larr; Back to Home
        </Link>
        <div className="w-full max-w-md glass-panel rounded-[2rem] border border-white/5 p-8 shadow-2xl">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? "Enter your credentials to access your dashboard." : "Register to start managing your logistics or drives."}
            </p>
          </div>

          <div className="flex bg-charcoal-900 p-1 rounded-xl mb-6 shadow-inner border border-white/5">
            <button 
              onClick={() => setRole("client")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${role === "client" ? "glass-panel text-brand-500 shadow-md border-white/10" : "text-gray-500 hover:text-gray-300"}`}>
              <Briefcase className="w-4 h-4" /> Client
            </button>
            <button 
              onClick={() => setRole("driver")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${role === "driver" ? "glass-panel text-brand-500 shadow-md border-white/10" : "text-gray-500 hover:text-gray-300"}`}>
              <Truck className="w-4 h-4" /> Driver
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
               <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                   {role === "client" ? "Company / Firm Name" : "Full Name"}
                 </label>
                 <input type="text" required className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 ring-brand-500 transition-all placeholder:text-gray-600" placeholder={role === "client" ? "MegaCorp Inc." : "Ramesh Kumar"} />
               </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email or Phone</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 ring-brand-500 transition-all placeholder:text-gray-600"
                placeholder={role === "client" ? "admin@company.com" : "+91 99999 99999"}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                Password
                {isLogin && <Link href="#" className="text-brand-500 hover:text-brand-400 hover:underline text-xs normal-case tracking-normal">Forgot?</Link>}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 ring-brand-500 transition-all placeholder:text-gray-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-brand-500 hover:bg-brand-600 text-charcoal-950 font-black py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-50 uppercase tracking-widest"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-brand-500 font-bold hover:underline">
              {isLogin ? "Create one" : "Sign in instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

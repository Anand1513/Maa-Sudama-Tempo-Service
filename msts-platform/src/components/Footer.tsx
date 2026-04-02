import Link from "next/link";
import { Truck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-white/5 py-12 mt-auto relative overflow-hidden text-white">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-brand-500 text-charcoal-950 p-2 rounded-xl group-hover:bg-brand-400 transition-colors">
                <Truck className="w-6 h-6" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">MSTS</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
              Maa Sudama Tempo Service.<br/>
              High-speed, cinematic logistics infrastructure designed for absolute accountability.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link href="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-brand-500 transition-colors">Our Services</Link></li>
              <li><Link href="/clients" className="hover:text-brand-500 transition-colors">Our Clients</Link></li>
              <li><Link href="#" className="hover:text-brand-500 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Portals</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link href="/login" className="hover:text-brand-500 transition-colors">Client Login</Link></li>
              <li><Link href="/login" className="hover:text-brand-500 transition-colors">Driver Login</Link></li>
              <li><Link href="/admin" className="hover:text-brand-500 transition-colors">Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>177, Block-B, Vinay Nagar</li>
              <li>Faridabad, Haryana – 121013</li>
              <li className="pt-2"><a href="tel:+917703976645" className="hover:text-white transition-colors">+91-7703976645</a></li>
              <li><a href="tel:+919313818431" className="hover:text-white transition-colors">+91-9313818431</a></li>
              <li className="pt-2"><a href="mailto:connect.msts@gmail.com" className="hover:text-white transition-colors font-mono text-xs">connect.msts@gmail.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-600">
          <p>© {new Date().getFullYear()} Maa Sudama Tempo Service. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

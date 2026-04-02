import Link from "next/link";
import { Home, List, Camera, User, LogOut } from "lucide-react";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-navy-900 text-white pb-20 md:pb-0">
      {/* Top Mobile Header */}
      <header className="h-16 bg-navy border-b border-navy-700 flex items-center justify-between px-4 sticky top-0 z-20">
         <div className="font-bold text-lg text-gold tracking-widest">MSTS DRIVER</div>
         <div className="flex items-center gap-2">
           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-sm font-medium text-emerald-400">Online</span>
         </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-navy overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-navy-800 border-t border-navy-700 flex justify-around items-center z-20 md:hidden pb-safe">
         <Link href="/driver" className="flex flex-col items-center gap-1 text-gold">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Home</span>
         </Link>
         <Link href="/driver/history" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
            <List className="w-6 h-6" />
            <span className="text-[10px] font-medium">Trips</span>
         </Link>
         <Link href="/driver/pod" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors relative">
            <div className="absolute -top-6 bg-gold text-navy-900 p-3 rounded-full border-4 border-navy border-solid shadow-lg">
               <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium mt-5">Scan</span>
         </Link>
         <Link href="/driver/profile" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">Profile</span>
         </Link>
      </nav>
    </div>
  );
}

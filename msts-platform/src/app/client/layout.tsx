import Link from "next/link";
import { PackageSearch, History, FileText, Settings, LogOut, Search } from "lucide-react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-navy-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-navy flex flex-col fixed inset-y-0 z-20 border-r border-gold/10">
        <div className="p-6">
          <h1 className="text-xl font-black text-white px-2">MSTS <span className="text-gold">CLIENT</span></h1>
          <div className="mt-4 px-3 py-2 bg-navy-800 rounded-lg border border-navy-700 font-mono text-sm text-gray-300">
             Org: MegaCorp Inc.
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <Link href="/client" className="flex items-center gap-3 px-4 py-3 bg-gold/10 text-gold rounded-lg font-medium transition-colors border border-gold/20">
            <PackageSearch className="w-5 h-5" /> Book a Trip
          </Link>
          <Link href="/client/trips" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-800 rounded-lg font-medium transition-colors">
            <History className="w-5 h-5" /> Trip History
          </Link>
          <Link href="/client/billing" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-800 rounded-lg font-medium transition-colors">
            <FileText className="w-5 h-5" /> Billing & Invoices
          </Link>
          <Link href="/client/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-800 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-navy-700">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen bg-navy flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-navy border-b border-navy-700/50 flex items-center justify-between px-8 z-10 sticky top-0">
           <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search Waybills..." 
                className="w-full bg-navy-800 border border-navy-700 rounded-full pl-10 pt-2 pb-2 text-sm focus:outline-none focus:border-gold transition-colors text-white" 
              />
           </div>
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold">
                Balance: ₹0.00
              </div>
           </div>
        </header>

        {/* Page content */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

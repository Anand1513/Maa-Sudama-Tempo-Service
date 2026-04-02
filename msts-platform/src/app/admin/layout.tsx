import Link from "next/link";
import { LayoutDashboard, Users, Truck, Map, FileText, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-navy-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-800 border-r border-navy-700 flex flex-col fixed inset-y-0 z-20 shadow-2xl">
        <div className="p-6 border-b border-navy-700">
          <h1 className="text-xl font-black text-gold tracking-tight">MSTS ADMIN</h1>
          <p className="text-xs text-none text-gray-400 mt-1 uppercase tracking-widest">Super Admin</p>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-gold/10 text-gold rounded-lg font-medium transition-colors border border-gold/20">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Sub-Admins & Clients
          </Link>
          <Link href="/admin/fleet" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg font-medium transition-colors">
            <Truck className="w-5 h-5" /> Fleet Management
          </Link>
          <Link href="/admin/map" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg font-medium transition-colors">
            <Map className="w-5 h-5" /> Map Control Panel
          </Link>
          <Link href="/admin/billing" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg font-medium transition-colors">
            <FileText className="w-5 h-5" /> Billing & Invoices
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-navy-700">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content padding-left to clear the fixed sidebar */}
      <main className="flex-1 ml-64 min-h-screen bg-navy flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-navy-800 border-b border-navy-700 flex items-center justify-between px-8 z-10 sticky top-0">
           <div className="text-gray-400 text-sm">Dashboard Overview</div>
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center text-sm font-bold border border-navy-500">
                KM
              </div>
           </div>
        </header>

        {/* Page children wrapper */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

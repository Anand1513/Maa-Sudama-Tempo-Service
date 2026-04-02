import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LogOut, Users, UserCog, Briefcase, Plus, Trash2, FileText,
  ShieldAlert, ArrowLeft, Upload, DollarSign, CheckCircle2, Clock, CalendarDays
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Mock Data Types
type AdminUser = { id?: string; email?: string; role: string; name: string; permissions?: string[] };
type ClientData = { id: string; name: string; trips: number; status: string; vehicles: string[] };
type DriverData = { id: string; name: string; vehicle: string; vehicleNo: string; status: string; tripsMonth: number; leaves: number };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Detailed View States
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(null);
  const [historyMonths, setHistoryMonths] = useState(1);

  // Real State for Entities
  const [clients, setClients] = useState<ClientData[]>([]);
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [subadmins, setSubadmins] = useState<AdminUser[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);

  const [newVal, setNewVal] = useState("");
  const [subForm, setSubForm] = useState({ name: "", email: "", pass: "", drivers: false, clients: false, billing: false });

  // Bill History State
  const [clientBills, setClientBills] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [billPeriod, setBillPeriod] = useState('');
  const [billFile, setBillFile] = useState<File | null>(null);
  const [billType, setBillType] = useState<'dummy' | 'gst' | 'ledger'>('dummy');
  const [ledgerPeriod, setLedgerPeriod] = useState('');
  const [ledgerFile, setLedgerFile] = useState<File | null>(null);

  const uploadNewBill = async (file: File, clientId: string, type: 'dummy' | 'gst' | 'ledger', period: string) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const timestamp = Date.now();
      const path = `${clientId}/${type}/${timestamp}_${period.replace(/\s+/g, '_')}.${ext}`;
      const { error: upError } = await supabase.storage.from('bills').upload(path, file, { upsert: false });
      if (upError) { toast.error(`Upload failed: ${upError.message}`); throw upError; }
      const { data: urlData } = supabase.storage.from('bills').getPublicUrl(path);
      const { error: dbError } = await supabase.from('bills').insert({
        client_id: clientId, bill_type: type, billing_period: period,
        file_url: urlData.publicUrl, file_name: file.name
      });
      if (dbError) { toast.error(`DB save failed: ${dbError.message}`); throw dbError; }
      // Reload bills list
      await fetchClientBills(clientId);
    } finally {
      setUploading(false);
    }
  };

  const fetchClientBills = async (clientId: string) => {
    const { data } = await supabase.from('bills').select('*').eq('client_id', clientId).order('uploaded_at', { ascending: false });
    if (data) setClientBills(data);
  };

  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (!userData) {
      navigate("/admin");
    } else {
      setUser(JSON.parse(userData));
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const { data: clientsRes } = await supabase.from('clients').select('*');
      const { data: driversRes } = await supabase.from('drivers').select('*');
      const { data: profilesRes } = await supabase.from('profiles').select('*').eq('role', 'SUBADMIN');
      const { data: pendingRes } = await supabase.from('profiles').select('*').eq('approval_status', 'pending_approval');

      if (clientsRes) {
        setClients(clientsRes.map(c => ({
          id: c.id, name: c.company_name, trips: 0, status: c.status === 'active' ? 'Active' : 'Inactive', vehicles: []
        })));
      }

      if (driversRes) {
        setDrivers(driversRes.map(d => ({
          id: d.id, name: d.full_name, vehicle: "Unassigned", vehicleNo: d.license_number || "N/A", status: d.status === 'available' ? 'Available' : 'On Trip', tripsMonth: 0, leaves: 0
        })));
      }

      if (profilesRes) {
        setSubadmins(profilesRes.map(p => ({
          id: p.id, name: p.full_name, email: p.email || 'N/A', role: 'subadmin', permissions: ['manage_drivers', 'manage_clients']
        })));
      }

      if (pendingRes) {
        setPendingUsers(pendingRes.map(p => ({
          id: p.id, name: p.full_name, role: p.role, email: p.email || p.phone || 'N/A', company: p.company_name || 'N/A', invited_client_id: p.invited_client_id
        })));
      }
    } catch (err) {
      console.error("Dashboard DB fetch error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  const isSuperadmin = user?.role === "superadmin";
  const canManageDrivers = isSuperadmin || user?.permissions?.includes("manage_drivers");
  const canManageClients = isSuperadmin || user?.permissions?.includes("manage_clients");

  // --- Sub-Components for Detailed Views ---

  // Load bill history from DB whenever a client is selected
  useEffect(() => {
    if (!selectedClient?.id) return;
    fetchClientBills(selectedClient.id);
  }, [selectedClient?.id]);

  const renderClientDetail = () => {
    return (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4 gap-2" onClick={() => setSelectedClient(null)}>
        <ArrowLeft className="w-4 h-4" /> Back to Clients
      </Button>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{selectedClient?.name}</h2>
          <p className="text-muted-foreground">ID: {selectedClient?.id} | Status: <span className="text-green-500">{selectedClient?.status}</span></p>
        </div>
        <Button variant="outline" onClick={() => setClients(clients.map(c => c.id === selectedClient?.id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c))}>
          Toggle Status
        </Button>
      </div>

      {/* Activity Card */}
      <div className="glass-card p-6 rounded-xl border-primary/20">
         <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Activity This Month</h3>
         <p className="text-3xl font-bold text-primary mb-2">{selectedClient?.trips} Trips</p>
         <p className="text-sm text-muted-foreground mb-4">Assigned Vehicles: {selectedClient?.vehicles.join(", ") || 'None assigned'}</p>
         <div className="flex gap-2">
           <Button variant="outline" size="sm" onClick={() => {
              const c = {...selectedClient!, trips: selectedClient!.trips + 1};
              setSelectedClient(c); setClients(clients.map(x => x.id === c.id ? c : x));
           }}><Plus className="w-4 h-4 mr-1"/> Add Trip</Button>
           <Button variant="outline" size="sm" onClick={() => {
              const c = {...selectedClient!, trips: Math.max(0, selectedClient!.trips - 1)};
              setSelectedClient(c); setClients(clients.map(x => x.id === c.id ? c : x));
           }}>- Reduce Trip</Button>
         </div>
      </div>

      {/* Billing History */}
      <div className="glass-card p-6 rounded-xl border-primary/20">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary"/> Bill History & Upload</h3>

        {/* Upload New Bill */}
        <div className="bg-secondary/30 rounded-xl p-4 mb-6 border border-border">
          <p className="font-bold text-sm mb-3">Upload New Bill / Ledger</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Bill Type</label>
              <select value={billType} onChange={e => setBillType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="dummy">Dummy Bill (Pre-GST)</option>
                <option value="gst">Final GST Invoice</option>
                <option value="ledger">Account Ledger</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                {billType === 'ledger' ? 'Period (e.g. Jan-Jun 2025 / FY 2024-25)' : 'Billing Month (e.g. April 2025)'}
              </label>
              <input type="text"
                placeholder={billType === 'ledger' ? 'Jan-Jun 2025' : 'April 2025'}
                value={billPeriod}
                onChange={e => setBillPeriod(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Choose File</label>
              <input type="file" accept=".pdf,.xlsx,.xls,.png,.jpg"
                className="text-sm text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-semibold hover:file:bg-primary/20 cursor-pointer w-full"
                onChange={e => setBillFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button
              className="gap-2 w-full"
              disabled={!billFile || !billPeriod.trim() || uploading}
              onClick={async () => {
                if (billFile && selectedClient && billPeriod.trim()) {
                  await uploadNewBill(billFile, selectedClient.id, billType, billPeriod.trim());
                  setBillFile(null); setBillPeriod('');
                  toast.success(`${billType === 'dummy' ? 'Dummy bill' : billType === 'gst' ? 'GST bill' : 'Ledger'} for "${billPeriod}" uploaded!`);
                }
              }}
            ><Upload className="w-4 h-4"/> {uploading ? 'Uploading...' : 'Upload'}</Button>
          </div>
        </div>

        {/* Bills History Table */}
        {clientBills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground"><Upload className="w-8 h-8 mx-auto mb-2 opacity-20"/><p>No bills uploaded yet for this client.</p></div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Billing Period</th>
                  <th className="text-left px-4 py-3 font-semibold">File</th>
                  <th className="text-left px-4 py-3 font-semibold">Client Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Uploaded</th>
                  <th className="text-center px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientBills.map((bill, idx) => (
                  <tr key={bill.id} className={`border-t border-border ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        bill.bill_type === 'dummy' ? 'bg-yellow-100 text-yellow-700' :
                        bill.bill_type === 'gst' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'}`}>
                        {bill.bill_type === 'dummy' ? 'Dummy' : bill.bill_type === 'gst' ? 'GST' : 'Ledger'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{bill.billing_period}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-[180px]">{bill.file_name}</td>
                    <td className="px-4 py-3">
                      {bill.bill_type === 'dummy' ? (
                        bill.approved_by_client
                          ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">✓ Client Approved</span>
                          : <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">⏳ Pending</span>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(bill.uploaded_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3 text-center">
                      <a href={bill.file_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="gap-1 text-xs"><FileText className="w-3 h-3"/> View</Button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderDriverDetail = () => (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4 gap-2" onClick={() => setSelectedDriver(null)}>
        <ArrowLeft className="w-4 h-4" /> Back to Drivers
      </Button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{selectedDriver?.name}</h2>
          <p className="text-muted-foreground">Vehicle: {selectedDriver?.vehicle} ({selectedDriver?.vehicleNo})</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className={selectedDriver?.status === "Available" ? "bg-green-500/20 text-green-500" : ""} onClick={() => {
            const d = {...selectedDriver!, status: "Available"};
            setSelectedDriver(d); setDrivers(drivers.map(x => x.id === d.id ? d : x));
          }}>Available</Button>
          <Button variant="outline" className={selectedDriver?.status === "On Trip" ? "bg-yellow-500/20 text-yellow-500" : ""} onClick={() => {
             const d = {...selectedDriver!, status: "On Trip"};
             setSelectedDriver(d); setDrivers(drivers.map(x => x.id === d.id ? d : x));
          }}>On Trip</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl border-primary/20">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-lg flex items-center gap-2"><Clock className="w-5 h-5 text-primary"/> Trip History</h3>
             <select 
               className="bg-secondary text-sm p-1 rounded border border-border/50"
               value={historyMonths}
               onChange={(e) => setHistoryMonths(Number(e.target.value))}
             >
               {[1,2,3,4,5,6].map(m => <option key={m} value={m}>Last {m} Month{m>1?'s':''}</option>)}
             </select>
           </div>
           
           <div className="bg-secondary/30 p-4 rounded-lg border border-border/50 mb-4">
             <p className="text-3xl font-bold text-primary mb-1">{selectedDriver!.tripsMonth * historyMonths}</p>
             <p className="text-sm text-muted-foreground">Locations visited: NCR, Gurugram, Noida, Faridabad</p>
           </div>
           
           <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
             <p className="text-sm font-bold flex items-center gap-2 text-red-400 mb-1"><CalendarDays className="w-4 h-4" /> Leaves Taken (Chutti)</p>
             <p className="text-2xl font-bold">{selectedDriver!.leaves * historyMonths} Days</p>
           </div>
        </div>

        <div className="glass-card p-6 rounded-xl border-primary/20">
           <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary"/> Duty & Charges</h3>
           <div className="space-y-3">
             <div className="flex justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
               <span className="text-muted-foreground">Day Time Duty</span>
               <span className="font-bold">200 Hrs</span>
             </div>
             <div className="flex justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
               <span className="text-muted-foreground">Late Night Charge</span>
               <span className="font-bold text-yellow-500">₹1,500</span>
             </div>
             <div className="flex justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
               <span className="text-muted-foreground">Waiting Charge</span>
               <span className="font-bold text-yellow-500">₹800</span>
             </div>
             <div className="flex justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
               <span className="text-muted-foreground">On-Time Bonus</span>
               <span className="font-bold text-green-500">₹500</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary/30 border-r border-border/50 p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" /> MSTS Admin
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Role: {user?.role.toUpperCase()}</p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <Button variant={activeTab === "overview" && !selectedClient && !selectedDriver ? "default" : "ghost"} className="justify-start"
            onClick={() => { setActiveTab("overview"); setSelectedClient(null); setSelectedDriver(null); }}>
            <Briefcase className="w-4 h-4 mr-2" /> Overview
          </Button>

          {canManageClients && (
            <Button variant={activeTab === "clients" ? "default" : "ghost"} className="justify-start"
              onClick={() => { setActiveTab("clients"); setSelectedClient(null); setSelectedDriver(null); }}>
              <Users className="w-4 h-4 mr-2" /> Manage Clients
            </Button>
          )}

          {canManageDrivers && (
            <Button variant={activeTab === "drivers" ? "default" : "ghost"} className="justify-start"
              onClick={() => { setActiveTab("drivers"); setSelectedClient(null); setSelectedDriver(null); }}>
              <UserCog className="w-4 h-4 mr-2" /> Manage Drivers
            </Button>
          )}

          {isSuperadmin && (
            <Button variant={activeTab === "approvals" ? "default" : "ghost"} className="justify-start group"
              onClick={() => { setActiveTab("approvals"); setSelectedClient(null); setSelectedDriver(null); }}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Pending Approvals
              {pendingUsers.length > 0 && (
                <span className="ml-auto bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] text-white font-bold shadow-md shadow-yellow-500/20 group-hover:bg-yellow-400">
                  {pendingUsers.length}
                </span>
              )}
            </Button>
          )}

          {isSuperadmin && (
            <Button variant={activeTab === "subadmins" ? "default" : "ghost"} className="justify-start"
              onClick={() => { setActiveTab("subadmins"); setSelectedClient(null); setSelectedDriver(null); }}>
              <ShieldAlert className="w-4 h-4 mr-2" /> Manage Roles
            </Button>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-border/50">
          <Button variant="destructive" className="w-full justify-start mt-4" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {selectedClient ? renderClientDetail() : selectedDriver ? renderDriverDetail() : (
          <>
            <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab.replace('_', ' ')} Panel</h1>

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl border border-primary/20">
                  <h3 className="text-muted-foreground text-sm font-medium">Total Clients</h3>
                  <p className="text-4xl font-bold text-primary mt-2">{clients.length}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-primary/20">
                  <h3 className="text-muted-foreground text-sm font-medium">Active Drivers</h3>
                  <p className="text-4xl font-bold text-primary mt-2">{drivers.length}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-primary/20">
                  <h3 className="text-muted-foreground text-sm font-medium">Total Trips</h3>
                  <p className="text-4xl font-bold text-primary mt-2">4,130+</p>
                </div>
              </div>
            )}

            {/* Clients Module */}
            {activeTab === "clients" && canManageClients && (
              <div className="space-y-6">
                <div className="flex gap-4 mb-6">
                  <Input placeholder="New Client Name..." value={newVal} onChange={(e) => setNewVal(e.target.value)} className="max-w-xs bg-secondary/50" />
                  <Button onClick={async () => {
                    if(!newVal) return;
                    const { data, error } = await supabase.from('clients').insert([{ company_name: newVal, contact_person: 'Admin', phone: '0000000000' }]).select();
                    if(error) { toast.error("Failed to add client"); return; }
                    if(data) {
                      setClients([...clients, { id: data[0].id, name: data[0].company_name, trips: 0, status: "Active", vehicles: [] }]);
                      toast.success("Client Added!");
                    }
                    setNewVal("");
                  }} className="gap-2"><Plus className="w-4 h-4" /> Add Client</Button>
                </div>
                <div className="bg-secondary/20 rounded-xl border border-border/50 overflow-hidden">
                  <table className="w-full text-left table-auto">
                    <thead className="bg-secondary/60">
                      <tr>
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Trips/Mo</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(c => (
                        <tr key={c.id} className="border-t border-border/30 hover:bg-white/5 cursor-pointer" onClick={() => setSelectedClient(c)}>
                          <td className="p-4">{c.id}</td>
                          <td className="p-4 font-bold text-primary hover:underline">{c.name}</td>
                          <td className="p-4 text-muted-foreground">{c.trips}</td>
                          <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${c.status === 'Active' ? 'text-green-500 bg-green-500/10' : 'text-gray-500 bg-gray-500/10'}`}>{c.status}</span></td>
                          <td className="p-4" onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={async () => {
                                await supabase.from('clients').delete().eq('id', c.id);
                                setClients(clients.filter(client => client.id !== c.id));
                                toast.success("Client deleted");
                              }}><Trash2 className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Drivers Module */}
            {activeTab === "drivers" && canManageDrivers && (
              <div className="space-y-6">
                <div className="flex gap-4 mb-6">
                  <Input placeholder="Driver Name..." value={newVal} onChange={(e) => setNewVal(e.target.value)} className="max-w-xs bg-secondary/50" />
                  <Button onClick={async () => {
                    if(!newVal) return;
                    const { data, error } = await supabase.from('drivers').insert([{ full_name: newVal, phone: '0000000000', license_number: `LIC-${Date.now()}` }]).select();
                    if(error) { toast.error("Failed to add driver"); return; }
                    if(data) {
                      setDrivers([...drivers, { id: data[0].id, name: data[0].full_name, vehicle: "Unassigned", vehicleNo: data[0].license_number, status: "Available", tripsMonth: 0, leaves: 0 }]);
                      toast.success("Driver Added!");
                    }
                    setNewVal("");
                  }} className="gap-2"><Plus className="w-4 h-4" /> Add Driver</Button>
                </div>
                <div className="bg-secondary/20 rounded-xl border border-border/50 overflow-hidden">
                  <table className="w-full text-left table-auto">
                    <thead className="bg-secondary/60">
                      <tr>
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Driver Name</th>
                        <th className="p-4 font-medium">Vehicle</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.map(d => (
                        <tr key={d.id} className="border-t border-border/30 hover:bg-white/5 cursor-pointer" onClick={() => setSelectedDriver(d)}>
                          <td className="p-4">{d.id}</td>
                          <td className="p-4 font-bold text-primary hover:underline">{d.name}</td>
                          <td className="p-4 text-muted-foreground">{d.vehicle} ({d.vehicleNo})</td>
                          <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${d.status === 'Available' ? 'text-green-500 bg-green-500/10' : 'text-yellow-500 bg-yellow-500/10'}`}>{d.status}</span></td>
                          <td className="p-4" onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={async () => {
                                await supabase.from('drivers').delete().eq('id', d.id);
                                setDrivers(drivers.filter(driver => driver.id !== d.id));
                                toast.success("Driver deleted");
                              }}><Trash2 className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-Admin Module */}
            {activeTab === "subadmins" && isSuperadmin && (
              <div className="space-y-8">
                <div className="glass-card p-6 rounded-2xl border-primary/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-primary"/> Create Sub-Admin</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Name (e.g., Rajesh)" value={subForm.name} onChange={(e) => setSubForm({...subForm, name: e.target.value})} className="bg-secondary/50" />
                    <Input placeholder="Email ID" type="email" value={subForm.email} onChange={(e) => setSubForm({...subForm, email: e.target.value})} className="bg-secondary/50" />
                    <Input placeholder="Password" type="password" value={subForm.pass} onChange={(e) => setSubForm({...subForm, pass: e.target.value})} className="bg-secondary/50" />
                  </div>
                  <div className="mb-6 space-y-2">
                    <label className="text-sm font-medium text-muted-foreground block mb-2">Assign Permissions:</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={subForm.drivers} onChange={(e) => setSubForm({...subForm, drivers: e.target.checked})} /> Manage Drivers</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={subForm.clients} onChange={(e) => setSubForm({...subForm, clients: e.target.checked})} /> Manage Clients</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={subForm.billing} onChange={(e) => setSubForm({...subForm, billing: e.target.checked})} /> Billing & Ledger Access</label>
                  </div>
                  <Button className="gap-2" onClick={() => {
                    const perms = [];
                    if(subForm.drivers) perms.push("manage_drivers");
                    if(subForm.clients) perms.push("manage_clients");
                    if(subForm.billing) perms.push("manage_billing");
                    if(subForm.name && subForm.email) {
                      setSubadmins([...subadmins, { id: `A00${subadmins.length+2}`, name: subForm.name, email: subForm.email, role: "subadmin", permissions: perms}]);
                      setSubForm({ name: "", email: "", pass: "", drivers: false, clients: false, billing: false });
                    }
                  }}>Create Role</Button>
                </div>

                <div className="bg-secondary/20 rounded-xl border border-border/50 overflow-hidden">
                  <table className="w-full text-left table-auto">
                    <thead className="bg-secondary/60">
                      <tr>
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Permissions</th>
                        <th className="p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subadmins.map(a => (
                        <tr key={a.id} className="border-t border-border/30">
                          <td className="p-4">{a.id}</td>
                          <td className="p-4 font-bold">{a.name}</td>
                          <td className="p-4 text-muted-foreground">{a.email}</td>
                          <td className="p-4 text-xs font-mono text-primary">{a.permissions?.join(", ")}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={() => setSubadmins(subadmins.filter(x => x.id !== a.id))}><Trash2 className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Approvals Module */}
            {activeTab === "approvals" && isSuperadmin && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-yellow-500"/> Pending Registrations</h3>
                </div>
                {pendingUsers.length === 0 ? (
                  <div className="text-center p-12 glass-card rounded-2xl border-dashed border-2">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-foreground">No pending approvals</h3>
                    <p className="text-muted-foreground text-sm mt-1">All new users have been processed.</p>
                  </div>
                ) : (
                  <div className="bg-secondary/20 rounded-xl border border-border/50 overflow-hidden">
                    <table className="w-full text-left table-auto">
                      <thead className="bg-secondary/60">
                        <tr>
                          <th className="p-4 font-medium">Name</th>
                          <th className="p-4 font-medium">Email/Contact</th>
                          <th className="p-4 font-medium">Role</th>
                          <th className="p-4 font-medium">Extra Info</th>
                          <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingUsers.map(p => (
                          <tr key={p.id} className="border-t border-border/30 hover:bg-white/5">
                            <td className="p-4 font-bold">{p.name}</td>
                            <td className="p-4 text-muted-foreground">{p.email}</td>
                            <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-semibold ${p.role === 'DRIVER' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>{p.role}</span></td>
                            <td className="p-4 text-sm text-muted-foreground">{p.invited_client_id ? <span className="text-yellow-500 font-bold">Team Invite Request</span> : (p.company !== 'N/A' ? `Company: ${p.company}` : '-')}</td>
                            <td className="p-4 flex gap-2 justify-end">
                              <Button size="sm" className="bg-green-600 hover:bg-green-500" onClick={async () => {
                                // Approve Flow
                                // Check if it's a Team Member Invite
                                if (p.invited_client_id) {
                                  const { error } = await supabase.from('profiles').update({ 
                                    approval_status: 'approved',
                                    client_id: p.invited_client_id
                                  }).eq('id', p.id);
                                  if (error) { toast.error("Failed to approve team member"); return; }
                                  
                                  setPendingUsers(pendingUsers.filter(u => u.id !== p.id));
                                  toast.success("Team member approved & linked to company!");
                                  return;
                                }

                                // Normal Flow: Create new Client/Driver Company
                                const { error } = await supabase.from('profiles').update({ approval_status: 'approved' }).eq('id', p.id);
                                if (error) { toast.error("Failed to approve"); return; }
                                
                                // Moving to active arrays and actual DB inserts
                                if (p.role === 'CLIENT') {
                                   const newC = { id: p.id, name: p.company || p.name, trips: 0, status: "Active", vehicles: [] };
                                   await supabase.from('clients').insert([{ id: p.id, profile_id: p.id, company_name: p.company || p.name, contact_person: p.name, phone: p.email }]);
                                   
                                   // Update the profile to point to this new client as well (so the owner is technically part of the team too)
                                   await supabase.from('profiles').update({ client_id: p.id }).eq('id', p.id);
                                   
                                   setClients([...clients, newC]);
                                } else if (p.role === 'DRIVER') {
                                   // In a real app we'd get license from metadata during register, but hardcoded here for demo
                                   const randoLicense = `DL-${Date.now().toString().slice(-6)}`;
                                   const newD = { id: p.id, name: p.name, vehicle: "Unassigned", vehicleNo: randoLicense, status: "Available", tripsMonth: 0, leaves: 0 };
                                   await supabase.from('drivers').insert([{ id: p.id, profile_id: p.id, full_name: p.name, phone: p.email, license_number: randoLicense }]);
                                   setDrivers([...drivers, newD]);
                                }
                                setPendingUsers(pendingUsers.filter(u => u.id !== p.id));
                                toast.success("User Approved & Moved to Live Systems");
                              }}>Approve</Button>
                              <Button size="sm" variant="destructive" onClick={async () => {
                                // Reject Flow
                                await supabase.from('profiles').update({ approval_status: 'rejected' }).eq('id', p.id);
                                setPendingUsers(pendingUsers.filter(u => u.id !== p.id));
                                toast.success("User Rejected");
                              }}>Reject</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

import { Download, MessageCircle, Phone, FileText, IndianRupee, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Empty initial state — data loads from Supabase
const mockTripsData: any[] = [];
const pendingBills: any[] = [];
const finalizedBills: any[] = [];

const ClientDashboard = () => {
  const [tripsList, setTripsList] = useState(mockTripsData);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [myClientId, setMyClientId] = useState<string | null>(null);
  const [billsList, setBillsList] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState<string>("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await supabase.from('trips').select(`
          id, ref_number, trip_date, origin_address, destination_address, total_amount,
          vehicles(registration_number),
          drivers(full_name)
        `);
        
        if (data && data.length > 0) {
          setTripsList(data.map((t: any) => ({
            id: t.ref_number || t.id.substring(0,8),
            date: new Date(t.trip_date).toLocaleDateString(),
            vehicleNo: t.vehicles?.registration_number || 'Pending',
            driverName: t.drivers?.full_name || 'Unassigned',
            startTime: '09:00 AM',
            dropTime: '05:00 PM',
            kmDriven: '---',
            waitTime: '0 mins',
            fare: `₹${t.total_amount || 0}`
          })));
        }
      } catch (err) {
        console.error("Failed to fetch client trips", err);
      }
    };

    const fetchTeam = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) return;
        const userId = authData.user.id;
        
        const { data: profile } = await supabase.from('profiles').select('client_id').eq('id', userId).single();
        let finalClientId = profile?.client_id;
        
        // Strategy 1: Auto-repair — look up via profile_id FK
        if (!finalClientId) {
          const { data: legacyClient } = await supabase.from('clients').select('id').eq('profile_id', userId).maybeSingle();
          if (legacyClient) {
            finalClientId = legacyClient.id;
            await supabase.from('profiles').update({ client_id: finalClientId }).eq('id', userId);
          }
        }

        // Strategy 2: Direct match — since client.id == user.id for owners
        if (!finalClientId) {
          const { data: directClient } = await supabase.from('clients').select('id').eq('id', userId).maybeSingle();
          if (directClient) {
            finalClientId = directClient.id;
            await supabase.from('profiles').update({ client_id: finalClientId }).eq('id', userId);
          }
        }

        console.log('[ClientDashboard] Resolved client_id:', finalClientId);

        if (finalClientId) {
          setMyClientId(finalClientId);

          // Fetch team members
          const { data: teamMembers } = await supabase.from('profiles').select('*').eq('client_id', finalClientId);
          if (teamMembers) setTeamList(teamMembers);

          // Fetch all bills from bills table
          const { data: billsData } = await supabase
            .from('bills')
            .select('*')
            .eq('client_id', finalClientId)
            .order('uploaded_at', { ascending: false });
          if (billsData) setBillsList(billsData);

          // Fetch company name
          const { data: clientData } = await supabase
            .from('clients')
            .select('company_name')
            .eq('id', finalClientId)
            .single();
          if (clientData?.company_name) setCompanyName(clientData.company_name);
        } else {
          console.warn('[ClientDashboard] No client_id resolved for user:', userId);
        }
      } catch (err) {
        console.error("Failed to fetch team data", err);
      }
    };

    fetchTrips();
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      <Navbar />
      <div className="pt-24 container mx-auto px-4 md:px-8">
        <div className="mb-8">
          {companyName && (
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-bold text-primary tracking-wide">{companyName}</span>
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight mb-2">
            Client Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your trips, verify pre-bills, and track GST invoices.</p>
        </div>

        <Tabs defaultValue="trips" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-3 p-1 bg-secondary rounded-xl">
            <TabsTrigger value="trips" className="text-base rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Trip History</TabsTrigger>
            <TabsTrigger value="billing" className="text-base rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Billing & Invoices</TabsTrigger>
            <TabsTrigger value="team" className="text-base rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Manage Team</TabsTrigger>
          </TabsList>

          {/* TRIPS TAB */}
          <TabsContent value="trips" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center mb-4 bg-card p-4 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-medium flex items-center gap-2">
                Recent Trips Filter
              </h2>
              <select className="px-4 py-2 border border-border rounded-lg bg-background font-medium hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Last 1 Month</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
              </select>
            </div>
            
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="font-semibold px-6 py-4">Date</TableHead>
                      <TableHead className="font-semibold">Vehicle & Driver</TableHead>
                      <TableHead className="font-semibold">Time (Start - Drop)</TableHead>
                      <TableHead className="font-semibold">KM Driven</TableHead>
                      <TableHead className="font-semibold">Wait Time</TableHead>
                      <TableHead className="font-semibold text-right px-6">Est. Fare</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tripsList.map((trip) => (
                      <TableRow key={trip.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium whitespace-nowrap px-6 py-4">{trip.date}</TableCell>
                        <TableCell>
                          <div className="font-semibold text-foreground">{trip.vehicleNo}</div>
                          <div className="text-xs text-muted-foreground">{trip.driverName}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-muted-foreground">
                          {trip.startTime} &rarr; {trip.dropTime}
                        </TableCell>
                        <TableCell className="font-medium">{trip.kmDriven}</TableCell>
                        <TableCell className="font-medium">{trip.waitTime}</TableCell>
                        <TableCell className="text-right font-bold text-primary px-6">{trip.fare}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* BILLING TAB */}
          <TabsContent value="billing" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <div className="mb-2">
              <h2 className="text-xl font-bold font-display">Billing History</h2>
              <p className="text-muted-foreground text-sm">All your dummy bills, GST invoices and account ledgers from MSTS Admin.</p>
            </div>

            {/* Filter tabs by type */}
            {['All', 'Dummy', 'GST', 'Ledger'].map(filter => {
              const filtered = billsList.filter(b => 
                filter === 'All' ? true :
                filter === 'Dummy' ? b.bill_type === 'dummy' :
                filter === 'GST' ? b.bill_type === 'gst' : b.bill_type === 'ledger'
              );
              return null; // rendered below
            })}

            {billsList.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
                <p className="font-bold text-muted-foreground">No bills uploaded yet</p>
                <p className="text-sm text-muted-foreground mt-1">MSTS Admin will upload your bills here each month.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Dummy Bills */}
                {billsList.filter(b => b.bill_type === 'dummy').length > 0 && (
                  <div>
                    <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Dummy Bills (Pre-GST Drafts)
                    </h3>
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                      {billsList.filter(b => b.bill_type === 'dummy').map((bill, idx) => (
                        <div key={bill.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 ${idx > 0 ? 'border-t border-border' : ''}`}>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg"><FileText className="w-5 h-5 text-yellow-700" /></div>
                            <div>
                              <p className="font-bold text-sm">{bill.billing_period}</p>
                              <p className="text-xs text-muted-foreground">{bill.file_name} · {new Date(bill.uploaded_at).toLocaleDateString('en-IN')}</p>
                            </div>
                            {bill.approved_by_client 
                              ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">✓ You approved</span>
                              : <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">⏳ Pending your approval</span>}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <a href={bill.file_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="gap-1"><FileText className="w-3 h-3"/> View</Button>
                            </a>
                            <a href={bill.file_url} download><Button size="sm" className="gap-1"><Download className="w-3 h-3"/> Download</Button></a>
                            {!bill.approved_by_client && (
                              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-400 text-white gap-1"
                                onClick={async () => {
                                  await supabase.from('bills').update({ approved_by_client: true }).eq('id', bill.id);
                                  setBillsList(prev => prev.map(b => b.id === bill.id ? { ...b, approved_by_client: true } : b));
                                  toast.success('Bill approved! Admin will generate your GST invoice.');
                                }}
                              >✓ Approve</Button>
                            )}
                            <a href={`https://wa.me/917703976645?text=Hi! I have a doubt regarding my dummy bill for ${bill.billing_period}.`} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="gap-1 text-green-600 border-green-200"><MessageCircle className="w-3 h-3"/> Doubt</Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GST Bills */}
                {billsList.filter(b => b.bill_type === 'gst').length > 0 && (
                  <div>
                    <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span> GST Invoices
                    </h3>
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                      {billsList.filter(b => b.bill_type === 'gst').map((bill, idx) => (
                        <div key={bill.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 ${idx > 0 ? 'border-t border-border' : ''}`}>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg"><IndianRupee className="w-5 h-5 text-green-700" /></div>
                            <div>
                              <p className="font-bold text-sm">{bill.billing_period}</p>
                              <p className="text-xs text-muted-foreground">{bill.file_name} · {new Date(bill.uploaded_at).toLocaleDateString('en-IN')}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a href={bill.file_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="gap-1"><FileText className="w-3 h-3"/> View</Button>
                            </a>
                            <a href={bill.file_url} download><Button size="sm" className="gap-1 bg-green-600 hover:bg-green-500"><Download className="w-3 h-3"/> Download</Button></a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ledgers */}
                {billsList.filter(b => b.bill_type === 'ledger').length > 0 && (
                  <div>
                    <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span> Account Ledgers
                    </h3>
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                      {billsList.filter(b => b.bill_type === 'ledger').map((bill, idx) => (
                        <div key={bill.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 ${idx > 0 ? 'border-t border-border' : ''}`}>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg"><FileText className="w-5 h-5 text-blue-700" /></div>
                            <div>
                              <p className="font-bold text-sm">{bill.billing_period}</p>
                              <p className="text-xs text-muted-foreground">{bill.file_name} · {new Date(bill.uploaded_at).toLocaleDateString('en-IN')}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a href={bill.file_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="gap-1"><FileText className="w-3 h-3"/> View</Button>
                            </a>
                            <a href={bill.file_url} download><Button size="sm" className="gap-1 bg-primary hover:bg-primary/90"><Download className="w-3 h-3"/> Download</Button></a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-2xl border border-border shadow-sm mb-6">
               <div>
                 <h2 className="text-xl font-bold font-display">Your Team Members</h2>
                 <p className="text-muted-foreground text-sm">Add other dispatchers, accountants or managers to access your company dashboard.</p>
               </div>
               <Button 
                className="mt-4 md:mt-0 font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={() => {
                  if(!myClientId) {
                    toast.error("You need a valid active Client ID to invite members.");
                    return;
                  }
                  const inviteUrl = `${window.location.origin}/client-login?invite=${myClientId}`;
                  navigator.clipboard.writeText(inviteUrl);
                  toast.success("Invite Link Copied!", { description: "Send this link to your team members so they can register."});
                }}
               >
                 <Plus className="w-5 h-5"/> Copy Invite Link
               </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="font-semibold px-6 py-4">Name</TableHead>
                      <TableHead className="font-semibold">Email/Phone</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right px-6">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamList.map((member) => (
                      <TableRow key={member.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-bold text-foreground px-6 py-4">{member.full_name}</TableCell>
                        <TableCell className="text-muted-foreground">{member.email || member.phone || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={member.approval_status === 'approved' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {member.approval_status === 'approved' ? 'Active' : 'Pending Approval'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 text-primary font-medium">{member.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {teamList.length === 0 && (
                <div className="p-8 justify-center items-center flex text-muted-foreground">
                  No team members found. Send an invite link to add them!
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;

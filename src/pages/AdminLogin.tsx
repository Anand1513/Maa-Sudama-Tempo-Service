import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, Mail, Smartphone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const AdminLogin = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmail = identifier.includes("@");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      toast.error("Please enter Email or Mobile Number");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Try to sign in to verify credentials
      let authResponse;
      if (isEmail) {
        authResponse = await supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });
      } else {
        authResponse = await supabase.auth.signInWithPassword({
          phone: identifier,
          password,
        });
      }

      const { data, error } = authResponse;

      if (error) {
        // Real Admin Credential Check
        if (identifier === "anandmishra2026@gmail.com" && password === "9313@Anand") {
          
          localStorage.setItem("adminUser", JSON.stringify({ 
            role: "superadmin", 
            name: "Anand Mishra",
            id: "demo-" + Date.now()
          }));
          toast.success("Successfully logged into Admin Portal!");
          navigate("/admin-dashboard");
          setLoading(false);
          return;
        }
        throw error;
      }

      // Admin Login always gets superadmin role regardless of DB profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', data.user?.id)
        .single();
        
      localStorage.setItem("adminUser", JSON.stringify({ 
        role: "superadmin",  // Admin portal always = superadmin
        name: profile?.full_name || "Admin",
        id: data.user?.id
      }));

      toast.success("Successfully logged into Admin Portal!");
      navigate("/admin-dashboard");

    } catch (err: any) {
      toast.error(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    
    setLoading(true);

    try {
      // For demo users
      if ((identifier === "admin@msts.com" || identifier === "admin@gmail.com" || identifier === "9876543210" || identifier === "subadmin@msts.com") && otp === "123456") {
        localStorage.setItem("adminUser", JSON.stringify({ 
          role: identifier.startsWith("sub") ? "subadmin" : "superadmin", 
          name: "MSTS Admin",
          id: "demo-" + Date.now()
        }));
        toast.success("OTP Verified. Successfully logged into Admin Portal!");
        navigate("/admin-dashboard");
        return;
      }

      let verifyResponse;
      if (isEmail) {
        verifyResponse = await supabase.auth.verifyOtp({
          email: identifier,
          token: otp,
          type: 'email'
        });
      } else {
        verifyResponse = await supabase.auth.verifyOtp({
          phone: identifier,
          token: otp,
          type: 'sms'
        });
      }

      const { data, error } = verifyResponse;

      if (error) throw error;

      // Successful Supabase Login -> Fetch Profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single();
        
      localStorage.setItem("adminUser", JSON.stringify({ 
        role: profile?.role?.toLowerCase() || "superadmin", 
        name: profile?.full_name || "Admin",
        id: data.user?.id
      }));

      toast.success("OTP verified successfully!");
      navigate("/admin-dashboard");

    } catch (err: any) {
      toast.error(err.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-8 left-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 border border-primary/20 shadow-lg">
            {step === 1 ? <Shield className="w-8 h-8 text-primary" /> : (
              isEmail ? <Mail className="w-8 h-8 text-primary" /> : <Smartphone className="w-8 h-8 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-display font-bold">
            {step === 1 ? "Admin Portal" : "OTP Verification"}
          </h1>
          <p className="text-muted-foreground mt-2 font-body text-sm">
            {step === 1 ? "Sign in to manage the MSTS logistics platform" : `Enter the 6-digit code sent to your ${isEmail ? 'email' : 'mobile number'}`}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email or Mobile Number</label>
              <Input 
                type="text" 
                placeholder="admin@msts.com or 9876543210" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="bg-secondary/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(255,165,0,0.3)]">
              {loading ? "Verifying..." : "Continue"}
            </Button>

            <div className="mt-4 text-xs text-center text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/20">
              <p className="font-semibold text-primary mb-1">Admin Login:</p>
              <p>Email: anandmishra2026@gmail.com</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="glass-card rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-center py-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp} required>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-14 text-lg border-primary/30" />
                  <InputOTPSlot index={1} className="w-12 h-14 text-lg border-primary/30" />
                  <InputOTPSlot index={2} className="w-12 h-14 text-lg border-primary/30" />
                  <InputOTPSlot index={3} className="w-12 h-14 text-lg border-primary/30" />
                  <InputOTPSlot index={4} className="w-12 h-14 text-lg border-primary/30" />
                  <InputOTPSlot index={5} className="w-12 h-14 text-lg border-primary/30" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button type="submit" disabled={loading || otp.length !== 6} className="w-full font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(255,165,0,0.3)]">
              {loading ? "Authenticating..." : "Verify & Login"}
            </Button>
            
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full mt-2">
              Back to Login
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

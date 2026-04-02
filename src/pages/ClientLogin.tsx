import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Briefcase, ArrowLeft, Mail, Smartphone, UserPlus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ClientLogin = () => {
  const navigate = useNavigate();
  // 1: Login/Register Choice, 2: OTP Entry, 3: Pending Approval Message
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get("invite");
  const [isRegistering, setIsRegistering] = useState(!!inviteCode);

  // Form State
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmail = identifier.includes("@");

  const passwordValidation = {
    length: password.length >= 8 && password.length <= 20,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      toast.error("Please enter Email or Mobile Number");
      return;
    }

    if (isRegistering && !isPasswordValid) {
      toast.error("Please meet all password requirements before registering");
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        // Register Flow
        const authPayload = isEmail 
          ? { email: identifier, password }
          : { phone: identifier.startsWith('+') ? identifier : `+91${identifier}`, password };

        const { data, error } = await supabase.auth.signUp({
          ...authPayload,
          options: {
            data: {
              full_name: fullName,
              company_name: companyName,
              role: 'CLIENT',
              approval_status: 'pending_approval' // New users must be approved by admin
            }
          }
        });

        if (error) throw error;
        
        // Manual fallback insert to guarantee data flows to dashboard if trigger fails
        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').insert([{
            id: data.user.id,
            full_name: fullName,
            company_name: companyName,
            role: 'CLIENT',
            approval_status: 'pending_approval',
            invited_client_id: inviteCode || null
          }]);
          
          if (profileError && profileError.code !== '23505') {
            console.error("Profile insert error (ignored if trigger worked):", profileError);
          }
        }

        // Show pending approval message
        setStep(3);
        toast.success("Registration request submitted successfully.");

      } else {
        // Login Flow
        let authResponse;
        if (isEmail) {
          authResponse = await supabase.auth.signInWithPassword({
            email: identifier,
            password,
          });
        } else {
          const processedPhone = identifier.startsWith('+') ? identifier : `+91${identifier}`;
          authResponse = await supabase.auth.signInWithPassword({
            phone: processedPhone,
            password,
          });
        }

        const { data, error } = authResponse;

        if (error) {
          throw error;
        }

        // Check if user is approved from the live profiles table
        const { data: profileData } = await supabase.from('profiles').select('approval_status').eq('id', data.user.id).single();
        const status = profileData?.approval_status || data.user?.user_metadata?.approval_status || 'approved'; 
        
        if (status === 'pending_approval') {
           await supabase.auth.signOut();
           setStep(3); // Block login, show pending screen
           setLoading(false);
           return;
        }

        // OTP removed as per request. Directly navigate to dashboard.
        toast.success("Successfully logged in!");
        navigate("/client-dashboard");
      }

    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
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
      // Demo validation
      if (identifier === "client@msts.com" && otp === "123456") {
        toast.success("Successfully logged in!");
        navigate("/client-dashboard");
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
        const processedPhone = identifier.startsWith('+') ? identifier : `+91${identifier}`;
        verifyResponse = await supabase.auth.verifyOtp({
          phone: processedPhone,
          token: otp,
          type: 'sms'
        });
      }

      if (verifyResponse.error) throw verifyResponse.error;

      toast.success("OTP verified successfully!");
      navigate("/client-dashboard");

    } catch (err: any) {
      toast.error(err.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-card p-8 sm:p-10 rounded-3xl border border-border shadow-2xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-5 shadow-lg shadow-primary/20">
            {step === 1 && !isRegistering && <Briefcase className="w-8 h-8" />}
            {step === 1 && isRegistering && <UserPlus className="w-8 h-8" />}
            {step === 2 && (isEmail ? <Mail className="w-8 h-8" /> : <Smartphone className="w-8 h-8" />)}
            {step === 3 && <Briefcase className="w-8 h-8 text-yellow-300" />}
          </div>
          
          <h2 className="text-3xl font-display font-medium text-foreground tracking-tight">
            {step === 1 ? (isRegistering ? "Create Account" : "Client Portal") :
             step === 2 ? "OTP Verification" : "Registration Pending"}
          </h2>
          
          <p className="text-muted-foreground mt-2">
            {step === 1 && !isRegistering && "Sign in to manage your shipments and statements"}
            {step === 1 && isRegistering && "Register to get started with MSTS"}
            {step === 2 && `Enter the 6-digit code sent to your ${isEmail ? 'email' : 'mobile number'}`}
            {step === 3 && "Your request is under review."}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleAuth} className="space-y-5 animate-in fade-in slide-in-from-bottom-4">
            {isRegistering && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Full Name</label>
                  <Input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                    placeholder="Enter full name"
                    className="py-6 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Company Name</label>
                  <Input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required 
                    placeholder="Enter company name"
                    className="py-6 rounded-xl"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email or Mobile Number</label>
              <Input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="py-6 rounded-xl"
                placeholder="name@company.com or 9876543210"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">{isRegistering ? "Secure Password" : "Password"}</label>
                {!isRegistering && <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>}
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-6 rounded-xl"
                placeholder="••••••••"
              />
              
              {isRegistering && (
                <div className="mt-3 p-4 bg-secondary/20 rounded-xl space-y-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Password must contain:</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs">
                    <div className={`flex items-center gap-1.5 transition-colors ${passwordValidation.length ? 'text-green-500 font-medium' : 'text-muted-foreground'}`}>
                      {passwordValidation.length ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      8–20 characters
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${passwordValidation.uppercase ? 'text-green-500 font-medium' : 'text-muted-foreground'}`}>
                      {passwordValidation.uppercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      1 Uppercase
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${passwordValidation.lowercase ? 'text-green-500 font-medium' : 'text-muted-foreground'}`}>
                      {passwordValidation.lowercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      1 Lowercase
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${passwordValidation.number ? 'text-green-500 font-medium' : 'text-muted-foreground'}`}>
                      {passwordValidation.number ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      1 Number
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors col-span-2 ${passwordValidation.special ? 'text-green-500 font-medium' : 'text-muted-foreground'}`}>
                      {passwordValidation.special ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      1 Special character (@$!%*?&)
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full font-bold py-6 mt-4 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              {loading ? "Processing..." : (isRegistering ? "Register as Client" : "Secure Log In")}
            </Button>

            <div className="text-center mt-6">
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-primary font-medium hover:underline"
              >
                {isRegistering ? "Already have an account? Sign In" : "New Client? Register Here"}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
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
            
            <Button type="submit" disabled={loading || otp.length !== 6} className="w-full font-bold py-6 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30">
              {loading ? "Authenticating..." : "Verify & Login"}
            </Button>
            
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full mt-2 rounded-xl">
              Back to Login
            </Button>
          </form>
        )}

        {step === 3 && (
          <div className="animate-in zoom-in-95 text-center p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Registration Pending</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for registering with MSTS. Our administrative team must approve your account before you can log in.
            </p>
            <p className="text-sm font-semibold text-foreground mb-6">
              You will receive a confirmation message on your registered {isEmail ? 'email' : 'mobile number'} within 24 hours once approved.
            </p>
            
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full rounded-xl">
              Back to Login Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLogin;

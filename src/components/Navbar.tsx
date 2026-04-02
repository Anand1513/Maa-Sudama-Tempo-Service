import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Companies", path: "/companies" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string; role: string; dashboardPath: string } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check Supabase auth session
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email, role")
          .eq("id", data.user.id)
          .single();
        const role = profile?.role || 'client';
        setLoggedInUser({
          name: profile?.full_name || data.user.email?.split("@")[0] || "User",
          email: profile?.email || data.user.email || "",
          role,
          dashboardPath: role === 'driver' ? '/driver-dashboard' : '/client-dashboard',
        });
      } else {
        setLoggedInUser(null);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase
          .from("profiles")
          .select("full_name, email, role")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => {
            const role = profile?.role || 'client';
            setLoggedInUser({
              name: profile?.full_name || session.user.email?.split("@")[0] || "User",
              email: profile?.email || session.user.email || "",
              role,
              dashboardPath: role === 'driver' ? '/driver-dashboard' : '/client-dashboard',
            });
          });
      } else {
        setLoggedInUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoggedInUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-black text-lg">M</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-bold text-sm text-foreground leading-tight">Maa Sudama</p>
            <p className="font-display text-xs text-primary leading-tight">Tempo Service</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {loggedInUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-display font-semibold gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  {loggedInUser.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold">{loggedInUser.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{loggedInUser.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={loggedInUser.dashboardPath} className="w-full cursor-pointer">My Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 cursor-pointer gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-display font-semibold gap-2">
                  Login <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/client-login" className="w-full cursor-pointer">Client Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/driver-login" className="w-full cursor-pointer">Driver Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <a href="tel:+917703976645" className="text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/917703976645?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20your%20logistics%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="font-display font-semibold">Contact Us</Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-body text-base py-2 transition-colors ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-full h-[1px] bg-border my-2"></div>

            {loggedInUser ? (
              <div className="flex flex-col gap-2">
                <p className="font-display text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Logged in as {loggedInUser.name}
                </p>
                <Link
                  to="/client-dashboard"
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm py-2 text-muted-foreground hover:text-primary pl-2 border-l-2 border-border hover:border-primary"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="font-body text-sm py-2 text-red-500 hover:text-red-400 pl-2 border-l-2 border-red-300 text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="font-display text-xs text-muted-foreground uppercase tracking-wider font-semibold">Login</p>
                <Link
                  to="/client-login"
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm py-2 transition-colors text-muted-foreground hover:text-primary pl-2 border-l-2 border-border hover:border-primary"
                >
                  Client Login
                </Link>
                <Link
                  to="/driver-login"
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm py-2 transition-colors text-muted-foreground hover:text-primary pl-2 border-l-2 border-border hover:border-primary"
                >
                  Driver Login
                </Link>
              </div>
            )}

            <a
              href="https://wa.me/917703976645?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20your%20logistics%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full mt-2 font-display font-semibold">Contact Us</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

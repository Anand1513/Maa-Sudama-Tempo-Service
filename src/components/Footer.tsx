import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-black text-lg">M</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground">Maa Sudama</p>
                <p className="font-display text-xs text-primary">Tempo Service</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Trusted logistics partner for businesses across NCR. 5+ years of reliable freight & delivery services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About Us</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">Services</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+917703976645" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91-7703976645
              </a>
              <a href="tel:+919313818431" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91-9313818431
              </a>
              <a href="mailto:connect.msts@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                <Mail className="w-4 h-4 text-primary" /> connect.msts@gmail.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Address</h4>
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p>177, Block-B, Vinay Nagar, Faridabad, Haryana – 121013</p>
            </div>
            <p className="text-muted-foreground text-xs mt-3">
              GSTIN: 06AZJPM1895R2ZE
            </p>
            <p className="text-muted-foreground text-xs">
              Proprietor: Kanchan Mishra
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Maa Sudama Tempo Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

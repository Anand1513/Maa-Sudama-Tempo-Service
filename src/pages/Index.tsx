import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, Truck, Package, Map, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { vehicles, whyChooseUs, stats, clientLogos } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Index = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const text = `Hi, I'm ${name || "a potential client"} (${phone || "N/A"}). ${message || "I'd like to inquire about your logistics services."}`;
    window.open(`https://wa.me/917703976645?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-background" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-[48%] max-w-xl z-10 py-20 lg:py-0">
            {/* Labels */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {["Freight & Logistics", "NCR Service"].map((label) => (
                <span key={label} className="px-4 py-1.5 text-[11px] sm:text-xs font-display font-medium tracking-wider uppercase border border-primary/40 text-primary rounded-full bg-primary/5">
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] mb-6 tracking-tight"
            >
              <span className="text-white block">Fast & Reliable</span>
              <span className="text-white block">Tempo Services</span>
              <span className="text-primary block">Across NCR</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-sm sm:text-base max-w-md mb-8 font-body leading-relaxed"
            >
              Fast, reliable and secure tempo services across NCR. From small deliveries to heavy cargo, we ensure safe transport with verified drivers and transparent billing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto font-display hover:text-primary-foreground font-bold gap-2 bg-primary text-secondary-foreground hover:bg-primary/90 px-8 rounded-lg shadow-[0_0_15px_rgba(255,165,0,0.2)]">
                  Explore Fleet <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a
                href="https://wa.me/917703976645?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20your%20logistics%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-display font-bold border-primary/40 text-primary hover:bg-primary/10 px-8 rounded-lg">
                  WhatsApp Us
                </Button>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-muted-foreground/80 font-medium"
            >
              Trusted by 20+ companies across industries
            </motion.p>
          </div>

        </div>

        {/* Hero Image Visual perfectly touching the bottom of the section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block absolute right-[2%] bottom-0 w-[48%] max-w-[700px] z-10"
        >
          <div className="relative w-full aspect-[4/3] rounded-t-[2rem] overflow-hidden shadow-2xl origin-bottom">
             <img 
               src="/hero-truck.png" 
               alt="Logistics Fleet inside warehouse" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             
             {/* Floating Overlay Card */}
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.8, duration: 0.5 }}
               className="absolute bottom-10 right-10 bg-black/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/5 shadow-2xl"
             >
                <p className="text-sm font-medium text-gray-400 mb-1">Fast Delivery</p>
                <p className="text-xl font-bold text-white tracking-wide">On-time Dispatch</p>
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-display font-black text-3xl sm:text-4xl text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm font-body mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logo Carousel */}
      <section className="py-12 overflow-hidden border-b border-border/50">
        <div className="container mx-auto px-4 mb-6">
          <p className="text-center text-muted-foreground text-sm font-body uppercase tracking-wider">Trusted by leading companies</p>
        </div>
        <div className="relative cursor-pointer">
          <div className="flex animate-scroll-infinite w-max hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="mx-8 flex items-center justify-center min-w-[120px]">
                <div className="px-6 py-3 rounded-lg border border-border/30 bg-secondary/30">
                  <span className="font-display font-semibold text-muted-foreground/50 text-sm">{logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Our <span className="text-primary">Fleet</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">Four vehicle types built for every logistics need — from light parcels to heavy cargo.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card rounded-xl p-6 group hover:border-primary/40 transition-all duration-300"
              >
                {/* Vehicle Image or Placeholder icon */}
                <div className="w-full h-32 rounded-lg bg-muted/30 flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors overflow-hidden relative">
                  {(v as any).image ? (
                    <img src={(v as any).image} alt={v.name} className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <Package className="w-12 h-12 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
                  )}
                </div>
                <h3 className="font-display font-bold text-lg mb-1 gold-underline inline-block">{v.name}</h3>
                <p className="text-muted-foreground text-sm font-body mb-3">{v.bedSize} bed · {v.capacity}</p>
                <div className="space-y-1 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base fare</span>
                    <span className="text-primary font-semibold">{v.baseFare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Per km</span>
                    <span className="text-foreground">{v.perKm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full day</span>
                    <span className="text-foreground">{v.fullDay}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Why <span className="text-primary">Choose Us</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">Six reasons businesses trust Maa Sudama Tempo Service for their logistics.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card rounded-xl p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display font-black text-3xl text-primary/20 group-hover:text-primary/40 transition-colors">{item.num}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-display font-bold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Get in <span className="text-primary">Touch</span></h2>
              <p className="text-muted-foreground font-body">Fill in your details and we'll connect with you on WhatsApp instantly.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass-card rounded-xl p-6 sm:p-8 space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-muted/30 border-border/50"
              />
              <Input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-muted/30 border-border/50"
              />
              <textarea
                placeholder="Your Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button onClick={handleWhatsApp} className="w-full font-display font-semibold gap-2" size="lg">
                <Send className="w-4 h-4" /> Send via WhatsApp
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

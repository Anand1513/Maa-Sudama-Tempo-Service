import { motion } from "framer-motion";
import { Package, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { vehicles, bookingSteps } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-3xl">
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              The Right <span className="text-gradient-gold">Vehicle</span> for Every Job
            </h1>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              From lightweight document runs to heavy cargo hauls — choose the right vehicle type and get transparent pricing with no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vehicle Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 space-y-8">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Image placeholder */}
                <div className="bg-muted/20 flex items-center justify-center min-h-[200px] overflow-hidden p-4">
                  {(v as any).image ? (
                    <img src={(v as any).image} alt={v.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md" />
                  ) : (
                    <Package className="w-16 h-16 text-muted-foreground/20" />
                  )}
                </div>

                {/* Details */}
                <div className="p-6 lg:col-span-2">
                  <h3 className="font-display font-bold text-2xl mb-1">{v.name}</h3>
                  <p className="text-primary font-display text-sm mb-4">{v.bedSize} bed · {v.capacity}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted/20 rounded-lg p-3 text-center">
                      <p className="text-primary font-display font-bold text-lg">{v.baseFare}</p>
                      <p className="text-muted-foreground text-xs font-body">{v.baseFareNote}</p>
                    </div>
                    <div className="bg-muted/20 rounded-lg p-3 text-center">
                      <p className="text-foreground font-display font-bold text-lg">{v.perKm}</p>
                      <p className="text-muted-foreground text-xs font-body">after 3km</p>
                    </div>
                    <div className="bg-muted/20 rounded-lg p-3 text-center">
                      <p className="text-foreground font-display font-bold text-lg">{v.fullDay}</p>
                      <p className="text-muted-foreground text-xs font-body">{v.fullDayNote}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-display font-semibold mb-2 text-muted-foreground">Best for:</p>
                    <div className="flex flex-wrap gap-2">
                      {v.useCases.map((uc) => (
                        <span key={uc} className="px-3 py-1 text-xs font-body rounded-full border border-border/50 text-muted-foreground">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Corporate Packages */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">Corporate <span className="text-primary">Packages</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">Full-day vehicle hire for businesses with predictable logistics needs.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="glass-card rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg mb-1">Light Vehicles</h3>
              <p className="text-muted-foreground text-sm font-body mb-3">Carry / Ace / Supro</p>
              <p className="font-display font-black text-3xl text-primary">₹2,500</p>
              <p className="text-muted-foreground text-xs font-body mt-1">per day · 10AM–5PM · max 100km</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass-card rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg mb-1">Heavy Vehicle</h3>
              <p className="text-muted-foreground text-sm font-body mb-3">Bolero Maxx PU</p>
              <p className="font-display font-black text-3xl text-primary">₹3,500</p>
              <p className="text-muted-foreground text-xs font-body mt-1">per day · 10AM–5PM · max 100km</p>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="text-center mt-8">
            <p className="text-muted-foreground text-sm font-body">
              Overtime: ₹100–150/hr after 5PM · Extended waiting: ₹0.5–1.0/min · Loading/Unloading: Included
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">How It <span className="text-primary">Works</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">From booking to invoice — a seamless 6-step process.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card rounded-xl p-6 relative"
              >
                <span className="font-display font-black text-5xl text-primary/10 absolute top-4 right-4">{s.step}</span>
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                    {s.title}
                    {i < bookingSteps.length - 1 && <ArrowRight className="w-4 h-4 text-primary hidden sm:inline" />}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="text-center mt-12">
            <a
              href="https://wa.me/917703976645?text=Hi%2C%20I%27d%20like%20to%20book%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="font-display font-semibold gap-2">
                Book a Trip <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;

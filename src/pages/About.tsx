import { motion } from "framer-motion";
import { User, Award, FileText, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import { stats } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-3xl">
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mb-3">About Us</p>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              Moving Business <span className="text-gradient-gold">Forward</span>
            </h1>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              Maa Sudama Tempo Service was founded with a simple mission: provide businesses with reliable, 
              transparent, and affordable logistics. Over 8 years later, we've completed 4,130+ trips 
              for 20+ companies across the NCR region — building trust one delivery at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary/50 border-y border-border/50">
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

      {/* Proprietor */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="w-full aspect-square max-w-sm rounded-2xl bg-muted/20 border border-border/30 flex items-center justify-center mx-auto lg:mx-0">
                <User className="w-24 h-24 text-muted-foreground/20" />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mb-2">Proprietor</p>
              <h2 className="font-display font-bold text-3xl mb-4">Kanchan Mishra</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                With over 8 years in the logistics industry, Kanchan Mishra built Maa Sudama Tempo Service 
                from the ground up with a focus on direct client relationships, full accountability, and 
                transparent operations. Every client gets direct access to the proprietor — no middlemen, 
                no corporate runarounds.
              </p>
              
              <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mb-2 mt-8">Tech, Bill & Ledger Operations</p>
              <h2 className="font-display font-bold text-3xl mb-4">Anand Kumar Mishra</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Managing everything from tech infrastructure to digital billing and ledgers. Ensuring seamless, transparent, and modernized digital operations for our logistics network.
              </p>

              <div className="space-y-2 text-sm font-body">
                <p className="text-muted-foreground">📞 +91-7703976645</p>
                <p className="text-muted-foreground">📧 connect.msts@gmail.com</p>
                <p className="text-muted-foreground">📍 177, Block-B, Vinay Nagar, Faridabad, Haryana – 121013</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Legal */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="glass-card rounded-xl p-6">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">GST & Legal</h3>
              <p className="text-muted-foreground text-sm font-body mb-3">
                Fully GST-registered with compliant invoicing on every transaction.
              </p>
              <p className="text-xs text-muted-foreground font-mono">GSTIN: 06AZJPM1895R2ZE</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass-card rounded-xl p-6">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Our Services</h3>
              <ul className="text-muted-foreground text-sm font-body space-y-2">
                <li>• WhatsApp-based live tracking per trip</li>
                <li>• Document & cheque pickup/delivery</li>
                <li>• Proof-of-delivery photo documentation</li>
                <li>• Corporate monthly billing</li>
                <li>• Full-day & per-trip vehicle hire</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="glass-card rounded-xl p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Exclusions</h3>
              <ul className="text-muted-foreground text-sm font-body space-y-2">
                <li>• Toll charges (paid by client)</li>
                <li>• Parking fees</li>
                <li>• Third-party labour for loading/unloading</li>
                <li>• Overtime charges after 5 PM</li>
                <li>• Extended waiting charges</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

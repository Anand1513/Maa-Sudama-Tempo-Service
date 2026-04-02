import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, X, MapPin, Truck } from "lucide-react";
import Navbar from "../components/Navbar";

// Expanded data with more details
const companies = [
  { 
    name: "Asb industries pvt ltd", 
    years: "Ongoing", 
    desc: "Handling diverse industrial goods and heavy manufacturing equipment.",
    longDesc: "ASB Industries Private Limited is a massive manufacturing entity. We manage their raw material inflow and finished goods outflow, providing specialized heavy-duty vehicles that sync perfectly with their production schedules.",
    locations: "NCR Region",
    volume: "High-Volume Industrial"
  },
  { 
    name: "Asha Medical", 
    years: "Ongoing", 
    desc: "Safe and timely transport for critical medical supplies and healthcare equipment.",
    longDesc: "Asha Medical relies on our precision logistics to move sensitive healthcare equipment and medical supplies. We ensure clean, secure, and prompt deliveries directly to hospitals and clinics, where timing can be a matter of life and death.",
    locations: "Delhi NCR",
    volume: "Critical Deliveries"
  },
  { 
    name: "C1 modular system private ltd", 
    years: "Ongoing", 
    desc: "Logistics for custom modular furniture and interior infrastructure components.",
    longDesc: "C1 Modular System creates intricate interior fittings. We handle their logistics by providing vehicles with ample space and secure tie-downs, ensuring that glass panels, wooden modules, and delicate fittings reach commercial installation sites without a scratch.",
    locations: "Pan India",
    volume: "Delicate Handling"
  },
  { 
    name: "Global Medilife Solutions", 
    years: "Ongoing", 
    desc: "Dedicated healthcare logistics for pharmaceutical and medical solutions.",
    longDesc: "Global Medilife Solutions requires hygienic, fast, and compliant transport for their medical product lines. We deliver their vital healthcare solutions to diagnostic centers and hospitals with an absolute commitment to scheduled drop-times.",
    locations: "Delhi, Haryana",
    volume: "Time-Sensitive"
  },
  { 
    name: "Consolidated Carpet Industries Limited ( HR )", 
    years: "Ongoing", 
    desc: "Transporting premium carpets and textile flooring solutions across regions.",
    longDesc: "Consolidated Carpet Industries produces high-quality carpets. Our tempo services facilitate the movement of large, bulky carpet rolls from their Haryana manufacturing units to distribution hubs and high-end retail showrooms securely.",
    locations: "Haryana, Delhi",
    volume: "Bulk Textiles"
  },
  { 
    name: "Enero experts pvt ltd", 
    years: "Ongoing", 
    desc: "Specialized logistics and supply chain support for energy and consulting.",
    longDesc: "Enero Experts relies on us for the transport of specialized equipment and administrative materials. We provide them with fast, reliable, and entirely transparent transit solutions for their project-specific needs.",
    locations: "Delhi NCR",
    volume: "Project Logistics"
  },
  { 
    name: "Glass wall system india private limited", 
    years: "Ongoing", 
    desc: "Extreme-care transport for architectural glass and large facade systems.",
    longDesc: "Glass Wall System India depends on our highly customized handling procedures. Transporting heavy, fragile architectural glass requires specialized A-frame trucks and meticulous securement, ensuring zero-shatter deliveries to high-rise construction sites.",
    locations: "Pan India",
    volume: "Fragile/Specialized"
  },
  { 
    name: "Ideas", 
    years: "Ongoing", 
    desc: "Agile delivery and transport for creative agency events and installations.",
    longDesc: "For 'Ideas', a creative and design entity, we provide on-demand transport for event setups, marketing collateral, and exhibition installations. Our prompt tempos act as their logistical backbone for dynamic, last-minute campaigns.",
    locations: "Delhi NCR",
    volume: "Event Logistics"
  },
  { 
    name: "Innovcrete", 
    years: "Ongoing", 
    desc: "Heavy-duty transport for concrete materials and modern construction solutions.",
    longDesc: "Innovcrete develops advanced concrete and building materials. We provide the heavy-axle trucking capacity they need to move massive pallets of dry mix and construction agents directly from factories to active building sites without delay.",
    locations: "UP, Delhi, Haryana",
    volume: "Construction Bulk"
  },
  { 
    name: "INTERIOR INDIA", 
    years: "Ongoing", 
    desc: "End-to-end transport for complete interior fit-outs and furnishings.",
    longDesc: "INTERIOR INDIA transforms commercial spaces. We operate as their dedicated moving partner, transporting everything from false ceiling grids to premium office furniture, coordinating closely with their site engineers for sequential unloading.",
    locations: "North India",
    volume: "Sequential Delivery"
  },
  { 
    name: "International Trading Corporation", 
    years: "Ongoing", 
    desc: "Managing port-to-warehouse and multi-point distribution for global imports.",
    longDesc: "International Trading Corporation moves vast quantities of imported goods. We handle their localized line-haul distribution, picking up cleared cargo from inland container depots and delivering it safely to their extensive network of wholesale buyers.",
    locations: "ICD Tughlakabad, NCR",
    volume: "Container/Bulk"
  },
  { 
    name: "LeoTech System", 
    years: "Ongoing", 
    desc: "Secure transport for high-value IT infrastructure and electronic systems.",
    longDesc: "LeoTech System deals in critical electronic hardware and IT infrastructure. We provide them with heavily secured, covered tempos equipped with GPS tracking to ensure their high-value servers and digital screens are transported safely.",
    locations: "Delhi, Noida, Gurugram",
    volume: "High-Value Escort"
  },
  { 
    name: "Mahabal Concrete Solution", 
    years: "Ongoing", 
    desc: "Reliable material transport for heavy commercial concrete applications.",
    longDesc: "Mahabal Concrete Solution entrusts us with their heavy construction cargo. Our robust fleet ensures that massive quantities of concrete additives and reinforcement materials arrive at their massive infrastructural projects right on schedule.",
    locations: "Pan India",
    volume: "Heavy Freight"
  },
  { 
    name: "MS Curative Private Limited", 
    years: "Ongoing", 
    desc: "Logistics solutions ensuring safety for pharmaceutical and curative products.",
    longDesc: "MS Curative requires absolute hygiene and safety when moving their curative and pharmaceutical products. We provide clean, sealed vehicles to prevent contamination, maintaining the integrity of their medical products during transit.",
    locations: "North India",
    volume: "Pharma Grade"
  },
  { 
    name: "Pareek electricals", 
    years: "Ongoing", 
    desc: "Transporting commercial electrical panels, cables, and industrial switchgears.",
    longDesc: "Pareek Electricals supplies massive electrical components utilized in commercial buildings. We transport their heavy electrical panels, massive cable spools, and fragile switchgears using weather-proofed trucks, shielding them from moisture and transit shock.",
    locations: "Delhi NCR",
    volume: "Industrial Goods"
  },
  { 
    name: "Rise Against Hunger India", 
    years: "Ongoing", 
    desc: "Supporting charitable food distribution and massive NGO meal-packaging logistics.",
    longDesc: "We proudly partner with Rise Against Hunger India. When they organize massive meal-packaging events, our tempos ensure that thousands of pounds of raw ingredients and packaging materials arrive on time, followed by the rapid distribution of the packaged meals to their destination.",
    locations: "Pan India",
    volume: "Charity/Bulk Food"
  },
  { 
    name: "Vinayak Infrastructures", 
    years: "Ongoing", 
    desc: "Dedicated logistics for large-scale real estate and infrastructure development.",
    longDesc: "Vinayak Infrastructures builds tomorrow's skylines. We support their massive real estate projects by providing a continuous flow of construction materials, ensuring their workforce never has to wait for cement, steel, or finishing materials.",
    locations: "Haryana, Delhi",
    volume: "Project Freight"
  },
  { 
    name: "Vishal Builder", 
    years: "Ongoing", 
    desc: "Supplying the logistical muscle required for consistent construction staging.",
    longDesc: "Vishal Builder relies on our heavy-duty transport network. We facilitate the movement of bulk raw materials and heavy machinery attachments between multiple ongoing construction sites, optimizing their equipment utilization.",
    locations: "Delhi NCR",
    volume: "Site-to-Site Mover"
  },
  { 
    name: "Wood stock", 
    years: "Ongoing", 
    desc: "Careful handling and delivery of premium timber and custom woodwork.",
    longDesc: "Wood Stock crafts premium lumber and custom joinery. Our logistics team uses flatbeds and specialized weather-proof tarps to transport their high-end wooden logs, boards, and finished furniture, strictly protecting it from rain and road debris.",
    locations: "North India",
    volume: "Specialized Timber"
  },
  { 
    name: "Classic flooring and interior pvt ltd", 
    years: "Ongoing", 
    desc: "Moving bulk flooring materials including tiles, wood, and installation gear.",
    longDesc: "Classic Flooring and Interior trusts us to move heavy bundles of flooring materials. Tile and hardwood transportation requires load balancing and careful driving to prevent breakage, a standard we continually exceed.",
    locations: "North India",
    volume: "Heavy Payloads"
  }
];

const Companies = () => {
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  // Close modal functionality
  const closeModal = () => setSelectedCompany(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedCompany) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCompany]);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-4">
              Our Trusted Partners
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We are incredibly proud to have partnered with leading companies across diverse industries. Click on any partner to see our shared journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCompany(company)}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>{company.years}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold font-display text-foreground mb-3">{company.name}</h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">{company.desc}</p>
                
                <div className="mt-4 text-primary text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View full details &rarr;
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal / Dialog via Framer Motion */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-border bg-muted/40 relative">
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-6 p-2.5 bg-background border border-border rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-2">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{selectedCompany.name}</h2>
                    <p className="text-primary font-medium mt-1">Partnership Since: {selectedCompany.years}</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight">About our Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                  {selectedCompany.longDesc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-secondary rounded-xl text-secondary-foreground shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Key Corridors</p>
                      <p className="text-foreground font-medium">{selectedCompany.locations}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-secondary rounded-xl text-secondary-foreground shadow-sm">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Operational Scale</p>
                      <p className="text-foreground font-medium">{selectedCompany.volume}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Companies;

import { motion } from "framer-motion";

// SVG coordinate helper: lon/lat → SVG x/y (viewBox 0 0 480 590)
function xy(lon: number, lat: number) {
  return { x: Math.round((lon - 68) * 16.55), y: Math.round((37 - lat) * 20.34) };
}

const DELHI = { ...xy(77.1, 28.7), name: "Delhi NCR" }; // ~{x:150, y:170}

const NORTH = [
  { ...xy(74.9, 32.7), name: "Jammu" },
  { ...xy(74.9, 31.6), name: "Amritsar" },
  { ...xy(76.8, 30.7), name: "Chandigarh" },
  { ...xy(78.0, 30.3), name: "Dehradun" },
  { ...xy(80.9, 26.8), name: "Lucknow" },
  { ...xy(75.8, 26.9), name: "Jaipur" },
  { ...xy(83.0, 25.3), name: "Varanasi" },
  { ...xy(85.1, 25.6), name: "Patna" },
  { ...xy(79.1, 29.0), name: "Haridwar" },
];

const NEPAL = [
  { ...xy(85.3, 27.7), name: "Kathmandu" },
  { ...xy(84.0, 28.2), name: "Pokhara" },
  { ...xy(85.0, 26.9), name: "Birgunj" },
];

const SOUTH = [
  { ...xy(72.9, 19.1), name: "Mumbai" },
  { ...xy(78.5, 17.4), name: "Hyderabad" },
  { ...xy(88.4, 22.6), name: "Kolkata" },
  { ...xy(80.3, 13.1), name: "Chennai" },
  { ...xy(77.6, 12.9), name: "Bangalore" },
  { ...xy(73.9, 15.3), name: "Goa" },
];

// Simplified India outline path
const INDIA = "M 3,248 L 12,238 L 35,222 L 40,185 L 55,162 L 72,140 L 93,110 L 107,98 L 108,82 L 120,70 L 144,58 L 160,76 L 174,88 L 192,138 L 204,150 L 220,162 L 248,172 L 280,172 L 314,170 L 332,176 L 344,170 L 366,158 L 394,150 L 418,162 L 432,192 L 442,220 L 440,256 L 430,286 L 420,296 L 408,296 L 398,305 L 378,296 L 358,288 L 340,312 L 336,350 L 326,392 L 308,432 L 272,468 L 232,502 L 214,540 L 200,560 L 182,566 L 164,560 L 148,545 L 132,532 L 116,502 L 94,424 L 76,346 L 64,302 L 46,270 L 16,246 Z";

// Nepal highlight region
const NEPAL_REGION = "M 196,150 L 218,162 L 248,172 L 280,172 L 314,170 L 332,176 L 320,192 L 296,188 L 278,188 L 248,182 L 218,175 L 200,163 Z";

type Dest = { x: number; y: number; name: string };

function RouteLine({ from, to, color, width, delay, dashed }: {
  from: Dest; to: Dest; color: string; width: number; delay: number; dashed?: boolean;
}) {
  return (
    <motion.path
      d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
      stroke={color}
      strokeWidth={width}
      fill="none"
      strokeDasharray={dashed ? "4 3" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: dashed ? 0.45 : 0.85 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
    />
  );
}

function CityDot({ dest, color, r, delay, label }: {
  dest: Dest; color: string; r: number; delay: number; label?: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      style={{ transformOrigin: `${dest.x}px ${dest.y}px` }}
    >
      <circle cx={dest.x} cy={dest.y} r={r} fill={color} />
      {label && (
        <text 
          x={dest.x + r + 3} 
          y={dest.y + 4} 
          fontSize="8" 
          fill="rgba(255,255,255,0.9)" 
          fontFamily="system-ui"
          style={{ textShadow: "0 0 2px rgba(0,0,0,0.8)" }}
        >
          {dest.name}
        </text>
      )}
    </motion.g>
  );
}

const CoverageMap = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-wider mb-3">Coverage Network</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
            Delhi NCR to <span className="text-primary">All of India</span> & Nepal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Our routes originate from Delhi NCR, covering North India intensively, and extending pan-India including cross-border deliveries to Nepal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <div>
                  <p className="font-display font-bold text-sm">Delhi NCR — Dispatch Origin</p>
                  <p className="text-muted-foreground text-xs font-body">Central hub for all routes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-amber-400" />
                <div>
                  <p className="font-display font-bold text-sm">North India Priority Routes</p>
                  <p className="text-muted-foreground text-xs font-body">Jammu, Amritsar, Dehradun, Haridwar & more</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-orange-500" />
                <div>
                  <p className="font-display font-bold text-sm">Nepal Coverage 🇳🇵</p>
                  <p className="text-muted-foreground text-xs font-body">Kathmandu, Pokhara, Birgunj cross-border</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-indigo-400 opacity-60" />
                <div>
                  <p className="font-display font-bold text-sm">Pan-India Reach</p>
                  <p className="text-muted-foreground text-xs font-body">Mumbai, Chennai, Bangalroe, Kolkata</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "North Cities", val: "9+", color: "text-primary" },
                { label: "Nepal Routes", val: "3", color: "text-orange-400" },
                { label: "Pan-India", val: "All", color: "text-indigo-400" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <p className={`font-display font-black text-2xl ${s.color}`}>{s.val}</p>
                  <p className="text-muted-foreground text-xs font-body mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-3 overflow-hidden"
          >
            <svg
              viewBox="0 0 480 590"
              className="w-full max-h-[520px]"
              style={{ filter: "drop-shadow(0 0 32px rgba(245,158,11,0.12))" }}
            >
              {/* India outline */}
              <motion.path
                d={INDIA}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))" }}
              />

              {/* Nepal highlight */}
              <motion.path
                d={NEPAL_REGION}
                fill="rgba(255,107,53,0.2)"
                stroke="rgba(255,107,53,0.7)"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />

              {/* North India soft glow cluster */}
              <motion.ellipse
                cx={160} cy={145} rx={95} ry={75}
                fill="rgba(245,158,11,0.06)"
                stroke="rgba(245,158,11,0.15)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              />

              {/* Routes - North India */}
              {NORTH.map((d, i) => (
                <RouteLine key={d.name} from={DELHI} to={d} color="#f59e0b" width={2} delay={0.3 + i * 0.08} />
              ))}

              {/* Routes - Nepal */}
              {NEPAL.map((d, i) => (
                <RouteLine key={d.name} from={DELHI} to={d} color="#ff6b35" width={2} delay={0.2 + i * 0.1} />
              ))}

              {/* Routes - South India */}
              {SOUTH.map((d, i) => (
                <RouteLine key={d.name} from={DELHI} to={d} color="#818cf8" width={1} delay={0.6 + i * 0.1} dashed />
              ))}

              {/* City dots - North */}
              {NORTH.map((d, i) => (
                <CityDot key={d.name} dest={d} color="#f59e0b" r={3} delay={1.0 + i * 0.06} label />
              ))}

              {/* City dots - Nepal */}
              {NEPAL.map((d, i) => (
                <CityDot key={d.name} dest={d} color="#ff6b35" r={4} delay={0.9 + i * 0.1} label />
              ))}

              {/* City dots - South */}
              {SOUTH.map((d, i) => (
                <CityDot key={d.name} dest={d} color="#818cf8" r={2.5} delay={1.2 + i * 0.08} label />
              ))}

              {/* Delhi pulse rings */}
              <motion.circle
                cx={DELHI.x} cy={DELHI.y} r={10}
                fill="none" stroke="#f59e0b" strokeWidth="1.5"
                animate={{ scale: [1, 2.8, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${DELHI.x}px ${DELHI.y}px` }}
              />
              <motion.circle
                cx={DELHI.x} cy={DELHI.y} r={10}
                fill="none" stroke="#f59e0b" strokeWidth="1"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                style={{ transformOrigin: `${DELHI.x}px ${DELHI.y}px` }}
              />

              {/* Delhi origin dot */}
              <circle cx={DELHI.x} cy={DELHI.y} r={6} fill="#f59e0b" />
              <circle cx={DELHI.x} cy={DELHI.y} r={2.5} fill="white" />

              {/* Delhi label */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <rect x={DELHI.x + 10} y={DELHI.y - 12} width={68} height={17} rx={4}
                  fill="rgba(245,158,11,0.25)" stroke="rgba(245,158,11,0.7)" strokeWidth="1" />
                <text x={DELHI.x + 14} y={DELHI.y + 1} fontSize="9" fill="#f59e0b"
                  fontFamily="system-ui" fontWeight="bold" style={{ textShadow: "0 0 4px rgba(0,0,0,0.5)" }}>Delhi NCR</text>
              </motion.g>

              {/* Nepal text */}
              <motion.text
                x={258} y={157} fontSize="7.5" fill="rgba(255,107,53,0.85)"
                fontFamily="system-ui" fontWeight="bold" textAnchor="middle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
              >NEPAL</motion.text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;

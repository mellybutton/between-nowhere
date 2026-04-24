import { motion } from "framer-motion";

/**
 * Concept-specific animated SVG illustrations shown on the Learn "insight" step.
 * Each component renders inside the insight card (full width, ~120px tall).
 * Style: minimal, indigo accents, soft motion. Match the cinematic dark aesthetic.
 */

const ACCENT = "#7b89ff"; // primary-accent
const WARM = "#f59e7a"; // soft warm for warnings/mismatch
const MUTED = "rgba(123, 137, 255, 0.35)";

function SwrMismatch() {
  return (
    <svg viewBox="0 0 320 110" className="h-28 w-full" aria-hidden>
      {/* Source dot (transmitter) */}
      <motion.circle
        cx="50"
        cy="55"
        r="8"
        fill={ACCENT}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Forward signal line */}
      <motion.line
        x1="58"
        y1="55"
        x2="250"
        y2="55"
        stroke={ACCENT}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      {/* Forward arrow */}
      <motion.path
        d="M 230 48 L 250 55 L 230 62"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      {/* Reflected signal arrow (bouncing back) */}
      <motion.line
        x1="240"
        y1="55"
        x2="80"
        y2="55"
        stroke={WARM}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 0.7, delay: 1.4 }}
      />
      <motion.path
        d="M 100 48 L 80 55 L 100 62"
        fill="none"
        stroke={WARM}
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2 }}
      />
      {/* Antenna (mismatch point) */}
      <motion.circle
        cx="258"
        cy="55"
        r="9"
        fill="none"
        stroke={WARM}
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.6, delay: 1 }}
      />
      <motion.text
        x="258"
        y="88"
        textAnchor="middle"
        fill={WARM}
        fontSize="10"
        fontFamily="ui-sans-serif, system-ui"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        mismatch
      </motion.text>
    </svg>
  );
}

function RepeaterOffset() {
  return (
    <svg viewBox="0 0 320 110" className="h-28 w-full" aria-hidden>
      {/* TX line */}
      <motion.text
        x="20"
        y="35"
        fill={MUTED}
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.2 }}
      >
        TX 146.52
      </motion.text>
      <motion.line
        x1="20"
        y1="45"
        x2="300"
        y2="45"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {/* RX line, offset down */}
      <motion.text
        x="20"
        y="80"
        fill={MUTED}
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.9 }}
      >
        RX 147.12
      </motion.text>
      <motion.line
        x1="20"
        y1="90"
        x2="300"
        y2="90"
        stroke="#a78bfa"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      {/* Offset bracket */}
      <motion.path
        d="M 295 45 L 305 45 L 305 90 L 295 90"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      />
      <motion.text
        x="312"
        y="70"
        fill={ACCENT}
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        +
      </motion.text>
      {/* Pulses traveling */}
      {[0, 1].map((i) => (
        <motion.circle
          key={`tx-${i}`}
          cy="45"
          r="3"
          fill={ACCENT}
          initial={{ cx: 20, opacity: 0 }}
          animate={{ cx: 300, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5,
            delay: 1.5 + i * 1.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
      {[0, 1].map((i) => (
        <motion.circle
          key={`rx-${i}`}
          cy="90"
          r="3"
          fill="#a78bfa"
          initial={{ cx: 300, opacity: 0 }}
          animate={{ cx: 20, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5,
            delay: 2 + i * 1.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </svg>
  );
}

function SimplexVsRepeater() {
  return (
    <svg viewBox="0 0 320 120" className="h-28 w-full" aria-hidden>
      {/* Two ground stations */}
      <motion.circle cx="40" cy="95" r="6" fill={ACCENT} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <motion.circle cx="280" cy="95" r="6" fill={ACCENT} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      {/* Direct simplex path */}
      <motion.line
        x1="46"
        y1="95"
        x2="274"
        y2="95"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeDasharray="3 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.text
        x="160"
        y="110"
        textAnchor="middle"
        fill={MUTED}
        fontSize="8"
        fontFamily="ui-sans-serif, system-ui"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2 }}
      >
        simplex
      </motion.text>
      {/* Repeater (top) */}
      <motion.circle
        cx="160"
        cy="25"
        r="8"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      />
      <motion.circle
        cx="160"
        cy="25"
        r="14"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0.5, 1.4], opacity: [0.6, 0] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
      />
      {/* Repeater bounce path */}
      <motion.path
        d="M 46 90 Q 100 30 160 25 Q 220 30 274 90"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, delay: 1 }}
      />
    </svg>
  );
}

function AntennaPolarization() {
  return (
    <svg viewBox="0 0 320 120" className="h-28 w-full" aria-hidden>
      {/* Vertical antenna */}
      <motion.line
        x1="100"
        y1="20"
        x2="100"
        y2="100"
        stroke={ACCENT}
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.circle cx="100" cy="100" r="4" fill={ACCENT} />
      {/* Vertical waves */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={`v-${i}`}
          x1="115"
          y1={40 + i * 20}
          x2="155"
          y2={40 + i * 20}
          stroke={ACCENT}
          strokeWidth="1.2"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: [0, 0.8, 0], x: [0, 30, 60] }}
          transition={{
            duration: 2,
            delay: 0.5 + i * 0.3,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}
      {/* Horizontal antenna */}
      <motion.line
        x1="180"
        y1="60"
        x2="260"
        y2="60"
        stroke="#a78bfa"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.circle cx="220" cy="60" r="4" fill="#a78bfa" />
      {/* Horizontal waves */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={`h-${i}`}
          x1={200 + i * 20}
          y1="75"
          x2={200 + i * 20}
          y2="105"
          stroke="#a78bfa"
          strokeWidth="1.2"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.8, 0], y: [0, 15, 30] }}
          transition={{
            duration: 2,
            delay: 0.8 + i * 0.3,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}
    </svg>
  );
}

function LineOfSight() {
  return (
    <svg viewBox="0 0 320 120" className="h-28 w-full" aria-hidden>
      {/* Horizon curve */}
      <motion.path
        d="M 0 100 Q 160 90 320 100"
        fill="none"
        stroke={MUTED}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Tower A */}
      <motion.line
        x1="50"
        y1="95"
        x2="50"
        y2="50"
        stroke={ACCENT}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.circle cx="50" cy="50" r="3" fill={ACCENT} />
      {/* Tower B */}
      <motion.line
        x1="270"
        y1="95"
        x2="270"
        y2="50"
        stroke={ACCENT}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.circle cx="270" cy="50" r="3" fill={ACCENT} />
      {/* Direct line of sight */}
      <motion.line
        x1="50"
        y1="50"
        x2="270"
        y2="50"
        stroke={ACCENT}
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      {/* Pulse along the line */}
      <motion.circle
        cy="50"
        r="3"
        fill={ACCENT}
        initial={{ cx: 50, opacity: 0 }}
        animate={{ cx: 270, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, delay: 1.6, repeat: Infinity, repeatDelay: 0.5 }}
      />
    </svg>
  );
}

const REGISTRY: Record<string, () => JSX.Element> = {
  swr: SwrMismatch,
  offset: RepeaterOffset,
  simplex_vs_repeater: SimplexVsRepeater,
  antennas: AntennaPolarization,
  line_of_sight: LineOfSight,
};

export function ConceptIllustration({ conceptId }: { conceptId: string }) {
  const Illo = REGISTRY[conceptId];
  if (!Illo) return null;
  return (
    <div className="mb-5 flex items-center justify-center rounded-2xl border border-border/30 bg-card/20 px-4 py-5">
      <Illo />
    </div>
  );
}

export function hasIllustration(conceptId: string): boolean {
  return conceptId in REGISTRY;
}

import { motion } from "motion/react";

export function TuningResonance() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Frequency spectrum baseline */}
      <motion.line
        x1="80"
        y1="200"
        x2="320"
        y2="200"
        stroke="#1e3a8a"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Wide scanning curve initially */}
      <motion.path
        d="M 80 200 Q 120 180, 160 190 Q 200 195, 240 185 Q 280 175, 320 200"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 3, delay: 1, times: [0, 0.3, 0.7, 1] }}
      />

      {/* Scanning indicator sweeping */}
      <motion.line
        x1="100"
        y1="180"
        x2="100"
        y2="210"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ x1: 100, x2: 100, opacity: 0 }}
        animate={{ x1: [100, 300], x2: [100, 300], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.5, delay: 1.5, times: [0, 0.8, 1] }}
      />

      {/* Resonance peak forming */}
      <motion.path
        d="M 180 200 Q 190 150, 200 100 Q 210 150, 220 200"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 1] }}
        transition={{ duration: 1.5, delay: 4 }}
      />

      {/* Peak marker */}
      <motion.circle
        cx="200"
        cy="100"
        r="8"
        fill="#60a5fa"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 5 }}
      />

      {/* Resonance glow */}
      <motion.circle
        cx="200"
        cy="100"
        r="20"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 5.5, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Tuned signal strength bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`bar-${i}`}
          x={185 + i * 7}
          y={110 + (2 - Math.abs(2 - i)) * 15}
          width="5"
          height={90 - (2 - Math.abs(2 - i)) * 15}
          rx="2"
          fill="#10b981"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 1], opacity: [0, 0.8 + i * 0.05, 0.8 + i * 0.05] }}
          transition={{ duration: 0.6, delay: 5.5 + i * 0.1 }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}

      {/* Narrow bandwidth indicator */}
      <motion.path
        d="M 190 210 L 190 220 L 210 220 L 210 210"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 6.5 }}
      />

      {/* Frequency markers */}
      {[80, 140, 200, 260, 320].map((x, i) => (
        <motion.line
          key={`freq-${i}`}
          x1={x}
          y1="200"
          x2={x}
          y2="210"
          stroke="#93c5fd"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 + i * 0.1 }}
        />
      ))}

      {/* Lock-in indicator */}
      <motion.circle
        cx="200"
        cy="230"
        r="10"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 7 }}
      />

      <motion.path
        d="M 195 230 L 198 233 L 205 225"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 7.5 }}
      />

      {/* Clear signal indicator */}
      <motion.path
        d="M 200 85 L 200 70"
        stroke="#10b981"
        strokeWidth="2"
        markerEnd="url(#arrowGreen2)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ delay: 8 }}
      />

      <defs>
        <marker
          id="arrowGreen2"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
        </marker>
      </defs>
    </svg>
  );
}

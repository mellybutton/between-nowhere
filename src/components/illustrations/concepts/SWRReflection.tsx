import { motion } from "motion/react";

export function SWRReflection() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Transmitter */}
      <motion.rect
        x="40"
        y="135"
        width="30"
        height="30"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Transmission line */}
      <line x1="70" y1="150" x2="300" y2="150" stroke="#1e3a8a" strokeWidth="4" />

      {/* Forward wave */}
      <motion.path
        d="M 70 150 Q 120 130, 170 150 T 270 150"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="0 500"
        initial={{ strokeDasharray: "0 500" }}
        animate={{ strokeDasharray: ["0 500", "500 0"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Antenna (mismatched) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <line x1="300" y1="150" x2="330" y2="100" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="300" cy="150" r="8" fill="none" stroke="#ef4444" strokeWidth="2" />
      </motion.g>

      {/* Reflected wave */}
      <motion.path
        d="M 300 150 Q 250 170, 200 150 T 100 150"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="0 500"
        initial={{ strokeDasharray: "0 500", opacity: 0 }}
        animate={{ strokeDasharray: ["0 500", "500 0"], opacity: [0, 1, 1] }}
        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Standing wave markers */}
      {[120, 180, 240].map((x, i) => (
        <motion.g key={i}>
          <motion.line
            x1={x}
            y1="150"
            x2={x}
            y2="120"
            stroke="#fbbf24"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0.8] }}
            transition={{ duration: 0.5, delay: 2 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.line
            x1={x}
            y1="150"
            x2={x}
            y2="180"
            stroke="#fbbf24"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0.8] }}
            transition={{ duration: 0.5, delay: 2 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.g>
      ))}

      {/* SWR warning indicator */}
      <motion.circle
        cx="150"
        cy="150"
        r="25"
        fill="none"
        stroke="#ef4444"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1.5], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, delay: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
      />
    </svg>
  );
}

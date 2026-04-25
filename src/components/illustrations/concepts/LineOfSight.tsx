import { motion } from "motion/react";

export function LineOfSight() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))" }}
    >
      {/* Transmitter */}
      <motion.circle
        cx="50"
        cy="200"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Signal beam */}
      <motion.line
        x1="50"
        y1="200"
        x2="200"
        y2="120"
        stroke="url(#beamGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Hill blocking signal */}
      <motion.path
        d="M 180 250 Q 220 80 260 250"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Blocked indicator */}
      <motion.circle
        cx="220"
        cy="120"
        r="15"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Receiver (no signal) */}
      <motion.circle
        cx="350"
        cy="200"
        r="8"
        fill="none"
        stroke="#475569"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      <defs>
        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

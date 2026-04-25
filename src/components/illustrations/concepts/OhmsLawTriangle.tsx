import { motion } from "motion/react";

export function OhmsLawTriangle() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Triangle structure */}
      <motion.path
        d="M 200 80 L 280 220 L 120 220 Z"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Top point - Voltage (V) */}
      <motion.circle
        cx="200"
        cy="80"
        r="12"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      />
      <motion.circle
        cx="200"
        cy="80"
        r="6"
        fill="#60a5fa"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.3 }}
      />

      {/* Bottom left - Current (I) */}
      <motion.circle
        cx="120"
        cy="220"
        r="12"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      />
      <motion.circle
        cx="120"
        cy="220"
        r="6"
        fill="#10b981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      />

      {/* Bottom right - Resistance (R) */}
      <motion.circle
        cx="280"
        cy="220"
        r="12"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      />
      <motion.circle
        cx="280"
        cy="220"
        r="6"
        fill="#fbbf24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.7 }}
      />

      {/* Particles flowing between points */}
      {/* V to I */}
      <motion.circle
        r="4"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        <animateMotion
          dur="3s"
          begin="2s"
          repeatCount="indefinite"
          path="M 200 80 L 120 220"
        />
      </motion.circle>

      {/* I to R */}
      <motion.circle
        r="4"
        fill="#10b981"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 1 }}
      >
        <animateMotion
          dur="3s"
          begin="3s"
          repeatCount="indefinite"
          path="M 120 220 L 280 220"
        />
      </motion.circle>

      {/* R to V */}
      <motion.circle
        r="4"
        fill="#fbbf24"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, delay: 4, repeat: Infinity, repeatDelay: 1 }}
      >
        <animateMotion
          dur="3s"
          begin="4s"
          repeatCount="indefinite"
          path="M 280 220 L 200 80"
        />
      </motion.circle>

      {/* Center glow - relationship */}
      <motion.circle
        cx="200"
        cy="173"
        r="40"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.4, 0] }}
        transition={{ duration: 3, delay: 5, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Gentle pulses at each point */}
      <motion.circle
        cx="200"
        cy="80"
        r="20"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 4 }}
      />

      <motion.circle
        cx="120"
        cy="220"
        r="20"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 4 }}
      />

      <motion.circle
        cx="280"
        cy="220"
        r="20"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, delay: 4, repeat: Infinity, repeatDelay: 4 }}
      />
    </svg>
  );
}

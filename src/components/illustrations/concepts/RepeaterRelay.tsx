import { motion } from "motion/react";

export function RepeaterRelay() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Source station */}
      <motion.circle
        cx="80"
        cy="220"
        r="10"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Signal to repeater */}
      <motion.path
        d="M 80 220 Q 120 150 200 100"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray="0 1000"
        initial={{ strokeDasharray: "0 1000" }}
        animate={{ strokeDasharray: ["0 1000", "1000 0"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Repeater tower */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <line x1="200" y1="100" x2="200" y2="50" stroke="#1e3a8a" strokeWidth="3" />
        <circle cx="200" cy="100" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <motion.circle
          cx="200"
          cy="100"
          r="20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </motion.g>

      {/* Signal from repeater */}
      <motion.path
        d="M 200 100 Q 280 150 320 220"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeDasharray="0 1000"
        initial={{ strokeDasharray: "0 1000" }}
        animate={{ strokeDasharray: ["0 1000", "1000 0"] }}
        transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Destination station */}
      <motion.circle
        cx="320"
        cy="220"
        r="10"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ delay: 3 }}
      />

      {/* Received signal pulse */}
      <motion.circle
        cx="320"
        cy="220"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, delay: 3, repeat: Infinity, repeatDelay: 2.2 }}
      />
    </svg>
  );
}

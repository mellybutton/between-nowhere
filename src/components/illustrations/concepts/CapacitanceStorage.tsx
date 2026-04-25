import { motion } from "motion/react";

export function CapacitanceStorage() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Left plate */}
      <motion.line
        x1="140"
        y1="100"
        x2="140"
        y2="200"
        stroke="#60a5fa"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Right plate */}
      <motion.line
        x1="260"
        y1="100"
        x2="260"
        y2="200"
        stroke="#60a5fa"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />

      {/* Connection wires */}
      <motion.line
        x1="80"
        y1="150"
        x2="140"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 1 }}
      />

      <motion.line
        x1="260"
        y1="150"
        x2="320"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      />

      {/* Electric field between plates - charging */}
      <motion.rect
        x="145"
        y="100"
        width="110"
        height="100"
        fill="url(#chargeGradient)"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0.3, 0], scaleX: [0, 1, 1, 1, 0] }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, repeatDelay: 1 }}
        style={{ transformOrigin: "center" }}
      />

      {/* Charge symbols on left plate (negative) */}
      {[-30, -10, 10, 30].map((offset, i) => (
        <motion.g key={`neg-${i}`}>
          <motion.line
            x1="130"
            y1={150 + offset}
            x2="135"
            y2={150 + offset}
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0.8, 0] }}
            transition={{ duration: 6, delay: 2.5 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.g>
      ))}

      {/* Charge symbols on right plate (positive) */}
      {[-30, -10, 10, 30].map((offset, i) => (
        <motion.g key={`pos-${i}`}>
          <motion.line
            x1="265"
            y1={150 + offset}
            x2="270"
            y2={150 + offset}
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0.8, 0] }}
            transition={{ duration: 6, delay: 2.5 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.line
            x1="267.5"
            y1={150 + offset - 2.5}
            x2="267.5"
            y2={150 + offset + 2.5}
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0.8, 0] }}
            transition={{ duration: 6, delay: 2.5 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.g>
      ))}

      {/* Field lines (invisible electric field) */}
      {[120, 140, 160, 180].map((y, i) => (
        <motion.line
          key={`field-${i}`}
          x1="145"
          y1={y}
          x2="255"
          y2={y}
          stroke="#93c5fd"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: 6, delay: 3 + i * 0.1, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Energy storage glow */}
      <motion.ellipse
        cx="200"
        cy="150"
        rx="70"
        ry="60"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1.2, 1, 0], opacity: [0, 0.5, 0.7, 0.5, 0] }}
        transition={{ duration: 6, delay: 4, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Charging/discharging indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 5, repeat: Infinity, repeatDelay: 5 }}
      />

      <defs>
        <linearGradient id="chargeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

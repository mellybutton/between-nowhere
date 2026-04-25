import { motion } from "motion/react";

export function PropagationReflection() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Transmitter */}
      <motion.circle
        cx="80"
        cy="200"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Reflective layer (ionosphere/surface) */}
      <motion.path
        d="M 50 100 Q 200 80, 350 100"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="3"
        strokeDasharray="8 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Outgoing beam */}
      <motion.path
        d="M 80 200 Q 140 150, 200 95"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      {/* Outgoing pulse */}
      <motion.circle
        cx="80"
        cy="200"
        r="6"
        fill="#60a5fa"
        initial={{ cx: 80, cy: 200, opacity: 0 }}
        animate={{
          cx: [80, 140, 200],
          cy: [200, 150, 95],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Reflection point glow */}
      <motion.circle
        cx="200"
        cy="95"
        r="12"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatDelay: 2.5 }}
      />

      {/* Reflected beam */}
      <motion.path
        d="M 200 95 Q 260 150, 320 200"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 2.5 }}
      />

      {/* Reflected pulse */}
      <motion.circle
        cx="200"
        cy="95"
        r="6"
        fill="#34d399"
        initial={{ cx: 200, cy: 95, opacity: 0 }}
        animate={{
          cx: [200, 260, 320],
          cy: [95, 150, 200],
          opacity: [0, 1, 1],
        }}
        transition={{ duration: 2, delay: 4, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Receiver */}
      <motion.circle
        cx="320"
        cy="200"
        r="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />

      {/* Received signal indicator */}
      <motion.circle
        cx="320"
        cy="200"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 6, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Angle indicators */}
      <motion.path
        d="M 120 190 A 40 40 0 0 1 140 155"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ delay: 3 }}
      />
      <motion.path
        d="M 260 155 A 40 40 0 0 1 280 190"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ delay: 3.5 }}
      />
    </svg>
  );
}

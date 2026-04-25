import { motion } from "motion/react";

export function TransistorSwitch() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Main power line (collector to emitter) - initially dim */}
      <motion.line
        x1="200"
        y1="80"
        x2="200"
        y2="220"
        stroke="#1e3a8a"
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Transistor symbol base */}
      <motion.line
        x1="170"
        y1="130"
        x2="170"
        y2="170"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      />

      {/* Base connection */}
      <motion.line
        x1="100"
        y1="150"
        x2="170"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      />

      {/* Collector */}
      <motion.line
        x1="170"
        y1="130"
        x2="200"
        y2="100"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      />

      {/* Emitter with arrow */}
      <motion.line
        x1="170"
        y1="170"
        x2="200"
        y2="200"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      />

      {/* Emitter arrow */}
      <motion.path
        d="M 195 195 L 200 200 L 190 200"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      />

      {/* Small control signal pulse */}
      <motion.circle
        cx="100"
        cy="150"
        r="6"
        fill="#fbbf24"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 2.5 }}
      />

      {/* Control signal traveling to base */}
      <motion.circle
        cx="100"
        cy="150"
        r="4"
        fill="#fbbf24"
        initial={{ cx: 100, opacity: 0 }}
        animate={{ cx: [100, 170], opacity: [0, 1, 0] }}
        transition={{ duration: 1, delay: 3 }}
      />

      {/* Transistor activation glow */}
      <motion.circle
        cx="185"
        cy="150"
        r="25"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1.4], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 4 }}
      />

      {/* Main power channel opens - bright flow */}
      <motion.line
        x1="200"
        y1="80"
        x2="200"
        y2="220"
        stroke="#10b981"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.9, 0.9] }}
        transition={{ duration: 1.5, delay: 4.5 }}
      />

      {/* Large current flow particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="80"
          r="7"
          fill="#10b981"
          initial={{ cy: 80, opacity: 0 }}
          animate={{ cy: [80, 220], opacity: [0, 1, 1, 0.8] }}
          transition={{ duration: 2, delay: 5 + i * 0.5, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Power source indicator */}
      <motion.circle
        cx="200"
        cy="70"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      />

      {/* Load indicator */}
      <motion.circle
        cx="200"
        cy="230"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Load active glow */}
      <motion.circle
        cx="200"
        cy="230"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, delay: 6.5, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Small signal label */}
      <motion.text
        x="85"
        y="145"
        fill="#fbbf24"
        fontSize="10"
        opacity="0.7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3 }}
      >
        small
      </motion.text>

      {/* Large flow label */}
      <motion.text
        x="210"
        y="155"
        fill="#10b981"
        fontSize="10"
        opacity="0.7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 5.5 }}
      >
        large
      </motion.text>
    </svg>
  );
}

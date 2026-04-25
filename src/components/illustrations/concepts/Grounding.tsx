import { motion } from "motion/react";

export function Grounding() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Equipment */}
      <motion.rect
        x="175"
        y="60"
        width="50"
        height="40"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Ground wire */}
      <motion.line
        x1="200"
        y1="100"
        x2="200"
        y2="220"
        stroke="#3b82f6"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Energy flow particles */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="100"
          r="4"
          fill="#60a5fa"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 120, opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: 1 + i * 0.25,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}

      {/* Ground plane */}
      <motion.line
        x1="100"
        y1="220"
        x2="300"
        y2="220"
        stroke="#1e3a8a"
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Ground symbol */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <line x1="150" y1="230" x2="250" y2="230" stroke="#1e3a8a" strokeWidth="2" />
        <line x1="165" y1="240" x2="235" y2="240" stroke="#1e3a8a" strokeWidth="2" />
        <line x1="180" y1="250" x2="220" y2="250" stroke="#1e3a8a" strokeWidth="2" />
      </motion.g>

      {/* Dissipation waves */}
      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={i}
          cx="200"
          cy="220"
          rx="60"
          ry="20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 3], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, delay: 2 + i * 0.6, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Safe indicator */}
      <motion.circle
        cx="200"
        cy="80"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 2.5 }}
      />
      <motion.path
        d="M 193 80 L 198 85 L 207 73"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 2.7 }}
      />
    </svg>
  );
}

import { motion } from "motion/react";

export function DiffractionAroundObstacle() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Transmitter */}
      <motion.circle
        cx="80"
        cy="150"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Obstacle (mountain/building) */}
      <motion.path
        d="M 180 220 L 220 100 L 260 220 Z"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      {/* Solid obstacle fill */}
      <motion.path
        d="M 180 220 L 220 100 L 260 220 Z"
        fill="#0f172a"
        opacity="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      {/* Direct path blocked */}
      <motion.line
        x1="80"
        y1="150"
        x2="200"
        y2="150"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      {/* Diffracted path over obstacle */}
      <motion.path
        d="M 80 150 Q 150 130, 220 100 Q 250 110, 280 140 Q 300 150, 320 150"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 2, delay: 2 }}
      />

      {/* Traveling wave pulse */}
      <motion.circle
        r="5"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 1, 0.8],
        }}
        transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <animateMotion
          dur="3s"
          begin="3s"
          repeatCount="indefinite"
          path="M 80 150 Q 150 130, 220 100 Q 250 110, 280 140 Q 300 150, 320 150"
        />
      </motion.circle>

      {/* Diffraction point glow (top of obstacle) */}
      <motion.circle
        cx="220"
        cy="100"
        r="10"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.7, 0] }}
        transition={{ duration: 1.5, delay: 4, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Bent wave indicators */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M ${220 + i * 15} ${105 + i * 10} Q ${240 + i * 10} ${120 + i * 8}, ${260 + i * 15} ${135 + i * 5}`}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.5 + i * 0.2, duration: 0.8 }}
        />
      ))}

      {/* Receiver */}
      <motion.circle
        cx="320"
        cy="150"
        r="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />

      {/* Received signal */}
      <motion.circle
        cx="320"
        cy="150"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1.4], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 6, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Blocked indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="12"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 0.6, 0.6] }}
        transition={{ delay: 2.5 }}
      />
      <motion.path
        d="M 194 144 L 206 156 M 206 144 L 194 156"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 3 }}
      />
    </svg>
  );
}

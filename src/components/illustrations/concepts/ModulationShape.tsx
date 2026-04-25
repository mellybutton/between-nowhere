import { motion } from "motion/react";

export function ModulationShape() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Carrier wave - base frequency */}
      <motion.path
        d="M 50 150 Q 90 130, 130 150 T 210 150 T 290 150 T 370 150"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2 }}
      />

      {/* Modulated wave - changes shape */}
      <motion.path
        d="M 50 150 Q 90 130, 130 150 T 210 150 T 290 150 T 370 150"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.9, 0.9] }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <animate
          attributeName="d"
          values="
            M 50 150 Q 90 130, 130 150 T 210 150 T 290 150 T 370 150;
            M 50 150 Q 90 135, 130 150 T 210 140 T 290 150 T 370 150;
            M 50 150 Q 90 130, 130 150 T 210 150 T 290 145 T 370 150;
            M 50 150 Q 90 130, 130 150 T 210 150 T 290 150 T 370 150
          "
          dur="6s"
          repeatCount="indefinite"
          begin="2s"
        />
      </motion.path>

      {/* Information packets riding the wave */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={i}>
          <motion.circle
            cx={100 + i * 80}
            cy="150"
            r="5"
            fill="#60a5fa"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
              cy: [150, 140, 150, 150]
            }}
            transition={{
              duration: 3,
              delay: 2.5 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />

          {/* Packet glow */}
          <motion.circle
            cx={100 + i * 80}
            cy="150"
            r="12"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 2],
              opacity: [0, 0.6, 0],
              cy: [150, 140, 150]
            }}
            transition={{
              duration: 3,
              delay: 2.5 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </motion.g>
      ))}

      {/* Envelope visualization */}
      <motion.path
        d="M 50 150 Q 130 120, 210 130 T 370 150"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, delay: 2 }}
      />
      <motion.path
        d="M 50 150 Q 130 180, 210 170 T 370 150"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, delay: 2 }}
      />
    </svg>
  );
}

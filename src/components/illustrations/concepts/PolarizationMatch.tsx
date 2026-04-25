import { motion } from "motion/react";

export function PolarizationMatch() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Matched scenario (top) - vertical alignment */}
      <motion.g>
        {/* Transmitter antenna (vertical) */}
        <motion.line
          x1="100"
          y1="130"
          x2="100"
          y2="80"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.circle
          cx="100"
          cy="105"
          r="6"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        />

        {/* Signal wave (vertical polarization) */}
        <motion.path
          d="M 130 105 L 220 105"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* Vertical wave indicators */}
        {[150, 180, 210].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="105"
            x2={x}
            y2="95"
            stroke="#60a5fa"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.8] }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }}
          >
            <animate
              attributeName="y1"
              values="105;110;105"
              dur="2s"
              begin={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="95;90;95"
              dur="2s"
              begin={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </motion.line>
        ))}

        {/* Receiver antenna (vertical - matched) */}
        <motion.line
          x1="250"
          y1="130"
          x2="250"
          y2="80"
          stroke="#10b981"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />
        <motion.circle
          cx="250"
          cy="105"
          r="6"
          fill="#10b981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
        />

        {/* Strong signal indicator */}
        <motion.circle
          cx="250"
          cy="105"
          r="15"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.5, delay: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Match indicator */}
        <motion.path
          d="M 270 90 L 275 95 L 285 82"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3 }}
        />
      </motion.g>

      {/* Mismatched scenario (bottom) - perpendicular alignment */}
      <motion.g>
        {/* Transmitter antenna (vertical) */}
        <motion.line
          x1="100"
          y1="220"
          x2="100"
          y2="170"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
        <motion.circle
          cx="100"
          cy="195"
          r="6"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        />

        {/* Signal wave (vertical polarization) */}
        <motion.path
          d="M 130 195 L 220 195"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />

        {/* Receiver antenna (horizontal - mismatched) */}
        <motion.line
          x1="230"
          y1="195"
          x2="270"
          y2="195"
          stroke="#fbbf24"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        />
        <motion.circle
          cx="250"
          cy="195"
          r="6"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 }}
        />

        {/* Weak/no signal indicator */}
        <motion.circle
          cx="250"
          cy="195"
          r="15"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="3 3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1], opacity: [0, 0.5, 0.5] }}
          transition={{ duration: 1, delay: 2.8 }}
        />

        {/* Mismatch indicator */}
        <motion.path
          d="M 265 185 L 275 195 M 275 185 L 265 195"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.5 }}
        />
      </motion.g>

      {/* Oscillation animation for matched antennas */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6] }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.line
          x1="95"
          y1="105"
          x2="105"
          y2="105"
          stroke="#93c5fd"
          strokeWidth="1"
          opacity="0.5"
          animate={{ y1: [105, 100, 105], y2: [105, 110, 105] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="245"
          y1="105"
          x2="255"
          y2="105"
          stroke="#93c5fd"
          strokeWidth="1"
          opacity="0.5"
          animate={{ y1: [105, 100, 105], y2: [105, 110, 105] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}

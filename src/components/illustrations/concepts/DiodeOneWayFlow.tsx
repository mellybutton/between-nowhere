import { motion } from "motion/react";

export function DiodeOneWayFlow() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Forward direction (top) - allowed */}
      <motion.g>
        {/* Input line */}
        <motion.line
          x1="80"
          y1="110"
          x2="160"
          y2="110"
          stroke="#3b82f6"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Diode symbol - triangle */}
        <motion.path
          d="M 160 100 L 160 120 L 180 110 Z"
          fill="#60a5fa"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.6, delay: 1 }}
        />

        {/* Diode symbol - bar */}
        <motion.line
          x1="180"
          y1="100"
          x2="180"
          y2="120"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        />

        {/* Output line */}
        <motion.line
          x1="180"
          y1="110"
          x2="260"
          y2="110"
          stroke="#3b82f6"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        {/* Forward current particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`forward-${i}`}
            cx="80"
            cy="110"
            r="5"
            fill="#10b981"
            initial={{ cx: 80, opacity: 0 }}
            animate={{ cx: [80, 260], opacity: [0, 1, 1, 1, 0.8] }}
            transition={{ duration: 2.5, delay: 2 + i * 0.8, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}

        {/* Success indicator */}
        <motion.circle
          cx="260"
          cy="110"
          r="12"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1.4], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.5, delay: 4, repeat: Infinity, repeatDelay: 2.5 }}
        />

        {/* Arrow indicator */}
        <motion.path
          d="M 270 105 L 280 110 L 270 115"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.5 }}
        />
      </motion.g>

      {/* Reverse direction (bottom) - blocked */}
      <motion.g>
        {/* Input line (from right) */}
        <motion.line
          x1="260"
          y1="190"
          x2="180"
          y2="190"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Diode symbol - bar (blocking) */}
        <motion.line
          x1="180"
          y1="180"
          x2="180"
          y2="200"
          stroke="#fbbf24"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />

        {/* Diode symbol - triangle */}
        <motion.path
          d="M 180 190 L 160 180 L 160 200 Z"
          fill="#fbbf24"
          stroke="#fbbf24"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />

        {/* Output line (blocked) */}
        <motion.line
          x1="160"
          y1="190"
          x2="80"
          y2="190"
          stroke="#475569"
          strokeWidth="3"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.7 }}
        />

        {/* Reverse current particles - blocked */}
        {[0, 1].map((i) => (
          <motion.circle
            key={`reverse-${i}`}
            cx="260"
            cy="190"
            r="5"
            fill="#ef4444"
            initial={{ cx: 260, opacity: 0 }}
            animate={{ cx: [260, 200, 185], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 2.5 + i * 1, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}

        {/* Blocked indicator */}
        <motion.circle
          cx="180"
          cy="190"
          r="15"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1], opacity: [0, 0.8, 0.8] }}
          transition={{ duration: 0.8, delay: 3.5 }}
        />

        {/* X symbol */}
        <motion.path
          d="M 174 184 L 186 196 M 186 184 L 174 196"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 4 }}
        />
      </motion.g>

      {/* Labels */}
      <motion.circle
        cx="60"
        cy="110"
        r="4"
        fill="#10b981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      />

      <motion.circle
        cx="60"
        cy="190"
        r="4"
        fill="#ef4444"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5 }}
      />
    </svg>
  );
}

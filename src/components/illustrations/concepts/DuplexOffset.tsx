import { motion } from "motion/react";

export function DuplexOffset() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Transmit path (upper) */}
      <motion.g>
        <motion.line
          x1="80"
          y1="120"
          x2="320"
          y2="120"
          stroke="#3b82f6"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
        />

        {/* TX arrow */}
        <motion.path
          d="M 310 115 L 320 120 L 310 125"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />

        {/* TX pulse moving right */}
        <motion.circle
          cx="80"
          cy="120"
          r="6"
          fill="#60a5fa"
          initial={{ cx: 80 }}
          animate={{ cx: 320 }}
          transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* TX label marker */}
        <motion.circle
          cx="60"
          cy="120"
          r="4"
          fill="#60a5fa"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        />
      </motion.g>

      {/* Receive path (lower) */}
      <motion.g>
        <motion.line
          x1="80"
          y1="180"
          x2="320"
          y2="180"
          stroke="#10b981"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* RX arrow */}
        <motion.path
          d="M 90 175 L 80 180 L 90 185"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />

        {/* RX pulse moving left */}
        <motion.circle
          cx="320"
          cy="180"
          r="6"
          fill="#34d399"
          initial={{ cx: 320 }}
          animate={{ cx: 80 }}
          transition={{ duration: 2, delay: 2.3, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* RX label marker */}
        <motion.circle
          cx="340"
          cy="180"
          r="4"
          fill="#34d399"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.3 }}
        />
      </motion.g>

      {/* Offset indicator */}
      <motion.line
        x1="200"
        y1="120"
        x2="200"
        y2="180"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 0.8, delay: 2 }}
      />

      {/* Frequency separation markers */}
      <motion.line
        x1="195"
        y1="120"
        x2="185"
        y2="120"
        stroke="#93c5fd"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5 }}
      />
      <motion.line
        x1="195"
        y1="180"
        x2="185"
        y2="180"
        stroke="#93c5fd"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5 }}
      />

      {/* Station endpoints */}
      <motion.rect
        x="70"
        y="140"
        width="20"
        height="20"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      <motion.rect
        x="310"
        y="140"
        width="20"
        height="20"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
    </svg>
  );
}

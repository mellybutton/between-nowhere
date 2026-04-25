import { motion } from "motion/react";

export function VHFvsUHFBehavior() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* VHF path (longer, smoother) */}
      <motion.g>
        <motion.path
          d="M 60 120 Q 150 100, 250 110 Q 320 115, 360 120"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* VHF wave pattern */}
        <motion.path
          d="M 60 120 Q 85 110, 110 120 T 160 120 T 210 120 T 260 120 T 310 120 T 360 120"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* VHF traveling pulse */}
        <motion.circle
          cx="60"
          cy="120"
          r="6"
          fill="#60a5fa"
          initial={{ cx: 60 }}
          animate={{ cx: [60, 150, 250, 320, 360] }}
          transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* VHF label marker */}
        <motion.circle
          cx="40"
          cy="120"
          r="5"
          fill="#3b82f6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        />
      </motion.g>

      {/* UHF path (shorter, tighter) */}
      <motion.g>
        <motion.path
          d="M 60 180 L 280 180"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* UHF wave pattern (tighter frequency) */}
        <motion.path
          d="M 60 180 Q 75 172, 90 180 T 120 180 T 150 180 T 180 180 T 210 180 T 240 180 T 270 180"
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />

        {/* UHF traveling pulse */}
        <motion.circle
          cx="60"
          cy="180"
          r="6"
          fill="#34d399"
          initial={{ cx: 60 }}
          animate={{ cx: [60, 120, 180, 240, 280] }}
          transition={{ duration: 2.5, delay: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* UHF label marker */}
        <motion.circle
          cx="40"
          cy="180"
          r="5"
          fill="#10b981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.3 }}
        />
      </motion.g>

      {/* Transmitter (shared) */}
      <motion.rect
        x="50"
        y="140"
        width="20"
        height="20"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* VHF receiver */}
      <motion.circle
        cx="360"
        cy="120"
        r="8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />

      {/* UHF receiver */}
      <motion.circle
        cx="280"
        cy="180"
        r="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      />

      {/* Comparison indicators */}
      <motion.line
        x1="360"
        y1="130"
        x2="360"
        y2="145"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3 }}
      />
      <motion.text
        x="365"
        y="140"
        fill="#93c5fd"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3 }}
      >
        longer
      </motion.text>

      <motion.line
        x1="280"
        y1="170"
        x2="280"
        y2="155"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3.5 }}
      />
      <motion.text
        x="285"
        y="165"
        fill="#93c5fd"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3.5 }}
      >
        shorter
      </motion.text>

      {/* Behavior difference glow */}
      <motion.circle
        cx="200"
        cy="150"
        r="40"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, delay: 4, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

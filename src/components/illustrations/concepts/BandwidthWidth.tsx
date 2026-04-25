import { motion } from "motion/react";

export function BandwidthWidth() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Narrow bandwidth channel */}
      <motion.g>
        <motion.line
          x1="80"
          y1="120"
          x2="320"
          y2="120"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1] }}
          transition={{ duration: 1.5 }}
        />

        {/* Narrow signal pulse */}
        <motion.circle
          cx="80"
          cy="120"
          r="6"
          fill="#60a5fa"
          initial={{ cx: 80 }}
          animate={{ cx: 320 }}
          transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Label line */}
        <motion.line
          x1="80"
          y1="110"
          x2="80"
          y2="95"
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        />
        <motion.line
          x1="320"
          y1="110"
          x2="320"
          y2="95"
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        />
      </motion.g>

      {/* Wide bandwidth channel */}
      <motion.g>
        {/* Wide gradient band */}
        <motion.rect
          x="80"
          y="165"
          width="240"
          height="50"
          fill="url(#wideGradient)"
          opacity="0.6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ transformOrigin: "left center" }}
        />

        {/* Wide signal pulse */}
        <motion.ellipse
          cx="80"
          cy="190"
          rx="15"
          ry="20"
          fill="#60a5fa"
          opacity="0.7"
          initial={{ cx: 80 }}
          animate={{ cx: 320 }}
          transition={{ duration: 2.5, delay: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Label lines */}
        <motion.line
          x1="80"
          y1="220"
          x2="80"
          y2="235"
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        />
        <motion.line
          x1="320"
          y1="220"
          x2="320"
          y2="235"
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        />
      </motion.g>

      {/* Comparison glow */}
      <motion.circle
        cx="200"
        cy="155"
        r="30"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      <defs>
        <linearGradient id="wideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

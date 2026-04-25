import { motion } from "motion/react";

export function CallsignExchange() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Station 1 (left) */}
      <motion.g>
        <motion.circle
          cx="100"
          cy="150"
          r="15"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />

        <motion.circle
          cx="100"
          cy="150"
          r="8"
          fill="#60a5fa"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        />

        {/* Callsign badge */}
        <motion.path
          d="M 100 115 L 115 122 L 115 135 L 100 142 L 85 135 L 85 122 Z"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1 }}
        />

        {/* ID marker */}
        <motion.circle
          cx="100"
          cy="128"
          r="3"
          fill="#60a5fa"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
        />
      </motion.g>

      {/* Station 2 (right) */}
      <motion.g>
        <motion.circle
          cx="300"
          cy="150"
          r="15"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />

        <motion.circle
          cx="300"
          cy="150"
          r="8"
          fill="#10b981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />

        {/* Callsign badge */}
        <motion.path
          d="M 300 115 L 315 122 L 315 135 L 300 142 L 285 135 L 285 122 Z"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ delay: 1.4, duration: 1 }}
        />

        {/* ID marker */}
        <motion.circle
          cx="300"
          cy="128"
          r="3"
          fill="#10b981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 }}
        />
      </motion.g>

      {/* Communication path */}
      <motion.line
        x1="100"
        y1="150"
        x2="300"
        y2="150"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      />

      {/* Station 1 transmitting callsign */}
      <motion.g>
        <motion.circle
          cx="100"
          cy="150"
          r="8"
          fill="#60a5fa"
          initial={{ cx: 100, opacity: 0 }}
          animate={{ cx: [100, 300], opacity: [0, 1, 1, 0.8] }}
          transition={{ duration: 2, delay: 3 }}
        />

        {/* Callsign data packet */}
        <motion.rect
          x="95"
          y="145"
          width="10"
          height="10"
          rx="2"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          initial={{ x: 95, opacity: 0 }}
          animate={{ x: [95, 295], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 3 }}
        />
      </motion.g>

      {/* Station 1 transmission pulse */}
      <motion.circle
        cx="100"
        cy="150"
        r="20"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 5 }}
      />

      {/* Station 2 receiving */}
      <motion.circle
        cx="300"
        cy="150"
        r="20"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 5 }}
      />

      {/* Station 2 transmitting callsign back */}
      <motion.g>
        <motion.circle
          cx="300"
          cy="150"
          r="8"
          fill="#10b981"
          initial={{ cx: 300, opacity: 0 }}
          animate={{ cx: [300, 100], opacity: [0, 1, 1, 0.8] }}
          transition={{ duration: 2, delay: 6 }}
        />

        {/* Callsign data packet */}
        <motion.rect
          x="295"
          y="145"
          width="10"
          height="10"
          rx="2"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          initial={{ x: 295, opacity: 0 }}
          animate={{ x: [295, 95], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 6 }}
        />
      </motion.g>

      {/* Station 2 transmission pulse */}
      <motion.circle
        cx="300"
        cy="150"
        r="20"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, delay: 6, repeat: Infinity, repeatDelay: 5 }}
      />

      {/* Station 1 receiving confirmation */}
      <motion.circle
        cx="100"
        cy="150"
        r="20"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 8 }}
      />

      {/* Exchange complete indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="12"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.6, delay: 8.5 }}
      />

      <motion.path
        d="M 195 150 L 198 153 L 205 145"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 9 }}
      />

      {/* Mutual identification glow */}
      <motion.ellipse
        cx="200"
        cy="150"
        rx="110"
        ry="40"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1.5], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, delay: 9.5 }}
      />
    </svg>
  );
}

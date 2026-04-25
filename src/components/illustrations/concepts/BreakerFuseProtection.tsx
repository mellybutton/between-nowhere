import { motion } from "motion/react";

export function BreakerFuseProtection() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Power source */}
      <motion.rect
        x="60"
        y="135"
        width="30"
        height="30"
        rx="4"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Power indicator */}
      <motion.circle
        cx="75"
        cy="150"
        r="8"
        fill="#60a5fa"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* Circuit line to breaker */}
      <motion.line
        x1="90"
        y1="150"
        x2="160"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Normal current flow */}
      <motion.circle
        cx="90"
        cy="150"
        r="5"
        fill="#60a5fa"
        initial={{ cx: 90, opacity: 0 }}
        animate={{ cx: [90, 125, 160], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: 1.5, repeat: 2 }}
      />

      {/* Breaker/Fuse protective gate */}
      <motion.g>
        <motion.rect
          x="160"
          y="130"
          width="40"
          height="40"
          rx="5"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ delay: 1 }}
        />

        {/* Breaker switch (closed initially) */}
        <motion.line
          x1="170"
          y1="150"
          x2="190"
          y2="150"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ delay: 1.5, duration: 0.5, times: [0, 0.3, 0.6, 1] }}
        />

        {/* Breaker opens */}
        <motion.line
          x1="170"
          y1="150"
          x2="185"
          y2="135"
          stroke="#fbbf24"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 1, 1], opacity: [0, 0, 1, 1] }}
          transition={{ delay: 1.5, duration: 2, times: [0, 0.6, 0.8, 1] }}
        />
      </motion.g>

      {/* Surge approaching */}
      <motion.g>
        <motion.circle
          cx="90"
          cy="150"
          r="8"
          fill="#ef4444"
          initial={{ cx: 90, opacity: 0, scale: 0 }}
          animate={{
            cx: [90, 125, 160],
            opacity: [0, 1, 1],
            scale: [0, 1.5, 1.8],
          }}
          transition={{ duration: 1.5, delay: 4.5 }}
        />

        {/* Surge glow */}
        <motion.circle
          cx="90"
          cy="150"
          r="15"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          initial={{ cx: 90, opacity: 0 }}
          animate={{
            cx: [90, 125, 160],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 2],
          }}
          transition={{ duration: 1.5, delay: 4.5 }}
        />
      </motion.g>

      {/* Protection activation */}
      <motion.circle
        cx="180"
        cy="150"
        r="25"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 6 }}
      />

      {/* Stopped indicator at breaker */}
      <motion.circle
        cx="180"
        cy="150"
        r="12"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ delay: 6.5 }}
      />
      <motion.path
        d="M 174 144 L 186 156 M 186 144 L 174 156"
        stroke="#ef4444"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 7 }}
      />

      {/* Protected load (right side) */}
      <motion.g>
        <motion.line
          x1="200"
          y1="150"
          x2="270"
          y2="150"
          stroke="#1e3a8a"
          strokeWidth="3"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1, delay: 2 }}
        />

        <motion.rect
          x="270"
          y="135"
          width="30"
          height="30"
          rx="4"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5 }}
        />

        {/* Protected indicator */}
        <motion.circle
          cx="285"
          cy="125"
          r="8"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 7.5 }}
        />
        <motion.path
          d="M 280 125 L 283 128 L 290 119"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 8 }}
        />
      </motion.g>

      {/* Safety message */}
      <motion.text
        x="180"
        y="115"
        fill="#10b981"
        fontSize="11"
        textAnchor="middle"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 8.5 }}
      >
        SAFE
      </motion.text>
    </svg>
  );
}

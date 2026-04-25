import { motion } from "motion/react";

export function CTCSSAccessTone() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Repeater gate (circle) */}
      <motion.circle
        cx="280"
        cy="150"
        r="50"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8 }}
      />

      {/* Gate lock indicator - closed initially */}
      <motion.g
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <rect
          x="275"
          y="140"
          width="10"
          height="15"
          rx="2"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />
        <circle cx="280" cy="160" r="4" fill="#ef4444" />
      </motion.g>

      {/* CTCSS tone key */}
      <motion.g
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <circle cx="120" cy="150" r="8" fill="none" stroke="#60a5fa" strokeWidth="2" />

        {/* Tone wave inside key */}
        <motion.path
          d="M 110 150 Q 115 145, 120 150 T 130 150"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </motion.g>

      {/* Tone traveling to gate */}
      <motion.path
        d="M 120 150 L 230 150"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {/* Tone pulse moving */}
      <motion.circle
        cx="120"
        cy="150"
        r="5"
        fill="#60a5fa"
        initial={{ cx: 120 }}
        animate={{ cx: 230 }}
        transition={{ duration: 1, delay: 2 }}
      />

      {/* Gate unlocking animation */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        {/* Open lock */}
        <motion.rect
          x="270"
          y="135"
          width="10"
          height="15"
          rx="2"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ y: 135 }}
          animate={{ y: 130 }}
          transition={{ delay: 3 }}
        />
        <circle cx="280" cy="160" r="4" fill="#10b981" />
      </motion.g>

      {/* Gate opening - expanding circle */}
      <motion.circle
        cx="280"
        cy="150"
        r="50"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 0.8, 0.8], scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      />

      {/* Signal passing through gate */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.path
          d="M 330 150 L 370 150"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="0 100"
          initial={{ strokeDasharray: "0 100" }}
          animate={{ strokeDasharray: "100 0" }}
          transition={{ duration: 0.8, delay: 3.5 }}
        />

        <motion.circle
          cx="330"
          cy="150"
          r="6"
          fill="#10b981"
          initial={{ cx: 330 }}
          animate={{ cx: 370 }}
          transition={{ duration: 0.8, delay: 3.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </motion.g>

      {/* Success glow */}
      <motion.circle
        cx="280"
        cy="150"
        r="60"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1.5], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, delay: 3.2, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

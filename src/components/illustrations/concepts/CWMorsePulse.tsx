import { motion } from "motion/react";

export function CWMorsePulse() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Carrier path */}
      <motion.line
        x1="60"
        y1="150"
        x2="340"
        y2="150"
        stroke="#1e3a8a"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Transmitter */}
      <motion.circle
        cx="60"
        cy="150"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      />

      {/* Receiver */}
      <motion.circle
        cx="340"
        cy="150"
        r="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Morse pattern: S-O-S (... --- ...) */}
      {/* First S (dit dit dit) */}
      <motion.rect
        x="100"
        y="140"
        width="15"
        height="20"
        rx="3"
        fill="#60a5fa"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay: 2, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      <motion.rect
        x="120"
        y="140"
        width="15"
        height="20"
        rx="3"
        fill="#60a5fa"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay: 2.5, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      <motion.rect
        x="140"
        y="140"
        width="15"
        height="20"
        rx="3"
        fill="#60a5fa"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay: 3, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      {/* O (dah dah dah) */}
      <motion.rect
        x="170"
        y="135"
        width="35"
        height="30"
        rx="3"
        fill="#3b82f6"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: 4, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      <motion.rect
        x="210"
        y="135"
        width="35"
        height="30"
        rx="3"
        fill="#3b82f6"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: 5, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      <motion.rect
        x="250"
        y="135"
        width="35"
        height="30"
        rx="3"
        fill="#3b82f6"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      {/* Second S (dit dit dit) - positioned but timing continues */}
      <motion.rect
        x="100"
        y="140"
        width="15"
        height="20"
        rx="3"
        fill="#60a5fa"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay: 7.5, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      <motion.rect
        x="120"
        y="140"
        width="15"
        height="20"
        rx="3"
        fill="#60a5fa"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay: 8, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      <motion.rect
        x="140"
        y="140"
        width="15"
        height="20"
        rx="3"
        fill="#60a5fa"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay: 8.5, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 7 }}
      />

      {/* Traveling pulse */}
      <motion.circle
        r="6"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 6 }}
      >
        <animateMotion
          dur="3s"
          begin="3s"
          repeatCount="indefinite"
          path="M 100 150 L 340 150"
        />
      </motion.circle>

      {/* Key down indicator */}
      <motion.circle
        cx="60"
        cy="150"
        r="15"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.6, delay: 2, repeat: Infinity, repeatDelay: 0.5 }}
      />

      {/* Received signal glow */}
      <motion.circle
        cx="340"
        cy="150"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 6, repeat: Infinity, repeatDelay: 6 }}
      />

      {/* Carrier wave visualization */}
      <motion.path
        d="M 60 150 Q 100 145, 140 150 T 220 150 T 300 150 T 340 150"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </svg>
  );
}

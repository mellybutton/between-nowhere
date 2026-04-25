import { motion } from "motion/react";

export function PacketBurstData() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Data path */}
      <motion.line
        x1="80"
        y1="150"
        x2="320"
        y2="150"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Transmitter */}
      <motion.rect
        x="55"
        y="140"
        width="25"
        height="20"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />

      {/* Receiver */}
      <motion.rect
        x="320"
        y="140"
        width="25"
        height="20"
        rx="3"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* First burst - 3 packets */}
      {[0, 1, 2].map((i) => (
        <motion.g key={`burst1-${i}`}>
          <motion.rect
            x={100 + i * 20}
            y="143"
            width="14"
            height="14"
            rx="2"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [0, 1, 1, 1, 0.8],
              x: [100 + i * 20, 320],
            }}
            transition={{ duration: 2.5, delay: 2 + i * 0.2, repeat: Infinity, repeatDelay: 6 }}
          />

          {/* Binary data inside packet */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 1, 0], x: [0, 220 - i * 20] }}
            transition={{ duration: 2.5, delay: 2 + i * 0.2, repeat: Infinity, repeatDelay: 6 }}
          >
            <rect x={103 + i * 20} y="146" width="2" height="4" fill="#60a5fa" />
            <rect x={106 + i * 20} y="148" width="2" height="2" fill="#60a5fa" />
            <rect x={109 + i * 20} y="146" width="2" height="4" fill="#60a5fa" />
          </motion.g>

          {/* Packet trail */}
          <motion.rect
            x={100 + i * 20}
            y="143"
            width="14"
            height="14"
            rx="2"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [1, 1.3, 1.5],
              x: [100 + i * 20, 320],
            }}
            transition={{ duration: 2.5, delay: 2 + i * 0.2, repeat: Infinity, repeatDelay: 6 }}
          />
        </motion.g>
      ))}

      {/* Second burst - 4 packets */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={`burst2-${i}`}>
          <motion.rect
            x={110 + i * 18}
            y="143"
            width="14"
            height="14"
            rx="2"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [0, 1, 1, 1, 0.8],
              x: [110 + i * 18, 320],
            }}
            transition={{ duration: 2.5, delay: 5 + i * 0.15, repeat: Infinity, repeatDelay: 6 }}
          />

          {/* Binary data inside packet */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 1, 0], x: [0, 210 - i * 18] }}
            transition={{ duration: 2.5, delay: 5 + i * 0.15, repeat: Infinity, repeatDelay: 6 }}
          >
            <rect x={113 + i * 18} y="148" width="2" height="2" fill="#60a5fa" />
            <rect x={116 + i * 18} y="146" width="2" height="4" fill="#60a5fa" />
            <rect x={119 + i * 18} y="148" width="2" height="2" fill="#60a5fa" />
          </motion.g>
        </motion.g>
      ))}

      {/* Burst timing indicator */}
      <motion.circle
        cx="80"
        cy="150"
        r="18"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.7, 0] }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatDelay: 2 }}
      />

      <motion.circle
        cx="80"
        cy="150"
        r="18"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.7, 0] }}
        transition={{ duration: 1, delay: 5, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Reception confirmation */}
      <motion.circle
        cx="332"
        cy="150"
        r="15"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, delay: 4.5, repeat: Infinity, repeatDelay: 6 }}
      />

      <motion.path
        d="M 327 150 L 330 153 L 337 144"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 0.3, delay: 4.8, repeat: Infinity, repeatDelay: 6 }}
      />

      {/* Idle period indicator */}
      <motion.line
        x1="90"
        y1="170"
        x2="310"
        y2="170"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
      />
    </svg>
  );
}

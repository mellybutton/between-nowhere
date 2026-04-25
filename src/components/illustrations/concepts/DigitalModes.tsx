import { motion } from "motion/react";

export function DigitalModes() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Carrier wave path */}
      <motion.path
        d="M 50 150 Q 100 130, 150 150 T 250 150 T 350 150"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      />

      {/* Digital packets (squares) moving along the wave */}
      {[0, 1, 2, 3, 4].map((i) => {
        const baseDelay = 2 + i * 0.5;

        return (
          <motion.g key={i}>
            <motion.rect
              x={50 + i * 60}
              y="142"
              width="16"
              height="16"
              rx="2"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                scale: [0, 1, 1, 1, 0.8],
                x: [50 + i * 60, 350],
                y: [142, 142 + Math.sin(i) * 10, 142],
              }}
              transition={{
                duration: 4,
                delay: baseDelay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            {/* Binary data visualization inside packet */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 4, delay: baseDelay, repeat: Infinity, repeatDelay: 1 }}
            >
              <motion.rect
                x={54 + i * 60}
                y="146"
                width="3"
                height="8"
                fill="#60a5fa"
                animate={{ x: [54 + i * 60, 354] }}
                transition={{ duration: 4, delay: baseDelay, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.rect
                x={60 + i * 60}
                y="148"
                width="3"
                height="4"
                fill="#60a5fa"
                animate={{ x: [60 + i * 60, 360] }}
                transition={{ duration: 4, delay: baseDelay, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.g>

            {/* Packet glow trail */}
            <motion.rect
              x={50 + i * 60}
              y="142"
              width="16"
              height="16"
              rx="2"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [1, 1.3, 1.5],
                x: [50 + i * 60, 350],
              }}
              transition={{
                duration: 4,
                delay: baseDelay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.g>
        );
      })}

      {/* Transmitter */}
      <motion.rect
        x="30"
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

      {/* Transmitter activity pulse */}
      <motion.circle
        cx="40"
        cy="150"
        r="15"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Receiver */}
      <motion.rect
        x="360"
        y="140"
        width="20"
        height="20"
        rx="3"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Received data indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ delay: 6, duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
      >
        <rect x="364" y="144" width="3" height="6" fill="#10b981" />
        <rect x="368" y="146" width="3" height="4" fill="#10b981" />
        <rect x="372" y="144" width="3" height="6" fill="#10b981" />
      </motion.g>

      {/* Clean signal indicator */}
      <motion.path
        d="M 355 135 L 360 140 L 370 128"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 6.5, repeat: Infinity, repeatDelay: 4 }}
      />
    </svg>
  );
}

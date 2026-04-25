import { motion } from "motion/react";

export function CallsignIdentity() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Central station node */}
      <motion.circle
        cx="200"
        cy="150"
        r="20"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.circle
        cx="200"
        cy="150"
        r="10"
        fill="#3b82f6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Identity tag shape (abstract badge) */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {/* Badge outline */}
        <motion.path
          d="M 200 100 L 220 110 L 220 130 L 200 140 L 180 130 L 180 110 Z"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        />

        {/* Identity marker lines (abstract representation) */}
        <motion.line
          x1="190"
          y1="115"
          x2="210"
          y2="115"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.8 }}
        />
        <motion.line
          x1="190"
          y1="122"
          x2="210"
          y2="122"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2 }}
        />
        <motion.line
          x1="190"
          y1="128"
          x2="205"
          y2="128"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.2 }}
        />
      </motion.g>

      {/* Connection line from identity to station */}
      <motion.line
        x1="200"
        y1="140"
        x2="200"
        y2="130"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeDasharray="3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />

      {/* Broadcast signals with identity */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI * 2) / 6;
        const endX = 200 + Math.cos(angle) * 80;
        const endY = 150 + Math.sin(angle) * 80;

        return (
          <motion.g key={i}>
            <motion.line
              x1="200"
              y1="150"
              x2={endX}
              y2={endY}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ delay: 2.5 + i * 0.15, duration: 0.8 }}
            />

            {/* Signal pulse with ID */}
            <motion.circle
              cx="200"
              cy="150"
              r="4"
              fill="#60a5fa"
              initial={{ cx: 200, cy: 150, opacity: 0 }}
              animate={{
                cx: endX,
                cy: endY,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 3 + i * 0.15,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.g>
        );
      })}

      {/* Identification pulse ring */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 3], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.5, delay: 3.5, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Verified checkmark */}
      <motion.path
        d="M 190 148 L 197 155 L 210 140"
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 4 }}
      />
    </svg>
  );
}

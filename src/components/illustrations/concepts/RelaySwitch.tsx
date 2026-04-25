import { motion } from "motion/react";

export function RelaySwitch() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Control circuit (left) */}
      <motion.g>
        {/* Control circuit path */}
        <motion.path
          d="M 60 120 L 100 120 L 100 180 L 60 180"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Coil (electromagnet) */}
        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={`coil-${i}`}
            cx={105 + i * 8}
            cy="150"
            rx="5"
            ry="20"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
          />
        ))}

        {/* Control current */}
        <motion.circle
          r="4"
          fill="#60a5fa"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <animateMotion
            dur="2s"
            begin="2s"
            repeatCount="indefinite"
            path="M 60 120 L 100 120 L 100 180 L 60 180 L 60 120"
          />
        </motion.circle>
      </motion.g>

      {/* Magnetic field activation */}
      <motion.circle
        cx="115"
        cy="150"
        r="30"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 0.6, 0.6] }}
        transition={{ duration: 1, delay: 3 }}
      />

      {/* Magnetic pull indicator */}
      <motion.path
        d="M 115 150 L 175 150"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 3.5 }}
      />

      {/* Switched circuit (right) */}
      <motion.g>
        {/* Power source */}
        <motion.line
          x1="240"
          y1="115"
          x2="260"
          y2="115"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        />
        <motion.line
          x1="240"
          y1="125"
          x2="260"
          y2="125"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        />

        {/* Contact line from power */}
        <motion.line
          x1="260"
          y1="120"
          x2="300"
          y2="120"
          stroke="#1e3a8a"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Movable contact arm (open initially) */}
        <motion.line
          x1="300"
          y1="120"
          x2="320"
          y2="100"
          stroke="#60a5fa"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />

        {/* Contact arm closing */}
        <motion.line
          x1="300"
          y1="120"
          x2="320"
          y2="120"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: 4 }}
        />

        {/* Fixed contact */}
        <motion.circle
          cx="320"
          cy="120"
          r="4"
          fill="#60a5fa"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
        />

        {/* Load circuit path */}
        <motion.path
          d="M 320 120 L 360 120 L 360 180 L 260 180 L 260 120"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 2 }}
        />

        {/* Load (lamp/resistor) */}
        <motion.circle
          cx="340"
          cy="150"
          r="15"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5 }}
        />

        {/* Contact spark/close */}
        <motion.circle
          cx="320"
          cy="120"
          r="10"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.6, delay: 4 }}
        />

        {/* Load activated - current flow */}
        <motion.path
          d="M 320 120 L 360 120 L 360 180 L 260 180 L 260 120"
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.9, 0.9] }}
          transition={{ duration: 1.5, delay: 4.5 }}
        />

        {/* Current particles in switched circuit */}
        {[0, 1].map((i) => (
          <motion.circle
            key={`switched-${i}`}
            r="5"
            fill="#10b981"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 3, delay: 5 + i * 1.5, repeat: Infinity, repeatDelay: 1.5 }}
          >
            <animateMotion
              dur="3s"
              begin={`${5 + i * 1.5}s`}
              repeatCount="indefinite"
              path="M 320 120 L 360 120 L 360 180 L 260 180 L 260 120"
            />
          </motion.circle>
        ))}

        {/* Load active glow */}
        <motion.circle
          cx="340"
          cy="150"
          r="20"
          fill="#10b981"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.3] }}
          transition={{ duration: 0.8, delay: 5.5 }}
        />
      </motion.g>

      {/* Connection labels */}
      <motion.text
        x="95"
        y="110"
        fill="#93c5fd"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        control
      </motion.text>

      <motion.text
        x="310"
        y="110"
        fill="#93c5fd"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 5 }}
      >
        switched
      </motion.text>
    </svg>
  );
}

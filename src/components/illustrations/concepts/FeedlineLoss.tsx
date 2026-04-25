import { motion } from "motion/react";

export function FeedlineLoss() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Transmitter/source */}
      <motion.rect
        x="50"
        y="140"
        width="25"
        height="20"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Feedline cable */}
      <motion.line
        x1="75"
        y1="150"
        x2="340"
        y2="150"
        stroke="#1e3a8a"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Cable inner conductor */}
      <motion.line
        x1="75"
        y1="150"
        x2="340"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Energy pulse traveling and fading */}
      <motion.g>
        <motion.circle
          cx="75"
          cy="150"
          r="8"
          fill="#60a5fa"
          initial={{ cx: 75, opacity: 0 }}
          animate={{
            cx: [75, 140, 210, 280, 340],
            opacity: [0, 1, 0.7, 0.4, 0.15],
          }}
          transition={{ duration: 3.5, delay: 2, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Pulse glow fading */}
        <motion.circle
          cx="75"
          cy="150"
          r="15"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          initial={{ cx: 75, opacity: 0 }}
          animate={{
            cx: [75, 140, 210, 280, 340],
            opacity: [0, 0.8, 0.5, 0.3, 0],
            scale: [1, 1.2, 1.3, 1.4, 1.5],
          }}
          transition={{ duration: 3.5, delay: 2, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </motion.g>

      {/* Loss indicators along the line */}
      {[140, 210, 280].map((x, i) => (
        <motion.g key={i}>
          <motion.line
            x1={x}
            y1="150"
            x2={x}
            y2="170"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.6 - i * 0.15}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 - i * 0.15 }}
            transition={{ delay: 2.5 + i * 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
          />

          {/* Heat/loss particles */}
          <motion.circle
            cx={x}
            cy="160"
            r="2"
            fill="#fbbf24"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -15, -25], opacity: [0, 0.6 - i * 0.2, 0] }}
            transition={{ duration: 1.5, delay: 2.8 + i * 0.3, repeat: Infinity, repeatDelay: 4 }}
          />
        </motion.g>
      ))}

      {/* Antenna at end */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <line x1="340" y1="150" x2="360" y2="110" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="340" cy="150" r="6" fill="none" stroke="#60a5fa" strokeWidth="2" />
      </motion.g>

      {/* Signal strength meter at start */}
      <motion.rect
        x="85"
        y="125"
        width="30"
        height="8"
        rx="2"
        fill="#10b981"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Signal strength meter at end (weaker) */}
      <motion.rect
        x="310"
        y="125"
        width="12"
        height="8"
        rx="2"
        fill="#fbbf24"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.8 }}
        transition={{ delay: 3, duration: 0.5 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Loss percentage indication */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="none"
        stroke="#ef4444"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ delay: 4 }}
      />

      {/* Comparison arrows */}
      <motion.path
        d="M 90 115 L 100 115"
        stroke="#10b981"
        strokeWidth="2"
        markerEnd="url(#arrowGreen)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2 }}
      />
      <motion.path
        d="M 315 115 L 320 115"
        stroke="#fbbf24"
        strokeWidth="2"
        markerEnd="url(#arrowYellow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 3.5 }}
      />

      <defs>
        <marker
          id="arrowGreen"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
        </marker>
        <marker
          id="arrowYellow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#fbbf24" />
        </marker>
      </defs>
    </svg>
  );
}

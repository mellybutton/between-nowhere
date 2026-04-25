import { motion } from "motion/react";

export function FMvsAMModulation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* AM - Amplitude Modulation (top) */}
      <motion.g>
        {/* AM carrier wave with varying amplitude */}
        <motion.path
          d="M 60 100 Q 90 80, 120 100 T 180 100 T 240 100 T 300 100 T 360 100"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <animate
            attributeName="d"
            values="
              M 60 100 Q 90 80, 120 100 T 180 100 T 240 100 T 300 100 T 360 100;
              M 60 100 Q 90 70, 120 100 T 180 100 T 240 100 T 300 100 T 360 100;
              M 60 100 Q 90 60, 120 100 T 180 100 T 240 100 T 300 100 T 360 100;
              M 60 100 Q 90 70, 120 100 T 180 100 T 240 100 T 300 100 T 360 100;
              M 60 100 Q 90 80, 120 100 T 180 100 T 240 100 T 300 100 T 360 100
            "
            dur="6s"
            begin="2s"
            repeatCount="indefinite"
          />
        </motion.path>

        {/* AM envelope */}
        <motion.path
          d="M 60 100 Q 120 70, 180 60 Q 240 70, 300 100"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 2 }}
        />

        <motion.path
          d="M 60 100 Q 120 130, 180 140 Q 240 130, 300 100"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 2 }}
        />

        {/* AM label indicator */}
        <motion.circle
          cx="40"
          cy="100"
          r="5"
          fill="#3b82f6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        />
      </motion.g>

      {/* FM - Frequency Modulation (bottom) */}
      <motion.g>
        {/* FM carrier wave with varying frequency/spacing */}
        <motion.path
          d="M 60 200 Q 80 180, 100 200 T 140 200 T 180 200 T 220 200 T 260 200 T 300 200 T 340 200 T 380 200"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          <animate
            attributeName="d"
            values="
              M 60 200 Q 80 180, 100 200 T 140 200 T 180 200 T 220 200 T 260 200 T 300 200 T 340 200 T 380 200;
              M 60 200 Q 75 180, 90 200 T 120 200 T 150 200 T 180 200 T 210 200 T 240 200 T 270 200 T 300 200 T 330 200 T 360 200;
              M 60 200 Q 70 180, 80 200 T 100 200 T 120 200 T 140 200 T 160 200 T 180 200 T 200 200 T 220 200 T 240 200 T 260 200 T 280 200 T 300 200 T 320 200 T 340 200;
              M 60 200 Q 75 180, 90 200 T 120 200 T 150 200 T 180 200 T 210 200 T 240 200 T 270 200 T 300 200 T 330 200 T 360 200;
              M 60 200 Q 80 180, 100 200 T 140 200 T 180 200 T 220 200 T 260 200 T 300 200 T 340 200 T 380 200
            "
            dur="6s"
            begin="2s"
            repeatCount="indefinite"
          />
        </motion.path>

        {/* FM constant amplitude reference */}
        <motion.line
          x1="60"
          y1="180"
          x2="360"
          y2="180"
          stroke="#34d399"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 2.2 }}
        />

        <motion.line
          x1="60"
          y1="220"
          x2="360"
          y2="220"
          stroke="#34d399"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 2.2 }}
        />

        {/* FM label indicator */}
        <motion.circle
          cx="40"
          cy="200"
          r="5"
          fill="#10b981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        />
      </motion.g>

      {/* Comparison pulses */}
      <motion.circle
        r="6"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, delay: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <animateMotion
          dur="4s"
          begin="3s"
          repeatCount="indefinite"
          path="M 60 100 L 360 100"
        />
      </motion.circle>

      <motion.circle
        r="6"
        fill="#34d399"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, delay: 3.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <animateMotion
          dur="4s"
          begin="3.5s"
          repeatCount="indefinite"
          path="M 60 200 L 360 200"
        />
      </motion.circle>

      {/* Divider */}
      <motion.line
        x1="50"
        y1="150"
        x2="370"
        y2="150"
        stroke="#1e3a8a"
        strokeWidth="1"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      />

      {/* Comparison glow */}
      <motion.circle
        cx="210"
        cy="150"
        r="50"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, delay: 5, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );
}

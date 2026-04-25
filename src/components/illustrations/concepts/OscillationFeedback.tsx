import { motion } from "motion/react";

export function OscillationFeedback() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Feedback loop path */}
      <motion.g>
        <motion.path
          d="M 200 150 L 260 150 Q 280 150, 280 170 L 280 200 Q 280 220, 260 220 L 140 220 Q 120 220, 120 200 L 120 170 Q 120 150, 140 150 L 200 150"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Feedback arrows */}
        <motion.path
          d="M 270 205 L 280 200 L 270 195"
          fill="#3b82f6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.5 }}
        />
      </motion.g>

      {/* Amplifier/component in loop */}
      <motion.rect
        x="185"
        y="140"
        width="30"
        height="20"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Gain indicator */}
      <motion.path
        d="M 190 145 L 195 150 L 190 155"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5 }}
      />

      {/* Oscillating signal growing unstable */}
      <motion.circle
        r="6"
        fill="#fbbf24"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 0.8] }}
        transition={{ duration: 4, delay: 2.5, repeat: Infinity }}
      >
        <animateMotion
          dur="4s"
          begin="2.5s"
          repeatCount="indefinite"
          path="M 200 150 L 260 150 Q 280 150, 280 170 L 280 200 Q 280 220, 260 220 L 140 220 Q 120 220, 120 200 L 120 170 Q 120 150, 140 150 L 200 150"
        />
      </motion.circle>

      {/* Growing unstable oscillation */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 2, 3], opacity: [0, 0.8, 0.6, 0] }}
        transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Unstable waveform growing */}
      <motion.path
        d="M 140 100 Q 155 90, 170 100 T 200 100 T 230 100 T 260 100"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.9, 0.9] }}
        transition={{ duration: 1.5, delay: 4 }}
      >
        <animate
          attributeName="d"
          values="
            M 140 100 Q 155 90, 170 100 T 200 100 T 230 100 T 260 100;
            M 140 100 Q 155 80, 170 100 T 200 100 T 230 100 T 260 100;
            M 140 100 Q 155 70, 170 100 T 200 100 T 230 100 T 260 100;
            M 140 100 Q 155 80, 170 100 T 200 100 T 230 100 T 260 100;
            M 140 100 Q 155 90, 170 100 T 200 100 T 230 100 T 260 100
          "
          dur="2s"
          begin="5s"
          repeatCount="2"
        />
      </motion.path>

      {/* Damping/stabilization */}
      <motion.rect
        x="90"
        y="165"
        width="25"
        height="15"
        rx="2"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1] }}
        transition={{ delay: 7 }}
      />

      {/* Damping resistor symbol */}
      <motion.path
        d="M 95 172 L 100 169 L 105 175 L 110 169"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 7.5 }}
      />

      {/* Stabilized signal */}
      <motion.path
        d="M 140 100 Q 155 95, 170 100 T 200 100 T 230 100 T 260 100"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.9, 0.9] }}
        transition={{ duration: 1.5, delay: 8 }}
      />

      {/* Stable indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="25"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 0.7, 0.7] }}
        transition={{ delay: 9 }}
      />

      <motion.path
        d="M 195 150 L 198 153 L 205 145"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 9.5 }}
      />

      {/* Warning phase indicator */}
      <motion.circle
        cx="200"
        cy="100"
        r="8"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, delay: 5, times: [0, 0.2, 0.8, 1] }}
      />

      <motion.text
        x="196"
        y="103"
        fill="#fbbf24"
        fontSize="12"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, delay: 5, times: [0, 0.2, 0.8, 1] }}
      >
        !
      </motion.text>

      {/* Calm state glow */}
      <motion.circle
        cx="200"
        cy="185"
        r="50"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, delay: 10 }}
      />
    </svg>
  );
}

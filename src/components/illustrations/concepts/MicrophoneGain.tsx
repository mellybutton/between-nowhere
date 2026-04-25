import { motion } from "motion/react";

export function MicrophoneGain() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Microphone icon */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <rect
          x="80"
          y="130"
          width="20"
          height="30"
          rx="10"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
        />
        <line x1="90" y1="160" x2="90" y2="175" stroke="#60a5fa" strokeWidth="2" />
        <line x1="80" y1="175" x2="100" y2="175" stroke="#60a5fa" strokeWidth="2" />
      </motion.g>

      {/* Too low gain - small waveform */}
      <motion.g>
        <motion.path
          d="M 130 110 Q 145 108, 160 110 T 190 110 T 220 110"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.7, 0, 0, 0] }}
          transition={{ duration: 6, delay: 1, repeat: Infinity }}
        />

        {/* Low gain indicator */}
        <motion.circle
          cx="225"
          cy="110"
          r="6"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.6, 0, 0, 0] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* Ideal gain - clean waveform */}
      <motion.g>
        <motion.path
          d="M 130 150 Q 145 135, 160 150 T 190 150 T 220 150"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0, 1, 0, 0] }}
          transition={{ duration: 6, delay: 3, repeat: Infinity }}
        />

        {/* Ideal indicator checkmark */}
        <motion.path
          d="M 218 145 L 223 150 L 232 138"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0, 1, 0, 0] }}
          transition={{ duration: 6, delay: 4, repeat: Infinity }}
        />

        {/* Ideal glow */}
        <motion.circle
          cx="175"
          cy="150"
          r="25"
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0, 0.6, 0, 0] }}
          transition={{ duration: 6, delay: 4, repeat: Infinity }}
        />
      </motion.g>

      {/* Too high gain - clipped waveform */}
      <motion.g>
        <motion.path
          d="M 130 190 Q 145 165, 155 165 L 165 165 Q 175 165, 185 195 Q 195 220, 205 220 L 215 220 Q 220 220, 220 190"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0, 0, 0.9, 0] }}
          transition={{ duration: 6, delay: 5, repeat: Infinity }}
        />

        {/* Clipping indicators - flat tops */}
        <motion.line
          x1="155"
          y1="165"
          x2="165"
          y2="165"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 1, 0] }}
          transition={{ duration: 6, delay: 5.5, repeat: Infinity }}
        />
        <motion.line
          x1="205"
          y1="220"
          x2="215"
          y2="220"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 1, 0] }}
          transition={{ duration: 6, delay: 5.5, repeat: Infinity }}
        />

        {/* Distortion warning */}
        <motion.circle
          cx="225"
          cy="190"
          r="8"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1], opacity: [0, 0, 0, 0.8, 0] }}
          transition={{ duration: 6, delay: 6, repeat: Infinity }}
        />
        <motion.text
          x="223"
          y="193"
          fill="#ef4444"
          fontSize="12"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 1, 0] }}
          transition={{ duration: 6, delay: 6, repeat: Infinity }}
        >
          !
        </motion.text>
      </motion.g>

      {/* Gain control indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
      >
        <rect
          x="270"
          y="120"
          width="60"
          height="8"
          rx="4"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="2"
        />

        {/* Gain level slider */}
        <motion.circle
          cx="300"
          cy="124"
          r="6"
          fill="#60a5fa"
          animate={{ cx: [280, 300, 320, 300] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Level labels */}
      <motion.text
        x="265"
        y="110"
        fill="#fbbf24"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        low
      </motion.text>
      <motion.text
        x="295"
        y="110"
        fill="#10b981"
        fontSize="10"
        fontWeight="bold"
        opacity="0.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 4 }}
      >
        ideal
      </motion.text>
      <motion.text
        x="320"
        y="110"
        fill="#ef4444"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 6 }}
      >
        high
      </motion.text>
    </svg>
  );
}

import { motion } from "motion/react";

export function RefractionBend() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Atmospheric layers */}
      <motion.g>
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x="50"
            y={80 + i * 40}
            width="300"
            height="40"
            fill={`url(#layer${i})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
          />
        ))}
      </motion.g>

      {/* Layer boundaries */}
      {[120, 160, 200].map((y, i) => (
        <motion.line
          key={i}
          x1="50"
          y1={y}
          x2="350"
          y2={y}
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ delay: 1 + i * 0.2, duration: 1 }}
        />
      ))}

      {/* Curved signal path */}
      <motion.path
        d="M 80 100 Q 150 130, 220 160 Q 270 180, 320 200"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 2, delay: 1.5 }}
      />

      {/* Traveling wave pulse */}
      <motion.circle
        cx="80"
        cy="100"
        r="6"
        fill="#60a5fa"
        initial={{ cx: 80, cy: 100, opacity: 0 }}
        animate={{
          cx: [80, 150, 220, 270, 320],
          cy: [100, 130, 160, 180, 200],
          opacity: [0, 1, 1, 1, 0.8],
        }}
        transition={{ duration: 3, delay: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Wave glow trail */}
      <motion.circle
        r="12"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1"
        initial={{ cx: 80, cy: 100, opacity: 0 }}
        animate={{
          cx: [80, 150, 220, 270, 320],
          cy: [100, 130, 160, 180, 200],
          opacity: [0, 0.6, 0.4, 0.2, 0],
          scale: [1, 1.5, 1.8, 2, 2.2],
        }}
        transition={{ duration: 3, delay: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Transmitter */}
      <motion.circle
        cx="80"
        cy="100"
        r="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Receiver */}
      <motion.circle
        cx="320"
        cy="200"
        r="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Atmospheric drift animation */}
      <motion.path
        d="M 100 90 Q 120 85, 140 90"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        opacity="0.3"
        initial={{ x: 0 }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 200 130 Q 220 125, 240 130"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        opacity="0.3"
        initial={{ x: 0 }}
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />

      <defs>
        <linearGradient id="layer0" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="layer1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="layer2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="layer3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  );
}

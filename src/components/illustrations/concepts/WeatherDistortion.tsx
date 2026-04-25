import { motion } from "motion/react";

export function WeatherDistortion() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Transmitter */}
      <motion.circle
        cx="60"
        cy="220"
        r="10"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Normal signal path */}
      <motion.path
        d="M 60 220 L 340 220"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5 }}
      />

      {/* Weather cloud */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <ellipse cx="200" cy="140" rx="60" ry="40" fill="none" stroke="#475569" strokeWidth="2" />
        <ellipse cx="170" cy="150" rx="40" ry="30" fill="none" stroke="#475569" strokeWidth="2" />
        <ellipse cx="230" cy="150" rx="40" ry="30" fill="none" stroke="#475569" strokeWidth="2" />
      </motion.g>

      {/* Rain particles */}
      {[...Array(15)].map((_, i) => (
        <motion.line
          key={i}
          x1={150 + (i % 5) * 20}
          y1={170}
          x2={150 + (i % 5) * 20}
          y2={185}
          stroke="#60a5fa"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, 40, 80], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1.5,
            delay: 1.5 + (i % 5) * 0.2,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}

      {/* Distorted signal */}
      <motion.path
        d="M 60 220 Q 120 200, 140 180 Q 160 160, 180 150 Q 220 140, 260 150 Q 280 160, 300 180 Q 320 200, 340 220"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeDasharray="0 1000"
        initial={{ strokeDasharray: "0 1000", opacity: 0 }}
        animate={{ strokeDasharray: ["0 1000", "1000 0"], opacity: [0, 1, 1] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Signal scatter */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx={150 + i * 25}
          cy={150 + Math.sin(i) * 30}
          r="3"
          fill="#fbbf24"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1,
            delay: 2.5 + i * 0.15,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Receiver */}
      <motion.circle
        cx="340"
        cy="220"
        r="10"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Weak signal indicator */}
      <motion.path
        d="M 330 220 Q 335 215, 340 220 Q 345 225, 350 220"
        fill="none"
        stroke="#ef4444"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.8, delay: 3.5, repeat: Infinity, repeatDelay: 2.2 }}
      />
    </svg>
  );
}

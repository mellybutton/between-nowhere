import { motion } from "motion/react";

export function NoiseFloor() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Noise floor line */}
      <motion.line
        x1="50"
        y1="200"
        x2="350"
        y2="200"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      />

      {/* Background noise particles */}
      {[...Array(40)].map((_, i) => {
        const x = 60 + (i % 10) * 28;
        const y = 210 - Math.random() * 30;
        const delay = Math.random() * 2;

        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="1.5"
            fill="#475569"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.6, 0.3, 0] }}
            transition={{
              duration: 2,
              delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 1,
            }}
          />
        );
      })}

      {/* Static noise bars */}
      {[...Array(15)].map((_, i) => {
        const x = 70 + i * 18;
        const height = Math.random() * 20 + 5;

        return (
          <motion.line
            key={`bar-${i}`}
            x1={x}
            y1="200"
            x2={x}
            y2={200 - height}
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.4, 0.2, 0] }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        );
      })}

      {/* Clean signal rising above noise */}
      <motion.path
        d="M 150 200 Q 170 180, 190 140 Q 210 100, 230 90 Q 250 100, 270 140 Q 290 180, 310 200"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 1] }}
        transition={{ duration: 2, delay: 1.5 }}
      />

      {/* Signal peak glow */}
      <motion.circle
        cx="230"
        cy="90"
        r="8"
        fill="#60a5fa"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 2.5 }}
      />

      <motion.circle
        cx="230"
        cy="90"
        r="20"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* SNR indicator - signal strength */}
      <motion.line
        x1="230"
        y1="90"
        x2="230"
        y2="200"
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 3 }}
      />

      {/* Success indicator */}
      <motion.path
        d="M 220 85 L 227 92 L 240 78"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 3.5 }}
      />
    </svg>
  );
}

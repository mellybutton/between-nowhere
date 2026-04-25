import { motion } from "motion/react";

export function SquelchThreshold() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Threshold line */}
      <motion.line
        x1="80"
        y1="150"
        x2="320"
        y2="150"
        stroke="#fbbf24"
        strokeWidth="2.5"
        strokeDasharray="8 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Threshold markers */}
      <motion.line
        x1="70"
        y1="145"
        x2="70"
        y2="155"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
      />
      <motion.line
        x1="330"
        y1="145"
        x2="330"
        y2="155"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
      />

      {/* Background noise particles (below threshold) */}
      {[...Array(50)].map((_, i) => {
        const x = 90 + (i % 10) * 23;
        const y = 160 + Math.random() * 50;
        const delay = Math.random() * 2;

        return (
          <motion.circle
            key={`noise-${i}`}
            cx={x}
            cy={y}
            r="1.5"
            fill="#475569"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.6, 0.3, 0] }}
            transition={{
              duration: 1.5,
              delay: 1.5 + delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 1,
            }}
          />
        );
      })}

      {/* Noise floor static bars */}
      {[...Array(12)].map((_, i) => {
        const x = 95 + i * 19;
        const height = Math.random() * 30 + 10;

        return (
          <motion.line
            key={`bar-${i}`}
            x1={x}
            y1="150"
            x2={x}
            y2={150 + height}
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.5, 0.3, 0] }}
            transition={{
              duration: 1.2,
              delay: 1.8 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        );
      })}

      {/* Muted speaker indicator (left side - noise blocked) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        <path
          d="M 45 165 L 50 165 L 58 158 L 58 182 L 50 175 L 45 175 Z"
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <motion.path
          d="M 40 168 L 50 178 M 50 168 L 40 178"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.5 }}
        />
      </motion.g>

      {/* Clean signal rising above threshold */}
      <motion.path
        d="M 150 150 Q 170 145, 190 110 Q 210 80, 230 90 Q 250 100, 270 130 Q 290 145, 310 150"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
      />

      {/* Signal peak */}
      <motion.circle
        cx="230"
        cy="90"
        r="8"
        fill="#60a5fa"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.5 }}
      />

      {/* Signal strength glow */}
      <motion.circle
        cx="230"
        cy="90"
        r="20"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 4, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Squelch opens - signal passes */}
      <motion.path
        d="M 230 90 L 230 150"
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 4, duration: 0.8 }}
      />

      {/* Active speaker indicator (right side - signal audible) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <path
          d="M 340 120 L 345 120 L 353 113 L 353 137 L 345 130 L 340 130 Z"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
        />

        {/* Sound waves */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${358 + i * 6} 118 Q ${361 + i * 6} 125, ${358 + i * 6} 132`}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: 1.5,
              delay: 5 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
        ))}
      </motion.g>

      {/* Threshold label indicators */}
      <motion.circle
        cx="60"
        cy="150"
        r="4"
        fill="#fbbf24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
      />
    </svg>
  );
}

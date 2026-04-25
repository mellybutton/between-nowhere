import { motion } from "motion/react";

export function LicensingRules() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Spectrum grid - organized lanes */}
      {[0, 1, 2, 3, 4].map((row) => (
        <motion.line
          key={`h-${row}`}
          x1="80"
          y1={90 + row * 35}
          x2="320"
          y2={90 + row * 35}
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: row * 0.1 }}
        />
      ))}

      {[0, 1, 2, 3, 4, 5].map((col) => (
        <motion.line
          key={`v-${col}`}
          x1={80 + col * 48}
          y1="90"
          x2={80 + col * 48}
          y2="230"
          stroke="#1e3a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 + col * 0.1 }}
        />
      ))}

      {/* Organized signal dots in lanes */}
      {[
        { x: 104, y: 107, delay: 1.2, color: "#3b82f6" },
        { x: 152, y: 107, delay: 1.3, color: "#60a5fa" },
        { x: 200, y: 107, delay: 1.4, color: "#93c5fd" },

        { x: 128, y: 142, delay: 1.5, color: "#60a5fa" },
        { x: 224, y: 142, delay: 1.6, color: "#3b82f6" },

        { x: 104, y: 177, delay: 1.7, color: "#93c5fd" },
        { x: 176, y: 177, delay: 1.8, color: "#60a5fa" },
        { x: 248, y: 177, delay: 1.9, color: "#3b82f6" },

        { x: 152, y: 212, delay: 2.0, color: "#3b82f6" },
        { x: 272, y: 212, delay: 2.1, color: "#60a5fa" },
      ].map((dot, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={dot.x}
            cy={dot.y}
            r="6"
            fill={dot.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ delay: dot.delay, duration: 0.4 }}
          />

          {/* Organized boundary around each signal */}
          <motion.circle
            cx={dot.x}
            cy={dot.y}
            r="12"
            fill="none"
            stroke={dot.color}
            strokeWidth="1"
            opacity="0.4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: dot.delay + 0.2, duration: 0.4 }}
          />
        </motion.g>
      ))}

      {/* Regulation boundary frame */}
      <motion.rect
        x="75"
        y="85"
        width="250"
        height="150"
        rx="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 2.5 }}
      />

      {/* Order indicators - corner accents */}
      {[
        { x: 75, y: 85 },
        { x: 325, y: 85 },
        { x: 75, y: 235 },
        { x: 325, y: 235 },
      ].map((corner, i) => (
        <motion.g key={i}>
          <motion.line
            x1={corner.x + (i % 2 === 0 ? 0 : -10)}
            y1={corner.y}
            x2={corner.x + (i % 2 === 0 ? 10 : 0)}
            y2={corner.y}
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 3 + i * 0.1 }}
          />
          <motion.line
            x1={corner.x}
            y1={corner.y + (i < 2 ? 0 : -10)}
            x2={corner.x}
            y2={corner.y + (i < 2 ? 10 : 0)}
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 3 + i * 0.1 }}
          />
        </motion.g>
      ))}

      {/* Harmony pulse - showing organized system */}
      <motion.rect
        x="75"
        y="85"
        width="250"
        height="150"
        rx="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, delay: 4, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

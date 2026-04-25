import { motion } from "motion/react";

export function InductanceMagneticField() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Coil windings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.ellipse
          key={`coil-${i}`}
          cx={180 + i * 10}
          cy="150"
          rx="8"
          ry="30"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Coil connections */}
      <motion.line
        x1="140"
        y1="150"
        x2="180"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      />

      <motion.line
        x1="220"
        y1="150"
        x2="260"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      />

      {/* Magnetic field lines (loops around coil) */}
      {[
        { rx: 60, ry: 50, delay: 2 },
        { rx: 80, ry: 65, delay: 2.3 },
        { rx: 100, ry: 80, delay: 2.6 },
      ].map((field, i) => (
        <motion.g key={`field-${i}`}>
          {/* Top field line */}
          <motion.path
            d={`M ${200 - field.rx} 150 Q 200 ${150 - field.ry}, ${200 + field.rx} 150`}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0.6] }}
            transition={{ duration: 2, delay: field.delay }}
          />

          {/* Bottom field line */}
          <motion.path
            d={`M ${200 - field.rx} 150 Q 200 ${150 + field.ry}, ${200 + field.rx} 150`}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0.6] }}
            transition={{ duration: 2, delay: field.delay }}
          />

          {/* Field direction arrows */}
          <motion.path
            d={`M ${200 + field.rx - 10} ${150 - 5} L ${200 + field.rx} 150 L ${200 + field.rx - 10} ${150 + 5}`}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: field.delay + 1 }}
          />
        </motion.g>
      ))}

      {/* Magnetic field pulses */}
      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={`pulse-${i}`}
          cx="200"
          cy="150"
          rx="70"
          ry="60"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, delay: 4 + i * 1, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Current flow through coil */}
      <motion.circle
        r="4"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <animateMotion
          dur="2s"
          begin="3s"
          repeatCount="indefinite"
          path="M 140 150 L 260 150"
        />
      </motion.circle>

      {/* Energy stored indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="25"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 0.7, 0] }}
        transition={{ duration: 2, delay: 5, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Core glow */}
      <motion.ellipse
        cx="200"
        cy="150"
        rx="25"
        ry="35"
        fill="#3b82f6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0.2] }}
        transition={{ duration: 1.5, delay: 3 }}
      />
    </svg>
  );
}

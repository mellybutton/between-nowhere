import { motion } from "motion/react";

export function AntennaPattern() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Antenna */}
      <motion.line
        x1="200"
        y1="150"
        x2="200"
        y2="80"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.circle
        cx="200"
        cy="150"
        r="6"
        fill="#3b82f6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Radiation pattern lobes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const radius = [60, 40, 70, 35, 60, 35, 70, 40][i];
        const delay = i * 0.15;

        return (
          <motion.ellipse
            key={angle}
            cx="200"
            cy="150"
            rx={radius}
            ry={radius * 0.6}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            opacity="0.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 0.4 + i * 0.05, 0.4 + i * 0.05] }}
            transition={{ duration: 1, delay }}
            transform={`rotate(${angle} 200 150)`}
          />
        );
      })}

      {/* Main radiation lobes (strongest) */}
      <motion.path
        d="M 200 150 Q 200 100 200 80 Q 250 100 270 150 Q 250 200 200 220 Q 200 200 200 150"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0.8] }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />

      <motion.path
        d="M 200 150 Q 200 100 200 80 Q 150 100 130 150 Q 150 200 200 220 Q 200 200 200 150"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0.8] }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="150"
          r="50"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 3], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, delay: 2 + i * 0.8, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
    </svg>
  );
}

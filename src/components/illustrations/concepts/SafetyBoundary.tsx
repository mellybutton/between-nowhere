import { motion } from "motion/react";

export function SafetyBoundary() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}
    >
      {/* RF source (antenna/transmitter) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <line x1="200" y1="150" x2="200" y2="100" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="200" cy="150" r="8" fill="#3b82f6" />
      </motion.g>

      {/* Inner radiation zone (danger) */}
      <motion.circle
        cx="200"
        cy="150"
        r="40"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      {/* Radiation waves from source */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`inner-${i}`}
          cx="200"
          cy="150"
          r="30"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1.8], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            delay: 1.5 + i * 0.6,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}

      {/* Safety boundary (protective halo) */}
      <motion.circle
        cx="200"
        cy="150"
        r="80"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ delay: 1, duration: 1 }}
      />

      {/* Safe zone indicator glow */}
      <motion.circle
        cx="200"
        cy="150"
        r="80"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.5, delay: 2, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Outer safe zone */}
      <motion.circle
        cx="200"
        cy="150"
        r="100"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      />

      {/* Warning markers on danger zone */}
      {[0, 90, 180, 270].map((angle, i) => {
        const radians = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(radians) * 40;
        const y = 150 + Math.sin(radians) * 40;

        return (
          <motion.circle
            key={`warning-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill="#ef4444"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
            transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
          />
        );
      })}

      {/* Safety checkpoints on safe boundary */}
      {[45, 135, 225, 315].map((angle, i) => {
        const radians = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(radians) * 80;
        const y = 150 + Math.sin(radians) * 80;

        return (
          <motion.g key={`safe-${i}`}>
            <motion.circle
              cx={x}
              cy={y}
              r="5"
              fill="#10b981"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
              transition={{ delay: 2 + i * 0.15, duration: 0.4 }}
            />

            {/* Safe indicator checkmark */}
            <motion.path
              d={`M ${x - 3} ${y} L ${x - 1} ${y + 2} L ${x + 3} ${y - 2}`}
              fill="none"
              stroke="#f0fdf4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.5 + i * 0.15, duration: 0.2 }}
            />
          </motion.g>
        );
      })}

      {/* Distance indicator */}
      <motion.line
        x1="200"
        y1="150"
        x2="280"
        y2="150"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      />

      {/* Distance markers */}
      <motion.line
        x1="240"
        y1="145"
        x2="240"
        y2="155"
        stroke="#93c5fd"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3 }}
      />
      <motion.line
        x1="280"
        y1="145"
        x2="280"
        y2="155"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      />

      {/* Safe zone label indicator */}
      <motion.circle
        cx="280"
        cy="150"
        r="10"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ delay: 3.5, duration: 0.5 }}
      />
    </svg>
  );
}

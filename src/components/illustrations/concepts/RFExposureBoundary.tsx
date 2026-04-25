import { motion } from "motion/react";

export function RFExposureBoundary() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}
    >
      {/* RF source */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <line x1="200" y1="150" x2="200" y2="120" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="200" cy="150" r="8" fill="#3b82f6" />
      </motion.g>

      {/* Immediate exposure zone (closest - highest exposure) */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 1 }}
      />

      {/* Breathing animation for immediate zone */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="#ef4444"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.15, 0.1, 0.15] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Caution zone */}
      <motion.circle
        cx="200"
        cy="150"
        r="55"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      />

      {/* Breathing animation for caution zone */}
      <motion.circle
        cx="200"
        cy="150"
        r="55"
        fill="#fbbf24"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.08, 0.08, 0.05, 0.08] }}
        transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Safe boundary (outer calm zone) */}
      <motion.circle
        cx="200"
        cy="150"
        r="85"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 1.2 }}
      />

      {/* Breathing animation for safe zone */}
      <motion.circle
        cx="200"
        cy="150"
        r="85"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0.4, 0.6] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer safe zone perimeter */}
      <motion.circle
        cx="200"
        cy="150"
        r="110"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ delay: 2, duration: 1.5 }}
      />

      {/* RF radiation waves emanating */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`wave-${i}`}
          cx="200"
          cy="150"
          r="20"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 4, 5.5], opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, delay: 2.5 + i * 1.2, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Warning markers on danger zone */}
      {[0, 90, 180, 270].map((angle, i) => {
        const radians = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(radians) * 30;
        const y = 150 + Math.sin(radians) * 30;

        return (
          <motion.circle
            key={`warning-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill="#ef4444"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 0.8, 0.8] }}
            transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
          />
        );
      })}

      {/* Caution markers on middle zone */}
      {[45, 135, 225, 315].map((angle, i) => {
        const radians = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(radians) * 55;
        const y = 150 + Math.sin(radians) * 55;

        return (
          <motion.circle
            key={`caution-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill="#fbbf24"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 0.7, 0.7] }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
          />
        );
      })}

      {/* Safe markers on outer boundary */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const radians = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(radians) * 85;
        const y = 150 + Math.sin(radians) * 85;

        return (
          <motion.g key={`safe-${i}`}>
            <motion.circle
              cx={x}
              cy={y}
              r="4"
              fill="#10b981"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 1], opacity: [0, 0.9, 0.9] }}
              transition={{ delay: 2 + i * 0.12, duration: 0.4 }}
            />

            {/* Safe checkmark */}
            <motion.path
              d={`M ${x - 2.5} ${y} L ${x - 0.5} ${y + 2} L ${x + 2.5} ${y - 2}`}
              fill="none"
              stroke="#f0fdf4"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.5 + i * 0.12, duration: 0.3 }}
            />
          </motion.g>
        );
      })}

      {/* Distance reference line */}
      <motion.line
        x1="200"
        y1="150"
        x2="285"
        y2="150"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ delay: 3, duration: 1 }}
      />

      {/* Distance markers */}
      <motion.line
        x1="230"
        y1="145"
        x2="230"
        y2="155"
        stroke="#ef4444"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3.5 }}
      />
      <motion.line
        x1="255"
        y1="145"
        x2="255"
        y2="155"
        stroke="#fbbf24"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3.7 }}
      />
      <motion.line
        x1="285"
        y1="145"
        x2="285"
        y2="155"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 3.9 }}
      />

      {/* Safe zone calm glow */}
      <motion.circle
        cx="200"
        cy="150"
        r="95"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.1, 1.2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, delay: 4, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

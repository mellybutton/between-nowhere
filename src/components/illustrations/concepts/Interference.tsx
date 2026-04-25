import { motion } from "motion/react";

export function Interference() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Wave 1 */}
      <motion.path
        d="M 50 150 Q 100 100, 150 150 T 250 150 T 350 150"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Wave 2 */}
      <motion.path
        d="M 50 150 Q 100 200, 150 150 T 250 150 T 350 150"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0.8] }}
        transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
      />

      {/* Interference zone */}
      <motion.circle
        cx="200"
        cy="150"
        r="40"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 1, repeat: Infinity }}
      />

      {/* Interference particles */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="150"
          r="3"
          fill="#fbbf24"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: Math.cos((i * Math.PI * 2) / 8) * 50,
            y: Math.sin((i * Math.PI * 2) / 8) * 50,
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, delay: 1.5 + i * 0.1, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
    </svg>
  );
}

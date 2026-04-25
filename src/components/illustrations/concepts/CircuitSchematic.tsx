import { motion } from "motion/react";

export function CircuitSchematic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Circuit path */}
      <motion.path
        d="M 100 100 L 180 100 L 180 140 L 220 140 L 220 100 L 300 100 L 300 200 L 220 200 L 220 160 L 180 160 L 180 200 L 100 200 Z"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Power source (battery symbol) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <line x1="90" y1="145" x2="110" y2="145" stroke="#60a5fa" strokeWidth="3" />
        <line x1="90" y1="155" x2="110" y2="155" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="100" cy="150" r="8" fill="none" stroke="#60a5fa" strokeWidth="2" />
      </motion.g>

      {/* Resistor symbol */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <motion.path
          d="M 185 100 L 190 95 L 195 105 L 200 95 L 205 105 L 210 95 L 215 100"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />
      </motion.g>

      {/* Capacitor symbol */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <line x1="220" y1="135" x2="220" y2="145" stroke="#60a5fa" strokeWidth="2" />
        <line x1="220" y1="155" x2="220" y2="165" stroke="#60a5fa" strokeWidth="2" />
      </motion.g>

      {/* Load/component symbol */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
      >
        <circle cx="300" cy="150" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <line x1="294" y1="150" x2="306" y2="150" stroke="#60a5fa" strokeWidth="2" />
        <line x1="300" y1="144" x2="300" y2="156" stroke="#60a5fa" strokeWidth="2" />
      </motion.g>

      {/* Signal traveling through circuit */}
      <motion.circle
        r="5"
        fill="#60a5fa"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 5, delay: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <animateMotion
          dur="5s"
          begin="2.5s"
          repeatCount="indefinite"
          path="M 100 100 L 180 100 L 180 140 L 220 140 L 220 100 L 300 100 L 300 200 L 220 200 L 220 160 L 180 160 L 180 200 L 100 200 L 100 100"
        />
      </motion.circle>

      {/* Signal glow trail */}
      <motion.circle
        r="10"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.4, 0.2, 0] }}
        transition={{ duration: 5, delay: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <animateMotion
          dur="5s"
          begin="2.5s"
          repeatCount="indefinite"
          path="M 100 100 L 180 100 L 180 140 L 220 140 L 220 100 L 300 100 L 300 200 L 220 200 L 220 160 L 180 160 L 180 200 L 100 200 L 100 100"
        />
      </motion.circle>

      {/* Component activation glows */}
      <motion.circle
        cx="200"
        cy="100"
        r="15"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.7, 0] }}
        transition={{ duration: 1, delay: 4, repeat: Infinity, repeatDelay: 5.5 }}
      />

      <motion.circle
        cx="220"
        cy="150"
        r="15"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.7, 0] }}
        transition={{ duration: 1, delay: 4.5, repeat: Infinity, repeatDelay: 5.5 }}
      />

      <motion.circle
        cx="300"
        cy="150"
        r="20"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, delay: 5.5, repeat: Infinity, repeatDelay: 5.5 }}
      />

      {/* Circuit active indicator */}
      <motion.path
        d="M 190 150 L 195 155 L 205 143"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 0.4, delay: 6 }}
      />
    </svg>
  );
}

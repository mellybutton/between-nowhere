import { motion } from "motion/react";

export function VoltageCurrentFlow() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Circuit loop */}
      <motion.rect
        x="100"
        y="100"
        width="200"
        height="100"
        rx="15"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Power source (battery) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <line x1="90" y1="145" x2="110" y2="145" stroke="#60a5fa" strokeWidth="3" />
        <line x1="90" y1="155" x2="110" y2="155" stroke="#60a5fa" strokeWidth="3" />
        <line x1="94" y1="135" x2="106" y2="135" stroke="#60a5fa" strokeWidth="2" />
        <line x1="94" y1="165" x2="106" y2="165" stroke="#60a5fa" strokeWidth="2" />

        {/* Plus/minus */}
        <motion.text
          x="115"
          y="140"
          fill="#60a5fa"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.5 }}
        >
          +
        </motion.text>
        <motion.text
          x="115"
          y="165"
          fill="#60a5fa"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.5 }}
        >
          −
        </motion.text>
      </motion.g>

      {/* Load/resistor */}
      <motion.rect
        x="270"
        y="135"
        width="30"
        height="30"
        rx="3"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />

      {/* Resistor zigzag */}
      <motion.path
        d="M 275 145 L 280 140 L 285 150 L 290 140 L 295 150"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.8 }}
      />

      {/* Current flow particles (electrons) */}
      {[...Array(12)].map((_, i) => {
        const delay = 2 + i * 0.3;

        return (
          <motion.circle
            key={i}
            r="4"
            fill="#60a5fa"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 1.5 }}
          >
            <animateMotion
              dur="4s"
              begin={`${delay}s`}
              repeatCount="indefinite"
              path="M 100 100 L 300 100 L 300 200 L 100 200 Z"
            />
          </motion.circle>
        );
      })}

      {/* Flow direction arrows */}
      {[
        { x: 200, y: 95, angle: 0 },
        { x: 305, y: 150, angle: 90 },
        { x: 200, y: 205, angle: 180 },
        { x: 95, y: 150, angle: 270 },
      ].map((arrow, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.5 + i * 0.2 }}
        >
          <motion.path
            d={`M ${arrow.x} ${arrow.y} L ${arrow.x + 8} ${arrow.y - 4} L ${arrow.x + 8} ${arrow.y + 4} Z`}
            fill="#93c5fd"
            transform={`rotate(${arrow.angle} ${arrow.x} ${arrow.y})`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}

      {/* Voltage indicators */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3 }}
      >
        <line
          x1="100"
          y1="90"
          x2="300"
          y2="90"
          stroke="#fbbf24"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="190" y="85" fill="#fbbf24" fontSize="10" textAnchor="middle">
          V
        </text>
      </motion.g>

      {/* Current flow indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3.5 }}
      >
        <line
          x1="310"
          y1="100"
          x2="310"
          y2="200"
          stroke="#10b981"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="318" y="155" fill="#10b981" fontSize="10" textAnchor="start">
          I
        </text>
      </motion.g>

      {/* Circuit energy glow */}
      <motion.rect
        x="100"
        y="100"
        width="200"
        height="100"
        rx="15"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 3, delay: 4, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Active circuit indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="60"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2.5, delay: 4.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

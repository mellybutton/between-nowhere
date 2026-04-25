import { motion } from "motion/react";

export function TransformerCoupling() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Primary coil (left) */}
      <motion.g>
        {/* Primary windings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.ellipse
            key={`primary-${i}`}
            cx={130 + i * 8}
            cy="150"
            rx="6"
            ry="35"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Primary connections */}
        <motion.line
          x1="80"
          y1="150"
          x2="130"
          y2="150"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />

        <motion.line
          x1="154"
          y1="150"
          x2="170"
          y2="150"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />

        {/* AC input */}
        <motion.path
          d="M 60 150 Q 70 140, 80 150 T 100 150"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        />
      </motion.g>

      {/* Secondary coil (right) */}
      <motion.g>
        {/* Secondary windings (fewer turns - step down) */}
        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={`secondary-${i}`}
            cx={246 + i * 8}
            cy="150"
            rx="6"
            ry="35"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
          />
        ))}

        {/* Secondary connections */}
        <motion.line
          x1="230"
          y1="150"
          x2="246"
          y2="150"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        />

        <motion.line
          x1="262"
          y1="150"
          x2="320"
          y2="150"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.8, 0.8] }}
          transition={{ duration: 0.6, delay: 4 }}
        />
      </motion.g>

      {/* Core (between coils) */}
      <motion.g>
        <motion.rect
          x="190"
          y="110"
          width="20"
          height="80"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        />

        {/* Core laminations */}
        {[125, 140, 155, 170].map((y, i) => (
          <motion.line
            key={`core-${i}`}
            x1="190"
            y1={y}
            x2="210"
            y2={y}
            stroke="#1e3a8a"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          />
        ))}
      </motion.g>

      {/* Magnetic field coupling */}
      {[
        { rx: 50, ry: 45, delay: 2 },
        { rx: 70, ry: 60, delay: 2.3 },
      ].map((field, i) => (
        <motion.g key={`field-${i}`}>
          {/* Field lines */}
          <motion.ellipse
            cx="200"
            cy="150"
            rx={field.rx}
            ry={field.ry}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: field.delay }}
          />
        </motion.g>
      ))}

      {/* Energy transfer pulse */}
      <motion.g>
        {/* Primary current pulse */}
        <motion.circle
          r="5"
          fill="#60a5fa"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <animateMotion
            dur="2s"
            begin="2.5s"
            repeatCount="indefinite"
            path="M 80 150 L 154 150"
          />
        </motion.circle>

        {/* Magnetic field pulse expanding */}
        <motion.circle
          cx="200"
          cy="150"
          r="40"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.7, 0] }}
          transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatDelay: 3 }}
        />

        {/* Secondary induced current */}
        <motion.circle
          r="5"
          fill="#10b981"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.8] }}
          transition={{ duration: 2, delay: 4, repeat: Infinity, repeatDelay: 2 }}
        >
          <animateMotion
            dur="2s"
            begin="4s"
            repeatCount="indefinite"
            path="M 246 150 L 320 150"
          />
        </motion.circle>
      </motion.g>

      {/* Transfer indicator */}
      <motion.path
        d="M 175 140 L 185 150 L 175 160"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8] }}
        transition={{ delay: 3.5, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
      />

      <motion.path
        d="M 225 140 L 215 150 L 225 160"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8] }}
        transition={{ delay: 3.5, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
      />

      {/* Output indicator */}
      <motion.circle
        cx="320"
        cy="150"
        r="12"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, delay: 5.5, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Labels */}
      <motion.text
        x="120"
        y="105"
        fill="#93c5fd"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
      >
        primary
      </motion.text>

      <motion.text
        x="235"
        y="105"
        fill="#93c5fd"
        fontSize="10"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 4 }}
      >
        secondary
      </motion.text>
    </svg>
  );
}

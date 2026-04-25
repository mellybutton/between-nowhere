import { motion } from "motion/react";

export function VoltageRegulator() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Unstable input - wavy */}
      <motion.g>
        <motion.path
          d="M 60 150 Q 80 120, 100 150 T 140 150 T 180 150"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <animate
            attributeName="d"
            values="
              M 60 150 Q 80 120, 100 150 T 140 150 T 180 150;
              M 60 150 Q 80 170, 100 150 T 140 150 T 180 150;
              M 60 150 Q 80 130, 100 150 T 140 150 T 180 150;
              M 60 150 Q 80 160, 100 150 T 140 150 T 180 150;
              M 60 150 Q 80 120, 100 150 T 140 150 T 180 150
            "
            dur="4s"
            begin="1.5s"
            repeatCount="indefinite"
          />
        </motion.path>

        {/* Unstable particles */}
        {[0, 1].map((i) => (
          <motion.circle
            key={`unstable-${i}`}
            r="5"
            fill="#fbbf24"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: 2 + i * 1, repeat: Infinity, repeatDelay: 1 }}
          >
            <animateMotion
              dur="2s"
              begin={`${2 + i}s`}
              repeatCount="indefinite"
              path="M 60 150 Q 80 120, 100 150 T 140 150 T 180 150"
            >
              <mpath href="#wavyPath" />
            </animateMotion>
          </motion.circle>
        ))}

        {/* Input label */}
        <motion.text
          x="50"
          y="135"
          fill="#ef4444"
          fontSize="10"
          opacity="0.7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2 }}
        >
          unstable
        </motion.text>
      </motion.g>

      {/* Regulator component */}
      <motion.g>
        <motion.rect
          x="180"
          y="130"
          width="40"
          height="40"
          rx="5"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        />

        {/* Regulator symbol */}
        <motion.path
          d="M 185 145 L 215 145 M 185 155 L 215 155"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        />

        {/* Processing glow */}
        <motion.circle
          cx="200"
          cy="150"
          r="25"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.g>

      {/* Stable output - straight */}
      <motion.g>
        <motion.line
          x1="220"
          y1="150"
          x2="340"
          y2="150"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1.5, delay: 3.5 }}
        />

        {/* Stable particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`stable-${i}`}
            cx="220"
            cy="150"
            r="5"
            fill="#10b981"
            initial={{ cx: 220, opacity: 0 }}
            animate={{ cx: [220, 340], opacity: [0, 1, 1, 0.8] }}
            transition={{ duration: 2, delay: 4.5 + i * 0.7, repeat: Infinity, repeatDelay: 1.5 }}
          />
        ))}

        {/* Output label */}
        <motion.text
          x="330"
          y="135"
          fill="#10b981"
          fontSize="10"
          opacity="0.7"
          textAnchor="end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 5 }}
        >
          stable
        </motion.text>

        {/* Output quality indicator */}
        <motion.circle
          cx="340"
          cy="150"
          r="12"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: 5 }}
        />

        <motion.path
          d="M 335 150 L 338 153 L 345 144"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 5.5 }}
        />
      </motion.g>

      {/* Comparison lines */}
      <motion.line
        x1="60"
        y1="170"
        x2="180"
        y2="170"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
      />

      <motion.line
        x1="220"
        y1="170"
        x2="340"
        y2="170"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 5 }}
      />

      {/* Hidden path for animation */}
      <defs>
        <path id="wavyPath" d="M 60 150 Q 80 120, 100 150 T 140 150 T 180 150" />
      </defs>
    </svg>
  );
}

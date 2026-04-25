import { motion } from "motion/react";

export function DummyLoadAbsorption() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Transmitter */}
      <motion.rect
        x="60"
        y="135"
        width="30"
        height="30"
        rx="4"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.circle
        cx="75"
        cy="150"
        r="10"
        fill="#60a5fa"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* Transmission line to dummy load */}
      <motion.line
        x1="90"
        y1="150"
        x2="200"
        y2="150"
        stroke="#3b82f6"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Dummy load (dark absorber) */}
      <motion.g>
        <motion.rect
          x="200"
          y="120"
          width="60"
          height="60"
          rx="6"
          fill="#0f172a"
          stroke="#1e3a8a"
          strokeWidth="3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.5 }}
        />

        {/* Resistive element pattern */}
        <motion.path
          d="M 210 145 L 220 140 L 230 150 L 240 140 L 250 150"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: 2, duration: 0.8 }}
        />

        <motion.path
          d="M 210 155 L 220 150 L 230 160 L 240 150 L 250 160"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        />
      </motion.g>

      {/* Energy pulse entering dummy load */}
      <motion.circle
        cx="90"
        cy="150"
        r="8"
        fill="#60a5fa"
        initial={{ cx: 90, opacity: 0 }}
        animate={{ cx: [90, 200], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Energy glow entering */}
      <motion.circle
        cx="90"
        cy="150"
        r="15"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        initial={{ cx: 90, opacity: 0 }}
        animate={{ cx: [90, 200], opacity: [0, 0.8, 0.6, 0], scale: [1, 1.5, 1.8, 2] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Energy dissipating inside dummy load */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const baseX = 230;
        const baseY = 150;
        const endX = baseX + Math.cos(angle) * 20;
        const endY = baseY + Math.sin(angle) * 20;

        return (
          <motion.circle
            key={`dissipate-${i}`}
            cx={baseX}
            cy={baseY}
            r="3"
            fill="#fbbf24"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: endX - baseX,
              y: endY - baseY,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 3.5 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          />
        );
      })}

      {/* Heat dissipation (thermal energy) */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={`heat-${i}`}
          d={`M ${220 + i * 10} 120 Q ${225 + i * 10} 100, ${230 + i * 10} 80`}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2,
            delay: 4 + i * 0.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* No radiation indicator - blocked antenna symbol */}
      <motion.g>
        <motion.line
          x1="300"
          y1="150"
          x2="320"
          y2="110"
          stroke="#475569"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5 }}
        />

        <motion.circle
          cx="315"
          cy="125"
          r="15"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1], opacity: [0, 0.8, 0.8] }}
          transition={{ delay: 5 }}
        />

        <motion.path
          d="M 308 118 L 322 132 M 322 118 L 308 132"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 5.5 }}
        />
      </motion.g>

      {/* Safe testing indicator */}
      <motion.circle
        cx="230"
        cy="200"
        r="10"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ delay: 6 }}
      />

      <motion.path
        d="M 225 200 L 228 203 L 235 195"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 6.5 }}
      />

      {/* Power meter showing absorption */}
      <motion.rect
        x="290"
        y="160"
        width="40"
        height="8"
        rx="2"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3.5 }}
      />

      <motion.rect
        x="292"
        y="162"
        width="30"
        height="4"
        rx="1"
        fill="#10b981"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.9 }}
        transition={{ delay: 4, duration: 1 }}
        style={{ transformOrigin: "left" }}
      />
    </svg>
  );
}

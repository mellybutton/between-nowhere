import { motion } from "motion/react";

export function BandPlanLanes() {
  const lanes = [
    { y: 90, color: "#3b82f6", label: "CW", signals: [100, 180, 260] },
    { y: 130, color: "#60a5fa", label: "SSB", signals: [120, 200, 280] },
    { y: 170, color: "#93c5fd", label: "Digital", signals: [110, 190, 270] },
    { y: 210, color: "#10b981", label: "FM", signals: [140, 220, 300] },
  ];

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Band plan lanes */}
      {lanes.map((lane, i) => (
        <motion.g key={`lane-${i}`}>
          {/* Lane boundary */}
          <motion.line
            x1="60"
            y1={lane.y}
            x2="340"
            y2={lane.y}
            stroke="#1e3a8a"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
          />

          {/* Lane indicator */}
          <motion.circle
            cx="45"
            cy={lane.y}
            r="4"
            fill={lane.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.2 }}
          />

          {/* Signals moving in lane */}
          {lane.signals.map((startX, j) => (
            <motion.g key={`signal-${i}-${j}`}>
              <motion.circle
                cx={startX}
                cy={lane.y}
                r="6"
                fill={lane.color}
                initial={{ cx: startX, opacity: 0 }}
                animate={{ cx: [startX, 340], opacity: [0, 1, 1, 0.8] }}
                transition={{
                  duration: 3,
                  delay: 2 + i * 0.3 + j * 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />

              {/* Signal trail */}
              <motion.circle
                cx={startX}
                cy={lane.y}
                r="10"
                fill="none"
                stroke={lane.color}
                strokeWidth="1"
                initial={{ cx: startX, opacity: 0 }}
                animate={{
                  cx: [startX, 340],
                  opacity: [0, 0.6, 0],
                  scale: [1, 1.5, 2],
                }}
                transition={{
                  duration: 3,
                  delay: 2 + i * 0.3 + j * 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.g>
          ))}
        </motion.g>
      ))}

      {/* Frequency spectrum indicator */}
      <motion.line
        x1="60"
        y1="250"
        x2="340"
        y2="250"
        stroke="#93c5fd"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 2 }}
      />

      {/* Frequency markers */}
      {[60, 150, 240, 330].map((x, i) => (
        <motion.line
          key={`marker-${i}`}
          x1={x}
          y1="245"
          x2={x}
          y2="255"
          stroke="#93c5fd"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5 + i * 0.1 }}
        />
      ))}

      {/* Organized spectrum indicator */}
      <motion.rect
        x="55"
        y="75"
        width="290"
        height="150"
        rx="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, delay: 3 }}
      />

      {/* Order indicator */}
      <motion.circle
        cx="200"
        cy="150"
        r="60"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5, delay: 5, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* No interference checkmark */}
      <motion.path
        d="M 190 265 L 195 270 L 205 258"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 6 }}
      />
    </svg>
  );
}

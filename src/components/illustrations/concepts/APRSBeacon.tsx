import { motion } from "motion/react";

export function APRSBeacon() {
  const pathPoints = [
    { x: 80, y: 220 },
    { x: 140, y: 180 },
    { x: 200, y: 160 },
    { x: 260, y: 140 },
    { x: 320, y: 120 },
  ];

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Path line */}
      <motion.path
        d="M 80 220 L 140 180 L 200 160 L 260 140 L 320 120"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      />

      {/* Position markers */}
      {pathPoints.map((point, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={point.x}
            cy={point.y}
            r="6"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 + i * 0.4 }}
          />

          {/* Beacon pulse */}
          <motion.circle
            cx={point.x}
            cy={point.y}
            r="15"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 1.5,
              delay: 1.5 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 3.5 - i * 0.4,
            }}
          />
        </motion.g>
      ))}

      {/* Moving beacon */}
      <motion.circle
        r="8"
        fill="#10b981"
        initial={{ cx: 80, cy: 220 }}
        animate={{
          cx: [80, 140, 200, 260, 320],
          cy: [220, 180, 160, 140, 120],
        }}
        transition={{ duration: 4, delay: 1.5, ease: "linear" }}
      />

      {/* Data packets */}
      {pathPoints.slice(0, -1).map((point, i) => (
        <motion.g key={`packet-${i}`}>
          <motion.rect
            x={point.x + 10}
            y={point.y - 15}
            width="20"
            height="12"
            rx="2"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              delay: 2.5 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          {/* Data transmission lines */}
          {[0, 1, 2].map((line) => (
            <motion.line
              key={line}
              x1={point.x + 12 + line * 3}
              y1={point.y - 12}
              x2={point.x + 12 + line * 3}
              y2={point.y - 6}
              stroke="#60a5fa"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2,
                delay: 2.5 + i * 0.4,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </motion.g>
      ))}

      {/* Current position highlight */}
      <motion.circle
        cx="320"
        cy="120"
        r="12"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.5, delay: 5.5 }}
      />

      {/* Location pin */}
      <motion.path
        d="M 320 110 L 320 95 L 325 90 L 320 85 L 315 90 Z"
        fill="#10b981"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.3, delay: 5.7 }}
      />
    </svg>
  );
}

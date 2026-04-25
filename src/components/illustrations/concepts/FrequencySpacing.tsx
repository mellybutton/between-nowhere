import { motion } from "motion/react";

export function FrequencySpacing() {
  const frequencies = [
    { x: 100, color: "#3b82f6", delay: 0 },
    { x: 200, color: "#60a5fa", delay: 0.3 },
    { x: 300, color: "#93c5fd", delay: 0.6 },
  ];

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))" }}
    >
      {frequencies.map((freq, i) => (
        <g key={i}>
          {/* Vertical frequency line */}
          <motion.line
            x1={freq.x}
            y1="80"
            x2={freq.x}
            y2="220"
            stroke={freq.color}
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6] }}
            transition={{ duration: 1, delay: freq.delay }}
          />

          {/* Wave pattern */}
          <motion.path
            d={`M ${freq.x - 30} 150 Q ${freq.x - 15} 130, ${freq.x} 150 T ${freq.x + 30} 150`}
            fill="none"
            stroke={freq.color}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 1] }}
            transition={{ duration: 1.5, delay: freq.delay + 0.5, repeat: Infinity }}
          />

          {/* Frequency marker */}
          <motion.circle
            cx={freq.x}
            cy="150"
            r="6"
            fill={freq.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 0.5, delay: freq.delay }}
          />

          {/* Pulse */}
          <motion.circle
            cx={freq.x}
            cy="150"
            r="20"
            fill="none"
            stroke={freq.color}
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, delay: freq.delay + 1, repeat: Infinity, repeatDelay: 1 }}
          />
        </g>
      ))}

      {/* Spacing indicators */}
      <motion.line
        x1="100"
        y1="240"
        x2="200"
        y2="240"
        stroke="#1e3a8a"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      />
      <motion.line
        x1="200"
        y1="240"
        x2="300"
        y2="240"
        stroke="#1e3a8a"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      />
    </svg>
  );
}

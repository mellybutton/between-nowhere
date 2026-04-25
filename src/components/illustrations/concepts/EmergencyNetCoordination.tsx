import { motion } from "motion/react";

export function EmergencyNetCoordination() {
  const nodes = [
    { x: 120, y: 120, type: "station", delay: 0.5 },
    { x: 280, y: 120, type: "station", delay: 0.7 },
    { x: 320, y: 200, type: "station", delay: 0.9 },
    { x: 200, y: 240, type: "station", delay: 1.1 },
    { x: 80, y: 200, type: "station", delay: 1.3 },
  ];

  const hub = { x: 200, y: 150 };

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Connection lines from hub to stations */}
      {nodes.map((node, i) => (
        <motion.line
          key={`line-${i}`}
          x1={hub.x}
          y1={hub.y}
          x2={node.x}
          y2={node.y}
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.5 + i * 0.2 }}
        />
      ))}

      {/* Net control hub */}
      <motion.g>
        <motion.circle
          cx={hub.x}
          cy={hub.y}
          r="18"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        />

        <motion.circle
          cx={hub.x}
          cy={hub.y}
          r="10"
          fill="#fbbf24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        />

        {/* Hub coordination pulse */}
        <motion.circle
          cx={hub.x}
          cy={hub.y}
          r="25"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.8, 2.5], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.g>

      {/* Station nodes */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="12"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: node.delay }}
          />

          <motion.circle
            cx={node.x}
            cy={node.y}
            r="6"
            fill="#60a5fa"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: node.delay + 0.2 }}
          />

          {/* Station ready indicator */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="18"
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1.5], opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.5, delay: 3 + i * 0.5, repeat: Infinity, repeatDelay: 6 }}
          />
        </motion.g>
      ))}

      {/* Communication pulses from hub to stations */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`pulse-${i}`}
          r="5"
          fill="#fbbf24"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 4 + i * 0.4, repeat: Infinity, repeatDelay: 5 }}
        >
          <animateMotion
            dur="1.5s"
            begin={`${4 + i * 0.4}s`}
            repeatCount="indefinite"
            path={`M ${hub.x} ${hub.y} L ${node.x} ${node.y}`}
          />
        </motion.circle>
      ))}

      {/* Response pulses from stations back to hub */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`response-${i}`}
          r="4"
          fill="#10b981"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 5.5 + i * 0.4, repeat: Infinity, repeatDelay: 5 }}
        >
          <animateMotion
            dur="1.5s"
            begin={`${5.5 + i * 0.4}s`}
            repeatCount="indefinite"
            path={`M ${node.x} ${node.y} L ${hub.x} ${hub.y}`}
          />
        </motion.circle>
      ))}

      {/* Net active indicator */}
      <motion.circle
        cx={hub.x}
        cy={hub.y - 35}
        r="8"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 7 }}
      />

      <motion.path
        d={`M ${hub.x - 4} ${hub.y - 35} L ${hub.x - 1} ${hub.y - 32} L ${hub.x + 4} ${hub.y - 38}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 7.5 }}
      />

      {/* Coverage area */}
      <motion.ellipse
        cx={hub.x}
        cy={hub.y + 10}
        rx="140"
        ry="110"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 3 }}
      />
    </svg>
  );
}

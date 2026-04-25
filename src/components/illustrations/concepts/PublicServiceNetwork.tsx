import { motion } from "motion/react";

export function PublicServiceNetwork() {
  const nodes = [
    { x: 200, y: 100, type: "central", delay: 0 },
    { x: 120, y: 140, type: "station", delay: 0.3 },
    { x: 280, y: 140, type: "station", delay: 0.4 },
    { x: 100, y: 200, type: "station", delay: 0.5 },
    { x: 200, y: 220, type: "station", delay: 0.6 },
    { x: 300, y: 200, type: "station", delay: 0.7 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ];

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}
    >
      {/* Landscape silhouette - subtle context */}
      <motion.path
        d="M 50 250 Q 100 240, 150 245 Q 200 240, 250 245 Q 300 240, 350 250"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2 }}
      />

      {/* Connection lines */}
      {connections.map((conn, i) => (
        <motion.line
          key={i}
          x1={nodes[conn.from].x}
          y1={nodes[conn.from].y}
          x2={nodes[conn.to].x}
          y2={nodes[conn.to].y}
          stroke="#3b82f6"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1 + i * 0.2 }}
        />
      ))}

      {/* Communication pulses along connections */}
      {connections.map((conn, i) => (
        <motion.circle
          key={`pulse-${i}`}
          r="4"
          fill="#60a5fa"
          initial={{
            cx: nodes[conn.from].x,
            cy: nodes[conn.from].y,
            opacity: 0,
          }}
          animate={{
            cx: [nodes[conn.from].x, nodes[conn.to].x],
            cy: [nodes[conn.from].y, nodes[conn.to].y],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 2.5 + i * 0.4,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}

      {/* Station nodes */}
      {nodes.map((node, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.type === "central" ? 12 : 8}
            fill="none"
            stroke={node.type === "central" ? "#60a5fa" : "#3b82f6"}
            strokeWidth={node.type === "central" ? 3 : 2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: node.delay, duration: 0.5 }}
          />

          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.type === "central" ? 6 : 4}
            fill={node.type === "central" ? "#60a5fa" : "#3b82f6"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: node.delay + 0.2, duration: 0.3 }}
          />

          {/* Warm human touch - activity pulse */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.type === "central" ? 20 : 15}
            fill="none"
            stroke={node.type === "central" ? "#fbbf24" : "#60a5fa"}
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 2.5,
              delay: 3 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </motion.g>
      ))}

      {/* Network health indicator - calm coordination */}
      <motion.circle
        cx="200"
        cy="100"
        r="25"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1], opacity: [0, 0.7, 0.7] }}
        transition={{ delay: 4, duration: 0.8 }}
      />

      {/* Active coordination indicator */}
      <motion.path
        d="M 190 100 L 197 107 L 210 92"
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 4.5 }}
      />

      {/* Coverage area - serving the community */}
      <motion.ellipse
        cx="200"
        cy="160"
        rx="120"
        ry="80"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 5 }}
      />
    </svg>
  );
}

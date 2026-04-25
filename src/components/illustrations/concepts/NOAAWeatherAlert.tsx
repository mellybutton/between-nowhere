import { motion } from "motion/react";

export function NOAAWeatherAlert() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" }}
    >
      {/* Weather tower/transmitter */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <line x1="200" y1="200" x2="200" y2="140" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="200" cy="200" r="8" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <line x1="190" y1="160" x2="210" y2="160" stroke="#60a5fa" strokeWidth="2" />
        <line x1="185" y1="150" x2="215" y2="150" stroke="#60a5fa" strokeWidth="2" />
      </motion.g>

      {/* Cloud silhouette */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        <ellipse cx="280" cy="100" rx="40" ry="25" fill="none" stroke="#1e3a8a" strokeWidth="2" />
        <ellipse cx="250" cy="110" rx="30" ry="20" fill="none" stroke="#1e3a8a" strokeWidth="2" />
        <ellipse cx="310" cy="110" rx="30" ry="20" fill="none" stroke="#1e3a8a" strokeWidth="2" />
      </motion.g>

      {/* Lightning bolt */}
      <motion.path
        d="M 290 120 L 285 135 L 292 135 L 287 150"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 4 }}
      />

      {/* Alert rings emanating from tower */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`alert-${i}`}
          cx="200"
          cy="160"
          r="30"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2.5, 3.5], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, delay: 2 + i * 0.8, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}

      {/* Alert signal path to weather */}
      <motion.path
        d="M 200 140 Q 230 110, 260 100"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 2.5 }}
      />

      {/* Alert pulse traveling to cloud */}
      <motion.circle
        r="5"
        fill="#fbbf24"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 3 }}
      >
        <animateMotion
          dur="1.5s"
          begin="3s"
          repeatCount="indefinite"
          path="M 200 140 Q 230 110, 260 100"
        />
      </motion.circle>

      {/* Weather radio receivers */}
      {[
        { x: 120, y: 220, delay: 4 },
        { x: 280, y: 220, delay: 4.5 },
        { x: 200, y: 250, delay: 5 },
      ].map((receiver, i) => (
        <motion.g key={`receiver-${i}`}>
          <motion.rect
            x={receiver.x - 12}
            y={receiver.y - 8}
            width="24"
            height="16"
            rx="3"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          />

          {/* Reception indicator */}
          <motion.circle
            cx={receiver.x}
            cy={receiver.y}
            r="15"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5, delay: receiver.delay, repeat: Infinity, repeatDelay: 4 }}
          />

          {/* Alert received */}
          <motion.circle
            cx={receiver.x}
            cy={receiver.y - 15}
            r="4"
            fill="#fbbf24"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
            transition={{ delay: receiver.delay + 0.5 }}
          />
        </motion.g>
      ))}

      {/* Broadcast coverage area */}
      <motion.circle
        cx="200"
        cy="160"
        r="100"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 3.5 }}
      />

      {/* Tower status glow */}
      <motion.circle
        cx="200"
        cy="160"
        r="20"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

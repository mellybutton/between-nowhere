import { motion } from "motion/react";

export function BatteryPower() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 25px rgba(59, 130, 246, 0.5))" }}
    >
      {/* Battery outline */}
      <motion.rect
        x="140"
        y="120"
        width="120"
        height="80"
        rx="8"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Battery terminal */}
      <motion.rect
        x="260"
        y="145"
        width="15"
        height="30"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Power level indicator */}
      <motion.rect
        x="150"
        y="130"
        width="90"
        height="60"
        rx="4"
        fill="#3b82f6"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 0.6, 0.6] }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{ transformOrigin: "left center" }}
      />

      {/* Energy cells */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={160 + i * 30}
          y="140"
          width="20"
          height="40"
          rx="2"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ duration: 0.3, delay: 1 + i * 0.2 }}
        />
      ))}

      {/* Glow pulse */}
      <motion.rect
        x="140"
        y="120"
        width="120"
        height="80"
        rx="8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Energy particles emanating */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const startX = 200;
        const startY = 160;
        const endX = startX + Math.cos(angle) * 80;
        const endY = startY + Math.sin(angle) * 60;

        return (
          <motion.circle
            key={i}
            cx={startX}
            cy={startY}
            r="3"
            fill="#60a5fa"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: endX - startX,
              y: endY - startY,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 2 + i * 0.15,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        );
      })}

      {/* Plus/minus terminals */}
      <motion.text
        x="155"
        y="120"
        fill="#60a5fa"
        fontSize="16"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        +
      </motion.text>
      <motion.text
        x="245"
        y="205"
        fill="#60a5fa"
        fontSize="16"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        −
      </motion.text>
    </svg>
  );
}

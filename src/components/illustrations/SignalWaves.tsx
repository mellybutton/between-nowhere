import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function SignalWaves() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 0.5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7b89ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#7b89ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7b89ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M 0,${200 + i * 80} Q 200,${150 + i * 80} 400,${200 + i * 80} T 800,${200 + i * 80}`}
            stroke={i % 2 === 0 ? "url(#waveGradient1)" : "url(#waveGradient2)"}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 0.6, 0],
              x: offset * (i + 1) * 0.5,
            }}
            transition={{
              pathLength: { duration: 3, delay: i * 0.5 },
              opacity: { duration: 4, repeat: Infinity, repeatType: "loop", delay: i * 0.7 },
              x: { duration: 0.05, ease: "linear" },
            }}
          />
        ))}

        <motion.circle
          cx="100"
          cy="200"
          r="4"
          fill="#7b89ff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
        />

        <motion.circle
          cx="700"
          cy="280"
          r="3"
          fill="#8b5cf6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 0.8, delay: 1 }}
        />
      </svg>
    </div>
  );
}

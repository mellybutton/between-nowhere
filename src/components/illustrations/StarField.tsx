import { motion } from "framer-motion";
import { useMemo } from "react";

export function StarField({ density = 30 }: { density?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: density }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, [density]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-accent"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
}

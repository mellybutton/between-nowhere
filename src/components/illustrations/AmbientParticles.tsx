import { motion } from "motion/react";
import { useMemo } from "react";

export function AmbientParticles({ count = 15 }: { count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(123, 137, 255, 0.8) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, particle.direction * 30, 0],
            x: [0, particle.direction * -20, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

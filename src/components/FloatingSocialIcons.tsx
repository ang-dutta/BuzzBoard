import { motion } from 'motion/react';
import { Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export function FloatingSocialIcons() {
  const icons = [
    { Icon: Instagram, color: 'from-pink-500 to-purple-600', delay: 0 },
    { Icon: Youtube, color: 'from-red-500 to-red-600', delay: 0.2 },
    { Icon: Twitter, color: 'from-blue-400 to-blue-600', delay: 0.4 },
    { Icon: Linkedin, color: 'from-blue-600 to-blue-800', delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-3 shadow-lg`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 0.8, 
            y: 0,
            x: [0, 10, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            top: `${20 + (index * 15)}%`,
            left: `${10 + (index % 2) * 70}%`,
          }}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>
      ))}
    </div>
  );
}
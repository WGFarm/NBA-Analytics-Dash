'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedViewProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right';
}

export default function AnimatedView({ children, isVisible, direction = 'right' }: AnimatedViewProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0,
            x: direction === 'right' ? 20 : -20 
          }}
          animate={{ 
            opacity: 1,
            x: 0
          }}
          exit={{ 
            opacity: 0,
            x: direction === 'right' ? -20 : 20
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
import { motion } from 'motion/react';
import { ReactNode } from 'react';

/**
 * Animated background component for the hero section.
 */
export function AnimatedBackground(): ReactNode {
    return (
        <motion.svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-0">
            <motion.path
                fill="#ff4d9d22"
                d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,106.7C840,117,960,171,1080,186.7C1200,203,1320,181,1380,170.7L1440,160L1440,320L0,320Z"
                animate={{ scaleY: [1, 1.03, 0.97, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originY: 1 }}
            />
            <motion.path
                fill="#ff4d9d33"
                d="M0,96L80,106.7C160,117,320,139,480,160C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L0,320Z"
                animate={{ scaleY: [1, 1.02, 0.98, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ originY: 1 }}
            />
        </motion.svg>
    );
}

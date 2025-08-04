/* eslint-disable prettier/prettier */
import { motion } from 'motion/react';
import { ReactNode } from 'react';

import { useInViewMotion } from '../hooks/use-in-view-motion.hook';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
    animate?: boolean;
}

/**
 * Feature card component.
 */
export function FeatureCard({ icon, title, description, delay, animate = true }: FeatureCardProps): ReactNode {
    const { ref, isInView } = useInViewMotion();
    const titleId = `feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <motion.div
            ref={ref}
            initial={animate ? { opacity: 0, y: 40 } : undefined}
            animate={animate && isInView ? { opacity: 1, y: 0 } : undefined}
            transition={animate ? { duration: 0.5, delay, ease: 'easeOut' } : undefined}
            whileHover={animate ? 'hover' : undefined}
            className="bg-gradient-to-b from-surface/40 to-background border border-border rounded-2xl p-10 shadow-lg transition-transform duration-300 flex flex-col items-center text-center group"
            role="group"
            aria-labelledby={titleId}
        >
            <motion.div
                variants={
                    animate
                        ? {
                            hover: {
                                rotate: 8,
                                scale: 1.1,
                                transition: { type: 'spring', stiffness: 300, damping: 15 },
                            },
                        }
                        : undefined
                }
                className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-4xl mb-6 group-hover:shadow-[0_0_12px_#ff4d9d88] transition-shadow duration-300"
                aria-hidden="true"
            >
                {icon}
            </motion.div>

            <h3 id={titleId} className="text-2xl font-bold text-text tracking-tight mb-4">
                {title}
            </h3>
            <p className="text-text-muted text-lg">{description}</p>
        </motion.div>
    );
}

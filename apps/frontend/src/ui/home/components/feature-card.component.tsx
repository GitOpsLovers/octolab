import { motion } from 'motion/react';
import { ReactNode } from 'react';

import { useInViewMotion } from '../hooks/use-in-view-motion.hook';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

/**
 * Feature card component.
 */
export function FeatureCard({ icon, title, description, delay }: FeatureCardProps): ReactNode {
    const { ref, isInView } = useInViewMotion();
    const titleId = `feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            whileHover="hover"
            className="bg-gradient-to-b from-surface/40 to-background border border-border rounded-2xl p-10 shadow-lg transition-transform duration-300 flex flex-col items-center text-center group"
            role="group"
            aria-labelledby={titleId}
        >
            <motion.div
                variants={{
                    hover: {
                        rotate: 8,
                        scale: 1.1,
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                }}
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

'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

import { useInViewMotion } from '../hooks/use-in-view-motion.hook';

interface StepCardProps {
    number: string;
    title: string;
    description: string;
    delay?: number;
}

/**
 * Step card component.
 */
export function StepCard({ number, title, description, delay = 0 }: StepCardProps): ReactNode {
    const { ref, isInView } = useInViewMotion();
    const headingId = `step-${number.replace(/\s+/g, '-')}-title`;

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            aria-labelledby={headingId}
            className="relative z-10 flex-1 bg-surface border border-border rounded-2xl p-8 shadow-md"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="text-white bg-primary w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg" aria-hidden="true">
                    {number}
                </div>
                <h3 id={headingId} className="text-xl font-semibold text-text tracking-tight">
                    {title}
                </h3>
            </div>
            <p className="text-text-muted text-base pl-16">{description}</p>
        </motion.article>
    );
}

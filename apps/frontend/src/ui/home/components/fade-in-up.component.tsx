import { motion } from 'motion/react';
import { JSX, ReactNode } from 'react';

interface FadeInUpProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    id?: string;
}

/**
 * Wrapper motion component with fade + up animation.
 */
export function FadeInUp({ children, delay = 0, className = '', as = 'div', id }: FadeInUpProps) {
    const MotionComponent = motion(as);

    return (
        <MotionComponent
            id={id}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
        >
            {children}
        </MotionComponent>
    );
}

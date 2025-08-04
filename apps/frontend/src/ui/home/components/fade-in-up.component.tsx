import { motion } from 'motion/react';
import { JSX, ReactNode } from 'react';

interface FadeInUpProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    id?: string;
    animate?: boolean;
}

/**
 * Wrapper motion component with fade up animation.
 */
export function FadeInUp({ children, delay = 0, className = '', as = 'div', id, animate = true }: FadeInUpProps) {
    const MotionComponent = motion(as);

    return (
        <MotionComponent
            id={id}
            className={className}
            initial={animate ? { opacity: 0, y: 40 } : undefined}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            transition={animate ? { duration: 0.6, delay, ease: 'easeOut' } : undefined}
            viewport={animate ? { once: true, amount: 0.4 } : undefined}
        >
            {children}
        </MotionComponent>
    );
}

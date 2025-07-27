'use client';

import { useInView } from 'motion/react';
import { useRef } from 'react';

/**
 * Hook that provides a ref and inView status using Motion.
 */
export function useInViewMotion(options?: Parameters<typeof useInView>[1]) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3, ...options });

    return { ref, isInView };
}

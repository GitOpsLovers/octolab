'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';

import { useInViewMotion } from '../hooks/use-in-view-motion.hook';

import { FadeInUp } from './fade-in-up.component';

/**
 * CTA component with parallax background.
 */
export function Cta() {
    const { ref } = useInViewMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    const headingId = 'cta-heading';

    return (
        <section ref={ref} className="relative w-full px-4 py-8 md:py-32 bg-surface overflow-hidden" aria-labelledby={headingId}>
            <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 blur-2xl opacity-60" />
            </motion.div>

            <FadeInUp className="relative z-10 max-w-3xl mx-auto text-center">
                <FadeInUp as="h2" id={headingId} className="text-4xl font-bold text-text">
                    Launch your next workflow 10× faster
                </FadeInUp>

                <FadeInUp as="p" delay={0.15} className="text-lg text-text-muted mt-4">
                    Start using OctoLab today. It&apos;s free, fast, and made for builders.
                </FadeInUp>

                <FadeInUp delay={0.3} className="mt-8 mb-10 sm:mb-0">
                    <Link href="/templates" className="bg-primary text-white px-10 py-4 rounded-md text-lg font-semibold hover:bg-primary-hover transition">
                        Get Started Free
                    </Link>
                </FadeInUp>
            </FadeInUp>
        </section>
    );
}

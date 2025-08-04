'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { PiRocketLaunchBold } from 'react-icons/pi';

import { StepCard } from './step-card.compont';

import { useIsDesktop } from '@ui/layout/hooks/is-desktop.hook';

const steps = [
    {
        number: '1',
        title: 'Pick a Template',
        description: 'Select a production-ready template tailored to your tech stack — Node.js, Docker, Vercel and more.',
    },
    {
        number: '2',
        title: 'Customize Visually',
        description: 'Add steps, change triggers, tweak inputs — all with an intuitive drag & drop editor. No YAML needed.',
    },
    {
        number: '3',
        title: 'Deploy or Export',
        description: 'Push directly to GitHub or download the clean YAML. Your workflow, your way.',
    },
];

/**
 * How Works component.
 */
export function HowWorks(): ReactNode {
    const isDesktop = useIsDesktop();
    if (isDesktop === null) return null;

    const headingId = 'how-works-heading';

    return (
        <section className="w-full px-4 py-8 md:py-32 bg-background border-t border-border" aria-labelledby={headingId}>
            <div className="max-w-5xl mx-auto text-center mb-10 md:mb-20">
                <h2 id={headingId} className="text-4xl md:text-5xl font-extrabold text-text tracking-tight">
                    Go from zero to deployed in minutes
                </h2>
                <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">
                    OctoLab guides you step by step, helping you create and launch your workflow visually, without config struggles.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-stretch gap-12">
                <div className="hidden md:block absolute left-8 top-[4.5rem] bottom-0 w-1 md:left-[calc(16.66%-1rem)] md:top-1/2 md:bottom-auto md:h-1 md:w-[calc(100%-4rem)] bg-border z-0">
                    {isDesktop && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                            whileInView={{
                                opacity: 1,
                                scale: [1, 1.08, 1],
                                rotate: 0,
                            }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                                opacity: { duration: 0.6, delay: 0.6, ease: 'easeOut' },
                                rotate: { duration: 0.6, delay: 0.6, ease: 'easeOut' },
                                scale: {
                                    duration: 2,
                                    delay: 0.6,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: 'easeInOut',
                                },
                            }}
                            className="hidden md:flex items-center justify-center absolute -right-10 -top-10 w-20 h-20 rounded-full bg-border text-primary shadow-md text-5xl"
                            aria-hidden="true"
                        >
                            <PiRocketLaunchBold />
                        </motion.div>
                    )}
                </div>

                {steps.map((step, i) => (
                    <StepCard key={i} {...step} delay={i * 0.2} animate={isDesktop} />
                ))}
            </div>
        </section>
    );
}

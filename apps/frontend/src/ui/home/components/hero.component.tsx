'use client';

import { SessionData } from '@auth0/nextjs-auth0/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { AnimatedBackground } from './hero-background.component';

import { useIsDesktop } from '@ui/layout/hooks/is-desktop.hook';

interface HeroProps {
    session: SessionData | null;
}

/**
 * Hero component.
 */
export function Hero({ session }: HeroProps): ReactNode {
    const isDesktop = useIsDesktop();

    if (isDesktop === null) {
        return null;
    }

    return (
        <section aria-labelledby="hero-title" className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background overflow-hidden">
            {isDesktop && <AnimatedBackground />}

            <motion.div
                className="absolute inset-0 z-0 bg-[radial-gradient(#ff4d9d11_1px,transparent_1px)] [background-size:24px_24px]"
                initial={isDesktop ? { opacity: 0 } : undefined}
                animate={isDesktop ? { opacity: 0.2 } : undefined}
                transition={isDesktop ? { duration: 2 } : undefined}
            />

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-surface/60 to-background z-0" />

            <motion.div
                className="relative z-10 flex flex-col items-center gap-6 max-w-4xl"
                initial={isDesktop ? { opacity: 0, y: 40 } : undefined}
                animate={isDesktop ? { opacity: 1, y: 0 } : undefined}
                transition={isDesktop ? { duration: 0.8 } : undefined}
            >
                {isDesktop && (
                    <motion.div
                        className="absolute w-64 h-64 rounded-full bg-primary/30 blur-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.4, scale: [0.9, 1.05, 0.95, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ top: '-40px', left: '-50px', zIndex: 0 }}
                    />
                )}

                <motion.div
                    className="relative flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-3 text-center sm:text-left"
                    initial={isDesktop ? { opacity: 0, scale: 0.95 } : undefined}
                    animate={isDesktop ? { opacity: 1, scale: 1 } : undefined}
                    transition={isDesktop ? { duration: 0.6, delay: 0.2 } : undefined}
                >
                    <Image src="/img/logo/header-logo-sm.png" alt="OctoLab logo" width={260} height={36} priority className="w-[180px] sm:w-[260px] h-auto" />

                    <span className="text-6xl md:text-7xl font-bold text-primary relative">
                        OctoLab
                        <span className="absolute -top-2 -right-8 bg-secondary text-surface text-xs sm:text-sm font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                            Beta
                        </span>
                    </span>
                </motion.div>

                <motion.h1
                    id="hero-title"
                    className="text-4xl md:text-5xl font-extrabold text-text leading-tight"
                    initial={isDesktop ? { opacity: 0, y: 20 } : undefined}
                    animate={isDesktop ? { opacity: 1, y: 0 } : undefined}
                    transition={isDesktop ? { duration: 0.7, delay: 0.3 } : undefined}
                >
                    <span className="block sm:hidden">The easiest way to build GitHub workflows.</span>
                    <span className="hidden sm:inline">
                        The easiest way to build <br />
                        GitHub workflows.
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg text-text-muted max-w-xl"
                    initial={isDesktop ? { opacity: 0, y: 20 } : undefined}
                    animate={isDesktop ? { opacity: 1, y: 0 } : undefined}
                    transition={isDesktop ? { duration: 0.7, delay: 0.4 } : undefined}
                >
                    A visual builder for GitHub Actions, crafted for developers and teams. Design, customize, and deploy workflows faster.
                </motion.p>

                <motion.div
                    className="flex gap-4 mt-2 md:mt-4 flex-wrap justify-center"
                    initial={isDesktop ? { opacity: 0, y: 20 } : undefined}
                    animate={isDesktop ? { opacity: 1, y: 0 } : undefined}
                    transition={isDesktop ? { duration: 0.7, delay: 0.5 } : undefined}
                >
                    <Link
                        href="/templates"
                        className="bg-primary text-white px-8 py-3 md:px-12 md:py-4 rounded-md text-lg md:text-xl font-semibold hover:bg-primary-hover transition"
                        data-umami-event={session ? '[Home] Continue building click' : '[Home] Start building click'}
                    >
                        {session ? 'Continue building' : 'Start building now'}
                    </Link>

                    {session && (
                        <Link
                            href="/my-workflows"
                            className="bg-secondary text-surface px-8 py-3 md:px-12 md:py-4 rounded-md text-lg md:text-xl font-semibold hover:bg-secondary-hover transition"
                            data-umami-event="[Home] View my workflows click"
                        >
                            View my workflows
                        </Link>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}

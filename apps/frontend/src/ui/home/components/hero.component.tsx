'use client';

import { SessionData } from '@auth0/nextjs-auth0/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { AnimatedBackground } from './hero-background.component';

interface HeroProps {
    session: SessionData | null;
}

/**
 * Hero component.
 */
export function Hero({ session }: HeroProps): ReactNode {
    return (
        <section aria-labelledby="hero-title" className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background overflow-hidden">
            <AnimatedBackground />

            <motion.div
                className="absolute inset-0 z-0 bg-[radial-gradient(#ff4d9d11_1px,transparent_1px)] [background-size:24px_24px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 2 }}
            />

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-surface/60 to-background z-0" />

            <motion.div
                className="relative z-10 flex flex-col items-center gap-6 max-w-4xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="absolute w-64 h-64 rounded-full bg-primary/30 blur-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: [0.9, 1.05, 0.95, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ top: '-40px', left: '-50px', zIndex: 0 }}
                />

                <motion.div
                    className="relative flex items-end gap-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Image src="/img/logo/header-logo-sm.png" alt="OctoLab logo" width={260} height={36} priority />
                    <span className="text-6xl md:text-7xl font-bold text-primary relative">
                        OctoLab
                        <span className="absolute -top-3 -right-10 bg-secondary text-surface text-sm font-bold px-3 py-1 rounded-full shadow-md">Beta</span>
                    </span>
                </motion.div>

                <motion.h1
                    id="hero-title"
                    className="text-4xl md:text-5xl font-extrabold text-text leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    The easiest way to build <br />
                    GitHub workflows.
                </motion.h1>

                <motion.p className="text-lg text-text-muted max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
                    A visual builder for GitHub Actions, crafted for developers and teams. Design, customize, and deploy workflows faster.
                </motion.p>

                <motion.div
                    className="flex gap-4 mt-4 flex-wrap justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <Link
                        href="/templates"
                        className="bg-primary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-primary-hover transition"
                        data-umami-event={session ? '[Home] Continue building click' : '[Home] Start building click'}
                    >
                        {session ? 'Continue building' : 'Start building now'}
                    </Link>
                    {session && (
                        <Link
                            href="/my-workflows"
                            className="bg-secondary text-surface px-8 py-3 rounded-md text-lg font-semibold hover:bg-secondary-hover transition"
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

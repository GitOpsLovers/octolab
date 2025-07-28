'use client';

import { ReactNode } from 'react';
import { BiSolidFileExport } from 'react-icons/bi';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { IoBrowsers } from 'react-icons/io5';

import { FadeInUp } from './fade-in-up.component';
import { FeatureCard } from './feature-card.component';

const features = [
    {
        icon: <IoBrowsers />,
        title: 'Visual Editor',
        description: 'Design workflows in seconds using a powerful drag & drop builder. Say goodbye to config errors.',
    },
    {
        icon: <FaWandMagicSparkles />,
        title: 'Launch-Ready Templates',
        description: 'Use expert-built templates to deploy workflows for Node.js, Docker, Vercel and more instantly.',
    },
    {
        icon: <BiSolidFileExport />,
        title: 'Export Clean YAML',
        description: 'Download production-ready YAML or commit directly to your repo. You own your code.',
    },
];

/**
 * Features component.
 */
export function Features(): ReactNode {
    return (
        <section aria-labelledby="features-title" className="w-full px-4 py-32 bg-surface">
            <div className="max-w-6xl mx-auto text-center mb-20">
                <FadeInUp as="h2" id="features-title" className="text-4xl font-bold text-text">
                    What you can do
                </FadeInUp>

                <FadeInUp as="p" delay={0.15} className="text-lg text-text-muted mt-4">
                    Visual editing, ready-to-use templates, clean YAML output. All streamlined for speed.
                </FadeInUp>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {features.map((f, i) => (
                    <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} delay={i * 0.2} />
                ))}
            </div>
        </section>
    );
}

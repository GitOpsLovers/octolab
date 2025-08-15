'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { FaSpinner } from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import { useTemplate } from '../hooks/templates.hooks';

import { TemplateIcon } from './template-icon.component';
import { TemplateLandingSectionHeader } from './template-landing-section.header.component';

/**
 * Templates landing component.
 */
export function TemplateLanding() {
    const { template, loading, error } = useTemplate();

    const draftId = useMemo(() => uuidv4(), []);
    const newWorkflowUrl = template ? `/editor/templates/${template.id}/${draftId}` : '#';

    const IoIcon = (name?: string) => (Io5Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name ?? ''] ?? Io5Icons.IoHelpCircleOutline;

    /**
     * Show loading state if template is being fetched
     */
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted" role="status" aria-busy="true" aria-live="polite">
                <FaSpinner className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Loading template...</p>
            </div>
        );
    }

    /**
     * Show error state if there was an error fetching template
     */
    if (error) {
        return <p className="text-center text-red-500">Error loading template: {error}</p>;
    }

    return (
        <>
            {/* Hero */}
            <section className="relative mx-auto max-w-5xl text-center overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface/60 to-background p-6 md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ff4d9d11_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="pointer-events-none absolute -top-20 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

                <div className="relative z-10 mb-5 flex flex-col items-center justify-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface p-4 shadow-sm">
                        <TemplateIcon template={template} className="h-12 w-12 md:h-16 md:w-16 drop-shadow-sm" />
                    </span>
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text">{template?.name}</h1>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold text-text-muted backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            {template?.type && template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                        </span>
                    </div>
                </div>

                <p className="relative z-10 mx-auto max-w-3xl text-balance text-lg text-text-muted">{template?.largeDescription}</p>

                {template?.features?.length ? (
                    <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
                        {template.features.map((f, i) => (
                            <span key={i} className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-text-muted shadow-sm">
                                {f}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href={newWorkflowUrl}
                        className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
                        data-umami-event={`[Templates] Use template ${template?.id} click`}
                    >
                        Use this template
                    </Link>
                    <Link href="/templates" className="rounded-md border border-border bg-surface px-6 py-3 font-semibold text-text-muted transition hover:text-text">
                        Browse all templates
                    </Link>
                </div>
            </section>

            {/* What it does */}
            <section id="what-it-does" aria-labelledby="what-title" className="mx-auto mt-16 max-w-5xl">
                <TemplateLandingSectionHeader
                    headingId="what-title"
                    title="What does this workflow do?"
                    right={
                        template?.steps?.length ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold text-text-muted">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                {template.steps.length} steps
                                <span className="text-text-muted/70">
                                    ({template.steps[0]} → {template.steps[template.steps.length - 1]})
                                </span>
                            </span>
                        ) : null
                    }
                />

                {template?.whatDoInfo?.length ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {template.whatDoInfo.map((item, i) => {
                            const Icon = IoIcon(item.icon);
                            return (
                                <li key={i} className="group relative overflow-hidden rounded-xl border border-border bg-surface p-4 transition">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/60">
                                            <Icon className="text-primary text-[20px] leading-none" />
                                        </span>
                                        <div className="text-text">
                                            <p className="font-semibold">{item.label}</p>
                                            <p className="text-sm text-text-muted">{item.description}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </section>

            {/* Requirements */}
            <section id="requirements" className="mx-auto mt-16 max-w-5xl">
                <TemplateLandingSectionHeader
                    headingId="req-title"
                    title="Requirements & compatibility"
                    right={
                        template?.requirements?.length ? (
                            <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold text-text-muted">
                                {template.requirements.length} {template.requirements.length === 1 ? 'requirement' : 'requirements'}
                            </span>
                        ) : null
                    }
                />

                {template?.requirements?.length ? (
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {template.requirements.map((item: any, i: number) => {
                            const desc = typeof item === 'string' ? item : item.description;
                            const Icon = IoIcon(item.icon);

                            return (
                                <li key={i} className="group relative overflow-hidden rounded-xl border border-border bg-surface p-4 transition">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 [&>svg]:h-5 [&>svg]:w-5">
                                            <Icon className="text-primary" />
                                        </span>

                                        <p className="text-text-muted">{desc}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto mt-16 max-w-5xl">
                <TemplateLandingSectionHeader
                    headingId="faq-title"
                    title="FAQ"
                    right={
                        template?.faq?.length ? (
                            <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold text-text-muted">{template.faq.length} answers</span>
                        ) : null
                    }
                />

                {template?.faq?.length ? (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {template.faq.map((item: any, i: number) => {
                            const Icon = IoIcon(item.icon);

                            return (
                                <details key={i} className="group rounded-xl border border-border bg-surface p-4 open:shadow-md transition">
                                    <summary className="flex cursor-pointer list-none items-start gap-3">
                                        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/60">
                                            <Icon className="text-primary text-[20px] leading-none" />
                                        </span>
                                        <h3 className="flex-1 font-semibold text-text">{item.label}</h3>
                                        <Io5Icons.IoChevronDownOutline className="ml-2 mt-1 h-5 w-5 shrink-0 opacity-70 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <p className="mt-3 pl-[3.25rem] text-text-muted">{item.description}</p>
                                </details>
                            );
                        })}
                    </div>
                ) : null}
            </section>

            {/* CTA */}
            <section className="mx-auto mt-16 max-w-5xl">
                <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-gradient-to-br from-surface to-background p-6 md:flex-row md:items-center">
                    <div>
                        <h3 className="text-xl font-bold">Ready to use it in your repo?</h3>
                        <p className="text-text-muted">Open the visual editor to customize steps, runners, and versions in minutes.</p>
                    </div>
                    <Link
                        href={newWorkflowUrl}
                        className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:translate-y-[-1px] hover:bg-primary-hover"
                        data-umami-event={`[Templates] Use template ${template?.id} click`}
                    >
                        Use this template
                    </Link>
                </div>

                <div className="mt-10 text-center text-sm text-text-muted">
                    Looking for more? Browse{' '}
                    <Link href="/templates" className="underline underline-offset-4 hover:text-primary">
                        all templates
                    </Link>
                    .
                </div>
            </section>
        </>
    );
}

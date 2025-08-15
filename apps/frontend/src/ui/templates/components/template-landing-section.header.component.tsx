import { ReactNode } from 'react';

/**
 * Template section header for landing pages component.
 */
export function TemplateLandingSectionHeader({ title, right, headingId }: { title: string; right?: React.ReactNode; headingId: string }): ReactNode {
    return (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 id={headingId} className="text-balance text-2xl md:text-3xl font-bold text-text">
                {title}
            </h2>
            {right ?? null}
        </div>
    );
}

'use client';

import { ReactNode } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

interface TemplateWorkflowFieldHelpMessagesProps {
    message: string;
}

/**
 * Template workflow editor form field help messages component
 */
export function TemplateWorkflowEditorFormFieldHelpMessages({ message }: TemplateWorkflowFieldHelpMessagesProps): ReactNode {
    const parts = message.split(/(`[^`]+`)/g);

    return (
        <div className="text-xs mt-2 text-text-muted flex items-start gap-1">
            <HiOutlineLightBulb className="text-base text-primary" />

            <span className="flex flex-wrap items-center gap-1">
                {parts.map((part, index) =>
                    part.startsWith('`') && part.endsWith('`') ? (
                        <code key={index} className="border-primary/10 bg-primary/10 px-1 rounded-sm text-xs font-mono">
                            {part.slice(1, -1)}
                        </code>
                    ) : (
                        <span key={index}>{part}</span>
                    ),
                )}
            </span>
        </div>
    );
}

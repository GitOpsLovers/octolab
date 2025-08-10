'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

import { useEditorTemplate } from '../../hooks/editor-template.hooks';

/**
 * Template workflow editor form guide component
 */
export function TemplateWorkflowEditorFormGuide() {
    const { template } = useEditorTemplate();
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className={isVisible ? 'relative bg-surface border border-border p-4 rounded-lg shadow-sm' : 'hidden'}>
            <button
                onClick={() => {
                    setIsVisible(false);
                }}
                className="absolute top-2 right-2 text-text-muted hover:text-text transition cursor-pointer"
                aria-label="Cerrar guía"
            >
                <FiX size={16} />
            </button>
            <h2 className="text-lg font-semibold text-text flex items-center gap-2 mb-2">What does this workflow do?</h2>
            <ul className="space-y-2">
                {template?.guide.map((step) => (
                    <li key={step.label} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-primary font-semibold">{step.label}:</span>
                        <span>{step.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

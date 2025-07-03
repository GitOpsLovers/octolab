'use client';

import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';

import { useTemplates } from '../hooks/templates.hooks';

/**
 * Templates list component.
 */
export function TemplatesList() {
    const { templates, loading, error } = useTemplates();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                <FaIcons.FaSpinner className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Loading templates...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading templates: {error}</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">Choose a template to get started</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates?.map((template) => {
                    // eslint-disable-next-line import/namespace
                    const Icon = FaIcons[template.icon as keyof typeof FaIcons];

                    return (
                        <div key={template.id} className="bg-surface rounded-xl shadow hover:shadow-lg transition border border-border flex flex-col">
                            <div className="p-6 flex flex-col flex-1">
                                <Icon className="w-12 h-12 mb-4" style={{ color: template.iconColor }} />

                                <h2 className="text-xl font-bold text-text mb-2">{template.name}</h2>

                                <p className="text-text-muted mb-4">{template.description}</p>

                                <ul className="space-y-1 text-sm text-text-muted flex-1">
                                    {template.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="text-success">✔️</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/editor/${template.id}`}
                                    className="bg-primary text-white font-semibold text-center px-4 py-2 rounded-md hover:bg-primary-hover transition mt-6"
                                >
                                    Use template
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

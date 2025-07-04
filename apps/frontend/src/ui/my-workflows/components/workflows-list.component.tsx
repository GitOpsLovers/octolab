'use client';

import Link from 'next/link';
import { LuWorkflow } from 'react-icons/lu';

/**
 * Workflows list component.
 */
export function WorkflowsList() {
    const workflows = [
        {
            id: '1',
            name: 'Workflow 1',
            updatedAt: new Date().toISOString(),
        },
        {
            id: '2',
            name: 'Workflow 2',
            updatedAt: new Date().toISOString(),
        },
        {
            id: '3',
            name: 'Workflow 3',
            updatedAt: new Date().toISOString(),
        },
        {
            id: '4',
            name: 'Workflow 4',
            updatedAt: new Date().toISOString(),
        },
        {
            id: '5',
            name: 'Workflow 5',
            updatedAt: new Date().toISOString(),
        },
    ];

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">My workflows</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {workflows.map((workflow) => (
                    <Link key={workflow.id} href={`/editor/${workflow.id}`} className="bg-surface rounded-lg shadow hover:shadow-lg transition border border-border flex flex-col">
                        <div className="p-4 flex flex-col flex-1">
                            <LuWorkflow className="w-6 h-6 mb-3 text-primary" />

                            <h2 className="text-base font-semibold text-text mb-1">{workflow.name}</h2>

                            <p className="text-xs text-text-muted mb-3">Last updated: {new Date(workflow.updatedAt).toLocaleDateString()}</p>

                            <div className="mt-auto">
                                <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">Open</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

'use client';

import Link from 'next/link';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { LuWorkflow } from 'react-icons/lu';

import { useMyWorkflows } from '../hooks/my-workflows.hooks';

/**
 * Workflows list component.
 */
export function WorkflowsList() {
    const { workflows, loading, error } = useMyWorkflows();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                <FaSpinner className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Loading workflows...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading workflows: {error}</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">My workflows</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {workflows.map((workflow) => {
                    const workflowData = JSON.parse(workflow.data);

                    return (
                        <Link
                            key={workflow.id}
                            href={`/editor/${workflow.templateId}/${workflow.id}`}
                            className="bg-surface rounded-lg shadow hover:shadow-lg transition border border-border flex flex-col hover:border-primary"
                        >
                            <div className="p-4 flex flex-col flex-1">
                                <LuWorkflow className="w-6 h-6 mb-3 text-primary" />

                                <h2 className="text-lg font-bold text-text mb-1">{workflow.name}</h2>

                                <p className="text-sm text-text-muted mb-2">{workflow.description}</p>

                                <p className="text-xs text-text-muted mb-3">Last updated: {new Date(workflow.updatedAt).toLocaleDateString()}</p>

                                <div className="mt-auto">
                                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">{workflowData.id}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {/* Card extra para crear nuevo workflow */}
                <Link
                    href="/templates"
                    className="bg-surface rounded-lg shadow hover:shadow-lg transition border border-border flex flex-col items-center justify-center text-center p-6 hover:border-primary"
                >
                    <FaPlus className="w-8 h-8 text-primary mb-3" />
                    <h2 className="text-lg font-bold text-text mb-1">Create new workflow</h2>
                    <p className="text-sm text-text-muted">Start from a new template</p>
                </Link>
            </div>
        </>
    );
}

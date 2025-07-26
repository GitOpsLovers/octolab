'use client';

import { plansLimits } from '@octolab/domain';
import Link from 'next/link';
import { FaPlus, FaSpinner, FaEdit, FaTrash } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import { LuWorkflow } from 'react-icons/lu';

import { useMyWorkflows } from '../hooks/my-workflows.hooks';

import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

/**
 * Workflows list component.
 */
export function WorkflowsList() {
    const { authUser, fetchUser } = useAuthUser();
    const { workflows, loading, error, deleteWorkflow } = useMyWorkflows();

    const planLimit = plansLimits[authUser?.plan ?? 'free']?.workflows ?? 0;
    const hasReachedLimit = !!(workflows.length >= planLimit);

    // Delete workflow
    const handleDeleteWorkflow = async (workflowId: string) => {
        await deleteWorkflow(workflowId);
        await fetchUser();
    };

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
                        <div key={workflow.id} className="bg-surface rounded-lg shadow hover:shadow-lg transition border border-border flex flex-col">
                            <div className="p-4 flex flex-col flex-1">
                                <LuWorkflow className="w-6 h-6 mb-3 text-primary" />

                                <h2 className="text-lg font-bold text-text mb-1">{workflow.name}</h2>

                                <p className="text-sm text-text-muted mb-2">{workflow.description}</p>

                                <p className="text-xs text-text-muted mb-3">Last updated: {workflow.updatedAt}</p>

                                <div className="flex items-center justify-between gap-2 mt-auto pt-2">
                                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">{workflowData.id}</span>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/editor/${workflow.templateId}/${workflow.id}`}
                                            className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition cursor-pointer"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteWorkflow(workflow.id)}
                                            className="flex items-center gap-1 bg-danger text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-danger/70 transition cursor-pointer"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {hasReachedLimit ? (
                    <div className="bg-surface rounded-lg border border-dashed border-border flex flex-col p-4 items-center justify-center text-center opacity-50 cursor-not-allowed">
                        <FaPlus className="w-8 h-8 text-primary mb-3" />
                        <h2 className="text-lg font-bold text-text mb-1">Create new workflow</h2>
                        <p className="text-sm text-text-muted">You’ve reached the limit of 1 workflows. Upgrade to PRO to create more (coming soon).</p>
                    </div>
                ) : (
                    <Link
                        href="/templates"
                        className="bg-surface rounded-lg border border-dashed border-border flex flex-col p-4 items-center justify-center text-center hover:shadow-lg transition cursor-pointer"
                    >
                        <IoAddCircleOutline className="w-10 h-10 text-primary mb-2" />
                        <h2 className="text-lg font-bold text-text mb-1">Create new workflow</h2>
                        <p className="text-sm text-text-mutedtext-sm text-text-mutedtext-sm text-text-muted">Start from a new template</p>
                    </Link>
                )}
            </div>
        </>
    );
}

'use client';

import { ReactNode } from 'react';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Editor form component
 */
export function EditorForm(): ReactNode {
    const { editingWorkflow, setEditingWorkflow, resetEditingWorkflow, errors, setErrors } = useEditor();

    // Validate a field
    const validateField = (field: string, value: string) => {
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, [field]: 'This field cannot be empty' }));
        } else {
            setErrors((prev) => {
                const newErrors = Object.fromEntries(Object.entries(prev).filter(([key]) => key !== field));
                return newErrors;
            });
        }
    };

    if (!editingWorkflow) {
        return null;
    }

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col mb-4">
            <h2 className="text-xl font-bold text-text mb-4">Edit Configuration</h2>

            {/* Workflow name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Name</label>
                <input
                    type="text"
                    value={editingWorkflow.workflowName ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEditingWorkflow({ ...editingWorkflow, workflowName: value });
                        validateField('workflowName', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="CI Workflow"
                />
                {errors.workflowName && <p className="text-red-500 text-sm mt-1">{errors.workflowName}</p>}
            </div>

            {/* Runner */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Runner</label>
                <select
                    value={editingWorkflow.runner}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEditingWorkflow({ ...editingWorkflow, runner: value });
                        validateField('runner', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    <option value="ubuntu-latest">ubuntu-latest</option>
                    <option value="windows-latest">windows-latest</option>
                    <option value="macos-latest">macos-latest</option>
                </select>
                {errors.runner && <p className="text-red-500 text-sm mt-1">{errors.runner}</p>}
            </div>

            {/* Target Branch  */}
            {editingWorkflow.id !== 'node-pr-verify' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text mb-1">Target Branch</label>
                    <input
                        type="text"
                        value={editingWorkflow.branch}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditingWorkflow({ ...editingWorkflow, branch: value });
                            validateField('branch', value);
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                    {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                </div>
            )}

            {/* Node version */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Node version</label>
                <select
                    value={editingWorkflow.nodeVersion}
                    onChange={(e) => {
                        setEditingWorkflow({ ...editingWorkflow, nodeVersion: e.target.value });
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                </select>
            </div>

            {/* Template */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Installation command</label>
                <input
                    type="text"
                    value={editingWorkflow.installCommand ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEditingWorkflow({ ...editingWorkflow, installCommand: value });
                        validateField('installCommand', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="npm install"
                />
                {errors.installCommand && <p className="text-red-500 text-sm mt-1">{errors.installCommand}</p>}
            </div>

            {/* Lint command */}
            {editingWorkflow.id === 'node-pr-verify' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text mb-1">Lint command</label>
                    <input
                        type="text"
                        value={editingWorkflow.lintCommand ?? ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditingWorkflow({ ...editingWorkflow, lintCommand: value });
                            validateField('lintCommand', value);
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="npm lint"
                    />
                    {errors.lintCommand && <p className="text-red-500 text-sm mt-1">{errors.lintCommand}</p>}
                </div>
            )}

            {/* Test command */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Test command</label>
                <input
                    type="text"
                    value={editingWorkflow.testCommand ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEditingWorkflow({ ...editingWorkflow, testCommand: value });
                        validateField('testCommand', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="npm test"
                />
                {errors.testCommand && <p className="text-red-500 text-sm mt-1">{errors.testCommand}</p>}
            </div>

            {/* Build command */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Build command</label>
                <input
                    type="text"
                    value={editingWorkflow.buildCommand ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEditingWorkflow({ ...editingWorkflow, buildCommand: value });
                        validateField('buildCommand', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="npm run build"
                />
                {errors.buildCommand && <p className="text-red-500 text-sm mt-1">{errors.buildCommand}</p>}
            </div>

            {/* NPM Token Secret Name */}
            {editingWorkflow.id === 'npm-publish' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text mb-1">NPM Token Secret Name</label>
                    <input
                        type="text"
                        value={editingWorkflow.npmTokenSecret ?? ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditingWorkflow({ ...editingWorkflow, npmTokenSecret: value });
                            validateField('npmTokenSecret', value);
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Ej: NPM_TOKEN"
                    />
                    {errors.npmTokenSecret && <p className="text-red-500 text-sm mt-1">{errors.npmTokenSecret}</p>}
                </div>
            )}

            {/* Reset button */}
            <button
                type="button"
                onClick={() => {
                    resetEditingWorkflow();
                    setErrors({});
                }}
                className="mt-2 border border-secondary font-semibold text-secondary px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/80 transition self-start"
            >
                Reset Values
            </button>
        </div>
    );
}

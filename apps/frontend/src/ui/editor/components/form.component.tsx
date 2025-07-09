'use client';

import { ReactNode } from 'react';

import { useEditor } from '../hooks/editor.hooks';

export function EditorForm(): ReactNode {
    const { editingWorkflow, setEditingWorkflow, resetEditingWorkflow, errors, setErrors } = useEditor();

    const validateField = (field: string, value: string) => {
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, [field]: 'This field cannot be empty' }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    if (!editingWorkflow) return null;

    // ⚙️ Campos configurables
    const fieldsConfig = [
        {
            key: 'workflowName',
            label: 'Name',
            placeholder: 'CI Workflow',
            show: true,
            type: 'input',
        },
        {
            key: 'runner',
            label: 'Runner',
            show: true,
            type: 'select',
            options: ['ubuntu-latest', 'windows-latest', 'macos-latest'],
        },
        {
            key: 'branch',
            label: 'Target Branch',
            show: editingWorkflow.id !== 'node-pr-verify',
            type: 'input',
        },
        {
            key: 'nodeVersion',
            label: 'Node version',
            show: editingWorkflow.id !== 'vercel-pro-deployment',
            type: 'select',
            options: ['16', '18', '20', '22'],
        },
        {
            key: 'installCommand',
            label: 'Installation command',
            placeholder: 'npm install',
            show: editingWorkflow.id !== 'vercel-pro-deployment',
            type: 'input',
        },
        {
            key: 'lintCommand',
            label: 'Lint command',
            placeholder: 'npm lint',
            show: editingWorkflow.id === 'node-pr-verify',
            type: 'input',
        },
        {
            key: 'testCommand',
            label: 'Test command',
            placeholder: 'npm test',
            show: editingWorkflow.id === 'node-pr-verify' || editingWorkflow.id === 'npm-publish',
            type: 'input',
        },
        {
            key: 'buildCommand',
            label: 'Build command',
            placeholder: 'npm run build',
            show: editingWorkflow.id !== 'vercel-pro-deployment',
            type: 'input',
        },
        {
            key: 'npmTokenSecret',
            label: 'NPM Token Secret Name',
            placeholder: 'Ej: NPM_TOKEN',
            show: editingWorkflow.id === 'npm-publish',
            type: 'input',
        },
        {
            key: 'vercelTokenSecret',
            label: 'Vercel Token Secret Name',
            placeholder: 'Ej: VERCEL_TOKEN',
            show: editingWorkflow.id === 'vercel-pro-deployment',
            type: 'input',
        },
        {
            key: 'githubTokenSecret',
            label: 'GitHub Token Secret Name',
            placeholder: 'Ej: GITHUB_TOKEN',
            show: editingWorkflow.id === 'semantic-release',
            type: 'input',
        },
    ];

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col mb-4">
            <h2 className="text-xl font-bold text-text mb-4">Edit Configuration</h2>

            {fieldsConfig.map((field) => {
                if (!field.show) return null;

                const value = (editingWorkflow as any)[field.key] ?? '';
                return (
                    <div key={field.key} className="mb-4">
                        <label className="block text-sm font-medium text-text mb-1">{field.label}</label>
                        {field.type === 'input' ? (
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setEditingWorkflow({ ...editingWorkflow, [field.key]: newValue });
                                    validateField(field.key, newValue);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                placeholder={field.placeholder}
                            />
                        ) : (
                            <select
                                value={value}
                                onChange={(e) => {
                                    setEditingWorkflow({ ...editingWorkflow, [field.key]: e.target.value });
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            >
                                {field.options?.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors[field.key] && <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>}
                    </div>
                );
            })}

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

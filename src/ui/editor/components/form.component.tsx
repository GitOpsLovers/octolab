'use client';

import { ReactNode } from 'react';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Editor form component
 */
export function EditorForm(): ReactNode {
    const { config, setConfig, resetConfig, errors, setErrors } = useEditor();

    const validateField = (field: string, value: string) => {
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, [field]: 'This field cannot be empty' }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col">
            <h2 className="text-xl font-bold text-text mb-4">Edit Configuration</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Target Branch</label>
                <input
                    type="text"
                    value={config.branch}
                    onChange={(e) => {
                        const value = e.target.value;
                        setConfig({ ...config, branch: value });
                        validateField('branch', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Node version</label>
                <select
                    value={config.nodeVersion}
                    onChange={(e) => {
                        setConfig({ ...config, nodeVersion: e.target.value });
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="16">16</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Installation command</label>
                <input
                    type="text"
                    value={config.installCommand ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setConfig({ ...config, installCommand: value });
                        validateField('installCommand', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="npm install"
                />
                {errors.installCommand && <p className="text-red-500 text-sm mt-1">{errors.installCommand}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Test command</label>
                <input
                    type="text"
                    value={config.testCommand ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setConfig({ ...config, testCommand: value });
                        validateField('testCommand', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="npm test"
                />
                {errors.testCommand && <p className="text-red-500 text-sm mt-1">{errors.testCommand}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Build command</label>
                <input
                    type="text"
                    value={config.buildCommand ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setConfig({ ...config, buildCommand: value });
                        validateField('buildCommand', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="npm run build"
                />
                {errors.buildCommand && <p className="text-red-500 text-sm mt-1">{errors.buildCommand}</p>}
            </div>

            {config.template === 'npm-publish' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text mb-1">NPM Token Secret Name</label>
                    <input
                        type="text"
                        value={config.npmTokenSecret ?? ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setConfig({ ...config, npmTokenSecret: value });
                            validateField('npmTokenSecret', value);
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Ej: NPM_TOKEN"
                    />
                    {errors.npmTokenSecret && <p className="text-red-500 text-sm mt-1">{errors.npmTokenSecret}</p>}
                </div>
            )}

            <button
                type="button"
                onClick={() => {
                    resetConfig();
                    setErrors({});
                }}
                className="mt-2 border border-secondary font-semibold text-secondary px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/80 transition self-start"
            >
                Reset Values
            </button>
        </div>
    );
}

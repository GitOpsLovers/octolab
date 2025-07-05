'use client';

import { useParams } from 'next/navigation';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegFileAlt, FaSpinner } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import yaml from 'yaml';

import { useEditor } from '../hooks/editor.hooks';

import { createWorkflowUseCase } from '@features/editor/application/save-workflow.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';
import { useCurrentUser } from '@ui/user/hooks/user.hooks';

/**
 * Yaml preview component.
 */
export function YamlPreview(): ReactNode {
    const { authToken } = useAuthUser();
    const { uuid } = useParams();
    const { currentUser } = useCurrentUser();
    const { editingWorkflow, editingWorkflowYaml, errors, template } = useEditor();
    const [saving, setSaving] = useState(false);

    const fileName = editingWorkflow ? editingWorkflow.filename : 'workflow.yml';
    const workflowId = uuid as string;

    const workflowContent = yaml.stringify(editingWorkflowYaml);

    // Copy YAML to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(workflowContent);
            toast.success('YAML copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy YAML', err);
            toast.error('Error copying YAML');
        }
    };

    // Download YAML file
    const handleDownload = () => {
        try {
            const blob = new Blob([workflowContent], { type: 'text/yaml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('File downloaded');
        } catch (err) {
            console.error('Failed to download YAML', err);
            toast.error('Error downloading YAML');
        }
    };

    // Save editing workflow to workspace
    const saveToWorkspace = async () => {
        if (!currentUser || !editingWorkflow || !authToken) return;

        setSaving(true);

        try {
            const repository = editorApiRepository(authToken);

            const response = await createWorkflowUseCase(repository, {
                id: workflowId,
                templateId: editingWorkflow.id,
                name: editingWorkflow.name ?? template?.name,
                description: editingWorkflow.description ?? template?.description,
                yaml: yaml.parse(workflowContent),
                data: editingWorkflow,
            });

            toast.success(response.message);
        } catch (err) {
            console.error('Failed to save workflow', err);
            toast.error('Error saving workflow');
        } finally {
            setSaving(false);
        }
    };

    const hasErrors = Object.keys(errors).length > 0;

    if (!editingWorkflow) {
        return null;
    }

    return (
        <div className="w-full lg:w-1/2 flex flex-col h-full">
            <SyntaxHighlighter
                language="yaml"
                style={oneDark}
                customStyle={{
                    flex: 1,
                    overflow: 'auto',
                    margin: '0 0  1rem',
                    borderRadius: '0.375rem',
                }}
            >
                {workflowContent}
            </SyntaxHighlighter>

            {/* Informative banner */}
            <div className="bg-background border border-border px-4 py-3 rounded-md mb-4 flex items-center gap-2">
                <FaRegFileAlt className="w-5 h-5 text-primary" />

                <div>
                    <p className="text-sm text-text font-medium">
                        Save this file as <code className="bg-muted px-1 py-0.5 rounded">.github/workflows/{fileName}</code>
                    </p>
                    <p className="text-xs text-text/70">Place this file in your repository to enable GitHub Actions.</p>
                </div>
            </div>

            <div className="flex gap-2 mt-auto mb-4">
                <button
                    onClick={handleCopy}
                    disabled={hasErrors}
                    className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                >
                    Copy code
                </button>

                <button
                    onClick={handleDownload}
                    disabled={hasErrors}
                    className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                >
                    Download YAML
                </button>
                {currentUser && (
                    <button
                        onClick={saveToWorkspace}
                        disabled={hasErrors || saving}
                        className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition flex items-center justify-center gap-2
                            ${hasErrors || saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                    >
                        {saving ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save to workspace'
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

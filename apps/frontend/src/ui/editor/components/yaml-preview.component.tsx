'use client';

import { plansLimits } from '@octolab/domain';
import { useParams } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegFileAlt, FaSpinner } from 'react-icons/fa';
import { LuPartyPopper } from 'react-icons/lu';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import yaml from 'yaml';

import { useEditor } from '../hooks/editor.hooks';

import { createWorkflowUseCase } from '@features/editor/application/save-workflow.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { Modal } from '@ui/layout/components/modal.component';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

/**
 * Yaml preview component.
 */
export function YamlPreview(): ReactNode {
    const cookies = useCookies();
    const { authToken } = useAuthUser();
    const { uuid } = useParams();
    const { authUser, fetchUser } = useAuthUser();
    const { editingWorkflow, editingWorkflowYaml, errors, template, isEditingExistingWorkflow, setIsEditingExistingWorkflow } = useEditor();
    const [saving, setSaving] = useState(false);
    const [showFirstWorkflowModal, setShowFirstWorkflowModal] = useState(false);

    const fileName = editingWorkflow ? editingWorkflow.filename : 'workflow.yml';
    const workflowId = uuid as string;

    const workflowContent = yaml.stringify(editingWorkflowYaml);

    // Copy the YAML to the clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(workflowContent);
            toast.success('YAML copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy YAML', err);
            toast.error('Error copying YAML');
        }
    };

    // Download the YAML as a file
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

    // Save the workflow to the user's workspace
    const saveToWorkspace = async () => {
        if (!authUser || !editingWorkflow || !authToken) return;

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

            await fetchUser();
            setIsEditingExistingWorkflow(true);

            if (authUser.workflows === 0 && cookies.get('octolab_hide_first_workflow_modal') !== 'true') {
                setShowFirstWorkflowModal(true);
            }
        } catch (err) {
            console.error('Failed to save workflow', err);
            toast.error('Error saving workflow');
        } finally {
            setSaving(false);
        }
    };

    // Close the first workflow modal
    const handleCloseFirstWorkflowModal = () => {
        setShowFirstWorkflowModal(false);
        cookies.set('octolab_hide_first_workflow_modal', 'true', { expires: 365 });
    };

    const hasErrors = Object.keys(errors).length > 0;
    const planLimit = plansLimits[authUser?.plan ?? 'free']?.workflows ?? 0;
    const reachedWorkflowLimit = !!(authUser && authUser.workflows >= planLimit);

    if (!editingWorkflow) {
        return null;
    }

    return (
        <>
            <div className="w-full lg:w-1/2 flex flex-col h-full">
                {/* Yaml preview */}
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

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-auto mb-2">
                    {/* Copy code */}
                    <button
                        onClick={handleCopy}
                        disabled={hasErrors}
                        className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                    >
                        Copy code
                    </button>

                    {/* Download workflow */}
                    <button
                        onClick={handleDownload}
                        disabled={hasErrors}
                        className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                    >
                        Download YAML
                    </button>

                    {/* Save to workspace */}
                    <button
                        onClick={saveToWorkspace}
                        disabled={!authUser || hasErrors || saving || (!isEditingExistingWorkflow && reachedWorkflowLimit)}
                        className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition flex items-center justify-center gap-2
                    ${!authUser || hasErrors || saving || (!isEditingExistingWorkflow && reachedWorkflowLimit) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
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

                    {/* Commit to repository */}
                    {authUser && (
                        <button disabled className="bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition opacity-50 cursor-not-allowed">
                            Commit to repository
                        </button>
                    )}

                    {/* Action messages */}
                    {!authUser ? (
                        <p className="text-xs text-text-muted">You must be logged in to save workflows.</p>
                    ) : !isEditingExistingWorkflow && reachedWorkflowLimit ? (
                        <p className="text-xs text-text-muted">You’ve reached the limit of 1 workflow. Upgrade to PRO to save more (coming soon).</p>
                    ) : (
                        <p className="text-xs text-text-muted">The commit to repository feature is only available in PRO (coming soon).</p>
                    )}
                </div>
            </div>

            {/* First workflow saved modal */}
            <Modal isOpen={showFirstWorkflowModal} onClose={handleCloseFirstWorkflowModal}>
                <div className="flex flex-col items-center text-center">
                    <LuPartyPopper className="text-primary w-10 h-10 mb-2" />
                    <h2 className="text-xl font-semibold text-text mb-2">First workflow saved!</h2>
                    <p className="text-sm text-text-muted mb-6">
                        You’ve just saved your first workflow. In the PRO version (coming soon), you’ll be able to save more and collaborate with your team.
                    </p>
                    <button
                        onClick={handleCloseFirstWorkflowModal}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition flex items-center gap-2 cursor-pointer"
                    >
                        Got it!
                    </button>
                </div>
            </Modal>
        </>
    );
}

'use client';

import { plansLimits } from '@octolab/domain';
import { useParams } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { ReactNode, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegFileAlt, FaSpinner } from 'react-icons/fa';
import { LuPartyPopper } from 'react-icons/lu';
import yaml from 'yaml';

import { useEditorCustom } from '../../hooks/editor-custom.hooks';

import YamlTemplateBlock from './yaml-template-block.component';

import { createWorkflowUseCase } from '@features/editor/application/save-workflow.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { Modal } from '@ui/layout/components/modal.component';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

/**
 * Yaml custom workflow preview component.
 */
export function YamlCustomPreview(): ReactNode {
    const cookies = useCookies();
    const { authToken } = useAuthUser();
    const { uuid } = useParams();
    const { authUser, fetchUser } = useAuthUser();
    const { editingWorkflow, editingWorkflowYaml, errors, template, isEditingExistingWorkflow, highlightedFieldKey, setIsEditingExistingWorkflow } = useEditorCustom();
    const [saving, setSaving] = useState(false);
    const [showFirstWorkflowModal, setShowFirstWorkflowModal] = useState(false);

    const fileName = editingWorkflow ? editingWorkflow.filename : 'workflow.yml';
    const workflowId = uuid as string;

    const workflowContent = useMemo(() => yaml.stringify(editingWorkflowYaml), [editingWorkflowYaml]);

    /**
     * Copy the YAML to the clipboard
     */
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(workflowContent);
            toast.success('YAML copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy YAML', err);
            toast.error('Error copying YAML');
        }
    };

    /**
     * Download the YAML as a file
     */
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

    /**
     * Save the workflow to the user's workspace
     */
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
                type: 'custom',
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

    /**
     * Close the first workflow modal
     */
    const handleCloseFirstWorkflowModal = () => {
        setShowFirstWorkflowModal(false);
        cookies.set('octolab_hide_first_workflow_modal', 'true', { expires: 365 });
    };

    const hasErrors = Object.keys(errors).length > 0;
    const planLimit = plansLimits[authUser?.plan ?? 'free']?.workflows ?? 0;
    const reachedWorkflowLimit = !!(authUser && authUser.workflows >= planLimit);

    const yamlFields = useMemo(() => {
        if (!editingWorkflow) return [];

        const fields: Array<{
            key: string;
            value?: unknown;
            yamlPath?: string | string[];
            highlightTarget?: 'value' | 'key';
        }> = [];

        // name
        fields.push({
            key: 'workflowName',
            value: editingWorkflow.workflowName,
            yamlPath: 'name',
        });

        // on:
        fields.push({
            key: 'on',
            value: editingWorkflow.on,
            yamlPath: 'on',
            highlightTarget: 'key',
        });

        // push branches
        if (editingWorkflow.on === 'push') {
            fields.push({
                key: 'branch',
                value: editingWorkflow.branch,
                yamlPath: 'on.${on}.branches[0]',
            });
        }

        // schedule cron
        if (editingWorkflow.on === 'schedule') {
            fields.push({
                key: 'schedule',
                value: editingWorkflow.schedule,
                yamlPath: 'on.${on}[0].cron',
            });
        }

        // 🔥 jobs
        for (const job of editingWorkflow.jobs) {
            const jid = job.id;

            // línea "jid:" dentro de jobs (solo la clave)
            fields.push({
                key: `job:${jid}:root`,
                yamlPath: `jobs.${jid}`,
                highlightTarget: 'key',
            });

            // name
            fields.push({
                key: `job:${jid}:name`,
                yamlPath: `jobs.${jid}.name`,
            });

            // runner
            fields.push({
                key: `job:${jid}:runner`,
                yamlPath: `jobs.${jid}.runs-on`,
            });

            // if (si existe lo resaltará; si no, no pasa nada)
            fields.push({
                key: `job:${jid}:if`,
                yamlPath: `jobs.${jid}.if`,
            });

            // needs (primer elemento)
            fields.push({
                key: `job:${jid}:needs`,
                yamlPath: `jobs.${jid}.needs[0]`,
            });

            // steps
            job.steps.forEach((step, si) => {
                fields.push({
                    key: `job:${jid}:step:${step.internalId}:id`,
                    yamlPath: `jobs.${jid}.steps[${si}].id`,
                });

                fields.push({
                    key: `job:${jid}:step:${step.internalId}:name`,
                    yamlPath: `jobs.${jid}.steps[${si}].name`,
                });

                if (step.type === 'run') {
                    fields.push({
                        key: `job:${jid}:step:${step.internalId}:run`,
                        yamlPath: `jobs.${jid}.steps[${si}].run`,
                    });
                } else if (step.type === 'uses') {
                    fields.push({
                        key: `job:${jid}:step:${step.internalId}:uses`,
                        yamlPath: `jobs.${jid}.steps[${si}].uses`,
                    });

                    // 🔥 Inputs de la acción (with.*) + fallback a "with:"
                    const withKeysFromAction = step.stepActionInputs?.map((i) => i.key) ?? [];
                    const withKeysFromState = Object.keys(step.with ?? {});
                    const withKeys = Array.from(new Set([...withKeysFromAction, ...withKeysFromState]));

                    for (const k of withKeys) {
                        fields.push({
                            key: `job:${jid}:step:${step.internalId}:with.${k}`,
                            // 1) intenta resaltar la key concreta (with.k)
                            // 2) si aún no existe en el YAML, resalta la clave "with:"
                            yamlPath: [`jobs.${jid}.steps[${si}].with.${k}`, `jobs.${jid}.steps[${si}].with`],
                            highlightTarget: 'key',
                        });

                        // ⬇️ NUEVO: candidato dinámico para env.<valorDeWith>
                        const maybeEnvKey = (step.with?.[k] ?? '').toString().trim();
                        if (maybeEnvKey) {
                            fields.push({
                                key: `job:${jid}:step:${step.internalId}:env.${maybeEnvKey}`,
                                yamlPath: [
                                    `jobs.${jid}.steps[${si}].env.${maybeEnvKey}`, // específico
                                    `jobs.${jid}.steps[${si}].env`, // fallback
                                ],
                                highlightTarget: 'key',
                            });
                        }
                    }
                }

                fields.push({
                    key: `job:${jid}:step:${step.internalId}:if`,
                    yamlPath: `jobs.${jid}.steps[${si}].if`,
                });

                // env
                fields.push({
                    key: `job:${jid}:step:${step.internalId}:env`,
                    yamlPath: `jobs.${jid}.steps[${si}].env`,
                    highlightTarget: 'key',
                });

                if (step.env) {
                    for (const envKey of Object.keys(step.env)) {
                        fields.push({
                            key: `job:${jid}:step:${step.internalId}:env.${envKey}`,
                            yamlPath: [
                                `jobs.${jid}.steps[${si}].env.${envKey}`, // específico
                                `jobs.${jid}.steps[${si}].env`, // fallback
                            ],
                            highlightTarget: 'key',
                        });
                    }
                }
            });
        }

        return fields;
    }, [editingWorkflow]);

    if (!editingWorkflow) {
        return null;
    }

    return (
        <>
            <div className="w-full lg:w-1/2 flex flex-col h-full">
                {/* Yaml preview */}
                <YamlTemplateBlock content={workflowContent} fields={yamlFields as any} highlightedKey={highlightedFieldKey} />

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
                        data-umami-event="[Custom workflow editor] Copy YAML click"
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
                        data-umami-event="[Custom workflow editor] Download YAML click"
                        className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                    >
                        Download YAML
                    </button>

                    {/* Save to workspace */}
                    <button
                        onClick={saveToWorkspace}
                        data-umami-event="[Custom workflow editor] Save workflow click"
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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CustomWorkflowConfig, Trigger } from '@octolab/domain';
import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';

import { useEditorCustom } from '../hooks/editor-custom.hooks';
import { CustomWorkflowFormSchema, customWorkflowSchema } from '../models/custom-workflow-form.models';

import { CustomWorkflowFormJobsSteps } from './workflow-custom-form-jobs-steps.component';

import { getTriggersUseCase } from '@features/editor/application/get-triggers.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/shared/components/tooltip';

/**
 * Custom workflow form component
 */
export function CustomWorkflowForm(): ReactNode {
    const { editingWorkflow, availableRunners, availableActions, setEditingWorkflow, resetEditingWorkflow, setErrors } = useEditorCustom();
    const [availableTriggers, setAvailableTriggers] = useState<string[]>([]);
    const [collapsedJobs, setCollapsedJobs] = useState<Record<string, boolean>>({});
    const [collapsedSteps, setCollapsedSteps] = useState<Record<string, boolean>>({});

    const initialFormValues = useRef<CustomWorkflowFormSchema | null>(null);

    const isCustomWorkflow = editingWorkflow?.id === 'custom';
    const customWorkflow = isCustomWorkflow ? editingWorkflow : undefined;
    const form = useForm<CustomWorkflowFormSchema>({
        resolver: zodResolver(customWorkflowSchema),
        mode: 'onChange',
        defaultValues: {
            workflowName: customWorkflow?.workflowName,
            on: customWorkflow?.on,
            branch: customWorkflow?.branch,
            schedule: customWorkflow?.schedule,
            jobs: customWorkflow?.jobs,
        },
    });

    /**
     * Set initial form values when editing a custom workflow
     */
    useEffect(() => {
        if (isCustomWorkflow && editingWorkflow && !initialFormValues.current) {
            initialFormValues.current = {
                workflowName: editingWorkflow.workflowName,
                on: editingWorkflow.on,
                branch: editingWorkflow.branch,
                schedule: editingWorkflow.schedule,
                jobs: editingWorkflow.jobs,
            };
        }
    }, [editingWorkflow, isCustomWorkflow]);

    /**
     * Get triggers
     */
    useEffect(() => {
        const fetchTriggers = async () => {
            try {
                const repository = editorApiRepository();
                const triggers = await getTriggersUseCase(repository);

                setAvailableTriggers(triggers);
            } catch (err) {
                console.error('Error fetching runners:', err);
            }
        };

        fetchTriggers();
    }, []);

    /**
     * On every form change, update the editing workflow on provider to reflect changes on form and YAML preview
     */
    useEffect(() => {
        const subscription = form.watch((values) => {
            if (isCustomWorkflow && editingWorkflow) {
                const updatedJobs = values.jobs?.map((job, jobIndex) => {
                    const updatedSteps = job?.steps?.map((step, stepIndex) => {
                        if (step?.type === 'uses' && step.uses) {
                            const action = availableActions.find((a) => a.id === step.uses);
                            if (!action) return step;

                            // Clean obsolete "with" properties
                            const cleanedWith: Record<string, string | number | boolean> = {};

                            for (const input of action.inputs) {
                                const key = input.key;
                                const currentValue = step.with?.[key];

                                if (currentValue !== undefined) {
                                    cleanedWith[key] = currentValue;
                                } else if (input.hideInForm && input.defaultValue !== undefined) {
                                    cleanedWith[key] = input.defaultValue;
                                }
                            }

                            // Update the step with cleaned "with" properties
                            if (JSON.stringify(cleanedWith) !== JSON.stringify(step.with)) {
                                form.setValue(`jobs.${jobIndex}.steps.${stepIndex}.with`, cleanedWith, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }

                            // Add secret and environment variable keys
                            const secretKeys = action.inputs.filter((input) => input.isSecret).map((input) => input.key);
                            const environmentVariablesKeys = action.inputs.filter((input) => input.isEnvironmentVariable).map((input) => input.key);
                            const stepEnvironmentVariablesKeys = action.inputs.filter((input) => input.isStepEnvironmentVariable).map((input) => input.key);

                            // Add templates if available
                            const templates = action.templates ?? {};

                            // Set hidden inputs
                            const hiddenInputs = action.inputs.filter((i) => i.hideInYaml).map((i) => i.key);

                            return {
                                ...step,
                                secretInputs: secretKeys,
                                environmentVariables: environmentVariablesKeys,
                                stepEnvironmentVariables: stepEnvironmentVariablesKeys,
                                hiddenInputs,
                                templates,
                                stepActionInputs: action.inputs,
                            };
                        }

                        return step;
                    });

                    // Sync and clean `needs`
                    const currentJobId = job?.id;
                    const otherJobs = values.jobs?.filter((_, i) => i !== jobIndex) ?? [];
                    const validJobIds = new Set(otherJobs.map((j) => j?.id));

                    const currentNeeds = job?.needs ?? [];
                    const cleanedNeeds = currentNeeds.filter((id) => id !== currentJobId && validJobIds.has(id)).filter((id): id is string => typeof id === 'string');

                    if (JSON.stringify(cleanedNeeds) !== JSON.stringify(currentNeeds)) {
                        form.setValue(`jobs.${jobIndex}.needs`, cleanedNeeds, {
                            shouldDirty: true,
                            shouldValidate: true,
                        });
                    }

                    return {
                        ...job,
                        steps: updatedSteps,
                    };
                });

                setEditingWorkflow({
                    ...editingWorkflow,
                    ...values,
                    jobs: updatedJobs,
                } as CustomWorkflowConfig);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [form, isCustomWorkflow, setEditingWorkflow, editingWorkflow, availableActions]);

    if (!customWorkflow) return null;

    // On trigger change
    const handleTriggerChange = (value: Trigger) => {
        form.setValue('on', value);

        if (value !== 'push' && value !== 'pull_request') {
            const { ...rest } = customWorkflow;
            setEditingWorkflow({ ...rest, on: value });
            form.setValue('branch', '');
        } else {
            const branch = customWorkflow.branch || 'main';
            setEditingWorkflow({ ...customWorkflow, on: value, branch });
            form.setValue('branch', branch);
        }
    };

    // On add job
    const handleAddJob = () => {
        const existingIds = customWorkflow.jobs.map((j) => j.id);
        let newJobId = 'job-id';
        let counter = 1;

        while (existingIds.includes(newJobId)) {
            newJobId = `job-id-${counter}`;
            counter++;
        }

        const newJob = {
            id: newJobId,
            name: 'New Job',
            runner: 'ubuntu-latest',
            steps: [],
        };

        const updatedJobs = [...customWorkflow.jobs, newJob];

        // Actualiza el estado global
        setEditingWorkflow({
            ...customWorkflow,
            jobs: updatedJobs,
        });

        // Actualiza también el formulario
        form.setValue('jobs', updatedJobs, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    // On reset form values
    const handleResetValues = () => {
        resetEditingWorkflow();
        setErrors({});
        setCollapsedJobs({});
        setCollapsedSteps({});

        if (initialFormValues.current) {
            form.reset(initialFormValues.current);
        }
    };

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col mb-4">
            <h2 className="text-xl font-bold text-text mb-4">Edit Configuration</h2>

            <FormProvider {...form}>
                <div className="mb-4 flex gap-x-4">
                    {/* Workflow Name */}
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-text mb-1">Name</label>
                        <input
                            type="text"
                            {...form.register('workflowName')}
                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                        {form.formState.errors.workflowName && <p className="text-red-500 text-sm mt-1">{form.formState.errors.workflowName.message}</p>}{' '}
                    </div>

                    {/* Trigger */}
                    <div className="w-1/2">
                        <div className="flex items-center mb-1">
                            <label className="block text-sm font-medium text-text">Trigger</label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg">
                                    <div className="text-sm">
                                        Triggers are events that cause a workflow to run.{' '}
                                        <Link
                                            href="https://docs.github.com/es/actions/using-workflows/triggering-a-workflow"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-primary hover:text-primary-hover"
                                        >
                                            Learn more.
                                        </Link>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <select
                            value={customWorkflow.on || 'push'}
                            onChange={(e) => {
                                handleTriggerChange(e.target.value);
                            }}
                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        >
                            {availableTriggers.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Branch */}
                {customWorkflow.on === 'push' && (
                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <label className="block text-sm font-medium text-text">Target Branch</label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg">
                                    <div className="text-sm">
                                        Workflows triggered by <span className="text-primary font-semibold">push</span> will run when changes are pushed to the target branch.
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            {...form.register('branch')}
                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                        {form.formState.errors.branch && <p className="text-red-500 text-sm mt-1">{form.formState.errors.branch.message}</p>}
                    </div>
                )}

                {/* Schedule */}
                {customWorkflow.on === 'schedule' && (
                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <label className="block text-sm font-medium text-text">Cron Schedule</label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                    <div className="text-sm text-center">
                                        Workflows triggered by <span className="text-primary font-semibold">schedule</span> use a{' '}
                                        <a href="https://crontab.guru/" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary-hover">
                                            cron expression
                                        </a>{' '}
                                        to define the time and frequency they should run.
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            {...form.register('schedule')}
                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                        {form.formState.errors.schedule && <p className="text-red-500 text-sm mt-1">{form.formState.errors.schedule.message}</p>}
                    </div>
                )}

                {/* Jobs and steps */}
                {availableRunners && (
                    <CustomWorkflowFormJobsSteps
                        collapsedJobs={collapsedJobs}
                        collapsedSteps={collapsedSteps}
                        toggleCollapseJob={(id) => {
                            setCollapsedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
                        }}
                        toggleCollapseStep={(id) => {
                            setCollapsedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
                        }}
                        setEditingWorkflow={setEditingWorkflow}
                        editingWorkflow={customWorkflow}
                        availableRunners={availableRunners}
                        availableActions={availableActions}
                    />
                )}

                {/* Add new job */}
                <div className="flex gap-2 mt-4">
                    <button
                        type="button"
                        onClick={handleAddJob}
                        className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition cursor-pointer"
                    >
                        Add Job
                    </button>

                    {/* Reset values to default */}
                    <button
                        type="button"
                        onClick={handleResetValues}
                        className="border border-secondary font-semibold text-secondary px-4 py-2 rounded-md hover:bg-secondary/80 hover:text-white transition cursor-pointer"
                    >
                        Reset Values
                    </button>
                </div>
            </FormProvider>
        </div>
    );
}

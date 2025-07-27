// eslint-disable-next-line import/named
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Action, CustomWorkflowConfig, Step } from '@octolab/domain';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaAngleDown, FaAngleUp, FaInfoCircle, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { CustomWorkflowFormSchema } from '../models/custom-workflow-form.models';

import { SortableStep } from './workflow-custom-form-sortable-step.component';

import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/shared/components/tooltip';

interface CustomWorkflowFormJobsStepsProps {
    collapsedJobs: Record<string, boolean>;
    collapsedSteps: Record<string, boolean>;
    toggleCollapseJob: (id: string) => void;
    toggleCollapseStep: (id: string) => void;
    setEditingWorkflow: (workflow: CustomWorkflowConfig) => void;
    editingWorkflow: CustomWorkflowConfig;
    availableRunners: string[];
    availableActions: Action[];
}

/**
 * Custom workflow form jobs and steps component
 */
export function CustomWorkflowFormJobsSteps({
    collapsedJobs,
    collapsedSteps,
    toggleCollapseJob,
    toggleCollapseStep,
    setEditingWorkflow,
    editingWorkflow,
    availableRunners,
    availableActions,
}: CustomWorkflowFormJobsStepsProps) {
    const sensors = useSensors(useSensor(PointerSensor));
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<CustomWorkflowFormSchema>();

    const jobs = watch('jobs');

    const [jobConditions, setJobConditions] = useState<Record<string, boolean>>(Object.fromEntries(editingWorkflow.jobs.map((job) => [job.id, !!job.if?.trim()])));
    const [jobDependencies, setJobDependencies] = useState<Record<string, boolean>>(Object.fromEntries(editingWorkflow.jobs.map((job) => [job.id, !!job.needs?.length])));

    // On add new step
    const handleAddStep = (jobIndex: number) => {
        const newJobs = [...editingWorkflow.jobs];
        const newStep: Step = {
            internalId: uuidv4(),
            id: `step-${newJobs[jobIndex].steps.length + 1}`,
            name: `Step ${newJobs[jobIndex].steps.length + 1}`,
            type: 'run',
            run: 'echo "Hello World"',
        };
        newJobs[jobIndex].steps.push(newStep);

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
        setValue('jobs', newJobs, { shouldDirty: true, shouldValidate: true });
    };

    // On remove step
    const handleRemoveStep = (jobIndex: number, stepIndex: number) => {
        const newJobs = [...editingWorkflow.jobs];
        newJobs[jobIndex].steps.splice(stepIndex, 1);

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
        setValue('jobs', newJobs, { shouldDirty: true, shouldValidate: true });
    };

    // On remove job
    const handleRemoveJob = (jobIndex: number) => {
        const newJobs = [...editingWorkflow.jobs];
        newJobs.splice(jobIndex, 1);

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
        setValue('jobs', newJobs, { shouldDirty: true, shouldValidate: true });
    };

    // On drag step
    const handleStepDrag = (jobIndex: number, event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const currentSteps = editingWorkflow.jobs[jobIndex].steps;
        const oldIndex = currentSteps.findIndex((s) => s.internalId === active.id);
        const newIndex = currentSteps.findIndex((s) => s.internalId === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        const newJobs = [...editingWorkflow.jobs];
        const reorderedSteps = arrayMove(currentSteps, oldIndex, newIndex);
        newJobs[jobIndex].steps = reorderedSteps;

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
        setValue('jobs', newJobs, { shouldDirty: true, shouldValidate: true });
    };

    const findAction = (id: string): Action | undefined => availableActions.find((action) => action.id === id);

    return (
        <>
            {jobs?.map((job, jobIndex) => {
                const isCollapsed = collapsedJobs[job.id] ?? false;
                const hasJobCondition = jobConditions[job.id] ?? false;
                const hasJobDependency = jobDependencies[job.id] ?? false;

                const handleAddJobCondition = () => {
                    const fieldName = `jobs.${jobIndex}.if` as const;
                    setValue(fieldName, '');
                    setJobConditions((prev) => ({ ...prev, [job.id]: true }));
                };

                const handleRemoveJobCondition = () => {
                    const fieldName = `jobs.${jobIndex}.if` as const;
                    setValue(fieldName, undefined);
                    setJobConditions((prev) => ({ ...prev, [job.id]: false }));
                };

                const handleAddJobDependency = () => {
                    const fieldName = `jobs.${jobIndex}.needs` as const;
                    setValue(fieldName, []);
                    setJobDependencies((prev) => ({ ...prev, [job.id]: true }));
                };

                const handleRemoveJobDependency = () => {
                    const fieldName = `jobs.${jobIndex}.needs` as const;
                    setValue(fieldName, undefined);
                    setJobDependencies((prev) => ({ ...prev, [job.id]: false }));
                };

                return (
                    <div key={jobIndex} className="border border-border p-4 rounded mb-4 bg-muted">
                        <div className="flex justify-between items-center">
                            {/* Job name  */}
                            <div className="flex items-center">
                                <h3 className="text-md font-bold">Job: {job.name}</h3>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FaInfoCircle size={14} className="ml-2 text-text-muted hover:text-text transition cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                        <div className="text-sm text-center">
                                            A <span className="text-primary font-semibold">job</span> is a group of steps that run on the same runner. Jobs run independently by
                                            default but can be sequenced using <span className="text-primary font-semibold">needs</span>.{' '}
                                            <a
                                                href="https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline text-primary hover:text-primary-hover"
                                            >
                                                Learn more.
                                            </a>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Collapse button */}
                            <button
                                type="button"
                                onClick={() => {
                                    toggleCollapseJob(job.id);
                                }}
                                className="text-text hover:text-text-hover transition cursor-pointer"
                            >
                                {isCollapsed ? <FaAngleDown size={16} /> : <FaAngleUp size={16} />}
                            </button>
                        </div>

                        {!isCollapsed && (
                            <>
                                <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {/* ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">ID</label>
                                        <input
                                            type="text"
                                            {...register(`jobs.${jobIndex}.id`)}
                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                        />
                                        {errors.jobs?.[jobIndex]?.id && <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.id?.message}</p>}{' '}
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">Name</label>
                                        <input
                                            type="text"
                                            {...register(`jobs.${jobIndex}.name`)}
                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                        />
                                        {errors.jobs?.[jobIndex]?.name && <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.name?.message}</p>}{' '}
                                    </div>
                                </div>

                                {/* Runner */}
                                <div className="mb-2">
                                    <div className="flex items-center mb-1">
                                        <label className="block text-sm font-medium text-text">Runner</label>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                                <div className="text-sm text-center">
                                                    A <span className="text-primary font-semibold">runner</span> is the environment where your job runs. You can choose from
                                                    GitHub-hosted runners or your own self-hosted machines.{' '}
                                                    <a
                                                        href="https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-primary hover:text-primary-hover"
                                                    >
                                                        Learn more.
                                                    </a>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>

                                    <select
                                        {...register(`jobs.${jobIndex}.runner`)}
                                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    >
                                        {availableRunners.map((runner) => (
                                            <option key={runner} value={runner}>
                                                {runner}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Job condition */}
                                <div className="mb-2">
                                    {hasJobCondition ? (
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <label className="block text-sm font-medium text-text">Condition</label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                                        <div className="text-sm text-center">
                                                            A <span className="text-primary font-semibold">condition</span> lets you control whether a job or step runs.{' '}
                                                            <a
                                                                href="https://docs.github.com/en/actions/learn-github-actions/expressions#about-expressions"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="underline text-primary hover:text-primary-hover"
                                                            >
                                                                Learn more.
                                                            </a>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>

                                            <input
                                                type="text"
                                                {...register(`jobs.${jobIndex}.if`)}
                                                placeholder="e.g. success()"
                                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                            />

                                            {errors.jobs?.[jobIndex]?.if && <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.if?.message}</p>}

                                            <button
                                                type="button"
                                                onClick={handleRemoveJobCondition}
                                                className="mt-2 inline-flex items-center gap-1 text-sm text-white hover:text-red-500 transition cursor-pointer"
                                            >
                                                <FaTrashAlt size={12} />
                                                Remove condition
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleAddJobCondition}
                                            className="inline-flex items-center gap-1 text-sm text-white hover:text-primary transition mt-1 cursor-pointer"
                                        >
                                            <FaPlus size={12} />
                                            Add condition
                                        </button>
                                    )}
                                </div>

                                {/* Job dependencies */}
                                <div className="mb-2">
                                    {hasJobDependency && editingWorkflow.jobs.filter((_, i) => i !== jobIndex).length > 0 ? (
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <label className="block text-sm font-medium text-text">Needs</label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                                        <div className="text-sm text-center">
                                                            Use <span className="text-primary font-semibold">needs</span> to specify which jobs must complete before this one
                                                            starts.
                                                            <a
                                                                href="https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow#using-needs-to-control-execution-order"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="underline text-primary hover:text-primary-hover ml-1"
                                                            >
                                                                Learn more.
                                                            </a>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>

                                            <select
                                                multiple
                                                {...register(`jobs.${jobIndex}.needs`)}
                                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                            >
                                                {editingWorkflow.jobs
                                                    .filter((_, i) => i !== jobIndex)
                                                    .map((otherJob) => (
                                                        <option key={otherJob.id} value={otherJob.id}>
                                                            {otherJob.name || otherJob.id}
                                                        </option>
                                                    ))}
                                            </select>

                                            {errors.jobs?.[jobIndex]?.needs && <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.needs?.message}</p>}

                                            <button
                                                type="button"
                                                onClick={handleRemoveJobDependency}
                                                className="mt-2 inline-flex items-center gap-1 text-sm text-white hover:text-red-500 transition cursor-pointer"
                                            >
                                                <FaTrashAlt size={12} /> Remove dependency
                                            </button>
                                        </div>
                                    ) : (
                                        editingWorkflow.jobs.length > 1 &&
                                        jobIndex > 0 && (
                                            <button
                                                type="button"
                                                onClick={handleAddJobDependency}
                                                className="inline-flex items-center gap-1 text-sm text-white hover:text-primary transition mt-1 cursor-pointer"
                                            >
                                                <FaPlus size={12} /> Add dependency
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Steps */}
                                {job.steps.length > 0 && (
                                    <div className="flex items-center mt-4 mb-2">
                                        <h4 className="text-md font-semibold">Steps</h4>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <FaInfoCircle size={14} className="ml-2 text-text-muted hover:text-text transition cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                                <div className="text-sm text-center">
                                                    A <span className="text-primary font-semibold">step</span> is a single task within a job. Steps can either{' '}
                                                    <span className="text-primary font-semibold">run a command</span> or{' '}
                                                    <span className="text-primary font-semibold">use an action</span>. They execute sequentially in the order listed.{' '}
                                                    <a
                                                        href="https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow#defining-steps"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-primary hover:text-primary-hover"
                                                    >
                                                        Learn more.
                                                    </a>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                )}

                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={(event) => {
                                        handleStepDrag(jobIndex, event);
                                    }}
                                >
                                    <SortableContext items={job.steps.map((step) => step.internalId)} strategy={verticalListSortingStrategy}>
                                        {job.steps.map((step, stepIndex) => {
                                            const isStepCollapsed = collapsedSteps[step.id] ?? false;
                                            const selectedAction = findAction(step.uses || '');

                                            return (
                                                <SortableStep
                                                    key={step.internalId}
                                                    step={step}
                                                    jobIndex={jobIndex}
                                                    stepIndex={stepIndex}
                                                    collapsed={isStepCollapsed}
                                                    availableActions={availableActions}
                                                    selectedAction={selectedAction}
                                                    onToggleCollapse={toggleCollapseStep}
                                                    onRemove={() => {
                                                        handleRemoveStep(jobIndex, stepIndex);
                                                    }}
                                                />
                                            );
                                        })}
                                    </SortableContext>
                                </DndContext>

                                {/* Add step */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleAddStep(jobIndex);
                                    }}
                                    className="mt-2 bg-secondary text-surface font-semibold px-2 py-1 rounded-md hover:bg-secondary-hover text-sm cursor-pointer"
                                >
                                    Add Step
                                </button>

                                {/* Remove job */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveJob(jobIndex);
                                    }}
                                    className="ml-2 mt-4 border border-red-500 text-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white text-sm cursor-pointer"
                                >
                                    Remove Job
                                </button>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}

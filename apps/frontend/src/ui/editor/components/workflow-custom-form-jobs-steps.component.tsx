// eslint-disable-next-line import/named
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Action, CustomWorkflowConfig, Step, WorkflowConfig } from '@octolab/domain';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { CustomWorkflowFormSchema } from '../models/custom-workflow-form.models';

import { SortableStep } from './workflow-custom-form-sortable-step.component';

import { getActionsUseCase } from '@features/editor/application/get-actions.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';

interface CustomWorkflowFormJobsStepsProps {
    collapsedJobs: Record<string, boolean>;
    collapsedSteps: Record<string, boolean>;
    toggleCollapseJob: (id: string) => void;
    toggleCollapseStep: (id: string) => void;
    setEditingWorkflow: (workflow: WorkflowConfig) => void;
    editingWorkflow: CustomWorkflowConfig;
    availableRunners: string[];
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
}: CustomWorkflowFormJobsStepsProps) {
    const [availableActions, setAvailableActions] = useState<Action[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<CustomWorkflowFormSchema>();

    const jobs = watch('jobs');

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const repository = editorApiRepository();
                const actions = await getActionsUseCase(repository);
                setAvailableActions(actions);
            } catch (err) {
                console.error('Error fetching actions:', err);
            }
        };

        fetchActions();
    }, []);

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
    };

    const handleRemoveStep = (jobIndex: number, stepIndex: number) => {
        const newJobs = [...editingWorkflow.jobs];
        newJobs[jobIndex].steps.splice(stepIndex, 1);
        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
    };

    const handleRemoveJob = (jobIndex: number) => {
        const newJobs = [...editingWorkflow.jobs];
        newJobs.splice(jobIndex, 1);
        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
    };

    const handleDragEnd = (jobIndex: number, event: DragEndEvent) => {
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
    };

    const findAction = (id: string): Action | undefined => availableActions.find((action) => action.id === id);

    return (
        <>
            {jobs.map((job, jobIndex) => {
                const isCollapsed = collapsedJobs[job.id] ?? false;

                return (
                    <div key={jobIndex} className="border border-border p-4 rounded mb-4 bg-muted">
                        <div className="flex justify-between items-center">
                            <h3 className="text-md font-bold">Job: {job.name}</h3>
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
                                    <label className="block text-sm font-medium text-text mb-1">Runner</label>
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

                                {/* Steps */}
                                {job.steps.length > 0 && <h4 className="text-md font-semibold mt-4 mb-2">Steps</h4>}

                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={(event) => {
                                        handleDragEnd(jobIndex, event);
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

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleAddStep(jobIndex);
                                    }}
                                    className="mt-2 bg-secondary text-surface font-semibold px-2 py-1 rounded hover:bg-secondary-hover text-sm"
                                >
                                    Add Step
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveJob(jobIndex);
                                    }}
                                    className="ml-2 mt-4 border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white text-sm"
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

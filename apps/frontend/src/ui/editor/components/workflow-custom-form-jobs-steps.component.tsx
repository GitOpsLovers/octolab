import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Action, CustomWorkflowConfig, Step, WorkflowConfig } from '@octolab/domain';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { SortableStep } from './workflow-custom-form-sortable-step.component';

import { getActionsUseCase } from '@features/editor/application/get-actions.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';

interface CustomWorkflowFormJobsStepsProps {
    jobs: CustomWorkflowConfig['jobs'];
    errors: Record<string, string | null>;
    collapsedJobs: Record<string, boolean>;
    collapsedSteps: Record<string, boolean>;
    toggleCollapseJob: (id: string) => void;
    toggleCollapseStep: (id: string) => void;
    validateField: (field: string, value: string) => void;
    setEditingWorkflow: (workflow: WorkflowConfig) => void;
    editingWorkflow: CustomWorkflowConfig;
    availableRunners: string[];
}

/**
 * Custom workflow form jobs and steps component
 */
export function CustomWorkflowFormJobsSteps({
    jobs,
    errors,
    collapsedJobs,
    collapsedSteps,
    toggleCollapseJob,
    toggleCollapseStep,
    validateField,
    setEditingWorkflow,
    editingWorkflow,
    availableRunners,
}: CustomWorkflowFormJobsStepsProps) {
    const [availableActions, setAvailableActions] = useState<Action[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));

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

    const handleStepChange = (jobIndex: number, stepIndex: number, key: 'id' | 'name' | 'run' | 'uses' | 'type' | number, value: string) => {
        const newJobs = [...editingWorkflow.jobs];
        const step = newJobs[jobIndex].steps[stepIndex];

        if (key === 'type') {
            const type = value as 'run' | 'uses';
            step.type = type;

            if (type === 'run') {
                step.run = 'echo "Hello World"';
                step.uses = undefined;
                step.with = undefined;
            } else {
                step.uses = '';
                step.with = {};
                step.run = undefined;
            }
        } else if (key === 'uses') {
            step.uses = value;
            step.with = {};
        } else {
            step[key] = value;
        }

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
        validateField(`step-${step.id}-${key}`, value);
    };

    const handleStepInputChange = (jobIndex: number, stepIndex: number, inputKey: string | number, value: string | number | boolean) => {
        const newJobs = [...editingWorkflow.jobs];
        const step = newJobs[jobIndex].steps[stepIndex];

        if (!step.with) step.with = {};

        const isEmpty = value === '' || value === undefined || value === null;

        if (isEmpty) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete step.with[inputKey];
        } else {
            step.with[inputKey] = value;
        }

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
    };

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
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">ID</label>
                                        <input
                                            type="text"
                                            value={job.id}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const newJobs = [...editingWorkflow.jobs];
                                                newJobs[jobIndex].id = value;
                                                setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
                                                validateField(`job-${jobIndex}-id`, value);
                                            }}
                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                        />
                                        {errors[`job-${jobIndex}-id`] && <p className="text-red-500 text-sm mt-1">{errors[`job-${jobIndex}-id`]}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={job.name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const newJobs = [...editingWorkflow.jobs];
                                                newJobs[jobIndex].name = value;
                                                setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
                                                validateField(`job-${job.id}-name`, value);
                                            }}
                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                        />
                                        {errors[`job-${job.id}-name`] && <p className="text-red-500 text-sm mt-1">{errors[`job-${job.id}-name`]}</p>}
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-text mb-1">Runner</label>
                                    <select
                                        value={job.runner}
                                        onChange={(e) => {
                                            const newJobs = [...editingWorkflow.jobs];
                                            newJobs[jobIndex].runner = e.target.value;
                                            setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
                                        }}
                                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    >
                                        {availableRunners.map((runner) => (
                                            <option key={runner} value={runner}>
                                                {runner}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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
                                                    errors={errors}
                                                    collapsed={isStepCollapsed}
                                                    availableActions={availableActions}
                                                    selectedAction={selectedAction}
                                                    onToggleCollapse={toggleCollapseStep}
                                                    onChange={(key, value) => {
                                                        handleStepChange(jobIndex, stepIndex, key, value);
                                                    }}
                                                    onInputChange={handleStepInputChange}
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

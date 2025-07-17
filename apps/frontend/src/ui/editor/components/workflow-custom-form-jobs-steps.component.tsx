import { Action, CustomWorkflowConfig, Step, WorkflowConfig } from '@octolab/domain';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { getActionsUseCase } from '@features/editor/application/get-actions.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';

interface CustomWorkflowFormJobsStepsProps {
    job: CustomWorkflowConfig['jobs'][number];
    jobIndex: number;
    errors: Record<string, string | null>;
    collapsed: boolean;
    collapsedSteps: Record<string, boolean>;
    toggleCollapseJob: (id: string) => void;
    toggleCollapseStep: (id: string) => void;
    validateField: (field: string, value: string) => void;
    setEditingWorkflow: (workflow: WorkflowConfig) => void;
    editingWorkflow: CustomWorkflowConfig;
    availableRunners: string[];
}

export function CustomWorkflowFormJobsSteps({
    job,
    jobIndex,
    errors,
    collapsed,
    collapsedSteps,
    toggleCollapseJob,
    toggleCollapseStep,
    validateField,
    setEditingWorkflow,
    editingWorkflow,
    availableRunners,
}: CustomWorkflowFormJobsStepsProps) {
    const [availableActions, setAvailableActions] = useState<Action[]>([]);

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

    const handleStepChange = (stepIndex: number, key: 'name' | 'run' | 'uses', value: string) => {
        const newJobs = [...editingWorkflow.jobs];
        const step = newJobs[jobIndex].steps[stepIndex];
        step[key] = value;

        // If action changes, reset its inputs
        if (key === 'uses') {
            step.with = {};
        }

        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
        validateField(`step-${step.id}-${key}`, value);
    };

    const handleStepInputChange = (stepIndex: number, inputKey: string, value: string | number | boolean) => {
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

    const handleAddStep = () => {
        const newJobs = [...editingWorkflow.jobs];
        const newStep: Step = {
            id: uuidv4(),
            name: `Step ${newJobs[jobIndex].steps.length + 1}`,
            type: 'run',
            run: 'echo "Hello World"',
        };
        newJobs[jobIndex].steps.push(newStep);
        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
    };

    const handleRemoveStep = (stepIndex: number) => {
        const newJobs = [...editingWorkflow.jobs];
        newJobs[jobIndex].steps.splice(stepIndex, 1);
        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
    };

    const handleRemoveJob = () => {
        const newJobs = [...editingWorkflow.jobs];
        newJobs.splice(jobIndex, 1);
        setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
    };

    const findAction = (id: string): Action | undefined => availableActions.find((action) => action.id === id);

    return (
        <div className="border border-border p-4 rounded mb-4 bg-muted">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-bold">Job: {job.name}</h3>
                <button
                    type="button"
                    onClick={() => {
                        toggleCollapseJob(job.id);
                    }}
                    className="text-text hover:text-text-hover transition cursor-pointer"
                >
                    {collapsed ? <FaPlus size={16} /> : <FaMinus size={16} />}
                </button>
            </div>

            {!collapsed && (
                <>
                    {/* Job name */}
                    <div className="mb-2">
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

                    {/* Runner */}
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

                    {/* Steps */}
                    {job.steps.length > 0 && <h4 className="text-md font-semibold mt-4 mb-2">Steps</h4>}

                    {job.steps.map((step, stepIndex) => {
                        const isCollapsed = collapsedSteps[step.id] ?? false;
                        const selectedAction = findAction(step.uses || '');

                        return (
                            <div key={step.id} className="border border-border p-3 rounded mb-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Step: {step.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toggleCollapseStep(step.id);
                                        }}
                                        className="text-text hover:text-text-hover transition cursor-pointer"
                                    >
                                        {isCollapsed ? <FaPlus size={14} /> : <FaMinus size={14} />}
                                    </button>
                                </div>

                                {!isCollapsed && (
                                    <>
                                        {/* Step name */}
                                        <div className="mb-2">
                                            <label className="block text-sm font-medium text-text mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={step.name}
                                                onChange={(e) => {
                                                    handleStepChange(stepIndex, 'name', e.target.value);
                                                }}
                                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                            />
                                            {errors[`step-${step.id}-name`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-name`]}</p>}
                                        </div>

                                        {/* Step type */}
                                        <div className="mb-2">
                                            <label className="block text-sm font-medium text-text mb-1">Type</label>
                                            <select
                                                value={step.type}
                                                onChange={(e) => {
                                                    const newType = e.target.value as 'run' | 'uses';
                                                    const newJobs = [...editingWorkflow.jobs];
                                                    const currentStep = newJobs[jobIndex].steps[stepIndex];

                                                    currentStep.type = newType;
                                                    if (newType === 'run') {
                                                        currentStep.run = '';
                                                        currentStep.uses = undefined;
                                                        currentStep.with = undefined;
                                                    } else {
                                                        currentStep.uses = '';
                                                        currentStep.run = undefined;
                                                        currentStep.with = {};
                                                    }

                                                    setEditingWorkflow({ ...editingWorkflow, jobs: newJobs });
                                                }}
                                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                            >
                                                <option value="run">Run</option>
                                                <option value="uses">Uses</option>
                                            </select>
                                        </div>

                                        {/* Step content */}
                                        {step.type === 'run' ? (
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-text mb-1">Command</label>
                                                <input
                                                    type="text"
                                                    value={step.run || ''}
                                                    onChange={(e) => {
                                                        handleStepChange(stepIndex, 'run', e.target.value);
                                                    }}
                                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                />
                                                {errors[`step-${step.id}-run`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-run`]}</p>}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="mb-2">
                                                    <label className="block text-sm font-medium text-text mb-1">Action</label>
                                                    <select
                                                        value={step.uses || ''}
                                                        onChange={(e) => {
                                                            handleStepChange(stepIndex, 'uses', e.target.value);
                                                        }}
                                                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                    >
                                                        <option value="" disabled>
                                                            Select an action
                                                        </option>
                                                        {availableActions.map((action) => (
                                                            <option key={action.id} value={action.id}>
                                                                {action.id}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors[`step-${step.id}-uses`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-uses`]}</p>}
                                                </div>

                                                {/* Action inputs */}
                                                {selectedAction?.inputs.map((input) => {
                                                    const inputType = input.type ?? 'string';
                                                    const rawValue = step.with?.[input.key];
                                                    const value = rawValue !== undefined ? String(rawValue) : '';

                                                    return (
                                                        <div key={input.key} className="mb-2">
                                                            <label className="block text-sm font-medium text-text mb-1">{input.label}</label>

                                                            {inputType === 'boolean' ? (
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!rawValue}
                                                                    onChange={(e) => {
                                                                        handleStepInputChange(stepIndex, input.key, e.target.checked);
                                                                    }}
                                                                />
                                                            ) : (
                                                                <input
                                                                    type={inputType === 'number' ? 'number' : 'text'}
                                                                    placeholder={input.placeholder}
                                                                    value={value}
                                                                    onChange={(e) => {
                                                                        const val = inputType === 'number' ? Number(e.target.value) : e.target.value;
                                                                        handleStepInputChange(stepIndex, input.key, val);
                                                                    }}
                                                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleRemoveStep(stepIndex);
                                            }}
                                            className="border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white text-sm mt-2"
                                        >
                                            Remove Step
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}

                    <button type="button" onClick={handleAddStep} className="mt-2 bg-secondary text-surface font-semibold px-2 py-1 rounded hover:bg-secondary-hover text-sm">
                        Add Step
                    </button>

                    <button
                        type="button"
                        onClick={handleRemoveJob}
                        className="ml-2 mt-4 border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white text-sm"
                    >
                        Remove Job
                    </button>
                </>
            )}
        </div>
    );
}

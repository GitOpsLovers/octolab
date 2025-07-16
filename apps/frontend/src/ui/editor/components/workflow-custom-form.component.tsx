'use client';

import { Step, workflowsRunners, WorkflowTrigger } from '@octolab/domain';
import { ReactNode, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Custom workflow form component
 */
export function CustomWorkflowForm(): ReactNode {
    const { editingWorkflow, setEditingWorkflow, resetEditingWorkflow, setErrors, errors } = useEditor();
    const [collapsedJobs, setCollapsedJobs] = useState<Record<string, boolean>>({});
    const [collapsedSteps, setCollapsedSteps] = useState<Record<string, boolean>>({});

    if (!editingWorkflow || editingWorkflow.id !== 'custom') return null;

    const customWorkflow = editingWorkflow;
    const triggerOptions: WorkflowTrigger[] = ['push', 'pull_request', 'workflow_dispatch', 'schedule'];

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

    const handleTriggerChange = (value: WorkflowTrigger) => {
        if (value !== 'push' && value !== 'pull_request') {
            const { ...rest } = customWorkflow;
            setEditingWorkflow({ ...rest, on: value });
        } else {
            setEditingWorkflow({ ...customWorkflow, on: value, branch: customWorkflow.branch || 'main' });
        }
    };

    const handleAddJob = () => {
        const existingNames = customWorkflow.jobs.map((j) => j.name);
        let newJobName = 'job-name';
        let counter = 1;

        while (existingNames.includes(newJobName)) {
            newJobName = `job-name-${counter}`;
            counter++;
        }

        const newJob = {
            id: uuidv4(),
            name: newJobName,
            runner: 'ubuntu-latest',
            branch: 'main',
            steps: [],
        };
        setEditingWorkflow({ ...customWorkflow, jobs: [...customWorkflow.jobs, newJob] });
    };

    const handleRemoveJob = (jobIndex: number) => {
        const newJobs = [...customWorkflow.jobs];
        const removedJob = newJobs[jobIndex];
        newJobs.splice(jobIndex, 1);
        setEditingWorkflow({ ...customWorkflow, jobs: newJobs });

        const { [removedJob.id]: _, ...updatedCollapsed } = collapsedJobs;
        setCollapsedJobs(updatedCollapsed);
    };

    const handleStepChange = (jobIndex: number, stepIndex: number, key: 'name' | 'run' | 'uses', value: string) => {
        const newJobs = [...customWorkflow.jobs];
        const stepId = newJobs[jobIndex].steps[stepIndex].id;
        newJobs[jobIndex].steps[stepIndex][key] = value;
        setEditingWorkflow({ ...customWorkflow, jobs: newJobs });
        validateField(`step-${stepId}-${key}`, value);
    };

    const handleAddStepToJob = (jobIndex: number) => {
        const newJobs = [...customWorkflow.jobs];
        const newStep: Step = {
            id: uuidv4(),
            name: `Step ${newJobs[jobIndex].steps.length + 1}`,
            type: 'run',
            run: 'echo "Hello World"',
        };
        newJobs[jobIndex].steps.push(newStep);
        setEditingWorkflow({ ...customWorkflow, jobs: newJobs });
    };

    const handleRemoveStepFromJob = (jobIndex: number, stepIndex: number) => {
        const newJobs = [...customWorkflow.jobs];
        const stepId = newJobs[jobIndex].steps[stepIndex].id;
        newJobs[jobIndex].steps = newJobs[jobIndex].steps.filter((_, i) => i !== stepIndex);
        setEditingWorkflow({ ...customWorkflow, jobs: newJobs });

        const { [stepId]: _, ...updatedCollapsedSteps } = collapsedSteps;
        setCollapsedSteps(updatedCollapsedSteps);
    };

    const handleResetValues = () => {
        resetEditingWorkflow();
        setErrors({});
        setCollapsedJobs({});
        setCollapsedSteps({});
    };

    const toggleCollapseJob = (jobId: string) => {
        setCollapsedJobs((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
    };

    const toggleCollapseStep = (stepId: string) => {
        setCollapsedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
    };

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col mb-4">
            <h2 className="text-xl font-bold text-text mb-4">Edit Configuration</h2>

            {/* Workflow Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Name</label>
                <input
                    type="text"
                    value={customWorkflow.workflowName}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEditingWorkflow({ ...customWorkflow, workflowName: value });
                        validateField('workflowName', value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                {errors.workflowName && <p className="text-red-500 text-sm mt-1">{errors.workflowName}</p>}
            </div>

            {/* Trigger */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-1">Trigger</label>
                <select
                    value={customWorkflow.on || 'push'}
                    onChange={(e) => {
                        handleTriggerChange(e.target.value as WorkflowTrigger);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    {triggerOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {/* Branch */}
            {(customWorkflow.on === 'push' || customWorkflow.on === 'pull_request') && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text mb-1">Target Branch</label>
                    <input
                        type="text"
                        value={customWorkflow.branch || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditingWorkflow({ ...customWorkflow, branch: value });
                            validateField('branch', value);
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                    {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                </div>
            )}

            {/* Jobs */}
            {customWorkflow.jobs.map((job, jobIndex) => {
                const isCollapsed = collapsedJobs[job.id] ?? false;

                return (
                    <div key={job.id} className="border border-border p-4 rounded mb-4 bg-muted">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-md font-bold">Job: {job.name}</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    toggleCollapseJob(job.id);
                                }}
                                className="text-text hover:text-text-hover transition cursor-pointer"
                            >
                                {isCollapsed ? <FaPlus size={16} /> : <FaMinus size={16} />}
                            </button>
                        </div>

                        {!isCollapsed && (
                            <>
                                {/* Job name */}
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-text mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={job.name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const newJobs = [...customWorkflow.jobs];
                                            newJobs[jobIndex].name = value;
                                            setEditingWorkflow({ ...customWorkflow, jobs: newJobs });
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
                                            const newJobs = [...customWorkflow.jobs];
                                            newJobs[jobIndex].runner = e.target.value;
                                            setEditingWorkflow({ ...customWorkflow, jobs: newJobs });
                                        }}
                                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    >
                                        {workflowsRunners.map((runner) => (
                                            <option key={runner} value={runner}>
                                                {runner}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Steps */}
                                {job.steps.length > 0 && <h4 className="text-md font-semibold mt-4 mb-2">Steps</h4>}

                                {job.steps.map((step, stepIndex) => {
                                    const isStepCollapsed = collapsedSteps[step.id] ?? false;

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
                                                    {isStepCollapsed ? <FaPlus size={14} /> : <FaMinus size={14} />}
                                                </button>
                                            </div>

                                            {!isStepCollapsed && (
                                                <>
                                                    <div className="mb-2">
                                                        <label className="block text-sm font-medium text-text mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            value={step.name}
                                                            onChange={(e) => {
                                                                handleStepChange(jobIndex, stepIndex, 'name', e.target.value);
                                                            }}
                                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                        />
                                                        {errors[`step-${step.id}-name`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-name`]}</p>}
                                                    </div>

                                                    <div className="mb-2">
                                                        <label className="block text-sm font-medium text-text mb-1">Type</label>
                                                        <select
                                                            value={step.type}
                                                            onChange={(e) => {
                                                                const newJobs = [...customWorkflow.jobs];
                                                                const currentStep = newJobs[jobIndex].steps[stepIndex];
                                                                const newType = e.target.value as 'run' | 'uses';

                                                                if (newType === 'run') {
                                                                    currentStep.run = '';
                                                                    currentStep.uses = undefined;
                                                                } else {
                                                                    currentStep.uses = '';
                                                                    currentStep.run = undefined;
                                                                }

                                                                currentStep.type = newType;
                                                                setEditingWorkflow({ ...customWorkflow, jobs: newJobs });
                                                            }}
                                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                        >
                                                            <option value="run">Run</option>
                                                            <option value="uses">Uses</option>
                                                        </select>
                                                    </div>

                                                    {step.type === 'run' ? (
                                                        <div className="mb-2">
                                                            <label className="block text-sm font-medium text-text mb-1">Command</label>
                                                            <input
                                                                type="text"
                                                                value={step.run || ''}
                                                                onChange={(e) => {
                                                                    handleStepChange(jobIndex, stepIndex, 'run', e.target.value);
                                                                }}
                                                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                            />
                                                            {errors[`step-${step.id}-run`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-run`]}</p>}
                                                        </div>
                                                    ) : (
                                                        <div className="mb-2">
                                                            <label className="block text-sm font-medium text-text mb-1">Action</label>
                                                            <input
                                                                type="text"
                                                                value={step.uses || ''}
                                                                onChange={(e) => {
                                                                    handleStepChange(jobIndex, stepIndex, 'uses', e.target.value);
                                                                }}
                                                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                            />
                                                            {errors[`step-${step.id}-uses`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-uses`]}</p>}
                                                        </div>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleRemoveStepFromJob(jobIndex, stepIndex);
                                                        }}
                                                        className="border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition text-sm cursor-pointer mt-2"
                                                    >
                                                        Remove Step
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleAddStepToJob(jobIndex);
                                    }}
                                    className="mt-2 bg-secondary text-surface font-semibold px-2 py-1 rounded hover:bg-secondary-hover transition text-sm cursor-pointer"
                                >
                                    Add Step
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveJob(jobIndex);
                                    }}
                                    className="ml-2 mt-4 border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition text-sm cursor-pointer"
                                >
                                    Remove Job
                                </button>
                            </>
                        )}
                    </div>
                );
            })}

            <div className="flex gap-2 mt-4">
                <button type="button" onClick={handleAddJob} className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition cursor-pointer">
                    Add Job
                </button>

                <button
                    type="button"
                    onClick={handleResetValues}
                    className="border border-secondary font-semibold text-secondary px-4 py-2 rounded-md hover:bg-secondary/80 transition cursor-pointer"
                >
                    Reset Values
                </button>
            </div>
        </div>
    );
}

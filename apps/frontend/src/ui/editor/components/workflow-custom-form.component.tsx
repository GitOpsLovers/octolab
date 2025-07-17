'use client';

import { Trigger } from '@octolab/domain';
import { ReactNode, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useEditor } from '../hooks/editor.hooks';

import { CustomWorkflowFormJobsSteps } from './workflow-custom-form-jobs-steps.component';

import { getTriggersUseCase } from '@features/editor/application/get-triggers.use-case';
import { editorApiRepository } from '@features/editor/infrastructure/editor-api.repository';

/**
 * Custom workflow form component
 */
export function CustomWorkflowForm(): ReactNode {
    const { editingWorkflow, availableRunners, errors, setEditingWorkflow, resetEditingWorkflow, setErrors } = useEditor();
    const [availableTriggers, setAvailableTriggers] = useState<string[]>([]);
    const [collapsedJobs, setCollapsedJobs] = useState<Record<string, boolean>>({});
    const [collapsedSteps, setCollapsedSteps] = useState<Record<string, boolean>>({});

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

    if (!editingWorkflow || editingWorkflow.id !== 'custom') return null;

    const customWorkflow = editingWorkflow;

    // Validate form fields
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

    // On trigger change
    const handleTriggerChange = (value: Trigger) => {
        if (value !== 'push' && value !== 'pull_request') {
            const { ...rest } = customWorkflow;
            setEditingWorkflow({ ...rest, on: value });
        } else {
            setEditingWorkflow({ ...customWorkflow, on: value, branch: customWorkflow.branch || 'main' });
        }
    };

    // On add job
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

    // On reset form values
    const handleResetValues = () => {
        resetEditingWorkflow();
        setErrors({});
        setCollapsedJobs({});
        setCollapsedSteps({});
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

            {/* Schedule Expression */}
            {customWorkflow.on === 'schedule' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text mb-1">Cron Schedule</label>
                    <input
                        type="text"
                        value={customWorkflow.schedule || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEditingWorkflow({ ...customWorkflow, schedule: value });
                            validateField('schedule', value);
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                    {errors.schedule && <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>}
                </div>
            )}

            {/* Jobs and steps */}
            {availableRunners &&
                customWorkflow.jobs.map((job, index) => (
                    <CustomWorkflowFormJobsSteps
                        key={job.id}
                        job={job}
                        jobIndex={index}
                        errors={errors}
                        collapsed={collapsedJobs[job.id] ?? false}
                        collapsedSteps={collapsedSteps}
                        toggleCollapseJob={(id) => {
                            setCollapsedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
                        }}
                        toggleCollapseStep={(id) => {
                            setCollapsedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
                        }}
                        validateField={validateField}
                        setEditingWorkflow={setEditingWorkflow}
                        editingWorkflow={customWorkflow}
                        availableRunners={availableRunners}
                    />
                ))}

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

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Action, Step } from '@octolab/domain';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaAngleDown, FaAngleUp, FaInfoCircle, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import Select from 'react-select';

import { transformAvailableActionsToSelectOptions } from '../../helpers/transform-available-actions-to-select';
import { useEditorCustom } from '../../hooks/editor-custom.hooks';
import { CustomWorkflowFormSchema } from '../../models/custom-workflow-form.models';

import { select2Styles } from '@ui/layout/styles/select2.styles';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/shared/components/tooltip';

interface SortableStepProps {
    step: Step;
    jobIndex: number;
    jobId: string;
    stepIndex: number;
    collapsed: boolean;
    availableActions: Action[];
    onToggleCollapse: (id: string) => void;
    onRemove: (index: number) => void;
}

/**
 * Sortable step for the workflow custom form component.
 */
export function SortableStep({ step, jobIndex, jobId, stepIndex, collapsed, availableActions, onToggleCollapse, onRemove }: SortableStepProps) {
    const { focusYamlAtField, editingWorkflowYaml } = useEditorCustom();
    const [hasCondition, setHasCondition] = useState(!!step.if?.trim());
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.internalId });
    const {
        register,
        setValue,
        getValues,
        formState: { errors },
    } = useFormContext<CustomWorkflowFormSchema>();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    /**
     * Transform available actions to select options for actions input
     */
    const actionsOptions = transformAvailableActionsToSelectOptions(availableActions);
    const findOpt = (id?: string | null) => actionsOptions.find((o) => o.value === (id ?? '')) ?? null;
    const findAction = (id?: string | null) => availableActions.find((a) => a.id === id);

    const currentAction = findAction(step.uses);
    const actionInputs = step.stepActionInputs ?? currentAction?.inputs ?? [];

    /**
     * On action selection
     */
    const handleActionChange = (opt: { value: string } | null) => {
        const newUses = opt?.value ?? '';

        setValue(`jobs.${jobIndex}.steps.${stepIndex}.uses`, newUses, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });

        setValue(`jobs.${jobIndex}.steps.${stepIndex}.type`, 'uses', {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });

        setValue(
            `jobs.${jobIndex}.steps.${stepIndex}.with`,
            {},
            {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
            },
        );
    };

    /**
     * On add condition to step
     */
    const handleAddStepCondition = () => {
        const fieldName = `jobs.${jobIndex}.steps.${stepIndex}.if` as const;
        setValue(fieldName, '');
        setHasCondition(true);
    };

    const computeHighlightKeyForInput = (inputKey: string) => {
        const fieldName = `jobs.${jobIndex}.steps.${stepIndex}.with.${inputKey}` as const;
        const val = getValues(fieldName);
        const envKey = typeof val === 'string' ? val.trim() : '';

        // existe en el estado del form...
        const existsInStepState = !!envKey && step.env && Object.prototype.hasOwnProperty.call(step.env, envKey);

        // ...o ya existe en el YAML renderizado
        const stepYaml = editingWorkflowYaml?.jobs?.[jobId]?.steps?.[stepIndex] as { env?: Record<string, unknown> } | undefined;
        const existsInYaml = !!envKey && stepYaml?.env && Object.prototype.hasOwnProperty.call(stepYaml.env, envKey);

        const hasEnv = existsInStepState || existsInYaml;

        return hasEnv ? `job:${jobId}:step:${step.internalId}:env.${envKey}` : `job:${jobId}:step:${step.internalId}:with.${inputKey}`;
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="border border-border p-3 rounded mb-2 bg-background">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span {...listeners} className="cursor-grab text-muted hover:text-text">
                        <MdDragIndicator />
                    </span>
                    <span className="text-sm font-medium">Step: {step.name}</span>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        onToggleCollapse(step.id);
                    }}
                    className="text-text hover:text-text-hover transition cursor-pointer"
                >
                    {collapsed ? <FaAngleDown size={14} /> : <FaAngleUp size={14} />}
                </button>
            </div>

            {!collapsed && (
                <div className="mt-4">
                    <div className="mb-2 flex gap-x-4">
                        {/* ID */}
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-text mb-1">ID</label>
                            <input
                                type="text"
                                {...register(`jobs.${jobIndex}.steps.${stepIndex}.id`)}
                                onFocus={() => {
                                    focusYamlAtField(`job:${jobId}:step:${step.internalId}:id`);
                                }}
                                onBlur={() => {
                                    focusYamlAtField(null);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            {errors.jobs?.[jobIndex]?.steps?.[stepIndex]?.id && (
                                <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.steps?.[stepIndex]?.id?.message}</p>
                            )}
                        </div>

                        {/* Name */}
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-text mb-1">Name</label>
                            <input
                                type="text"
                                {...register(`jobs.${jobIndex}.steps.${stepIndex}.name`)}
                                onFocus={() => {
                                    focusYamlAtField(`job:${jobId}:step:${step.internalId}:name`);
                                }}
                                onBlur={() => {
                                    focusYamlAtField(null);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            {errors.jobs?.[jobIndex]?.steps?.[stepIndex]?.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.steps?.[stepIndex]?.name?.message}</p>
                            )}{' '}
                        </div>
                    </div>

                    {/* Type */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-text mb-1">Type</label>
                        <select
                            {...register(`jobs.${jobIndex}.steps.${stepIndex}.type`)}
                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        >
                            <option value="run">Run</option>
                            <option value="uses">Uses</option>
                        </select>
                    </div>

                    {/* Content */}
                    {step.type === 'run' ? (
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-text mb-1">Command</label>
                            <input
                                type="text"
                                {...register(`jobs.${jobIndex}.steps.${stepIndex}.run`)}
                                onFocus={() => {
                                    focusYamlAtField(`job:${jobId}:step:${step.internalId}:run`);
                                }}
                                onBlur={() => {
                                    focusYamlAtField(null);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            {errors.jobs?.[jobIndex]?.steps?.[stepIndex]?.run && (
                                <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.steps?.[stepIndex]?.run?.message}</p>
                            )}{' '}
                        </div>
                    ) : (
                        <>
                            {/* Action */}
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-text mb-1">Action</label>
                                <Select
                                    name={`jobs.${jobIndex}.steps.${stepIndex}.uses`}
                                    options={actionsOptions}
                                    styles={select2Styles}
                                    placeholder="-- Select an action --"
                                    value={findOpt(step.uses ?? '')}
                                    onChange={handleActionChange}
                                    onMenuOpen={() => {
                                        focusYamlAtField(`job:${jobId}:step:${step.internalId}:uses`);
                                    }}
                                    onMenuClose={() => {
                                        focusYamlAtField(null);
                                    }}
                                />

                                {errors.jobs?.[jobIndex]?.steps?.[stepIndex]?.uses && (
                                    <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.steps?.[stepIndex]?.uses?.message}</p>
                                )}
                            </div>

                            {/* Action inputs */}
                            {actionInputs
                                .filter((input) => !input.hideInForm)
                                .map((input) => {
                                    const type = input.type ?? 'string';
                                    const inputError = errors.jobs?.[jobIndex]?.steps?.[stepIndex]?.with?.[input.key];
                                    const fieldName = `jobs.${jobIndex}.steps.${stepIndex}.with.${input.key}` as const;

                                    return (
                                        <div key={input.key} className="mb-2">
                                            <div className="flex items-center mb-1">
                                                <label className="block text-sm font-medium text-text mb-1">{input.label}</label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <FaInfoCircle size={14} className="ml-1 text-text-muted hover:text-text transition cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-foreground text-text p-3 rounded-md shadow-lg max-w-sm">
                                                        <div className="text-sm text-center">{input.info}</div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>

                                            {/* Select input */}
                                            {type === 'select' && Array.isArray(input.options) && (
                                                <select
                                                    {...register(fieldName)}
                                                    onFocus={() => {
                                                        focusYamlAtField(computeHighlightKeyForInput(input.key));
                                                    }}
                                                    onBlur={() => {
                                                        focusYamlAtField(null);
                                                    }}
                                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>
                                                        {input.placeholder ?? 'Select an option'}
                                                    </option>
                                                    {input.options.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}

                                            {/* Text input */}
                                            {type === 'string' && (
                                                <input
                                                    {...register(fieldName)}
                                                    onFocus={() => {
                                                        focusYamlAtField(computeHighlightKeyForInput(input.key));
                                                    }}
                                                    onBlur={() => {
                                                        focusYamlAtField(null);
                                                    }}
                                                    type="text"
                                                    placeholder={input.placeholder}
                                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                />
                                            )}

                                            {/* Number input */}
                                            {type === 'number' && (
                                                <input
                                                    {...register(fieldName)}
                                                    onFocus={() => {
                                                        focusYamlAtField(computeHighlightKeyForInput(input.key));
                                                    }}
                                                    onBlur={() => {
                                                        focusYamlAtField(null);
                                                    }}
                                                    type="number"
                                                    placeholder={input.placeholder}
                                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                />
                                            )}

                                            {inputError && <p className="text-red-500 text-sm mt-1">{inputError.message}</p>}
                                        </div>
                                    );
                                })}
                        </>
                    )}

                    {/* Step conditions */}
                    <div className="mb-2">
                        {hasCondition ? (
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Condition</label>

                                <input
                                    type="text"
                                    {...register(`jobs.${jobIndex}.steps.${stepIndex}.if`)}
                                    onFocus={() => {
                                        focusYamlAtField(`job:${jobId}:step:${step.internalId}:if`);
                                    }}
                                    onBlur={() => {
                                        focusYamlAtField(null);
                                    }}
                                    placeholder="e.g. github.ref == 'refs/heads/main'"
                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                />

                                {errors.jobs?.[jobIndex]?.steps?.[stepIndex]?.if && (
                                    <p className="text-red-500 text-sm mt-1">{errors.jobs[jobIndex]?.steps?.[stepIndex]?.if?.message}</p>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        const fieldName = `jobs.${jobIndex}.steps.${stepIndex}.if` as const;
                                        setValue(fieldName, undefined);
                                        setHasCondition(false);
                                    }}
                                    className="mt-2 inline-flex items-center gap-1 text-sm text-white hover:text-red-500 transition cursor-pointer"
                                >
                                    <FaTrashAlt size={12} />
                                    Remove condition
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleAddStepCondition}
                                className="inline-flex items-center gap-1 text-sm text-white hover:text-primary transition mt-1 cursor-pointer"
                            >
                                <FaPlus size={12} />
                                Add condition
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            onRemove(stepIndex);
                        }}
                        className="border border-red-500 text-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white text-sm mt-2 cursor-pointer"
                    >
                        Remove Step
                    </button>
                </div>
            )}
        </div>
    );
}

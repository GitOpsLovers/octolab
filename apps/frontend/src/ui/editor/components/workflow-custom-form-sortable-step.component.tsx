import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Action, Step } from '@octolab/domain';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';

interface SortableStepProps {
    step: Step;
    jobIndex: number;
    stepIndex: number;
    errors: Record<string, string | null>;
    collapsed: boolean;
    availableActions: Action[];
    selectedAction?: Action;
    onToggleCollapse: (id: string) => void;
    onChange: (key: 'id' | 'name' | 'type' | 'run' | 'uses', value: string) => void;
    onInputChange: (jobIndex: number, stepIndex: number, key: string, value: string | number | boolean) => void;
    onRemove: (index: number) => void;
}

/**
 * Sortable step for the workflow custom form component.
 */
export function SortableStep({
    step,
    jobIndex,
    stepIndex,
    errors,
    collapsed,
    availableActions,
    selectedAction,
    onToggleCollapse,
    onChange,
    onInputChange,
    onRemove,
}: SortableStepProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.internalId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const inputValue = (val: string | number | boolean | undefined) => (val !== undefined ? String(val) : '');

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
                                value={step.id}
                                onChange={(e) => {
                                    onChange('id', e.target.value);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                        </div>

                        {/* Name */}
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-text mb-1">Name</label>
                            <input
                                type="text"
                                value={step.name}
                                onChange={(e) => {
                                    onChange('name', e.target.value);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            {errors[`step-${step.id}-name`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-name`]}</p>}
                        </div>
                    </div>

                    {/* Type */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-text mb-1">Type</label>
                        <select
                            value={step.type}
                            onChange={(e) => {
                                onChange('type', e.target.value as 'run' | 'uses');
                            }}
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
                                value={step.run || ''}
                                onChange={(e) => {
                                    onChange('run', e.target.value);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            {errors[`step-${step.id}-run`] && <p className="text-red-500 text-sm mt-1">{errors[`step-${step.id}-run`]}</p>}
                        </div>
                    ) : (
                        <>
                            {/* Action */}
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-text mb-1">Action</label>
                                <select
                                    value={step.uses || ''}
                                    onChange={(e) => {
                                        onChange('uses', e.target.value);
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

                            {/* Inputs */}
                            {selectedAction?.inputs.map((input) => {
                                const type = input.type ?? 'string';
                                const raw = step.with?.[input.key];

                                return (
                                    <div key={input.key} className="mb-2">
                                        <label className="block text-sm font-medium text-text mb-1">{input.label}</label>
                                        <input
                                            type={type === 'number' ? 'number' : 'text'}
                                            placeholder={input.placeholder}
                                            value={inputValue(raw)}
                                            onChange={(e) => {
                                                const value = type === 'number' ? Number(e.target.value) : e.target.value;
                                                onInputChange(jobIndex, stepIndex, input.key, value);
                                            }}
                                            className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                        />
                                    </div>
                                );
                            })}
                        </>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            onRemove(stepIndex);
                        }}
                        className="border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white text-sm mt-2"
                    >
                        Remove Step
                    </button>
                </div>
            )}
        </div>
    );
}

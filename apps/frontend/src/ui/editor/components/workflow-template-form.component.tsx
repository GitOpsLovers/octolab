'use client';

import { ReactNode, useState } from 'react';

import { useEditorTemplate } from '../hooks/editor-template.hooks';

import { TemplateWorkflowFieldHelpMessages } from './editor-template-field-help-messages.component';
import { TemplateWorkflowGuide } from './editor-template-guide.component';
import { TemplateWorkflowOverview } from './editor-template-overview.component';

/**
 * Template workflow form component
 */
export function TemplateWorkflowForm(): ReactNode {
    const { editingWorkflow, availableRunners, errors, setEditingWorkflow, resetEditingWorkflow, setErrors } = useEditorTemplate();
    const [focusedField, setFocusedField] = useState<string | null>(null);

    /**
     * Validate fields
     */
    const validateField = (field: any, value: string) => {
        if (field.required && !value.trim()) {
            setErrors((prev) => ({ ...prev, [field.key]: 'This field cannot be empty' }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete newErrors[field.key];
                return newErrors;
            });
        }
    };

    if (!editingWorkflow) return null;

    /**
     * Check if a field should be shown based on its condition
     */
    const shouldShowField = (field: any): boolean => {
        if (!field.condition) return true;

        const targetField = editingWorkflow?.fields.find((f) => f.key === field.condition.field);
        const targetValue = targetField?.value;

        return targetValue === field.condition.equals;
    };

    /**
     * Resolve options for select fields based on the field type
     */
    const resolveOptions = (field: any): string[] => {
        return field.key === 'runner' ? (availableRunners ?? []) : (field.options ?? []);
    };

    /**
     * On change field value
     */
    const updateFieldValue = (key: string, newValue: string) => {
        const updatedFields = editingWorkflow.fields.map((field) => (field.key === key ? { ...field, value: newValue } : field));
        setEditingWorkflow({ ...editingWorkflow, fields: updatedFields });
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col gap-4 mb-8">
            {/* Guided step breakdown */}
            <TemplateWorkflowGuide />

            {/* Overview panel */}
            <TemplateWorkflowOverview />

            {/* Form */}
            <div className="bg-surface border border-border p-6 rounded-lg shadow flex flex-col">
                <h2 className="text-lg font-semibold text-text flex items-center gap-2 mb-2">Workflow configuration</h2>

                {editingWorkflow.fields.map((field) => {
                    if (!shouldShowField(field)) return null;
                    const value = field.value ?? '';

                    return (
                        <div key={field.key} className="mb-4">
                            <label className="block text-sm font-medium text-text mb-1">{field.label}</label>

                            {field.type === 'input' ? (
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        updateFieldValue(field.key, newValue);
                                        validateField(field, newValue);
                                    }}
                                    onFocus={() => {
                                        setFocusedField(field.key);
                                    }}
                                    onBlur={() => {
                                        setFocusedField(null);
                                    }}
                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    placeholder={field.placeholder}
                                />
                            ) : (
                                <select
                                    value={value}
                                    onChange={(e) => {
                                        updateFieldValue(field.key, e.target.value);
                                    }}
                                    onFocus={() => {
                                        setFocusedField(field.key);
                                    }}
                                    onBlur={() => {
                                        setFocusedField(null);
                                    }}
                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                >
                                    {resolveOptions(field).map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {field.helpMessage && focusedField === field.key && <TemplateWorkflowFieldHelpMessages message={field.helpMessage} />}
                            {errors[field.key] && <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>}
                        </div>
                    );
                })}

                <button
                    type="button"
                    onClick={() => {
                        resetEditingWorkflow();
                        setErrors({});
                    }}
                    data-umami-event={`[Workflow template editor] Reset values on ${editingWorkflow.id} click`}
                    className="mt-2 border border-secondary font-semibold text-secondary px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/80 hover:text-white transition self-start"
                >
                    Reset Values
                </button>
            </div>
        </div>
    );
}

'use client';

import { ReactNode } from 'react';

import { useEditorTemplate } from '../hooks/editor-template.hooks';

import { TemplateWorkflowOverview } from './editor-template-overview.component';

/**
 * Template workflow form component
 */
export function TemplateWorkflowForm(): ReactNode {
    const { editingWorkflow, availableRunners, errors, setEditingWorkflow, resetEditingWorkflow, setErrors } = useEditorTemplate();

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

    /* const guidedSteps = [
        { label: 'Checkout', description: 'Descarga tu repositorio en el runner' },
        { label: 'Instalar dependencias', description: 'Ejecuta el comando de instalación (ej: npm install)' },
        { label: 'Lint', description: 'Verifica el estilo y formato del código' },
        { label: 'Tests', description: 'Ejecuta los tests para validar el comportamiento' },
        { label: 'Build', description: 'Compila y genera artefactos de distribución' },
    ]; */

    return (
        <div className="w-full lg:w-1/2 flex flex-col gap-4 mb-8">
            {/* Overview panel */}
            <TemplateWorkflowOverview />

            {/* Guided step breakdown */}
            {/* <div className="bg-surface border border-border p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-text flex items-center gap-2 mb-2">¿Qué hace este workflow?</h2>
                <ul className="space-y-2">
                    {guidedSteps.map((step) => (
                        <li key={step.label} className="flex items-start gap-2 text-sm text-text-muted">
                            <span className="text-primary font-semibold">{step.label}:</span>
                            <span>{step.description}</span>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* Formulario */}
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
                                    className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    placeholder={field.placeholder}
                                />
                            ) : (
                                <select
                                    value={value}
                                    onChange={(e) => {
                                        updateFieldValue(field.key, e.target.value);
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
                            {/* {field.key === 'installCommand' && value === 'npm install' && (
                                <p className="text-xs text-primary mt-1">
                                    💡 Considera usar <code>npm ci</code> para builds más rápidos y reproducibles.
                                </p>
                            )} */}

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

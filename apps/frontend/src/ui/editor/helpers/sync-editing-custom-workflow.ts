import { Action, CustomWorkflowConfig, ShowWhen } from '@octolab/domain';
import { useForm } from 'react-hook-form';

import { CustomWorkflowFormSchema } from '../models/custom-workflow-form.models';

interface Params {
    form: ReturnType<typeof useForm<CustomWorkflowFormSchema>>;
    values: CustomWorkflowFormSchema;
    availableActions: Action[];
    editingWorkflow: CustomWorkflowConfig;
    setEditingWorkflow: (config: CustomWorkflowConfig) => void;
}

/**
 * Normalize the rules for showing or hiding action fields
 */
function normalizeRules(showWhen: Action['inputs'][number]['showWhen']): ShowWhen[] {
    const out: ShowWhen[] = [];
    if (showWhen === undefined || showWhen === null) return out;

    if (Array.isArray(showWhen)) {
        for (const r of showWhen) out.push(r);
    } else {
        out.push(showWhen);
    }
    return out;
}

/**
 * Evaluates a rule for showing or hiding action fields.
 */
function evalRule(rule: ShowWhen, values: Record<string, any>): boolean {
    const v = values?.[rule.field];

    if (rule.op === 'equals') return v === rule.value;
    if (rule.op === 'notEquals') return v !== rule.value;
    if (rule.op === 'in') return Array.isArray(rule.value) && rule.value.includes(v);
    if (rule.op === 'notIn') return Array.isArray(rule.value) && !rule.value.includes(v);
    if (rule.op === 'truthy') return Boolean(v);
    if (rule.op === 'falsy') return !v;
    if (rule.op === 'exists') return v !== undefined && v !== null;
    if (rule.op === 'notExists') return v === undefined || v === null;
    if (rule.op === 'regex') return typeof v === 'string' && new RegExp(String(rule.value)).test(v);

    return true;
}

/**
 * Evaluates a set of rules for showing or hiding action fields.
 */
function evaluateShowWhen(rules: ShowWhen[], values: Record<string, any>): boolean {
    if (!rules || rules.length === 0) return true;
    for (const r of rules) {
        const ok = evalRule(r, values);
        if (!ok) return false;
    }
    return true;
}

/**
 * Si hay reglas -> manda showWhen (visible = visibleByRules).
 * Si no hay reglas -> se respeta hideInForm original.
 * Devuelve hideInForm efectivo.
 */
export function computeEffectiveHideInForm(input: Action['inputs'][number], withValues: Record<string, any>): boolean {
    const rules = normalizeRules(input.showWhen);
    const hasRules = rules.length > 0;

    if (hasRules) {
        const visible = evaluateShowWhen(rules, withValues);
        if (visible) return false;
        return true;
    }

    return input.hideInForm === true;
}

/**
 * Decide cómo actualizar cleanedWith / keysToDelete en función de:
 * - visibilidad efectiva (UI)
 * - showWhen presente o no
 * - hideInYaml
 * - tipo y defaults
 */
export function applyWithPolicy(
    input: Action['inputs'][number],
    currentValue: any,
    effectiveHideInForm: boolean,
    hasRules: boolean,
    cleanedWith: Record<string, string | number | boolean>,
    keysToDelete: string[],
): void {
    const key = input.key;

    if (!effectiveHideInForm) {
        // visible => incluir
        if (currentValue !== undefined) {
            cleanedWith[key] = currentValue;
            return;
        }
        if (input.defaultValue !== undefined) {
            cleanedWith[key] = input.defaultValue as any;
            return;
        }
        if (input.type === 'boolean') {
            cleanedWith[key] = false as any;
            return;
        }
        if (input.type === 'number') {
            cleanedWith[key] = 0 as any;
            return;
        }
        cleanedWith[key] = '' as any; // string/select
        return;
    }

    // oculto
    if (hasRules) {
        // si tiene showWhen y no cumple -> siempre fuera del YAML
        keysToDelete.push(key);
        return;
    }

    // oculto sin showWhen -> política por hideInYaml
    if (input.hideInYaml) {
        keysToDelete.push(key);
        return;
    }

    if (currentValue !== undefined) {
        cleanedWith[key] = currentValue;
        return;
    }
    if (input.defaultValue !== undefined) {
        cleanedWith[key] = input.defaultValue as any;
    }
}

/**
 * Synchronizes the editing workflow with the current form values.
 * It updates the steps and jobs in the workflow based on the available actions
 * and cleans up unnecessary fields.
 */
export function syncEditingWorkflow({ form, values, availableActions, editingWorkflow, setEditingWorkflow }: Params): void {
    const updatedJobs = values.jobs?.map((job, jobIndex) => {
        const updatedSteps = job?.steps?.map((step, stepIndex) => {
            // 1) Si no es 'uses' o no hay 'uses', limpia 'with' si existía y sal
            if (step?.type !== 'uses' || !step.uses) {
                if (step.with && Object.keys(step.with).length > 0) {
                    form.setValue(`jobs.${jobIndex}.steps.${stepIndex}.with`, undefined, {
                        shouldDirty: true,
                        shouldValidate: true,
                    });
                }
                return step;
            }

            const action = availableActions.find((a) => a.id === step.uses);
            if (!action) {
                // sin action válida, limpia 'with' también
                if (step.with && Object.keys(step.with).length > 0) {
                    form.setValue(`jobs.${jobIndex}.steps.${stepIndex}.with`, undefined, {
                        shouldDirty: true,
                        shouldValidate: true,
                    });
                }
                return step;
            }

            const cleanedWith: Record<string, string | number | boolean> = {};
            const keysToDelete: string[] = [];
            const computedInputs: Action['inputs'] = [];

            const withValues = step.with ?? {};

            // 2) Purga claves de 'with' que no existen en la action actual (cambio de action)
            const allowedKeys = new Set(action.inputs.map((i) => i.key));
            for (const k of Object.keys(withValues)) {
                if (!allowedKeys.has(k)) {
                    keysToDelete.push(k);
                }
            }

            for (const input of action.inputs) {
                const key = input.key;
                const currentValue = withValues[key];

                const rules = normalizeRules(input.showWhen);
                const hasRules = rules.length > 0;

                let visibleByRules = true;
                if (hasRules) {
                    visibleByRules = evaluateShowWhen(rules, withValues);
                }

                let effectiveHideInForm = input.hideInForm === true;
                if (hasRules) {
                    if (visibleByRules) effectiveHideInForm = false;
                    else effectiveHideInForm = true;
                }

                computedInputs.push({ ...input, hideInForm: effectiveHideInForm });

                applyWithPolicy(input, currentValue, effectiveHideInForm, hasRules, cleanedWith, keysToDelete);
            }

            const newWith = { ...withValues, ...cleanedWith };
            for (const k of keysToDelete) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete (newWith as any)[k];
            }

            if (JSON.stringify(withValues ?? {}) !== JSON.stringify(newWith)) {
                form.setValue(`jobs.${jobIndex}.steps.${stepIndex}.with`, newWith, {
                    shouldDirty: true,
                    shouldValidate: true,
                });
            }

            const secretInputs = action.inputs.filter((i) => i.isSecret).map((i) => i.key);
            const environmentVariables = action.inputs.filter((i) => i.isEnvironmentVariable).map((i) => i.key);
            const stepEnvironmentVariables = action.inputs.filter((i) => i.isStepEnvironmentVariable).map((i) => i.key);
            const templates = action.templates ?? {};
            const hiddenInputs = action.inputs.filter((i) => i.hideInYaml).map((i) => i.key);

            return {
                ...step,
                secretInputs,
                environmentVariables,
                stepEnvironmentVariables,
                hiddenInputs,
                templates,
                stepActionInputs: computedInputs,
            };
        });

        // ... resto igual (limpieza de needs)
        const currentJobId = job?.id;
        const otherJobs = values.jobs?.filter((_, i) => i !== jobIndex) ?? [];
        const validJobIds = new Set(otherJobs.map((j) => j?.id));
        const currentNeeds = job?.needs ?? [];
        const cleanedNeeds = currentNeeds.filter((id) => id !== currentJobId && validJobIds.has(id)).filter((id): id is string => typeof id === 'string');

        if (JSON.stringify(cleanedNeeds) !== JSON.stringify(currentNeeds)) {
            form.setValue(`jobs.${jobIndex}.needs`, cleanedNeeds, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }

        return { ...job, steps: updatedSteps };
    });

    setEditingWorkflow({ ...editingWorkflow, ...values, jobs: updatedJobs });
}

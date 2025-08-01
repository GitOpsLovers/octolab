/* eslint-disable import/namespace */
'use client';

import { TemplateField, StepCompletionRule } from '@octolab/domain';
import { ReactNode } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';
import * as SiIcons from 'react-icons/si';

import { useEditorTemplate } from '../hooks/editor-template.hooks';

/**
 * Rule handler map for step completion
 */
const completionRuleHandlers: Record<StepCompletionRule['type'], (fields: TemplateField[], rule: StepCompletionRule) => boolean> = {
    completed: () => true,
    'select-value': (fields, rule) => {
        if (!('key' in rule)) return false;
        return fields.some((field) => field.key === rule.key && !!field.value);
    },
    'non-empty-string': (fields, rule) => {
        if (rule.key) {
            return fields.some((field) => field.key === rule.key && typeof field.value === 'string' && field.value.trim().length > 0);
        }

        if (rule.keys) {
            return rule.keys.every((key) => fields.some((field) => field.key === key && typeof field.value === 'string' && field.value.trim().length > 0));
        }

        return false;
    },
    'has-env-variable': (fields, rule) => {
        if (!('key' in rule)) return false;
        return fields.some((field) => field.key === rule.key && !!field.value);
    },
    'all-inputs-filled': (fields) => {
        return fields.every((field) => (field.required ? !!field.value?.trim() : true));
    },
    'custom-rule-id': () => false, // stub para lógica extendida
};

/**
 * Template workflow overview component
 */
export function TemplateWorkflowOverview(): ReactNode {
    const { editingWorkflow, template } = useEditorTemplate();

    let Icon;

    if (template?.iconLibrary === 'io5') {
        Icon = Io5Icons[template.icon as keyof typeof Io5Icons];
    } else if (template?.iconLibrary === 'fa') {
        Icon = FaIcons[template.icon as keyof typeof FaIcons];
    } else {
        Icon = SiIcons[template?.icon as keyof typeof SiIcons];
    }

    /**
     * Set step as completed when the input field has a valid value
     */
    const isStepCompleted = (step: string): boolean => {
        if (!editingWorkflow || !template?.stepCompletionRules) return false;

        const rule = template.stepCompletionRules[step];
        if (!rule) return false;

        const ruleHandler = completionRuleHandlers[rule.type];
        if (!ruleHandler) return false;

        console.log(editingWorkflow.fields);

        return ruleHandler(editingWorkflow.fields, rule);
    };

    if (!template) return null;

    return (
        <div className="bg-surface border border-border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-text flex items-center gap-2 mb-2">
                <Icon style={{ color: template.iconColor }} />
                {template.name}
            </h2>
            <p className="text-text-muted text-sm mb-3">{template.description}</p>
            <ul className="text-sm text-text-muted flex flex-wrap gap-2">
                {template.steps.map((step) => {
                    const completed = isStepCompleted(step);

                    return (
                        <li
                            key={step}
                            className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 border border-border bg-background transition ${
                                completed ? 'text-primary border-primary/10 bg-primary/10' : ''
                            }`}
                        >
                            <FaIcons.FaCheck />
                            {step}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

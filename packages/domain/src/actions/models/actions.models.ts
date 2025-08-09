/**
 * Represents the conditions under which a step should be shown.
 */
export type ShowWhen =
    | { field: string; op: 'equals' | 'notEquals' | 'truthy' | 'falsy' | 'exists' | 'notExists'; value?: any }
    | { field: string; op: 'in' | 'notIn'; value: any[] }
    | { field: string; op: 'regex'; value: string };

/**
 * Action
 */
export interface Action {
    id: string;
    inputs: Array<{
        key: string;
        label: string;
        placeholder?: string;
        required: boolean;
        type: 'string' | 'number' | 'boolean' | 'select';
        isSecret: boolean;
        isEnvironmentVariable: boolean;
        isStepEnvironmentVariable: boolean;
        hideInYaml: boolean;
        hideInForm?: boolean;
        options?: Array<{ label: string; value: string }>;
        defaultValue?: string | number | boolean;
        info: string;
        showWhen?: ShowWhen | ShowWhen[];
    }>;
    templates?: Record<string, string>;
}

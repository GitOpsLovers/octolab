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
        hideInForm: boolean;
        options?: Array<{ label: string; value: string }>;
        defaultValue?: string | number | boolean;
        info: string;
    }>;
    templates?: Record<string, string>;
}

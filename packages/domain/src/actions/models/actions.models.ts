/**
 * Action
 */
export interface Action {
    id: string;
    inputs: Array<{
        key: string;
        label: string;
        placeholder?: string;
        required?: boolean;
        type?: 'string' | 'number' | 'boolean';
    }>;
}

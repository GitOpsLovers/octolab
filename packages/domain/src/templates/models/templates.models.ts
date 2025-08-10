/**
 * Template model
 */
export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor: string;
    iconLibrary: string;
    features: string[];
    steps: string[];
    type: TemplateType;
    stepCompletionRules: StepCompletionRules;
    guide: Array<{ label: string; description: string }>;
}

/**
 * Templates types
 */
export type TemplateType = 'verification' | 'distribution' | 'deployment' | 'releasing' | 'security' | 'versioning';

/**
 * Template for listing
 */
export type TemplateForListing = Omit<Template, 'steps' | 'stepCompletionRules' | 'guide'>;

/**
 * Template field model
 */
export interface TemplateField {
    key: string;
    label: string;
    type: 'input' | 'select';
    placeholder?: string;
    options?: string[];
    required: boolean;
    default?: string;
    condition?: {
        field: string;
        equals: string;
    };
    value: string;
    helpMessage?: string;
    yamlPath?: string;
}

/**
 * Template step completion rule types
 */
export type StepCompletionRuleType = 'completed' | 'select-value' | 'non-empty-string' | 'has-env-variable' | 'all-inputs-filled' | 'custom-rule-id';

/**
 * Template step completion rule
 */
export interface StepCompletionRule {
    type: StepCompletionRuleType;
    key?: string;
    keys?: string[];
    meta?: any;
}

/**
 * Template step completion rules
 */
export type StepCompletionRules = Record<string, StepCompletionRule>;

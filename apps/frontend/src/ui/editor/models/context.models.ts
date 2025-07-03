import { TemplateConfig } from '@features/templates/domain/models/template.models';

/**
 * Editor context provider model
 */
export interface EditorContextType {
    templateConfig: TemplateConfig | null;
    setTemplateConfig: (template: TemplateConfig) => void;
    errors: Record<string, string | null>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    workflowConfig: any;
    resetTemplateConfig: () => void;
}

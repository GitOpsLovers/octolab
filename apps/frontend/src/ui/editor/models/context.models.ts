import { EditingWorkflow } from '@features/editor/domain/editor.models';
import { Template, TemplateConfig } from '@features/templates/domain/models/template.models';

/**
 * Editor context provider model
 */
export interface EditorContextType {
    template: Template | null;
    templateConfig: TemplateConfig | null;
    setTemplateConfig: (template: TemplateConfig) => void;
    errors: Record<string, string | null>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    editingWorkflow: EditingWorkflow | null;
    resetTemplateConfig: () => void;
}

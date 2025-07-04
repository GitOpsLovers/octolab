import { EditingWorkflow, EditingWorkflowYaml } from '@features/editor/domain/models/editor.models';
import { Template } from '@features/templates/domain/models/template.models';

/**
 * Editor context provider model
 */
export interface EditorContextType {
    template: Template | null;
    editingWorkflow: EditingWorkflow | null;
    setEditingWorkflow: (workflow: EditingWorkflow) => void;
    errors: Record<string, string | null>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    editingWorkflowYaml: EditingWorkflowYaml | null;
    resetEditingWorkflow: () => void;
    loading: boolean;
    setWorkflowNameAndDescription: (name: string, description: string) => void;
}

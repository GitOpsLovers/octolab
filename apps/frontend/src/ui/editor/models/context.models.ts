import { Template } from '@octolab/domain';

import { WorkflowConfig, WorkflowYaml } from '@features/editor/domain/models/editor.models';

/**
 * Editor context provider model
 */
export interface EditorContextType {
    template: Template | null;
    editingWorkflow: WorkflowConfig | null;
    setEditingWorkflow: (workflow: WorkflowConfig) => void;
    errors: Record<string, string | null>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    editingWorkflowYaml: WorkflowYaml | null;
    resetEditingWorkflow: () => void;
    loading: boolean;
    setWorkflowNameAndDescription: (name: string, description: string) => void;
    isEditingExistingWorkflow: boolean;
}

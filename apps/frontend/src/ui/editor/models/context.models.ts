import { Action, Runner, Template, WorkflowConfig, WorkflowYaml } from '@octolab/domain';

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
    availableRunners: Runner[] | null;
    setIsEditingExistingWorkflow: (isEditing: boolean) => void;
    availableActions: Action[];
}

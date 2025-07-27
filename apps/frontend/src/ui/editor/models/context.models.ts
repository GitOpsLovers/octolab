import { Action, CustomWorkflowConfig, Runner, Template, WorkflowConfig, WorkflowYaml } from '@octolab/domain';

/**
 * Editor template context provider model
 */
export interface EditorTemplateContextType {
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
    setIsEditingExistingWorkflow: (isEditing: boolean) => void;
    availableRunners: Runner[] | null;
}

/**
 * Editor custom context provider model
 */
export interface EditorCustomContextType {
    template: Template | null;
    editingWorkflow: CustomWorkflowConfig | null;
    setEditingWorkflow: (workflow: CustomWorkflowConfig) => void;
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

import { Action, CustomWorkflowConfig, Runner, Template, WorkflowTemplateConfig, WorkflowYaml } from '@octolab/domain';

/**
 * Editor template context provider model
 */
export interface EditorTemplateContextType {
    template: Template | null;
    editingWorkflow: WorkflowTemplateConfig | null;
    editingWorkflowYaml: WorkflowYaml | null;
    isEditingExistingWorkflow: boolean;
    availableRunners: Runner[] | null;
    highlightedFieldKey: string | null;
    loading: boolean;
    errors: Record<string, string | null>;
    setEditingWorkflow: (workflow: WorkflowTemplateConfig) => void;
    resetEditingWorkflow: () => void;
    setWorkflowNameAndDescription: (name: string, description: string) => void;
    setIsEditingExistingWorkflow: (isEditing: boolean) => void;
    focusYamlAtField: (fieldKey: string | null) => void;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
}

/**
 * Editor custom context provider model
 */
export interface EditorCustomContextType {
    template: Template | null;
    editingWorkflow: CustomWorkflowConfig | null;
    editingWorkflowYaml: WorkflowYaml | null;
    isEditingExistingWorkflow: boolean;
    availableRunners: Runner[] | null;
    availableActions: Action[];
    highlightedFieldKey: string | null;
    loading: boolean;
    errors: Record<string, string | null>;
    setEditingWorkflow: (workflow: CustomWorkflowConfig) => void;
    resetEditingWorkflow: () => void;
    setWorkflowNameAndDescription: (name: string, description: string) => void;
    setIsEditingExistingWorkflow: (isEditing: boolean) => void;
    focusYamlAtField: (fieldKey: string | null) => void;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
}

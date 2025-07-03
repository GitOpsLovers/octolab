import { EditorConfig } from '@features/editor/domain/editor.models';

/**
 * Editor context provider model
 */
export interface EditorContextType {
    config: EditorConfig;
    errors: Record<string, string>;

    workflowConfig: any;

    setConfig: (config: EditorConfig) => void;
    resetConfig: () => void;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

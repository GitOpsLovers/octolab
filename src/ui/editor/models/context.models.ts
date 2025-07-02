import { EditorConfig } from './editor.models';

/**
 * Editor context provider model
 */
export interface EditorContextType {
    config: EditorConfig;
    setConfig: (config: EditorConfig) => void;
}

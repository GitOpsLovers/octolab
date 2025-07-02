import { NodeTemplateConfig } from './templates.models';

export interface EditorContextType {
    config: NodeTemplateConfig;
    setConfig: (config: NodeTemplateConfig) => void;
}

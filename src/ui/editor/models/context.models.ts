import { NodeTemplateConfig } from "./templates.models";

export type EditorContextType = {
  config: NodeTemplateConfig;
  setConfig: (config: NodeTemplateConfig) => void;
};
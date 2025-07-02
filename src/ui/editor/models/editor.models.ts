import { NodeCiTemplateConfig, NpmPublishTemplateConfig } from './templates.models';

/**
 * Editor configuration model
 */
export type EditorConfig = NpmPublishTemplateConfig | NodeCiTemplateConfig;

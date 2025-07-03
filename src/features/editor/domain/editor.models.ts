import { NodeCiTemplateConfig, NpmPublishTemplateConfig } from '@features/templates/domain/models/template.models';

/**
 * Editor configuration model
 */
export type EditorConfig = NpmPublishTemplateConfig | NodeCiTemplateConfig;

/**
 * Step model
 */
export interface Step {
    name: string;
    run?: string;
    uses?: string;
    with?: Record<string, string>;
    env?: Record<string, string>;
}

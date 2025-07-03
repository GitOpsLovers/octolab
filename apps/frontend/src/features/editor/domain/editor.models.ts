import { NodePrVerifyTemplateConfig, NpmPublishTemplateConfig } from '@features/templates/domain/models/template.models';

/**
 * Editor configuration model
 */
export type EditorConfig = NpmPublishTemplateConfig | NodePrVerifyTemplateConfig;

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

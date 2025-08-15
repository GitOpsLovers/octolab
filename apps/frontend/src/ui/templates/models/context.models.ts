import { Template, TemplateForListing } from '@octolab/domain';

/**
 * Templates context provider model
 */
export interface TemplatesContextType {
    templates: TemplateForListing[];
    setTemplates: (templates: TemplateForListing[]) => void;
    loading: boolean;
    error: string | null;
}

/**
 * Template context provider model
 */
export interface TemplateContextType {
    template: Template | null;
    setTemplate: (template: Template | null) => void;
    loading: boolean;
    error: string | null;
}

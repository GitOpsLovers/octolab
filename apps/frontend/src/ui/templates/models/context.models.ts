import { TemplateForListing } from '@octolab/domain';

/**
 * Templates context provider model
 */
export interface TemplatesContextType {
    templates: TemplateForListing[];
    setTemplates: (templates: TemplateForListing[]) => void;
    loading: boolean;
    error: string | null;
}

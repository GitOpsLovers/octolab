import { Template } from '@octolab/domain';

/**
 * Templates context provider model
 */
export interface TemplatesContextType {
    templates: Template[];
    setTemplates: (templates: Template[]) => void;
    loading: boolean;
    error: string | null;
}

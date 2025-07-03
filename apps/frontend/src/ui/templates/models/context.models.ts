import { Template } from '@features/templates/domain/models/template.models';

/**
 * Templates context provider model
 */
export interface TemplatesContextType {
    templates: Template[];
    setTemplates: (templates: Template[]) => void;
    loading: boolean;
    error: string | null;
}

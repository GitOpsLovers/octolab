import { Template, TemplateForListing } from '@octolab/domain';

/**
 * Templates repository.
 */
export interface TemplatesRepository {
    /**
     * Get all templates.
     *
     *  @returns All templates.
     */
    getAll: () => Promise<TemplateForListing[]>;

    /**
     * Get template by id.
     *
     * @param id Template id.
     *
     * @returns Template.
     */
    getOne: (id: string) => Promise<Template>;
}

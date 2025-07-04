import { Template } from '../models/template.models';

/**
 * Templates repository.
 */
export interface TemplatesRepository {
    /**
     * Get all templates.
     *
     *  @returns All templates.
     */
    getAll: () => Promise<Template[]>;

    /**
     * Get template by id.
     *
     * @param id Template id.
     *
     * @returns Template.
     */
    getOne: (id: string) => Promise<Template>;
}

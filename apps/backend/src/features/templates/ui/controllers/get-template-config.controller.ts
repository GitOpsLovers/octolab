import { Request, Response } from 'express';

import { getTemplateConfigUseCase } from '@features/templates/application/get-template-config.use-case';

/**
 * Get template configuration controller.
 */
export function getTemplateConfigController(req: Request, res: Response): void {
    const template = req.params.template;
    const config = getTemplateConfigUseCase(template);

    res.json(config);
}

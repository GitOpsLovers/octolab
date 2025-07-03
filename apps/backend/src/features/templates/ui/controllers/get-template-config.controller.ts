import { Request, Response } from 'express';

import { getTemplateConfigUseCase } from '../../application/get-template-config.use-case';

/**
 * Get template configuration controller.
 */
export function getTemplateConfigController(req: Request, res: Response): void {
    const templateId = req.params.templateId;
    const config = getTemplateConfigUseCase(templateId);

    res.json(config);
}

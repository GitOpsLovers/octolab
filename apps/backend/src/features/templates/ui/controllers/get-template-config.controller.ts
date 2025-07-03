import { Request, Response } from 'express';

import { getTemplateConfigUseCase } from '../../application/get-template-config.use-case';

/**
 * Get template configuration controller.
 */
export async function getTemplateConfigController(req: Request, res: Response): Promise<void> {
    const templateId = req.params.templateId;
    const config = await getTemplateConfigUseCase(templateId);

    res.json(config);
}

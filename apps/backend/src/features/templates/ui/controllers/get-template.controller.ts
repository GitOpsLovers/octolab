import { Request, Response } from 'express';

import { getTemplateByIdUseCase } from '../../application/get-template-by-id.use-case';

/**
 * Get template by Id controller.
 */
export async function getTemplateByIdController(req: Request, res: Response): Promise<void> {
    const templateId = req.params.templateId;
    const template = await getTemplateByIdUseCase(templateId);

    res.json(template);
}

import { Request, Response } from 'express';

import { getTemplatesUseCase } from '../../application/get-templates.use-case';

/**
 * Get templates controller.
 */
export async function getTemplatesController(req: Request, res: Response): Promise<void> {
    const templates = await getTemplatesUseCase();

    res.json(templates);
}

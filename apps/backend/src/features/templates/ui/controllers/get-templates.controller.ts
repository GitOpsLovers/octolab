import { Request, Response } from 'express';

import { getTemplatesUseCase } from '../../application/get-templates.use-case';

/**
 * Get templates controller.
 */
export function getTemplatesController(req: Request, res: Response): void {
    const templates = getTemplatesUseCase();

    res.json(templates);
}

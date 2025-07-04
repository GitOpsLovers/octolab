import { Request, Response } from 'express';

import { getWorkflowConfigUseCase } from '../../application/get-workflow-config.use-case';

/**
 * Get workflow configuration controller.
 */
export async function getWorkflowConfigController(req: Request, res: Response): Promise<void> {
    const templateId = req.params.templateId;
    const config = await getWorkflowConfigUseCase(templateId);

    res.json(config);
}

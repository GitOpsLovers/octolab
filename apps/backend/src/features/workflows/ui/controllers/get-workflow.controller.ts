import { Request, Response } from 'express';

import { getWorkflowByIdUseCase } from '../../application/get-workflow-by-id.use-case';
import { workflowsSupabaseDatabaseRepository } from '../../infrastructure/database/workflows-supabase-db.repository';

/**
 * Get workflow by Id controller.
 */
export async function getWorkflowByIdController(req: Request, res: Response): Promise<void> {
    const workflowId = req.params.workflowId;
    const workflow = await getWorkflowByIdUseCase(workflowsSupabaseDatabaseRepository, workflowId);

    res.json(workflow);
}

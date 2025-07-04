import { Request, Response } from 'express';

import { getWorkflowsUseCase } from '../../application/get-workflows.use-case';
import { workflowsSupabaseDatabaseRepository } from '../../infrastructure/database/workflows-supabase-db.repository';

/**
 * Get workflows controller.
 */
export async function getWorkflowsController(req: Request, res: Response): Promise<void> {
    const workflows = await getWorkflowsUseCase(workflowsSupabaseDatabaseRepository);

    res.json(workflows);
}

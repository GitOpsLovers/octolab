import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getWorkflowsUseCase } from '../../application/get-workflows.use-case';
import { workflowsSupabaseDatabaseRepository } from '../../infrastructure/database/workflows-supabase-db.repository';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';

/**
 * Get workflows controller.
 */
export async function getWorkflowsController(req: Request, res: Response): Promise<void> {
    const userId = req.user.identities?.[0].user_id;

    try {
        const workflows = await getWorkflowsUseCase(workflowsSupabaseDatabaseRepository, userId);

        res.status(StatusCodes.OK).json(workflows);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Create workflow');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error creating workflow',
            error: (error as Error).message,
        });
    }
}

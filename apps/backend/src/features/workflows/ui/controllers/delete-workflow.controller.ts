import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { deleteWorkflowUseCase } from '../../application/delete-workflow.use-case';
import { workflowsSupabaseDatabaseRepository } from '../../infrastructure/database/workflows-supabase-db.repository';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';

/**
 * Delete workflow controller
 */
export async function deleteWorkflowController(req: Request, res: Response): Promise<void> {
    try {
        const workflowId = req.params.workflowId;

        await deleteWorkflowUseCase(workflowsSupabaseDatabaseRepository, workflowId);

        res.status(StatusCodes.OK).json({ message: 'Workflow deleted successfully' });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Create workflow');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error creating workflow',
            error: (error as Error).message,
        });
    }
}

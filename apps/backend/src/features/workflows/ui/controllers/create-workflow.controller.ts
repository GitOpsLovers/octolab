import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createWorkflowUseCase } from '../../application/create-workflow.use-case';
import { workflowsSupabaseDatabaseRepository } from '../../infrastructure/database/workflows-supabase-db.repository';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';

/**
 * Create workflow controller
 */
export async function createWorkflowController(req: Request, res: Response): Promise<void> {
    const createDto = req.body;

    try {
        const workflow = await createWorkflowUseCase(workflowsSupabaseDatabaseRepository, createDto);

        res.status(StatusCodes.CREATED).json({ message: 'Workflow created', workflow });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Create workflow');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error creating workflow',
            error: (error as Error).message,
        });
    }
}

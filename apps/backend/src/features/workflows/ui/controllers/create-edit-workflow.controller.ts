import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createWorkflowUseCase } from '../../application/create-workflow.use-case';
import { workflowsSupabaseDatabaseRepository } from '../../infrastructure/database/workflows-supabase-db.repository';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { getWorkflowByIdUseCase } from '@features/workflows/application/get-workflow-by-id.use-case';
import { updateWorkflowUseCase } from '@features/workflows/application/update-workflow.use-case';

/**
 * Create or edit workflow controller
 */
export async function createOrEditWorkflowController(req: Request, res: Response): Promise<void> {
    const rquestData = req.body;
    const userId = req.user.id;

    try {
        const existingWorkflow = await getWorkflowByIdUseCase(workflowsSupabaseDatabaseRepository, rquestData.id);

        if (existingWorkflow) {
            const workflow = await updateWorkflowUseCase(workflowsSupabaseDatabaseRepository, rquestData, userId);

            res.status(StatusCodes.OK).json({ message: 'Workflow updated', workflow });
            return;
        }

        const workflow = await createWorkflowUseCase(workflowsSupabaseDatabaseRepository, rquestData, userId);

        res.status(StatusCodes.CREATED).json({ message: 'Workflow created', workflow });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Create workflow');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error creating workflow',
            error: (error as Error).message,
        });
    }
}

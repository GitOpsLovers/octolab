import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getActionsUseCase } from '../../application/get-actions.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';

/**
 * Get actions controller.
 */
export async function getActionsController(req: Request, res: Response): Promise<void> {
    try {
        const actions = await getActionsUseCase();

        res.status(StatusCodes.OK).json(actions);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Get actions');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error getting actions',
            error: (error as Error).message,
        });
    }
}

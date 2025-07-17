import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getTriggersUseCase } from '../../application/get-triggers.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';

/**
 * Get triggers controller.
 */
export async function getTriggersController(req: Request, res: Response): Promise<void> {
    try {
        const triggers = await getTriggersUseCase();

        res.status(StatusCodes.OK).json(triggers);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Get triggers');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error getting triggers',
            error: (error as Error).message,
        });
    }
}

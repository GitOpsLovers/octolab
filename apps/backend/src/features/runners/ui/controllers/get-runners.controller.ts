import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getRunnersUseCase } from '../../application/get-runners.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';

/**
 * Get runners controller.
 */
export async function getRunnersController(req: Request, res: Response): Promise<void> {
    try {
        const runners = await getRunnersUseCase();

        res.status(StatusCodes.OK).json(runners);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Get runners');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error getting runners',
            error: (error as Error).message,
        });
    }
}

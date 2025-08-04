import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getTemplatesUseCase } from '../../application/get-templates.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Get templates controller.
 */
export const getTemplatesController: RequestHandler = async (req, res) => {
    try {
        const templates = await getTemplatesUseCase();

        res.status(StatusCodes.OK).json(templates);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Get templates controller');
        handleError(error as Error, res);
    }
};

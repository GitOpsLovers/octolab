import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Get current user controller
 *
 * @param req Request
 * @param res Response
 */
export const createUserController: RequestHandler = (req, res) => {
    try {
        console.log('Creating user...');
        console.log('Request body:', req.body);

        res.status(StatusCodes.OK).json({ message: 'User created successfully' });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Create user controller');

        handleError(error as Error, res);
    }
};

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createUserUseCase } from '../../application/create-user.use-case';
import { usersSupabaseDatabaseRepository } from '../../infrastructure/database/user-supabase-db.repository';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Get current user controller
 *
 * @param req Request
 * @param res Response
 */
export const createUserController: RequestHandler = async (req, res) => {
    try {
        if (req.body?.userId === undefined || req.body?.provider === undefined) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'userId and provider are required' });
            return;
        }

        await createUserUseCase(usersSupabaseDatabaseRepository, req.body);

        res.status(StatusCodes.OK).json({ message: 'User created successfully' });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Create user controller');

        handleError(error as Error, res);
    }
};

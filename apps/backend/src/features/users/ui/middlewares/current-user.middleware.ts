import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getCurrentUserIdUseCase } from '../../application/get-current-user-id.use-case';
import { getUserByIdUseCase } from '../../application/get-user-by-id.use-case';
import { usersAuth0IdpRepository } from '../../infrastructure/auth0/users-auth0.idp.repository';

import { getAuth0ManagementClient } from '@core/infrastructure/auth0/auth0-idp.client';
import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Current user middleware
 */
export async function currentUserMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const auth0Id = getCurrentUserIdUseCase(req);

        if (!auth0Id) {
            appLogger.error('Unauthorized: missing user ID', 'Current user middleware');
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: missing user ID' });
            return;
        }

        const idpClient = await getAuth0ManagementClient();
        const repository = usersAuth0IdpRepository(idpClient);
        const user = await getUserByIdUseCase(repository, auth0Id);

        if (!user) {
            appLogger.error(`User not found with id: ${auth0Id}`, 'Current user middleware');
            res.status(StatusCodes.NOT_FOUND).json({ message: `User not found with id: ${auth0Id}` });
            return;
        }

        (req as any).user = user;

        next();
    } catch (error: unknown) {
        appLogger.error(`Error gettings current user: ${(error as Error).message}`, 'Current user middleware');

        handleError(error as Error, res);
    }
}

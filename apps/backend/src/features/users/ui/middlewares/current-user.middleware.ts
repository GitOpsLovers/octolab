import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getCurrentUserIdUseCase } from '../../application/get-current-user-id.use-case';
import { getUserByIdFromIdpUseCase } from '../../application/get-user-by-id-from-idp.use-case';
import { getUserByIdpIdFromDatabaseUseCase } from '../../application/get-user-by-idp-id-on-database.use-case';
import { usersAuth0IdpRepository } from '../../infrastructure/auth0/users-auth0.idp.repository';
import { usersSupabaseDatabaseRepository } from '../../infrastructure/database/user-supabase-db.repository';

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

        // Get user from Identity Provider
        const idpClient = await getAuth0ManagementClient();
        const repository = usersAuth0IdpRepository(idpClient);
        const idpUser = await getUserByIdFromIdpUseCase(repository, auth0Id);

        if (!idpUser) {
            appLogger.error(`User not found with id: ${auth0Id} on Identity Provider`, 'Current user middleware');
            res.status(StatusCodes.NOT_FOUND).json({ message: `User not found with id: ${auth0Id} on Identity Provider` });
            return;
        }

        // Get user from database
        const databaseUser = await getUserByIdpIdFromDatabaseUseCase(usersSupabaseDatabaseRepository, idpUser.user_id);

        if (!databaseUser) {
            appLogger.error(`User not found in database with id: ${idpUser.user_id}`, 'Current user middleware');
            res.status(StatusCodes.NOT_FOUND).json({ message: `User not found in database with id: ${idpUser.user_id}` });
            return;
        }

        (req as any).user = {
            id: databaseUser.id,
        };

        next();
    } catch (error: unknown) {
        appLogger.error(`Error gettings current user: ${(error as Error).message}`, 'Current user middleware');

        handleError(error as Error, res);
    }
}

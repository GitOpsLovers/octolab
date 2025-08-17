import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { deleteUserByIdFromIdpUseCase } from '../../application/delete-user-by-id-from-idp.use-case';
import { deleteUserByIdFromDatabaseUseCase } from '../../application/delete-user-by-id-on-database.use-case';
import { getCurrentUserIdUseCase } from '../../application/get-current-user-id.use-case';
import { getUserByIdFromIdpUseCase } from '../../application/get-user-by-id-from-idp.use-case';
import { getUserByIdpIdFromDatabaseUseCase } from '../../application/get-user-by-idp-id-on-database.use-case';
import { usersAuth0IdpRepository } from '../../infrastructure/auth0/users-auth0.idp.repository';
import { usersSupabaseDatabaseRepository } from '../../infrastructure/database/user-supabase-db.repository';

import { getAuth0ManagementClient } from '@core/infrastructure/auth0/auth0-idp.client';
import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Delete current user controller
 *
 * @param req Request
 * @param res Response
 */
export const deleteUserController: RequestHandler = async (req, res) => {
    try {
        const auth0Id = getCurrentUserIdUseCase(req);

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

        // Delete users from Database and Identity provider
        await deleteUserByIdFromIdpUseCase(repository, idpUser.user_id);
        await deleteUserByIdFromDatabaseUseCase(usersSupabaseDatabaseRepository, databaseUser.id);

        res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Delete user controller');

        handleError(error as Error, res);
    }
};

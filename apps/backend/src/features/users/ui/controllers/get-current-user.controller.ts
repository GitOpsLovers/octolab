import { User } from '@octolab/domain';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getCurrentUserIdUseCase } from '../../application/get-current-user-id.use-case';
import { getUserByIdFromIdpUseCase } from '../../application/get-user-by-id-from-idp.use-case';
import { getUserByIdpIdFromDatabaseUseCase } from '../../application/get-user-by-idp-id-on-database.use-case';
import { usersAuth0IdpRepository } from '../../infrastructure/auth0/users-auth0.idp.repository';
import { usersSupabaseDatabaseRepository } from '../../infrastructure/database/user-supabase-db.repository';

import { getAuth0ManagementClient } from '@core/infrastructure/auth0/auth0-idp.client';
import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';
import { getWorkflowsUseCase } from '@features/workflows/application/get-workflows.use-case';
import { workflowsSupabaseDatabaseRepository } from '@features/workflows/infrastructure/database/workflows-supabase-db.repository';

/**
 * Get current user controller
 *
 * @param req Request
 * @param res Response
 */
export const getCurrentUserController: RequestHandler = async (req, res) => {
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

        const workflows = await getWorkflowsUseCase(workflowsSupabaseDatabaseRepository, databaseUser.id);

        const authenticatedUser: User = {
            id: databaseUser.id,
            workflows: workflows.length,
            plan: 'free',
            picture: idpUser.picture,
        };

        res.status(StatusCodes.OK).json(authenticatedUser);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Current user controller');

        handleError(error as Error, res);
    }
};

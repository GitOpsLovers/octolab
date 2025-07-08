import { User } from '@octolab/domain';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getCurrentUserIdUseCase } from '../../application/get-current-user-id.use-case';
import { getUserByIdUseCase } from '../../application/get-user-by-id.use-case';
import { usersAuth0IdpRepository } from '../../infrastructure/auth0/users-auth0.idp.repository';

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

        // Get current user form Identity Provider
        const idpClient = await getAuth0ManagementClient();
        const idpRepository = usersAuth0IdpRepository(idpClient);
        const idpUser = await getUserByIdUseCase(idpRepository, auth0Id);

        const workflows = await getWorkflowsUseCase(workflowsSupabaseDatabaseRepository, idpUser.identities?.[0].user_id);

        const authenticatedUser: User = {
            id: idpUser.user_id,
            workflows: workflows.length,
        };

        res.status(StatusCodes.OK).json(authenticatedUser);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Current user controller');

        handleError(error as Error, res);
    }
};

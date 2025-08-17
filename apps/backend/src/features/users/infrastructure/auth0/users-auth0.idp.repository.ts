import { ManagementClient } from 'auth0';

import { UsersIdpRepository } from '../../domain/repositories/users-idp.repository';

import { Auth0Error, Auth0ErrorType } from '@core/infrastructure/auth0/auth0.error';

/**
 * Users Auth0 Identity Provider repository.
 */
export function usersAuth0IdpRepository(client: ManagementClient): UsersIdpRepository {
    return {
        getById: async (id) => {
            try {
                const idpUser = await client.users.get({ id });

                return idpUser.data;
            } catch (error: unknown) {
                throw new Auth0Error(`Failed to fetch user with id ${id}: ${(error as Error).message}`, Auth0ErrorType.AUTH0_CONNECTION_ERROR);
            }
        },
        deleteById: async (id) => {
            try {
                await client.users.delete({ id });
            } catch (error: unknown) {
                throw new Auth0Error(`Failed to delete user with id ${id}: ${(error as Error).message}`, Auth0ErrorType.AUTH0_CONNECTION_ERROR);
            }
        },
    };
}

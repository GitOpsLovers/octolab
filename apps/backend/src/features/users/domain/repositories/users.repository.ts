import { UserIdp } from '../models/user.models';

/**
 * Users Identity provider repository
 */
export interface UsersIdpRepository {
    /**
     * Get user by id from the identity provider
     *
     * @param id User id
     */
    getById: (id: string) => Promise<UserIdp>;
}

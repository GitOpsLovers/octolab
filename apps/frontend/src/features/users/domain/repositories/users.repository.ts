import { User } from '@octolab/domain';

/**
 * Users repository
 */
export interface UsersRepository {
    /**
     * Get current user
     *
     * @returns User
     */
    getCurrentUser: () => Promise<User>;
}

import type { User } from '@workflowerdev/domain';

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

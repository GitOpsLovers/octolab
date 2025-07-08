import { User } from '@octolab/domain';

import { UsersRepository } from '../domain/repositories/users.repository';

/**
 * Get current user use case
 *
 * @param repository Current user repository
 *
 * @returns User
 */
export function getCurrentUserUseCase(repository: UsersRepository): Promise<User> {
    return repository.getCurrentUser();
}

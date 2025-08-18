import { UsersRepository } from '../domain/repositories/users.repository';

/**
 * Delete current user use case
 *
 * @param repository Current user repository
 *
 * @returns User
 */
export function deleteCurrentUserUseCase(repository: UsersRepository): Promise<void> {
    return repository.deleteCurrentUser();
}

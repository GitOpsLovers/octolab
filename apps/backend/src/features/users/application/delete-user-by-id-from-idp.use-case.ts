import { UsersIdpRepository } from '../domain/repositories/users-idp.repository';

/**
 * Delete user by id from Identity provider use case
 *
 * @param repository Users Identity provider repository
 * @param userId User ID
 *
 * @returns User
 */
export function deleteUserByIdFromIdpUseCase(repository: UsersIdpRepository, userId: string): Promise<void> {
    return repository.deleteById(userId);
}

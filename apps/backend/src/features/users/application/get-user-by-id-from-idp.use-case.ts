import { UserIdp } from '../domain/models/user.models';
import { UsersIdpRepository } from '../domain/repositories/users-idp.repository';

/**
 * Get user by id from Identity provider use case
 *
 * @param repository Users Identity provider repository
 * @param userId User ID
 *
 * @returns User
 */
export function getUserByIdFromIdpUseCase(repository: UsersIdpRepository, userId: string): Promise<UserIdp> {
    return repository.getById(userId);
}

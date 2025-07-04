import { UserIdp } from '../domain/models/user.models';
import { UsersIdpRepository } from '../domain/repositories/users.repository';

/**
 * Get user by id use case
 *
 * @param repository Users repository
 * @param userId User ID
 *
 * @returns User
 */
export function getUserByIdUseCase(repository: UsersIdpRepository, userId: string): Promise<UserIdp> {
    return repository.getById(userId);
}

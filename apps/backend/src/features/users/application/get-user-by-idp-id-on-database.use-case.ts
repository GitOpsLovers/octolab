import { DatabaseUser } from '../domain/models/user.models';
import { UsersDatabaseRepository } from '../domain/repositories/users-db.repository';

/**
 * Get user by Identity provider Id from database use case
 *
 * @param repository Users Identity provider repository
 * @param idpId Identity provider ID
 *
 * @returns User
 */
export function getUserByIdpIdFromDatabaseUseCase(repository: UsersDatabaseRepository, idpId: string): Promise<DatabaseUser | null> {
    return repository.findByAuth0Id(idpId);
}

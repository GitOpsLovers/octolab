import { UsersDatabaseRepository } from '../domain/repositories/users-db.repository';

/**
 * Delete user by Id from database use case
 *
 * @param repository Users database repository
 * @param id User ID
 *
 * @returns User
 */
export function deleteUserByIdFromDatabaseUseCase(repository: UsersDatabaseRepository, id: string): Promise<void> {
    return repository.deleteById(id);
}

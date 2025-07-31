import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '../domain/dtos/create-user.dto';
import { DatabaseUser } from '../domain/models/user.models';
import { UsersDatabaseRepository } from '../domain/repositories/users-db.repository';

/**
 * Create user use case.
 *
 * @param repository Users database repository
 * @param data User data
 *
 * @returns Created user from the database
 */
export async function createUserUseCase(repository: UsersDatabaseRepository, data: any): Promise<DatabaseUser> {
    const createDto: CreateUserDto = {
        id: uuidv4(),
        auth0Id: data.userId,
        provider: data.provider,
        email: data.email,
    };

    return repository.create(createDto);
}

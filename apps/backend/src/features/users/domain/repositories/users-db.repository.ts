import { CreateUserDto } from '../dtos/create-user.dto';
import { DatabaseUser } from '../models/user.models';

/**
 * Users database repository.
 */
export interface UsersDatabaseRepository {
    /**
     * Create a new user.
     *
     * @param createDto User to create
     *
     * @returns Created user
     */
    create: (createDto: CreateUserDto) => Promise<DatabaseUser>;

    /**
     * Find a user by Auth0 ID.
     *
     * @param auth0Id Auth0 ID of the user
     *
     * @returns User if found, otherwise null
     */
    findByAuth0Id: (auth0Id: string) => Promise<DatabaseUser | null>;

    /**
     * Delete user by id
     *
     * @param id User id
     */
    deleteById: (id: string) => Promise<void>;
}

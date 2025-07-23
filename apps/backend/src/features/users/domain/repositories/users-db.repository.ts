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
}

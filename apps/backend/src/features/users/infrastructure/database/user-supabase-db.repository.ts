import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { DatabaseUser } from '../../domain/models/user.models';
import { UsersDatabaseRepository } from '../../domain/repositories/users-db.repository';

import { DatabaseError, DatabaseErrorType } from '@core/infrastructure/database/database.error';
import { getSupabaseClient } from '@core/infrastructure/database/supabase.client';
import { Database } from '@core/infrastructure/database/supabase.types';

type UserRow = Database['public']['Tables']['users']['Row'];

/**
 * Users Supabase database repository.
 */
export const usersSupabaseDatabaseRepository: UsersDatabaseRepository = {
    create: async (createDto: CreateUserDto): Promise<DatabaseUser> => {
        const supabase = getSupabaseClient();
        try {
            const { data, error } = (await supabase
                .from('users')
                .insert([
                    {
                        auth0_id: createDto.auth0Id,
                        provider: createDto.provider,
                    },
                ])
                .select()
                .single()) as unknown as { data: UserRow | null; error: Error };

            if (error || !data) throw new DatabaseError('Failed to save user', DatabaseErrorType.DATABASE_CONNECTION_ERROR);

            return {
                auth0Id: data.auth0_id,
                provider: data.provider,
            };
        } catch (error: unknown) {
            throw new DatabaseError(`Failed to save user: ${(error as Error).message}`, DatabaseErrorType.DATABASE_CONNECTION_ERROR);
        }
    },
};

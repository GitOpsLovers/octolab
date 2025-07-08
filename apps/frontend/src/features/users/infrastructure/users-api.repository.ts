import { User } from '@octolab/domain';

import { UsersRepository } from '../domain/repositories/users.repository';

/**
 * Users Api repository
 */
export const usersApiRepository = (token: string): UsersRepository => ({
    getCurrentUser: async (): Promise<User> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/current-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.json();
    },
});

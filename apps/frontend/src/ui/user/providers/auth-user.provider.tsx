'use client';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AuthUserContext } from '../contexts/auth-user.context';
import { useCurrentUser } from '../hooks/user.hooks';
import { AuthUserProviderProps } from '../models/auth-user-context.models';

import { getCurrentUserUseCase } from '@features/users/application/get-current-user.use-case';
import { User } from '@features/users/domain/models/users.models';
import { usersApiRepository } from '@features/users/infrastructure/users-api.repository';

/**
 * Authenticated user provider.
 */
export function AuthUserProvider({ children }: AuthUserProviderProps) {
    const router = useRouter();
    const { currentUser } = useCurrentUser();
    const [state, setState] = useState<{ authUser: User | null; authToken: string | null; userLoadError: Error | null }>({ authUser: null, authToken: null, userLoadError: null });

    const setAuthUser = (user: User | null) => {
        setState((prev) => ({ ...prev, authUser: user }));
    };

    useEffect(() => {
        // Only fetch user from Backend if current user is available (it means, the user is authenticated)
        if (currentUser) {
            const fetchUser = async () => {
                try {
                    const token = await getAccessToken();
                    const currentUserRepository = usersApiRepository(token);
                    const fetchedUser = await getCurrentUserUseCase(currentUserRepository);

                    setState({
                        authUser: fetchedUser,
                        authToken: token,
                        userLoadError: null,
                    });
                } catch (error) {
                    console.error('Error fetching current user:', error);

                    if (error instanceof Error && error.message.includes('The access token has expired')) {
                        window.location.href = '/auth/logout';
                    }

                    setState({
                        authUser: null,
                        authToken: null,
                        userLoadError: error as Error,
                    });
                }
            };

            fetchUser();
        }
    }, [router, currentUser]);

    return <AuthUserContext.Provider value={{ ...state, setAuthUser }}>{children}</AuthUserContext.Provider>;
}

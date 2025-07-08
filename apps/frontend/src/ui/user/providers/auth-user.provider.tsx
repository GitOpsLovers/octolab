'use client';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { User } from '@octolab/domain';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AuthUserContext } from '../contexts/auth-user.context';
import { AuthUserProviderProps } from '../models/auth-user-context.models';

import { getCurrentUserUseCase } from '@features/users/application/get-current-user.use-case';
import { usersApiRepository } from '@features/users/infrastructure/users-api.repository';

/**
 * Authenticated user provider.
 */
export function AuthUserProvider({ children }: AuthUserProviderProps) {
    const router = useRouter();
    const [state, setState] = useState<{
        authUser: User | null;
        authToken: string | null;
        userLoadError: Error | null;
        isLoading: boolean;
    }>({
        authUser: null,
        authToken: null,
        userLoadError: null,
        isLoading: true,
    });

    const setAuthUser = (user: User | null) => {
        setState((prev) => ({ ...prev, authUser: user }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await getAccessToken();

                if (!token) {
                    setState((prev) => ({ ...prev, isLoading: false }));
                    return;
                }

                const currentUserRepository = usersApiRepository(token);
                const fetchedUser = await getCurrentUserUseCase(currentUserRepository);

                setState({
                    authUser: fetchedUser,
                    authToken: token,
                    userLoadError: null,
                    isLoading: false,
                });
            } catch (error) {
                if (error instanceof Error && error.message.includes('The user does not have an active session.')) {
                    setState({
                        authUser: null,
                        authToken: null,
                        userLoadError: null,
                        isLoading: false,
                    });
                    return;
                }

                if (error instanceof Error && error.message.includes('The access token has expired')) {
                    window.location.href = '/auth/logout';
                    return;
                }

                console.error('Error fetching current user:', error);

                setState({
                    authUser: null,
                    authToken: null,
                    userLoadError: error as Error,
                    isLoading: false,
                });
            }
        };

        fetchUser();
    }, [router]);

    return <AuthUserContext.Provider value={{ ...state, setAuthUser }}>{children}</AuthUserContext.Provider>;
}

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
    const [state, setState] = useState<{
        authUser: User | null;
        authToken: string | null;
        userLoadError: Error | null;
        isLoading: boolean;
    }>({
        authUser: null,
        authToken: null,
        userLoadError: null,
        isLoading: true, // <-- Mejor empezar en true
    });

    const setAuthUser = (user: User | null) => {
        setState((prev) => ({ ...prev, authUser: user }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await getAccessToken();
                const currentUserRepository = usersApiRepository(token);
                const fetchedUser = await getCurrentUserUseCase(currentUserRepository);

                setState({
                    authUser: fetchedUser,
                    authToken: token,
                    userLoadError: null,
                    isLoading: false,
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
                    isLoading: false,
                });
            }
        };

        if (currentUser) {
            fetchUser();
        } else {
            // Si no hay currentUser (por ejemplo, no logueado), marcamos loading como false
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, [router, currentUser]);

    return <AuthUserContext.Provider value={{ ...state, setAuthUser }}>{children}</AuthUserContext.Provider>;
}

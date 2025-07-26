import { User } from '@octolab/domain';
import { ReactNode } from 'react';

/**
 * Authenticated user context value.
 */
export interface AuthUserContextValue {
    authUser: User | null;
    authToken: string | null;
    isLoading: boolean;
    userLoadError: Error | null;
    setAuthUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
}

/**
 * Properties of the AuthUserProvider
 */
export interface AuthUserProviderProps {
    children: ReactNode;
}

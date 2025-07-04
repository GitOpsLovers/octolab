import { ReactNode } from 'react';

import { User } from '@features/users/domain/models/users.models';

/**
 * Authenticated user context value.
 */
export interface AuthUserContextValue {
    authUser: User | null;
    authToken: string | null;
    setAuthUser: (user: User | null) => void;
}

/**
 * Properties of the AuthUserProvider
 */
export interface AuthUserProviderProps {
    children: ReactNode;
}

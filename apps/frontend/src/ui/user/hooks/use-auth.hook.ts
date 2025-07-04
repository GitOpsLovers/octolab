import { useContext } from 'react';

import { AuthUserContext } from '../contexts/auth-user.context';
import { AuthUserContextValue } from '../models/auth-user-context.models';

/**
 * Hook to consume the authenticated user from the context.
 *
 * @returns Authenticated user.
 */
export function useAuthUser(): AuthUserContextValue {
    const context = useContext(AuthUserContext);

    if (!context) {
        throw new Error('useAuthUser must be used within an AuthUserProvider');
    }

    return context;
}

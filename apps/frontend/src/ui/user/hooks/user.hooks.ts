import { useContext } from 'react';

import { CurrentUserContext } from '../contexts/user.context';

/**
 * Hook to use the user context
 *
 * @returns The user context
 */
export function useCurrentUser() {
    const context = useContext(CurrentUserContext);

    if (!context) {
        throw new Error('useCurrentUser must be used within a CurrentUserProvider');
    }

    return context;
}

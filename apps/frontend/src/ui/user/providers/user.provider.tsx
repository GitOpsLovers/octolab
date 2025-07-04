'use client';

import { User } from '@auth0/nextjs-auth0/types';
import { ReactNode } from 'react';

import { CurrentUserContext } from '../contexts/user.context';

interface CurrentUserProps {
    children: ReactNode;
    currentUser: User | null;
}

/**
 * Current user context provider
 */
export function CurrentUserProvider({ children, currentUser }: CurrentUserProps) {
    const value = { currentUser };

    return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}

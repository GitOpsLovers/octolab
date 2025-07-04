import { User } from '@auth0/nextjs-auth0/types';

/**
 * Current user context provider model
 */
export interface CurrentUserContextType {
    currentUser: User | null;
}

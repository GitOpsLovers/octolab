'use client';

import { createContext } from 'react';

import { AuthUserContextValue } from '../models/auth-user-context.models';

/**
 * Context that exposes the authenticated user to the application.
 */
export const AuthUserContext = createContext<AuthUserContextValue | undefined>(undefined);

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AuthenticationClient } from 'auth0';

/**
 * Auth0 Authentication Client
 */
export const auth0AuthClient = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN!,
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

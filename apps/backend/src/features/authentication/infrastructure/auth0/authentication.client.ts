import { auth } from 'express-oauth2-jwt-bearer';

/**
 * Auth0 authentication client.
 */
export const authClient = auth({
    issuerBaseURL: process.env.AUTH0_ISSUER,
    audience: process.env.AUTH0_AUDIENCE,
    tokenSigningAlg: 'RS256',
});

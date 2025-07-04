import { Auth0Client } from '@auth0/nextjs-auth0/server';

/**
 * Auth0 client.
 */
export const auth0Client = new Auth0Client({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    appBaseUrl: process.env.APP_BASE_URL,
    secret: process.env.AUTH0_SECRET,
    session: {
        cookie: {
            name: 'octolab_auth',
        },
    },
    authorizationParameters: {
        audience: process.env.AUTH0_AUDIENCE,
        scope: 'openid profile email',
    },
});

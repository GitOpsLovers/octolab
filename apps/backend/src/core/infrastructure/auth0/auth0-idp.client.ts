/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ManagementClient } from 'auth0';

import { auth0AuthClient } from './auth0-management-token.client';

/**
 * Obtain a ManagementClient ready to make authenticated requests.
 */
export async function getAuth0ManagementClient(): Promise<ManagementClient> {
    const { data: tokens } = await auth0AuthClient.oauth.clientCredentialsGrant({
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    });

    return new ManagementClient({
        domain: process.env.AUTH0_DOMAIN!,
        token: tokens.access_token,
    });
}

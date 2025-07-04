import { CookiesProvider } from 'next-client-cookies/server';
import { ReactNode } from 'react';

import { auth0Client } from '@features/authentication/infrastructure/auth0/client.auth0';
import { Header } from '@ui/layout/components/header.component';
import { CurrentUserProvider } from '@ui/user/providers/user.provider';

/**
 * Layout with header component.
 */
export default async function WithHeaderLayout({ children }: { children: ReactNode }) {
    const session = await auth0Client.getSession();
    const user = session?.user ?? null;

    return (
        <CurrentUserProvider currentUser={user}>
            <CookiesProvider>
                <Header />
                {children}
            </CookiesProvider>
        </CurrentUserProvider>
    );
}

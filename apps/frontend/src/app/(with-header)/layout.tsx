import { CookiesProvider } from 'next-client-cookies/server';
import { ReactNode } from 'react';

import { Header } from '@ui/layout/components/header.component';
import { AuthUserProvider } from '@ui/user/providers/auth-user.provider';

/**
 * Layout with header component.
 */
export default function WithHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <AuthUserProvider>
            <CookiesProvider>
                <Header />
                {children}
            </CookiesProvider>
        </AuthUserProvider>
    );
}

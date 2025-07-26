import { ReactNode } from 'react';

import { BetaBanner } from '@ui/layout/components/beta-banner.component';
import { Header } from '@ui/layout/components/header.component';
import { AuthUserProvider } from '@ui/user/providers/auth-user.provider';

/**
 * Layout with header component.
 */
export default function WithHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <AuthUserProvider>
            <BetaBanner />
            <Header />
            {children}
        </AuthUserProvider>
    );
}

import { CookiesProvider } from 'next-client-cookies/server';
import { ReactNode } from 'react';

import { Header } from '@ui/layout/components/header.component';

export default function WithHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <CookiesProvider>
            <Header />
            {children}
        </CookiesProvider>
    );
}

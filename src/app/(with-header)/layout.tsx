import { ReactNode } from 'react';

import Header from '@ui/layout/components/header.component';

export default function WithHeaderLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

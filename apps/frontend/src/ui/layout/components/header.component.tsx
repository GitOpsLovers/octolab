import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { auth0Client } from '@features/authentication/infrastructure/auth0/client.auth0';

/**
 * Header component
 */
export async function Header(): Promise<ReactNode> {
    const session = await auth0Client.getSession();
    const headerList = await headers();
    const pathname = headerList.get('x-current-path');

    return (
        <header className="w-full bg-surface px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 relative group">
                <Image src="/header-logo-sm.png" alt="OctoLab logo" width={32} height={32} className="inline-block" />
                <div className="flex items-center relative">
                    <span className="text-2xl font-bold text-primary ml-1">OctoLab</span>
                    <span className="absolute -top-1 -right-9 bg-secondary text-surface text-[8px] md:text-xs font-semibold px-1 py-0.2 rounded-full shadow-md">Beta</span>
                </div>
            </Link>

            <nav className="flex gap-6 items-center">
                <Link href="/templates" className="text-muted hover:text-primary transition font-medium">
                    Templates
                </Link>
                {!session && (
                    <a
                        href={`/auth/login?returnTo=${pathname}`}
                        className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-surface transition"
                    >
                        Sign in
                    </a>
                )}
                {session && (
                    <Link href="/my-workflows" className="text-muted hover:text-primary transition font-medium">
                        My Workflows
                    </Link>
                )}
                {session && (
                    <a href="/auth/logout" className="text-muted hover:text-primary transition font-medium">
                        Logout
                    </a>
                )}
            </nav>
        </header>
    );
}

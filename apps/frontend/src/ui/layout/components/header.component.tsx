import { headers } from 'next/headers';
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
            <Link href="/" className="text-2xl font-bold text-primary transition">
                OctoLab
            </Link>

            <nav className="flex gap-6 items-center">
                <Link href="/templates" className="text-muted hover:text-primary transition font-medium">
                    Templates
                </Link>
                {!session && (
                    <Link
                        href={`/auth/login?returnTo=${pathname}`}
                        className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-surface transition"
                    >
                        Sign in
                    </Link>
                )}
                {session && (
                    <Link href="/my-workflows" className="text-muted hover:text-primary transition font-medium">
                        My Workflows
                    </Link>
                )}
                {session && (
                    <Link href="/auth/logout" className="text-muted hover:text-primary transition font-medium">
                        Logout
                    </Link>
                )}
            </nav>
        </header>
    );
}

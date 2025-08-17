'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@ui/shared/components/dropdown';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

/**
 * Header component
 */
export function Header(): ReactNode {
    const { authUser } = useAuthUser();
    const pathname = usePathname();
    const [avatarError, setAvatarError] = useState(false);

    const avatarSrc = !avatarError && authUser?.picture ? authUser.picture : '/img/user/avatar-placeholder.png';

    return (
        <header className="w-full bg-surface px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 relative group">
                <Image src="/img/logo/header-logo-sm.png" alt="OctoLab logo" width={400} height={284} className="inline-block" style={{ width: 'auto', height: '32px' }} />
                <div className="flex items-center relative">
                    <span className="text-2xl font-bold text-primary ml-1 hidden md:block">OctoLab</span>
                    <span className="absolute -top-1 -right-9 bg-secondary text-surface text-[8px] md:text-xs font-semibold px-1 py-0.5 rounded-full shadow-md hidden md:block">
                        Beta
                    </span>
                </div>
            </Link>

            <nav className="flex gap-6 items-center">
                <Link href="/templates" className="text-muted hover:text-primary transition font-medium">
                    Templates
                </Link>

                {!authUser && (
                    <a
                        href={`/auth/login?returnTo=${encodeURIComponent(pathname ?? '/')}`}
                        data-umami-event="[Header] Sign in click"
                        className="px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-surface transition"
                    >
                        Sign in
                    </a>
                )}

                {authUser && (
                    <>
                        <Link href="/my-workflows" className="text-muted hover:text-primary transition font-medium">
                            My Workflows
                        </Link>

                        <Dropdown>
                            <DropdownTrigger className="ml-2">
                                <span className="inline-flex items-center justify-center rounded-full ring-1 ring-border hover:ring-primary transition cursor-pointer">
                                    <Image
                                        src={avatarSrc}
                                        alt={authUser?.name ? `${authUser.name}'s avatar` : 'User avatar'}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                        onError={() => {
                                            setAvatarError(true);
                                        }}
                                    />
                                </span>
                            </DropdownTrigger>

                            <DropdownContent align="end">
                                <DropdownItem href="/profile" data-umami-event="[Header] Menu -> Profile">
                                    Profile
                                </DropdownItem>
                                <DropdownItem href="/auth/logout" data-umami-event="[Header] Menu -> Logout">
                                    Logout
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </>
                )}
            </nav>
        </header>
    );
}

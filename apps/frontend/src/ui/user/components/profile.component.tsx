'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

import { useAuthUser } from '../hooks/use-auth.hook';

import { deleteCurrentUserUseCase } from '@features/users/application/delete-current-user.use-case';
import { usersApiRepository } from '@features/users/infrastructure/users-api.repository';

/**
 * Profile component
 */
export function Profile(): ReactNode {
    const router = useRouter();
    const { authUser, isLoading, authToken } = useAuthUser();
    const [deleting, setDeleting] = useState(false);

    /**
     * Delete accont
     */
    const handleDelete = async () => {
        if (!authToken) return toast.error('You must be signed in to delete your account');

        try {
            const repository = usersApiRepository(authToken);
            await deleteCurrentUserUseCase(repository);

            toast.success('Account deleted. Goodbye 👋');

            router.replace('/auth/logout');
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong');
        } finally {
            setDeleting(false);
        }
    };

    /**
     * Show loading profile
     */
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted">
                <FaSpinner className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Loading profile…</p>
            </div>
        );
    }

    /**
     * If no user is authenticated
     */
    if (!authUser) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted">
                <p>No user session found.</p>
                <Link
                    href="/auth/login?returnTo=/profile"
                    className="mt-4 px-4 py-2 rounded-[var(--radius-md)] border border-primary text-primary font-semibold hover:bg-primary hover:text-surface transition"
                >
                    Sign in
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-text text-center mb-10">Profile</h1>

            <header className="flex items-center gap-4 mb-8">
                <Image
                    src={authUser.picture || '/img/user/avatar-placeholder.png'}
                    alt={authUser.name ? `${authUser.name} avatar` : 'User avatar'}
                    width={72}
                    height={72}
                    className="rounded-full ring-1 ring-border"
                />
                <div>
                    <p className="text-xl font-semibold text-text">{authUser.name || '—'}</p>
                    <p className="text-sm text-muted">{authUser.email || '—'}</p>
                </div>
            </header>

            <section className="grid gap-8">
                <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow">
                    <h2 className="text-lg font-semibold text-text mb-4">Account details</h2>

                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <dt className="text-xs uppercase tracking-wide text-muted">Name</dt>
                            <dd className="text-text">{authUser.name || '—'}</dd>
                        </div>
                        <div className="space-y-1">
                            <dt className="text-xs uppercase tracking-wide text-muted">Email</dt>
                            <dd className="text-text">{authUser.email || '—'}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/my-workflows"
                            className="px-4 py-2 rounded-[var(--radius-md)] border border-primary text-primary font-semibold hover:bg-primary hover:text-surface transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                            My Workflows
                        </Link>
                        <Link
                            href="/auth/logout"
                            className="px-4 py-2 rounded-[var(--radius-md)] border border-border text-muted font-semibold hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow">
                    <h3 className="text-lg font-semibold text-text">Danger zone</h3>
                    <p className="text-sm text-muted mt-1">Deleting your account removes your user record and OctoLab data. This action is irreversible.</p>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        aria-busy={deleting}
                        className="mt-4 px-4 py-2 rounded-[var(--radius-md)] border font-semibold border-red-500 text-red-400 hover:bg-red-500/10 disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                        data-umami-event="[Account] Delete account"
                    >
                        {deleting ? 'Deleting…' : 'Delete account'}
                    </button>
                </div>
            </section>
        </main>
    );
}

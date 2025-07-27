import Image from 'next/image';
import Link from 'next/link';

import { auth0Client } from '@features/authentication/infrastructure/auth0/client.auth0';

/**
 * Home page component.
 */
export default async function Home() {
    const session = await auth0Client.getSession();

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex flex-col items-center justify-center flex-grow px-4">
                <div className="relative flex items-end gap-2 mb-6">
                    <Image src="/header-logo-sm.png" alt="OctoLab logo" width={300} height={40} className="inline-block" />

                    <span className="text-7xl md:text-8xl font-bold text-primary ml-4 relative">
                        OctoLab
                        <span className="absolute -top-3 -right-10 bg-secondary text-surface text-sm md:text-base font-bold px-3 py-1 rounded-full shadow-lg">Beta</span>{' '}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-text">
                    {session?.user ? 'Continue building your workflows' : 'Create your GitHub Actions Workflow in seconds'}
                </h1>

                <p className="text-lg text-text-muted text-center max-w-xl mb-8">
                    {session?.user
                        ? 'Access your workflows and keep iterating. Manage, edit, and optimize your CI/CD seamlessly.'
                        : 'Generate ready-to-use YAML files without the need to write anything by hand. Get started now and speed up your CI/CD.'}
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                    <Link
                        href="/templates"
                        className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold text-center hover:bg-primary-hover transition"
                        data-umami-event="[Home] Create workflow click"
                    >
                        Create Workflow
                    </Link>
                    {session?.user && (
                        <Link
                            href="/my-workflows"
                            className="bg-secondary text-surface px-6 py-3 rounded-md text-lg font-semibold text-center hover:bg-secondary-hover transition"
                            data-umami-event="[Home] Go to My Workflows click"
                        >
                            Go to My Workflows
                        </Link>
                    )}
                </div>
            </main>

            <footer className="w-full flex justify-center gap-6 py-4 bg-transparent text-text-muted text-md">
                <Link href="/about" className="hover:text-primary transition">
                    About us
                </Link>
                <Link href="/contact" className="hover:text-primary transition">
                    Contact
                </Link>
                <Link href="/privacy" className="hover:text-primary transition">
                    Privacy policy
                </Link>
                <Link href="/terms" className="hover:text-primary transition">
                    Terms of use
                </Link>
            </footer>
        </div>
    );
}

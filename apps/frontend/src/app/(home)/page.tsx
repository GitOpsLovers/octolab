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
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-text">
                    {session?.user ? 'Continue building your workflows' : 'Create your GitHub Actions Workflow in seconds'}
                </h1>

                <p className="text-lg text-text-muted text-center max-w-xl mb-8">
                    {session?.user
                        ? 'Access your workflows and keep iterating. Manage, edit, and optimize your CI/CD seamlessly.'
                        : 'Generate ready-to-use YAML files without the need to write anything by hand. Get started now and speed up your CI/CD.'}
                </p>

                <Link
                    href={session?.user ? '/my-workflows' : '/templates'}
                    className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold text-center hover:bg-primary-hover transition"
                >
                    {session?.user ? 'Go to My Workflows' : 'Create Workflow'}
                </Link>
            </main>

            <footer className="w-full flex justify-center gap-6 py-4 bg-transparent text-text-muted text-md">
                <Link href="/about" className="hover:text-primary transition">
                    About us
                </Link>
                <Link href="/contact" className="hover:text-primary transition">
                    Contact
                </Link>
            </footer>
        </div>
    );
}

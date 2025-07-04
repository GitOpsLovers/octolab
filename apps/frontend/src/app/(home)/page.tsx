import Link from 'next/link';

/**
 * Home page component.
 */
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex flex-col items-center justify-center flex-grow px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-text">Create your GitHub Actions Workflow in seconds</h1>
                <p className="text-lg text-text-muted text-center max-w-xl mb-8">
                    Generate ready-to-use YAML files without the need to write anything by hand. Get started now and speed up your CI/CD.
                </p>
                <Link href="/templates" className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold text-center hover:bg-primary-hover transition">
                    Create Workflow
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

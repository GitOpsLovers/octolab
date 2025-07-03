import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-text">Create your GitHub Actions Workflow in seconds</h1>
            <p className="text-lg text-text-muted text-center max-w-xl mb-8">
                Generate ready-to-use YAML files without the need to write anything by hand. Get started now and speed up your CI/CD.
            </p>
            <Link href="/templates" className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold text-center hover:bg-primary-hover transition">
                Create Workflow
            </Link>
        </main>
    );
}

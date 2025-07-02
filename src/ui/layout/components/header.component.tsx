import Link from 'next/link';

/**
 * Header component
 */
export default function Header() {
    return (
        <header className="w-full bg-surface shadow px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
                Workflow Generator
            </Link>

            <nav className="flex gap-4">
                <Link href="/templates" className="text-gray-300 hover:text-white transition">
                    Plantillas
                </Link>
                {/* Aquí puedes añadir más links */}
            </nav>
        </header>
    );
}

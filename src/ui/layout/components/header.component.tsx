import Link from 'next/link';

/**
 * Header component
 */
export function Header() {
    return (
        <header className="w-full bg-surface px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary transition">
                OctoLab
            </Link>

            <nav className="flex gap-6">
                <Link href="/templates" className="text-muted hover:text-primary transition font-medium">
                    Templates
                </Link>
                <Link href="/about" className="text-muted hover:text-primary transition font-medium">
                    About Us
                </Link>
                <Link href="/contact" className="text-muted hover:text-primary transition font-medium">
                    Contact
                </Link>
            </nav>
        </header>
    );
}

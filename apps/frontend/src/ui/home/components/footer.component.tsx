'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Footer component
 */
export function Footer(): ReactNode {
    return (
        <footer className="w-full bg-background border-t border-border px-4 py-10 text-text-muted text-sm">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
                <div className="flex items-center gap-2">
                    <span>© {new Date().getFullYear()} OctoLab. All rights reserved.</span>
                </div>

                <nav className="flex gap-4 flex-wrap justify-center sm:justify-end">
                    <Link href="/about" className="hover:text-text transition">
                        About
                    </Link>
                    <Link href="/how-to" className="hover:text-text transition">
                        How it works
                    </Link>
                    <Link href="/contact" className="hover:text-text transition">
                        Contact
                    </Link>
                    <Link href="/privacy" className="hover:text-text transition">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-text transition">
                        Terms of use
                    </Link>
                </nav>
            </div>
        </footer>
    );
}

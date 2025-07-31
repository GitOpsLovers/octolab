'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Not found page.
 */
export default function NotFoundPage() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-3 text-center sm:text-left">
                    <Image src="/img/pages/not-found.png" alt="Page not found" width={260} height={36} priority className="w-[180px] sm:w-[260px] h-auto" />
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-text leading-tight">Oops! Page not found.</h1>

                <p className="text-lg text-text-muted max-w-xl">
                    The page you are looking for doesn&apos;t exist or has been moved. But don&apos;t worry, you can always return to the homepage or continue building workflows.
                </p>

                <div className="flex gap-4 mt-4 flex-wrap justify-center">
                    <Link href="/" className="bg-primary text-white px-8 py-3 md:px-12 md:py-4 rounded-md text-lg md:text-xl font-semibold hover:bg-primary-hover transition">
                        Go to homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}

import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { toasterConfig } from '@ui/layout/configs/toaster.config';

const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
});

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'OctoLab',
    description: 'Create your GitHub Actions Workflow in seconds',
};

/**
 * Root layout component
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${poppins.variable} antialiased overflow-y-auto bg-background`}>
                {children}
                <Toaster position="top-right" toastOptions={toasterConfig} />
            </body>
        </html>
    );
}

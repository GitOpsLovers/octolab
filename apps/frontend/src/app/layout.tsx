import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from 'react-hot-toast';

import { Feedback } from '@ui/layout/components/feedback.component';
import { UmamiAnalytics } from '@ui/layout/components/umami.component';
import { toasterConfig } from '@ui/layout/configs/toaster.config';

import './globals.css';

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
    description: 'The easiest way to build GitHub workflows',
};

/**
 * Root layout component
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isLocal = process.env.NODE_ENV === 'development';

    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${poppins.variable} antialiased overflow-y-auto bg-background`}>
                <CookiesProvider>
                    {children}
                    <Feedback />
                    <Toaster position="top-right" toastOptions={toasterConfig} />
                    {!isLocal && <UmamiAnalytics />}
                </CookiesProvider>
            </body>
        </html>
    );
}

import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import Head from 'next/head';
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

/**
 * Global metadata for the application
 */
export const metadata: Metadata = {
    title: 'OctoLab',
    description: 'The easiest way to build GitHub workflows',
    applicationName: 'OctoLab | The easiest way to build GitHub workflows',
    alternates: {
        canonical: 'https://www.octolab.app',
    },
    keywords: [
        // Clear intent to build streams with GitHub Actions
        'github actions builder',
        'github actions editor',
        'create github actions visually',
        'github actions visual editor',
        'github actions drag and drop',
        'github actions yaml generator',
        'github actions no-code workflows',

        // Broad but relevant use cases
        'github workflows',
        'github automation',
        'github ci/cd',
        'ci/cd automation',
        'build pipelines',

        // Terms that open the door to broader DevOps traffic
        'devops tools',
        'visual workflow builder',
        'workflow automation tools',
        'yaml workflow generator',

        // Branding
        'octolab',
    ],
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
            <Head>
                <link rel="canonical" href="https://www.octolab.app" key="canonical" />
            </Head>
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

import { Metadata } from 'next';
import Head from 'next/head';

import { ProposeTemplateForm } from '@ui/propose-template/components/propose-form.component';

export const metadata: Metadata = {
    title: 'OctoLab | Propose a Template',
    description: 'Suggest a new GitHub Actions template and help expand the OctoLab library. Contribute with your favorite CI/CD setup or use case.',
    keywords: [
        'propose github actions template',
        'submit github workflow',
        'contribute github actions',
        'share ci/cd workflow',
        'octolab contribute',
        'custom github actions',
        'devops community templates',
    ],
    alternates: {
        canonical: 'https://www.octolab.app/propose-template',
    },
};

/**
 * Propose temmplate page
 */
export default function ProposeTemplatesPage() {
    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.octolab.app/propose-template" key="canonical" />
            </Head>
            <main className="p-4 md:p-8">
                <ProposeTemplateForm />
            </main>
        </>
    );
}

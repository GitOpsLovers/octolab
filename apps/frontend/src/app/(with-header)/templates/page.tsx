import { Metadata } from 'next';
import Head from 'next/head';

import TemplatesListContainer from '@ui/templates/containers/templates-list.container';

export const metadata: Metadata = {
    title: 'GitHub Actions Templates | OctoLab',
    description: 'Explore a collection of GitHub Actions templates to automate workflows visually and easily.',
    alternates: {
        canonical: 'https://www.octolab.app/templates',
    },
    keywords: [
        'github actions templates',
        'ci/cd templates',
        'github workflows examples',
        'starter workflows github',
        'workflow templates github',
        'devops automation templates',
        'github ci/cd visual builder',
        'octolab templates',
        'visual github workflows',
    ],
};

/**
 * Templates page
 */
export default function TemplatesPage() {
    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.octolab.app/templates" key="canonical" />
            </Head>
            <main className="p-4 md:p-8">
                <TemplatesListContainer />
            </main>
        </>
    );
}

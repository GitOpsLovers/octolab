import type { Metadata } from 'next';

import TemplateContainer from '@ui/templates/containers/template.container';

export const metadata: Metadata = {
    title: 'Node.js Pull Request Verify | OctoLab',
    description: 'Production ready GitHub Actions workflow template that verifies Pull Requests in Node.js projects.',
    alternates: {
        canonical: 'https://www.octolab.app/templates/node-pr-verify',
    },
    keywords: [
        'node.js pull request verify',
        'github actions node ci',
        'node lint test build workflow',
        'pr checks node',
        'github workflows examples',
        'ci/cd templates',
        'visual github workflows',
        'octolab templates',
    ],
};

export default async function TemplateLandingPage({ params }: { params: Promise<{ template: string }> }) {
    const { template } = await params;

    return (
        <main className="px-4 md:px-8 py-10 md:py-16">
            <TemplateContainer templateId={template} />
        </main>
    );
}

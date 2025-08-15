import type { Metadata } from 'next';

import TemplateContainer from '@ui/templates/containers/template.container';

const COMMON_KWS = ['github workflows examples', 'ci/cd templates', 'visual github workflows', 'octolab templates'];
const META_BY_ID: Record<string, { title: string; description: string; keywords: string[] }> = {
    'node-pr-verify': {
        title: 'Node.js Pull Request Verify | OctoLab',
        description: 'Verify and ensure the quality of pull requests in a Node.js codebase with a production-ready GitHub Actions workflow.',
        keywords: ['node.js pull request verify', 'github actions node ci', 'node lint test build workflow', 'pr checks node'],
    },
    'nx-pr-verify': {
        title: 'NX Pull Request Verify | OctoLab',
        description:
            'Verify and ensure the quality of pull requests in an NX monorepo using “affected” commands. Only the projects impacted by the PR are linted, tested, and built against a configurable base branch.',
        keywords: ['nx pull request verify', 'nx affected', 'nx ci github actions', 'nx monorepo ci', 'pr checks nx', 'nx lint test build workflow'],
    },
    'npm-publish': {
        title: 'Publish to NPM | OctoLab',
        description:
            'Publish your package to npm automatically when changes are merged into a target branch. This template runs tests and builds first, then authenticates with a secure npm token to perform a clean, production-ready release.',
        keywords: ['npm publish', 'github actions npm', 'npm ci cd', 'pr checks npm'],
    },
};

/**
 * Generate metadata for the template page.
 */
export async function generateMetadata({ params }: { params: Promise<{ template: string }> }): Promise<Metadata> {
    const { template: id } = await params;
    const meta = META_BY_ID[id];

    const fallbackTitle =
        id
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ') + ' | OctoLab';

    return {
        title: meta?.title ?? fallbackTitle,
        description: meta?.description ?? 'Explore a production-ready GitHub Actions workflow template in OctoLab.',
        alternates: {
            canonical: `https://www.octolab.app/templates/${id}`,
        },
        keywords: [...(meta?.keywords ?? []), ...COMMON_KWS],
    };
}

/**
 * Template landing page component.
 */
export default async function TemplateLandingPage({ params }: { params: Promise<{ template: string }> }) {
    const { template } = await params;

    return (
        <main className="px-4 md:px-8 py-10 md:py-16">
            <TemplateContainer templateId={template} />
        </main>
    );
}

import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How It Works | OctoLab',
    description: 'Learn how OctoLab helps you build GitHub Actions workflows visually. Explore templates, drag & drop jobs, and generate production-ready CI/CD pipelines.',
    alternates: {
        canonical: 'https://www.octolab.app/how-to',
    },
    keywords: [
        'how octolab works',
        'github actions visual builder',
        'no-code github workflows',
        'ci/cd builder tutorial',
        'visual github actions editor',
        'drag and drop workflow builder',
        'github actions made easy',
        'workflow automation tutorial',
        'octolab how-to guide',
        'build github workflows visually',
    ],
};

/**
 * How It Works page
 */
export default function HowToPage() {
    const contactEmail = process.env.CONTACT_EMAIL;

    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.octolab.app/how-to" key="canonical" />
            </Head>
            <main className="p-8 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-12 mt-4 text-center">How OctoLab Works</h1>

                <div className="text-text-muted space-y-6 text-lg">
                    <p>
                        <strong className="text-text">OctoLab</strong> lets you design and manage <strong className="text-text">GitHub Actions</strong> workflows in a{' '}
                        <span className="text-primary font-semibold">visual, intuitive, and error-free</span> way. No need to write code or understand GitHub Actions syntax.
                    </p>

                    <h2 className="text-2xl font-semibold text-text mt-8">1. Start without signing in</h2>
                    <p>You can start designing a workflow without signing in. All the core editing features are available from the beginning so you can freely explore the tool.</p>

                    <h2 className="text-2xl font-semibold text-text">2. Save your progress anytime</h2>
                    <p>
                        If you want to save your workflow for later editing, just log in using your <span className="text-primary font-semibold">GitHub</span> or{' '}
                        <span className="text-primary font-semibold">Google</span> account. Once authenticated, your workflows will be stored in your personal OctoLab workspace.
                    </p>

                    <h2 className="text-2xl font-semibold text-text">3. Explore templates or start from scratch</h2>
                    <p>
                        Choose from{' '}
                        <Link href="/templates" className="text-primary hover:underline">
                            prebuilt templates
                        </Link>{' '}
                        tailored to different scenarios: PR checks, tests, builds, cloud deployments, and more. Or start with a blank canvas and create your own custom flow.
                    </p>

                    <h2 className="text-2xl font-semibold text-text">4. Design your workflow visually</h2>
                    <p>
                        Add jobs, steps, conditions, runners, actions, and commands using a <em>drag & drop</em> interface. Each block represents a piece of the flow and can be
                        configured easily through friendly, validated inputs.
                    </p>

                    <h2 className="text-2xl font-semibold text-text">5. See the generated code</h2>
                    <p>
                        As you build, OctoLab generates the corresponding GitHub Actions workflow in real time. You can view the code at any moment and see how your design
                        translates into an executable configuration.
                    </p>

                    <h2 className="text-2xl font-semibold text-text">6. Export or deploy</h2>
                    <p>
                        Once your workflow is ready, you can copy or download it to integrate manually into your repository. Soon, we’ll support{' '}
                        <span className="text-primary font-semibold">direct deploy via pull request</span> using GitHub integration.
                    </p>

                    <h2 className="text-2xl font-semibold text-text">7. Advanced customization</h2>
                    <p>OctoLab lets you tweak every detail: branch conditions, environment variables, Node versions, Docker images, build and test commands, and more.</p>

                    <h2 className="text-2xl font-semibold text-text">8. Beta phase</h2>
                    <p>
                        OctoLab is currently in <span className="text-primary font-semibold">beta</span>. We&apos;re actively collecting feedback and improving the product. Some
                        features may evolve or change based on user experience.
                    </p>

                    <p>
                        Got questions or suggestions? Reach out at{' '}
                        <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                            {contactEmail}
                        </a>{' '}
                        or check our{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                            privacy policy
                        </Link>{' '}
                        and{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            terms of use
                        </Link>
                        .
                    </p>

                    <p className="font-medium text-text">Thanks for using OctoLab to improve your pipelines. Automate more, write less! ⚙️🚀</p>
                </div>
            </main>
        </>
    );
}

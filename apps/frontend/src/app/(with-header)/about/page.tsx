import Link from 'next/link';

/**
 * About page
 */
export default function AboutPage() {
    const contactEmail = process.env.CONTACT_EMAIL;

    return (
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">About OctoLab</h1>

            <div className="text-text-muted space-y-6 text-lg">
                <p>
                    At <strong className="text-text">OctoLab</strong>, we believe that <span className="text-primary font-semibold">automation</span> is the key to unlock the
                    creative potential of development teams. That&apos;s why we created a platform that lets you design and manage <em>workflows</em> for{' '}
                    <strong className="text-text">GitHub Actions</strong> in a <span className="text-primary font-semibold">visual, simple and error-free</span> way.
                </p>

                <p>
                    Our mission is to <span className="text-primary font-semibold">democratize</span> CI/CD pipeline creation, eliminating the need to write YAML files manually.
                    With OctoLab, any developer — from junior to experienced DevOps — can generate production-ready workflows in minutes.
                </p>

                <p>
                    OctoLab also allows you to <span className="text-primary font-semibold">customize every aspect</span> of your workflow: runners, branch strategies, build and
                    test commands, security integrations, cloud deployments, and more. All from a <span className="text-primary font-semibold">clear and intuitive interface</span>.
                </p>

                <p>
                    We believe in a future where automation is <span className="text-primary font-semibold">accessible, powerful, and secure</span>. That&apos;s why we are
                    constantly working on new templates, integrations and PRO features to help you scale your projects efficiently.
                </p>

                <p className="font-medium text-text">
                    Thank you for trusting OctoLab to take your development to the next level — we&apos;re here for you every step of the way! 🚀
                </p>

                <p>
                    If you have any questions, suggestions or just want to share how OctoLab is helping you improve your workflows, don&apos;t hesitate to contact us at{' '}
                    <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                    </a>
                    . We&apos;ll be happy to listen to you and support you on your journey to more agile and efficient automation.
                </p>

                <p>
                    You can also learn more about us on the{' '}
                    <Link href="/how-to" className="text-primary hover:underline">
                        How to page
                    </Link>{' '}
                    or see our available{' '}
                    <Link href="/templates" className="text-primary hover:underline">
                        templates
                    </Link>{' '}
                    to get started.
                </p>
            </div>
        </main>
    );
}

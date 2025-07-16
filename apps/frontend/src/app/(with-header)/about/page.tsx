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
                    At <strong className="text-text">OctoLab</strong> we believe that <span className="text-primary font-semibold">automation</span> is the key to unlocking the
                    creative potential of development teams. That&apos;s why we have created a platform that allows you to design and manage <em>workflows</em> for{' '}
                    <strong className="text-text">GitHub Actions</strong> in a <span className="text-primary font-semibold">visual, simple and error-free</span> way.
                </p>

                <p>
                    Our mission is to <span className="text-primary font-semibold">democratize</span> the creation of CI/CD pipelines, eliminating the need to write YAML files
                    manually. With OctoLab, any developer — from junior profiles to experienced DevOps — can generate production-ready workflows in minutes.
                </p>

                <p>
                    OctoLab also allows you to <span className="text-primary font-semibold">customize every aspect</span> of your workflow: runners, branch strategies, build and
                    test commands, security integrations, cloud deployments and much more. All from a{' '}
                    <span className="text-primary font-semibold">clear and intuitive interface</span>.
                </p>

                <p>
                    Currently, OctoLab is in <span className="text-primary font-semibold">Beta phase</span>, where we are validating the product with our community. If the results
                    are positive, we will continue to expand the platform with new features, integrations and enhancements to help you take automation to the next level.
                </p>

                <p>
                    If you have any questions, suggestions or just want to share how OctoLab is helping you to improve your workflows, feel free to write us at{' '}
                    <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                    </a>
                    . We&apos;d love to hear from you and support you on your way to more agile and efficient automation.
                </p>

                <p>
                    You can also learn more on our{' '}
                    <Link href="/how-to" className="text-primary hover:underline">
                        How It Works
                    </Link>{' '}
                    page, or check out our available{' '}
                    <Link href="/templates" className="text-primary hover:underline">
                        templates
                    </Link>{' '}
                    to get started today.
                </p>

                <p className="font-medium text-text">Thank you for trusting OctoLab to drive your development — we&apos;re here for you every step of the way! 🚀</p>
            </div>
        </main>
    );
}

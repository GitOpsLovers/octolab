/**
 * About page
 */
export default function AboutPage() {
    return (
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">About OctoLab</h1>

            <div className="text-text-muted space-y-6 text-lg">
                <p>
                    At <strong>OctoLab</strong> we believe that automation is the key to unlock the creative potential of development teams. That&apos;s why we have created a
                    platform that allows you to design and manage <em>workflows</em> of <strong>GitHub Actions</strong> in a visual, simple and error-free way.
                </p>

                <p>
                    Our mission is to democratize the creation of CI/CD pipelines, eliminating the need to write YAML files manually. With OctoLab, any developer - from junior to
                    experienced DevOps profiles - can generate production-ready workflows in a matter of minutes.
                </p>

                <p>
                    In addition, OctoLab allows you to customize every aspect of the flow: runners, branch strategies, build and test commands, security integrations, cloud
                    deployments and much more. All from a clear and easy-to-use interface.
                </p>

                <p>
                    We believe in a future where automation is accessible, powerful and secure. That&apos;s why we are constantly working to offer new templates, integrations and
                    PRO features to help you scale your projects efficiently.
                </p>

                <p>Thank you for trusting OctoLab to take your development to the next level - we&apos;re here for you every step of the way!</p>
            </div>
        </main>
    );
}

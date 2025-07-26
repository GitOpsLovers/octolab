/**
 * Privacy page
 */

export default function PrivacyPage() {
    const contactEmail = process.env.CONTACT_EMAIL;

    return (
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">Privacy Policy</h1>

            <div className="text-text-muted space-y-6 text-lg">
                <p>
                    At <strong className="text-text">OctoLab</strong>, we take your privacy seriously. This Privacy Policy explains what data we collect, how we use it, and your
                    rights when using our application.
                </p>

                <h4 className="text-2xl font-semibold mt-8">Who we are</h4>
                <p>
                    <strong className="text-text">OctoLab</strong> is a web platform that allows developers to visually create and manage{' '}
                    <strong className="text-text">GitHub Actions</strong> workflows. You can reach us at{' '}
                    <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                    </a>
                    .
                </p>

                <h4 className="text-2xl font-semibold mt-8">What data we collect</h4>
                <p>We collect two types of data when you use OctoLab:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <span className="text-primary font-semibold">Personal data:</span> your email and user ID from GitHub or Google when you sign in.
                    </li>
                    <li>
                        <span className="text-primary font-semibold">Technical and usage data:</span> saved workflows and anonymous interaction events via Umami.
                    </li>
                </ul>

                <h4 className="text-2xl font-semibold mt-8">Cookies we use</h4>
                <p>We use essential cookies to enhance your experience and ensure application functionality:</p>

                <div className="overflow-auto mt-4 border border-border rounded-md">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="bg-surface/70">
                            <tr className="border-b border-border">
                                <th className="p-3 font-semibold">Cookie</th>
                                <th className="p-3 font-semibold">Purpose</th>
                                <th className="p-3 font-semibold">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border">
                                <td className="p-3">octolab_auth</td>
                                <td className="p-3">Keeps your session active after signing in.</td>
                                <td className="p-3">Session</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">octolab_hide_first_workflow_modal</td>
                                <td className="p-3">Remembers if the first-workflow modal was shown.</td>
                                <td className="p-3">Persistent</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3">octolab_hide_beta_banner</td>
                                <td className="p-3">Remembers if you dismissed the beta banner.</td>
                                <td className="p-3">Persistent</td>
                            </tr>
                            <tr>
                                <td className="p-3">octolab_skip_register_modal</td>
                                <td className="p-3">Saves whether you’ve seen the register modal.</td>
                                <td className="p-3">Persistent</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mt-2">
                    We also use <span className="text-primary font-semibold">Umami Analytics</span> to collect anonymous usage statistics. Some cookies may be placed by Umami’s
                    embedded script.
                </p>

                <h4 className="text-2xl font-semibold mt-8">How we use your data</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>To authenticate your session and let you save workflows.</li>
                    <li>To personalize your experience.</li>
                    <li>To understand and improve how OctoLab is used.</li>
                    <li>To respond if you contact us directly.</li>
                </ul>

                <h4 className="text-2xl font-semibold mt-8">Legal basis (GDPR)</h4>
                <p>If you’re located in the European Union, we only process your personal data when we have a valid legal basis under the GDPR:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <span className="text-primary font-semibold">Service use:</span> to provide basic application features.
                    </li>
                    <li>
                        <span className="text-primary font-semibold">Product improvement:</span> anonymous analytics to improve OctoLab.
                    </li>
                    <li>
                        <span className="text-primary font-semibold">Voluntary communications:</span> only if you give explicit consent.
                    </li>
                </ul>

                <p className="mt-4 bg-surface/50 p-4 rounded-md">
                    Our services are hosted by providers like Supabase, Vercel and Render, whose infrastructures may be located outside the EEA. In such cases, we ensure GDPR
                    compliance through <strong>Standard Contractual Clauses (SCCs)</strong> or equivalent safeguards.
                </p>

                <h4 className="text-2xl font-semibold mt-8">Who we share your data with</h4>
                <p>We don’t sell or rent your personal data. We only rely on essential third-party services:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <span className="text-primary font-semibold">Supabase:</span> user and workflow storage.
                    </li>
                    <li>
                        <span className="text-primary font-semibold">Vercel and Render:</span> application hosting.
                    </li>
                    <li>
                        <span className="text-primary font-semibold">Umami Analytics:</span> anonymous usage analytics.
                    </li>
                </ul>

                <h4 className="text-2xl font-semibold mt-8">Where your data is stored</h4>
                <p>Your data is stored on third-party servers either within or outside the EEA, always under GDPR-compliant safeguards such as SCCs.</p>

                <h4 className="text-2xl font-semibold mt-8">Your rights</h4>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal data.</li>
                    <li>Correct incorrect or outdated information.</li>
                    <li>Delete your data and account.</li>
                    <li>Object or request limitation of processing.</li>
                </ul>
                <p>
                    To exercise any of these rights, contact us at{' '}
                    <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                    </a>
                    .
                </p>

                <h4 className="text-2xl font-semibold mt-8">Policy updates</h4>
                <p>We may update this policy at any time. Major changes will be announced in the application or via email.</p>

                <h4 className="text-2xl font-semibold mt-8">Contact</h4>
                <p>
                    For any questions about this policy or how we manage your data, feel free to reach out at{' '}
                    <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                    </a>
                    .
                </p>
            </div>
        </main>
    );
}

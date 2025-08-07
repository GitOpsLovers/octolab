import { Metadata } from 'next';
import Head from 'next/head';

import { ContactForm } from '@ui/contact/components/contact-form.component';

export const metadata: Metadata = {
    title: 'Contact Us | OctoLab',
    description: 'Get in touch with the OctoLab team. Ask questions, request features, or share feedback — we’re here to help you build better GitHub workflows.',
    alternates: {
        canonical: 'https://www.octolab.app/contact',
    },
    keywords: [
        'contact octolab',
        'get in touch github workflows',
        'github actions support',
        'ci/cd platform feedback',
        'request feature octolab',
        'octolab contact form',
        'talk to octolab',
        'workflow builder support',
        'github actions tool contact',
    ],
};

/**
 * Contact page
 */
export default function ContactPage() {
    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.octolab.app/contact" key="canonical" />
            </Head>
            <main className="p-8">
                <ContactForm />
            </main>
        </>
    );
}

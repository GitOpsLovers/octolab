/* eslint-disable no-secrets/no-secrets */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable pii/no-email */
import { Body, Button, Column, Container, Head, Heading, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from '@react-email/components';

const baseUrl = 'https://octolab.app';

/**
 * Welcome email template component.
 */
export const WelcomeEmail = () => {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                brand: '#ff4d9d',
                                offwhite: '#fafbfb',
                            },
                            spacing: {
                                0: '0px',
                                20: '20px',
                                45: '45px',
                            },
                            fontFamily: {
                                sans: ['Poppins', 'sans-serif'],
                                heading: ['Montserrat', 'sans-serif'],
                            },
                        },
                    },
                }}
            >
                <Preview>Welcome to OctoLab — Visual GitHub Actions, reimagined</Preview>

                <Body className="bg-offwhite text-base font-sans">
                    <Img src={`${baseUrl}/img/logo/emails-logo.jpg`} width="120" alt="OctoLab" className="mx-auto my-20 rounded-full object-cover" />
                    <Container className="bg-white px-45">
                        <Heading className="my-0 text-center leading-8 text-black font-heading">
                            Welcome to <span className="text-brand">OctoLab</span>! 🐙
                        </Heading>

                        <Section>
                            <Row>
                                <Text className="text-base text-gray-800 font-sans">
                                    You are now part of the community that is rewriting the history of Github Actions! OctoLab allows you to create, edit and deploy workflows
                                    visually and easily.
                                </Text>
                                <Text className="text-base text-gray-800 font-sans">Here’s how to get started:</Text>
                            </Row>
                        </Section>

                        <ul>
                            <li className="mb-20 font-sans" key="select-template">
                                <strong>Choose a starting point.</strong>{' '}
                                <Link href="https://octolab.app/templates" className="text-brand font-bold">
                                    Select a template
                                </Link>{' '}
                                or create a workflow from scratch.
                            </li>
                            <li className="mb-20 font-sans" key="configure-fields">
                                <strong>Configure your workflow.</strong> Fill in required fields, customize inputs, and add your own jobs and steps visually.
                            </li>
                            <li className="mb-20 font-sans" key="export-workflow">
                                <strong>Export or deploy.</strong> Download your workflow, copy the YAML, or commit it directly to your GitHub repository.
                            </li>
                        </ul>

                        <Section className="text-center">
                            <Button className="rounded-lg bg-brand px-[18px] py-3 text-white font-bold font-sans" href="https://octolab.app">
                                Start building now
                            </Button>
                        </Section>

                        <Section className="my-20">
                            <Container className="bg-[#fff0f6] border border-brand rounded-lg px-6 py-5">
                                <Text className="text-base text-black text-center font-sans mb-2 leading-snug">
                                    <strong className="text-brand">OctoLab is currently in beta.</strong> We&apos;re actively improving it based on your feedback, so feel free to
                                    share your thoughts or suggestions.
                                </Text>
                                <Text className="text-base text-black text-center font-sans leading-snug">
                                    You can reach us anytime at{' '}
                                    <Link href="mailto:hello@octolab.app" className="text-brand font-bold underline">
                                        hello@octolab.app
                                    </Link>
                                    .
                                </Text>
                            </Container>
                        </Section>

                        <Section className="mt-45">
                            <Row>
                                <Column key="documentation" className="text-center">
                                    <Link className="font-bold text-black underline" href={`${baseUrl}/about`}>
                                        About us
                                    </Link>{' '}
                                    <span className="text-brand">→</span>
                                </Column>
                                <Column key="how-to" className="text-center">
                                    <Link className="font-bold text-black underline" href={`${baseUrl}/how-to`}>
                                        How it works
                                    </Link>{' '}
                                    <span className="text-brand">→</span>
                                </Column>
                                <Column key="contact" className="text-center">
                                    <Link className="font-bold text-black underline" href="mailto:hello@octolab.app">
                                        Contact
                                    </Link>{' '}
                                    <span className="text-brand">→</span>
                                </Column>
                            </Row>
                        </Section>
                    </Container>

                    <Container className="mt-20">
                        <Text className="mb-45 text-center text-gray-400 text-xs font-sans">OctoLab · The easiest way to build GitHub workflows</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeEmail;

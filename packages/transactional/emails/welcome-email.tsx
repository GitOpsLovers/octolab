/* eslint-disable pii/no-email */
import { Body, Button, Column, Container, Head, Heading, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from '@react-email/components';

const baseUrl = 'https://octolab.app';

/**
 * Welcome email template component.
 */
export const WelcomeEmail = () => {
    return (
        <Html>
            <Head />
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
                        },
                    },
                }}
            >
                <Preview>Welcome to OctoLab — Visual GitHub Actions, reimagined</Preview>

                <Body className="bg-offwhite font-sans text-base">
                    <Img src={`${baseUrl}/img/logo/emails-logo.jpg`} width="120" alt="OctoLab" className="mx-auto my-20 rounded-full object-cover" />
                    <Container className="bg-white px-45">
                        <Heading className="my-0 text-center leading-8 text-black">
                            Welcome to <span className="text-brand">OctoLab</span> 🐙
                        </Heading>

                        <Section>
                            <Row>
                                <Text className="text-base text-gray-800">
                                    You’re now part of a community rethinking GitHub Actions. OctoLab lets you build, edit, and deploy workflows visually — without writing YAML.
                                </Text>
                                <Text className="text-base text-gray-800">Here’s how to get started:</Text>
                            </Row>
                        </Section>

                        <ul>
                            <li className="mb-20" key="select-template">
                                <strong>Choose a starting point.</strong>{' '}
                                <Link href="https://octolab.app/templates" className="text-brand font-bold">
                                    Select a template
                                </Link>{' '}
                                or create a workflow from scratch.
                            </li>
                            <li className="mb-20" key="configure-fields">
                                <strong>Configure your workflow.</strong> Fill in required fields, customize inputs, and add your own jobs and steps visually.
                            </li>
                            <li className="mb-20" key="export-workflow">
                                <strong>Export or deploy.</strong> Download your workflow, copy the YAML, or commit it directly to your GitHub repository.
                            </li>
                        </ul>

                        <Section className="text-center">
                            <Button className="rounded-lg bg-brand px-[18px] py-3 text-white font-bold" href="https://octolab.app">
                                Start building now
                            </Button>
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
                        <Text className="mb-45 text-center text-gray-400 text-xs">OctoLab · The easiest way to build GitHub workflows</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeEmail;

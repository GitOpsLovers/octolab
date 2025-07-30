/* eslint-disable pii/no-email */
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

import { Body, Button, Column, Container, Head, Heading, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from '@react-email/components';
import { ReactNode } from 'react';

const baseUrl = process.env.FRONTEND_BASE_URL;

/**
 * Welcome email template component.
 */
function WelcomeEmail(): ReactNode {
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
                    <Container className="bg-white p-45">
                        <Heading className="my-0 text-center leading-8 text-black">
                            Welcome to <span className="text-brand">OctoLab</span> 🐙
                        </Heading>

                        <Section>
                            <Row>
                                <Text className="text-base text-gray-800">
                                    You&apos;re now part of a growing community simplifying GitHub Actions. OctoLab helps you create, edit and deploy workflows visually — no YAML
                                    required.
                                </Text>
                                <Text className="text-base text-gray-800">Here’s how to get started:</Text>
                            </Row>
                        </Section>

                        <ul>
                            <li className="mb-20" key={'start-workflow'}>
                                <strong>Start your first workflow.</strong> <Link href="https://octolab.app/workflows/new">Choose a template</Link> or build one from scratch.
                            </li>
                            <li className="mb-20" key={'connect-repositories'}>
                                <strong>Connect your repositories.</strong> Link OctoLab with your GitHub account to edit and sync workflows directly.
                            </li>
                            <li className="mb-20" key={'visualize-yaml'}>
                                <strong>Visualize and test your YAML.</strong> See a live YAML preview and export it anytime.
                            </li>
                        </ul>

                        <Section className="text-center">
                            <Button className="rounded-lg bg-brand px-[18px] py-3 text-white" href="https://octolab.app/dashboard">
                                Start building now
                            </Button>
                        </Section>

                        <Section className="mt-45">
                            <Row>
                                <Column key="documentation" className="text-center">
                                    <Link className="font-bold text-black underline" href={`${baseUrl}/how-to`}>
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
                        <Text className="mb-45 text-center text-gray-400 text-xs">OctoLab · GitHub Automation made visual</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export default WelcomeEmail;

/* eslint-disable import/no-nodejs-modules */
import { readFileSync } from 'fs';
import path from 'path';

import { WelcomeEmailDto } from '../domain/dtos/welcome-email.dto';

import { EmailClient } from '@core/domain/interfaces/email-client.interface';

/**
 * Send welcome email use case.
 *
 * @param emailClient Email client
 * @param welcomeData Welcome email data.
 */
export async function sendWelcomeEmailUseCase(emailClient: EmailClient, welcomeData: WelcomeEmailDto): Promise<void> {
    const templatePath = path.resolve(__dirname, `${process.env.EMAIL_TEMPLATES_PATH}/welcome-email.html`);

    let htmlContent: string;

    try {
        htmlContent = readFileSync(templatePath, 'utf8');
    } catch (err) {
        console.error('❌ Error reading email template:', err);
        return;
    }

    const { error } = await emailClient.emails.send({
        from: `OctoLab <${process.env.CONTACT_EMAIL}>`,
        to: [welcomeData.email],
        subject: 'Welcome to OctoLab!',
        html: htmlContent,
    });

    if (error) {
        console.error({ error });
    }
}

import { WelcomeEmailDto } from '../domain/dtos/welcome-email.dto';

import { EmailClient } from '@core/domain/interfaces/email-client.interface';

/**
 * Send welcome email use case.
 *
 * @param emailClient Email client
 * @param welcomeData Welcome email data.
 */
export async function sendWelcomeEmailUseCase(emailClient: EmailClient, welcomeData: WelcomeEmailDto): Promise<void> {
    const htmlContent = `
        <h2>New Template Proposal</h2>
    `;

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

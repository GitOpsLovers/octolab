import { ContactSubmissionDto } from '../domain/dtos/contact-submission.dto';

import { EmailClient } from '@core/domain/interfaces/email-client.interface';

/**
 * Send contact submission use case.
 *
 * @param emailClient Email client
 * @param contactData Contact data.
 */
export async function sendContactSubmissionUseCase(emailClient: EmailClient, contactData: ContactSubmissionDto): Promise<void> {
    const htmlContent = `
        <h2>New contact submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Message:</strong> ${contactData.message}</p>
        <p><strong>Email:</strong> ${contactData.email || 'Not provided'}</p>
    `;

    const { error } = await emailClient.emails.send({
        from: `OctoLab <${process.env.CONTACT_EMAIL}>`,
        to: [process.env.CONTACT_EMAIL],
        subject: 'Contact submission',
        html: htmlContent,
    });

    if (error) {
        console.error({ error });
    }
}

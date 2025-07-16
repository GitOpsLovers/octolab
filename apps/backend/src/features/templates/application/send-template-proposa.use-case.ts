import { ProposalTemplateDto } from '../domain/dtos/proposal-template.dto';

import { EmailClient } from '@core/domain/interfaces/email-client.interface';

/**
 * Send template proposal use case.
 *
 * @param emailClient Email client
 * @param proposalData Template proposal data.
 */
export async function sendTemplateProposalUseCase(emailClient: EmailClient, proposalData: ProposalTemplateDto): Promise<void> {
    const htmlContent = `
        <h2>New Template Proposal</h2>
        <p><strong>Name:</strong> ${proposalData.name}</p>
        <p><strong>Description:</strong> ${proposalData.description}</p>
        <p><strong>Motivation:</strong> ${proposalData.motivation}</p>
        <p><strong>Email:</strong> ${proposalData.email || 'Not provided'}</p>
    `;

    const { error } = await emailClient.emails.send({
        from: `OctoLab <${process.env.CONTACT_EMAIL}>`,
        to: [process.env.CONTACT_EMAIL],
        subject: 'Template proposal submission',
        html: htmlContent,
    });

    if (error) {
        console.error({ error });
    }
}

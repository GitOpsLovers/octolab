import { ProposalTemplateDto } from '../domain/dtos/proposal-template.dto';
import { ProposeTemplateRepository } from '../domain/repositories/propose-template.repository';

/**
 * Propose template Api Repository
 */
export const proposeTemplateApiRepository = (token: string): ProposeTemplateRepository => ({
    send: async (data: ProposalTemplateDto): Promise<void> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/propose-template`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error sending template');
        }

        return response.json();
    },
});

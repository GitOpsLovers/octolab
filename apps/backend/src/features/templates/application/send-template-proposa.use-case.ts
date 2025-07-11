import { ProposalTemplateDto } from '../domain/dtos/proposal-template.dto';

/**
 * Send template proposal use case.
 *
 * @param data Template proposal data.
 */
export async function sendTemplateProposalUseCase(data: ProposalTemplateDto): Promise<any> {
    return Promise.resolve({ data: data });
}

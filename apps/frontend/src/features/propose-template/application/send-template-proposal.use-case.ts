import { ProposalTemplateDto } from '../domain/dtos/proposal-template.dto';
import { ProposeTemplateRepository } from '../domain/repositories/propose-template.repository';

/**
 * Send template proposal use case.
 *
 * @param repository Propose template repository.
 * @param data Data to send.
 */
export function sendTemplateProposalUseCase(repository: ProposeTemplateRepository, data: ProposalTemplateDto): Promise<void> {
    return repository.send(data);
}

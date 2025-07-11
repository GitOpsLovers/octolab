import { ProposalTemplateDto } from '../dtos/proposal-template.dto';

/**
 * Propose template repository.
 */
export interface ProposeTemplateRepository {
    /**
     * Send propose template.
     *
     * @param data Propose template data.
     */
    send: (data: ProposalTemplateDto) => Promise<void>;
}

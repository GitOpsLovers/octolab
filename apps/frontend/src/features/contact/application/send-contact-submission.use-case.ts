import { ContactSubmissionDto } from '../domain/dtos/contact-submission.dto';
import { ContactRepository } from '../domain/repositories/contact.repository';

/**
 * Send contact submission use case.
 *
 * @param repository Contact repository.
 * @param data Data to send.
 */
export function sendContactSubmissionUseCase(repository: ContactRepository, data: ContactSubmissionDto): Promise<void> {
    return repository.send(data);
}

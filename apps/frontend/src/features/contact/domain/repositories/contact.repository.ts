import { ContactSubmissionDto } from '../dtos/contact-submission.dto';

/**
 * Contact repository.
 */
export interface ContactRepository {
    /**
     * Send contact submission
     *
     * @param data Contact submission data
     */
    send: (data: ContactSubmissionDto) => Promise<void>;
}

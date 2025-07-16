import { ContactSubmissionDto } from '../domain/dtos/contact-submission.dto';
import { ContactRepository } from '../domain/repositories/contact.repository';

/**
 * Contact Api Repository
 */
export const contactApiRepository = (): ContactRepository => ({
    send: async (data: ContactSubmissionDto): Promise<void> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error sending contact submission');
        }

        return response.json();
    },
});

import { z } from 'zod';

/**
 * Contact schema.
 */
export const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    message: z.string().min(1, 'Message is required'),
    email: z.email('Invalid email').optional().or(z.literal('')),
});

import { z } from 'zod';

/**
 * Propose template schema.
 */
export const proposeTemplateSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    motivation: z.string().min(1, 'Motivation is required'),
    email: z.email('Invalid email').optional().or(z.literal('')),
});

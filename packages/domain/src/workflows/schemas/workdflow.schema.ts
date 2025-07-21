import { z } from 'zod';

/**
 * Workflow schema.
 */
export const workflowSchema = z.object({
    id: z.uuid(),
    templateId: z.string(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    yaml: z.unknown(),
    data: z.unknown(),
});

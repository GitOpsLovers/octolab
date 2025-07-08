/**
 * Workflow from database
 */
export interface DatabaseWorkflow {
    id: string;
    userId: string;
    name: string;
    description: string;
    yaml: string;
    data: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * User workflow model
 */
export interface UserWorkflow {
    id: string;
    name: string;
    description: string;
    templateId: string;
    yaml: string;
    data: string;
    updatedAt: string;
}

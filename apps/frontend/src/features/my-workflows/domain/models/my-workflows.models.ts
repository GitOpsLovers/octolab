/**
 * User workflow model
 */
export interface UserWorkflow {
    id: string;
    name: string;
    description: string;
    type: string;
    templateId: string;
    data: string;
    updatedAt: string;
}

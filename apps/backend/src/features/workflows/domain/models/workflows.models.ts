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
 * Editing workflow YAML model
 */
export interface EditingWorkflowYaml {
    name: string;
    on: any;
    jobs: Record<string, Job>;
}

/**
 * Jobs model
 */
export interface Job {
    'runs-on': string;
    steps: Step[];
}

/**
 * Step model
 */
export interface Step {
    name: string;
    run?: string;
    uses?: string;
    with?: Record<string, string>;
    env?: Record<string, string>;
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

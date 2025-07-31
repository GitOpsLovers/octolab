import { Action } from '../../actions/models/actions.models';

/**
 * Workflow YAML model
 */
export interface WorkflowYaml {
    name: string;
    on: any;
    env?: Record<string, string>;
    jobs: Record<string, Job>;
}

/**
 * Job model
 */
export interface Job {
    id: string;
    if?: string;
    needs?: string[];
    name: string;
    runner: string;
    steps: Step[];
}

/**
 * Step model
 */
export interface Step {
    internalId: string;
    id: string;
    if?: string;
    name: string;
    type: 'run' | 'uses';
    run?: string;
    uses?: string;
    with?: Record<string, string | number | boolean>;
    env?: Record<string, string>;
    secretInputs?: string[];
    environmentVariables?: string[];
    stepEnvironmentVariables?: string[];
    templates?: Record<string, string>;
    hiddenInputs?: string[];
    stepActionInputs?: Action['inputs'];
}

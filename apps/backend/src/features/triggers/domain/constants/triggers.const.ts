import { Trigger } from '@octolab/domain';

/**
 * List of available workflow triggers
 */
export const workflowsTriggers: Trigger[] = ['push', 'pull_request', 'workflow_dispatch', 'schedule'];

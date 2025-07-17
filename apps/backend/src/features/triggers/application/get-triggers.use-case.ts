import { Trigger } from '@octolab/domain';

import { workflowsTriggers } from '../domain/constants/triggers.const';

/**
 * Get triggers use case.
 *
 * @returns Triggers
 */
export async function getTriggersUseCase(): Promise<Trigger[]> {
    return Promise.resolve(workflowsTriggers);
}

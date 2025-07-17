import { Runner } from '@octolab/domain';

import { workflowsRunners } from '../domain/constants/runners.const';

/**
 * Get runners use case.
 *
 * @returns Runners
 */
export async function getRunnersUseCase(): Promise<Runner[]> {
    return Promise.resolve(workflowsRunners);
}

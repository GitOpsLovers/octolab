import { Action } from '@octolab/domain';

import { workflowsActions } from '../domain/constants/actions.const';

/**
 * Get actions use case.
 *
 * @returns Actions
 */
export async function getActionsUseCase(): Promise<Action[]> {
    return Promise.resolve(workflowsActions);
}

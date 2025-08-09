import { Action } from '@octolab/domain';

/**
 * Transform available action to select options
 *
 * @param availableActions Available actions to transform
 *
 * @returns Transformed select options
 */
export function transformAvailableActionsToSelectOptions(availableActions: Action[]): Array<{ label: string; value: string }> {
    return availableActions.map((action) => ({
        value: action.id,
        label: action.id,
    }));
}

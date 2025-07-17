import { Action } from '@octolab/domain';

/**
 * List of available workflow actions
 */
export const workflowsActions: Action[] = [
    {
        id: 'actions/checkout@v4',
        inputs: [
            {
                key: 'fetch-depth',
                label: 'Fetch depth',
                placeholder: '0',
                required: false,
                type: 'number',
            },
        ],
    },
    {
        id: 'actions/setup-node@v4',
        inputs: [
            {
                key: 'node-version',
                label: 'Node version',
                placeholder: '18',
                required: false,
                type: 'string',
            },
            {
                key: 'node-version-file',
                label: 'Node version file',
                placeholder: '.nvmrc',
                required: false,
                type: 'string',
            },
        ],
    },
];

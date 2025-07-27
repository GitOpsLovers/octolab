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
                isSecret: false,
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
                required: true,
                type: 'string',
                isSecret: false,
            },
        ],
    },
    {
        id: 'JS-DevTools/npm-publish@v3',
        inputs: [
            {
                key: 'token',
                label: 'NPM Token Secret Name',
                placeholder: 'NPM_TOKEN',
                required: true,
                type: 'string',
                isSecret: true,
            },
        ],
    },
];

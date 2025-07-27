import { z } from 'zod';

const gitBranchRegex = /^(?!\/|.*([./]\.|\/\/|@{|\\|\^|~|:|\*|\?|<|>|\[|\s)).*[^./]$/;
const cronRegex = /^(\*|([0-5]?\d))( (\*|([01]?\d|2[0-3]))( (\*|([01]?\d|2\d|3[01]))( (\*|(1[0-2]|0?[1-9]))( (\*|[0-7]))?)?)?)?$/;
const kebabCaseRegex = /^[\da-z]+(-[\da-z]+)*$/;

// Simulación de los inputs de cada acción
const actionsMap: Record<string, Array<{ key: string; label: string; required: boolean; type: 'string' | 'number' | 'boolean' }>> = {
    'actions/checkout@v4': [{ key: 'fetch-depth', label: 'Fetch depth', required: false, type: 'number' }],
    'actions/setup-node@v4': [{ key: 'node-version', label: 'Node version', required: true, type: 'string' }],
};

export const customWorkflowSchema = z
    .object({
        workflowName: z.string().min(1, 'This field cannot be empty'),
        on: z.string(),
        branch: z.string().optional(),
        schedule: z.string().optional(),
        jobs: z
            .array(
                z.object({
                    id: z.string().min(1, 'Job ID is required').regex(kebabCaseRegex, 'Job ID must be kebab-case (e.g., build-api)'),
                    name: z.string().min(1, 'Job name is required'),
                    runner: z.string(),
                    if: z.string().optional(),
                    steps: z.array(
                        z
                            .object({
                                internalId: z.string(),
                                id: z.string().min(1, 'Step ID is required').regex(kebabCaseRegex, 'Step ID must be kebab-case (e.g., run-tests)'),
                                name: z.string().min(1, 'Step name is required'),
                                type: z.enum(['run', 'uses'], { message: 'Step type is required' }),
                                run: z.string().optional(),
                                uses: z.string().optional(),
                                with: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
                                if: z.string().optional(),
                            })
                            .superRefine((step, ctx) => {
                                if (step.type === 'run' && (!step.run || step.run.trim() === '')) {
                                    ctx.addIssue({
                                        path: ['run'],
                                        // eslint-disable-next-line @typescript-eslint/no-deprecated
                                        code: z.ZodIssueCode.custom,
                                        message: 'Command is required when step type is "run"',
                                    });
                                }

                                if (step.type === 'uses') {
                                    if (!step.uses || step.uses.trim() === '') {
                                        ctx.addIssue({
                                            path: ['uses'],
                                            // eslint-disable-next-line @typescript-eslint/no-deprecated
                                            code: z.ZodIssueCode.custom,
                                            message: 'Action is required when step type is "uses"',
                                        });
                                        return;
                                    }

                                    const inputs = actionsMap[step.uses] ?? [];

                                    for (const input of inputs) {
                                        const val = step.with?.[input.key];

                                        if (input.required && (val === undefined || val === '')) {
                                            ctx.addIssue({
                                                path: ['with', input.key],
                                                // eslint-disable-next-line @typescript-eslint/no-deprecated
                                                code: z.ZodIssueCode.custom,
                                                message: `${input.label} is required`,
                                            });
                                            continue;
                                        }

                                        if (val !== undefined) {
                                            const isValid =
                                                (input.type === 'number' && !isNaN(Number(val))) ||
                                                (input.type === 'string' && typeof val === 'string') ||
                                                (input.type === 'boolean' && typeof val === 'boolean');

                                            if (!isValid) {
                                                ctx.addIssue({
                                                    path: ['with', input.key],
                                                    // eslint-disable-next-line @typescript-eslint/no-deprecated
                                                    code: z.ZodIssueCode.custom,
                                                    message: `${input.label} must be a ${input.type}`,
                                                });
                                            }
                                        }
                                    }
                                }
                            }),
                    ),
                }),
            )
            .nonempty('At least one job is required'),
    })
    .refine(
        (data) => {
            if (data.on === 'push' || data.on === 'pull_request') {
                return !!data.branch && gitBranchRegex.test(data.branch);
            }
            return true;
        },
        {
            message: 'Invalid branch name. Must be a valid Git branch name.',
            path: ['branch'],
        },
    )
    .refine(
        (data) => {
            if (data.on === 'schedule') {
                return !!data.schedule && cronRegex.test(data.schedule.trim());
            }
            return true;
        },
        {
            message: 'Invalid cron expression. Must be in format: "*/5 * * * *"',
            path: ['schedule'],
        },
    );

export type CustomWorkflowFormSchema = z.infer<typeof customWorkflowSchema>;

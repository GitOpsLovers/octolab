import { CustomWorkflowConfig, Job, Step, WorkflowYaml } from '@octolab/domain';

/**
 * Generate "on" section based on workflow config
 */
function generateOnConfig(config: CustomWorkflowConfig): Record<string, any> {
    if (config.on === 'push' || config.on === 'pull_request') {
        return {
            [config.on]: {
                branches: config.branch ? [config.branch] : ['main'],
            },
        };
    } else if (config.on === 'workflow_dispatch') {
        return { workflow_dispatch: {} };
    } else if (config.on === 'schedule') {
        return {
            schedule: [
                {
                    cron: config.schedule?.trim() || '0 0 * * *',
                },
            ],
        };
    }

    return { push: { branches: [config.branch ?? 'main'] } };
}

/**
 * Generate "env" section based on jobs configuration
 */
function generateEnvConfig(jobs: Record<string, Job>): Record<string, string> | undefined {
    const envObject: Record<string, string> = {};
    const seen = new Set<string>();

    for (const job of Object.values(jobs)) {
        for (const step of job.steps) {
            if (!step.environmentVariables || !step.with) continue;

            for (const key of step.environmentVariables) {
                const envKey = step.with[key];

                // Buscar si hay un valor asociado explícito
                const valueKey = `${key}-env-value`;
                const envValue = step.with[valueKey];

                if (typeof envKey === 'string' && envKey.trim() !== '' && typeof envValue === 'string' && envValue.trim() !== '' && !seen.has(envKey)) {
                    envObject[envKey] = envValue;
                    seen.add(envKey);
                }
            }
        }
    }

    return Object.keys(envObject).length > 0 ? envObject : undefined;
}

/**
 * Generate "jobs" section based on workflow config
 */
function generateJobs(config: CustomWorkflowConfig): Record<string, Job> {
    const jobs: Record<string, Job> = {};

    for (const customJob of config.jobs) {
        jobs[customJob.id] = {
            id: customJob.id,
            name: customJob.name,
            runner: customJob.runner,
            steps: customJob.steps,
            ...(customJob.if && { if: customJob.if }),
        };
    }

    return jobs;
}

/**
 * Generate YAML steps from steps configuration
 */
function generateYamlStepsFromSteps(steps: Step[]): any[] {
    return steps.map((step) => {
        const commonFields = {
            id: step.id,
            name: step.name,
            ...(step.if?.trim() && { if: step.if.trim() }),
        };

        if (step.type === 'run') {
            return {
                ...commonFields,
                ...(step.env && { env: step.env }),
                run: step.run,
            };
        }

        if (step.type === 'uses') {
            const withSection: Record<string, string | number | boolean> = {};
            const stepEnvSection: Record<string, string> = {};

            if (step.with) {
                for (const [key, value] of Object.entries(step.with)) {
                    if (step.hiddenInputs?.includes(key)) continue;

                    const isSecret = step.secretInputs?.includes(key);
                    const isEnvVar = step.environmentVariables?.includes(key);
                    const isStepEnvVar = step.stepEnvironmentVariables?.includes(key);
                    const template = step.templates?.[key];

                    if (isStepEnvVar) {
                        const keyDefinition = step.stepActionInputs?.find((i) => i.key === key);
                        const envVarName = keyDefinition?.placeholder || key;

                        stepEnvSection[envVarName] = isSecret ? `\${{ secrets.${value} }}` : `\${{ env.${value} }}`;
                        continue;
                    }

                    if (template) {
                        let rendered = template;
                        for (const [placeholderKey, placeholderValue] of Object.entries(step.with)) {
                            rendered = rendered.replaceAll(`{${placeholderKey}}`, String(placeholderValue));
                        }
                        withSection[key] = rendered;
                    } else if (isSecret) {
                        withSection[key] = `\${{ secrets.${value} }}`;
                    } else if (isEnvVar) {
                        withSection[key] = `\${{ env.${value} }}`;
                    } else {
                        withSection[key] = value;
                    }
                }
            }

            const combinedEnv = step.env || Object.keys(stepEnvSection).length > 0 ? { ...step.env, ...stepEnvSection } : undefined;

            return {
                ...commonFields,
                uses: step.uses,
                ...(combinedEnv && { env: combinedEnv }),
                ...(Object.keys(withSection).length > 0 && { with: withSection }),
            };
        }

        return commonFields;
    });
}

/**
 * Generate YAML jobs from jobs configuration
 */
function generateYamlJobsFromJobs(jobs: Record<string, Job>): Record<string, any> {
    const jobsYaml: Record<string, any> = {};

    for (const [, job] of Object.entries(jobs)) {
        const jobEntry: Record<string, any> = {
            name: job.name,
            ...(job.if?.trim() && { if: job.if.trim() }),
            'runs-on': job.runner,
            steps: generateYamlStepsFromSteps(job.steps),
        };

        jobsYaml[job.id] = jobEntry;
    }

    return jobsYaml;
}

/**
 * Generate a workflow from a workflow config
 */
export function generateWorkflowYamlForCustomUseCase(workflowConfig: CustomWorkflowConfig): WorkflowYaml {
    const on = generateOnConfig(workflowConfig);
    const jobsInternal = generateJobs(workflowConfig);
    const jobsYaml = generateYamlJobsFromJobs(jobsInternal);
    const env = generateEnvConfig(jobsInternal);

    return {
        name: workflowConfig.workflowName,
        on,
        env,
        jobs: jobsYaml,
    };
}

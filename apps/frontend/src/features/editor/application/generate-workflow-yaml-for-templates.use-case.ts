import { Job, Step, WorkflowTemplateConfig, WorkflowYaml } from '@octolab/domain';
import { v4 as uuidv4 } from 'uuid';

import { snykStackActionMap } from '../domain/constants/actions.const';

/**
 * Checkout step
 */
function checkoutStep(): Step[] {
    return [
        {
            internalId: uuidv4(),
            id: 'checkout-step',
            name: 'Checkout code',
            type: 'uses',
            uses: 'actions/checkout@v4',
        },
    ];
}

/**
 * Setup Node step
 */
function setupNodeStep(config: WorkflowTemplateConfig): Step {
    const nodeVersion = config.fields.find((f) => f.key === 'nodeVersion')?.value ?? '18';

    return {
        internalId: uuidv4(),
        id: 'setup-node-step',
        name: 'Setup Node',
        type: 'uses',
        uses: 'actions/setup-node@v4',
        with: {
            'node-version': nodeVersion,
        },
    };
}

/**
 * Install dependencies step
 */
function installDependenciesStep(config: WorkflowTemplateConfig): Step {
    const installCommand = config.fields.find((f) => f.key === 'installCommand')?.value ?? '';

    return {
        internalId: uuidv4(),
        id: 'install-dependencies-step',
        name: 'Install dependencies',
        type: 'run',
        run: installCommand,
    };
}

/**
 * Lint step
 */
function lintStep(config: WorkflowTemplateConfig): Step {
    const lintCommand = config.fields.find((f) => f.key === 'lintCommand')?.value ?? '';
    const baseBranch = config.fields.find((f) => f.key === 'baseBranch')?.value;

    let runCommand = lintCommand;

    if (config.id === 'nx-pr-verify' && baseBranch) {
        runCommand = `${runCommand} --base=origin/${baseBranch}`;
    }

    return {
        internalId: uuidv4(),
        id: 'lint-step',
        name: 'Run lint',
        type: 'run',
        run: runCommand,
    };
}

/**
 * Test step
 */
function testStep(config: WorkflowTemplateConfig): Step {
    const testCommand = config.fields.find((f) => f.key === 'testCommand')?.value ?? '';
    const baseBranch = config.fields.find((f) => f.key === 'baseBranch')?.value;

    let runCommand = testCommand;

    if (config.id === 'nx-pr-verify' && baseBranch) {
        runCommand = `${runCommand} --base=origin/${baseBranch}`;
    }

    return {
        internalId: uuidv4(),
        id: 'test-step',
        name: 'Run tests',
        type: 'run',
        run: runCommand,
    };
}

/**
 * Build step
 */
function buildStep(config: WorkflowTemplateConfig): Step {
    const buildCommand = config.fields.find((f) => f.key === 'buildCommand')?.value ?? '';
    const baseBranch = config.fields.find((f) => f.key === 'baseBranch')?.value;

    let runCommand = buildCommand;

    if (config.id === 'nx-pr-verify' && baseBranch) {
        runCommand = `${runCommand} --base=origin/${baseBranch}`;
    }

    return {
        internalId: uuidv4(),
        id: 'build-step',
        name: 'Build package',
        type: 'run',
        run: runCommand,
    };
}

/**
 * Publish to NPM step
 */
function npmPublishStep(config: WorkflowTemplateConfig): Step {
    const npmTokenSecret = config.fields.find((f) => f.key === 'npmTokenSecret')?.value ?? '';

    return {
        internalId: uuidv4(),
        id: 'npm-publish-step',
        name: 'Publish to NPM',
        type: 'uses',
        uses: 'JS-DevTools/npm-publish@v3',
        with: {
            token: `\${{ secrets.${npmTokenSecret} }}`,
        },
    };
}

/**
 * Semantic Release step
 */
function semanticReleaseStep(config: WorkflowTemplateConfig): Step {
    const releaseCommand = config.fields.find((f) => f.key === 'releaseCommand')?.value ?? '';
    const githubTokenSecret = config.fields.find((f) => f.key === 'githubTokenSecret')?.value ?? '';

    return {
        internalId: uuidv4(),
        id: 'semantic-release-step',
        name: 'Release with Semantic Release',
        type: 'run',
        run: releaseCommand,
        env: {
            GITHUB_TOKEN: `\${{ secrets.${githubTokenSecret} }}`,
        },
    };
}

/**
 * AWS S3 and CloudFront deployment steps
 */
function awsSteps(config: WorkflowTemplateConfig): Step[] {
    const get = (key: string) => config.fields.find((f) => f.key === key)?.value ?? '';

    const awsAccountIdSecret = get('awsAccountIdSecret');
    const awsRoleNameEnvVar = get('awsRoleNameEnvironmentVariable');
    const awsRegionEnvVar = get('awsRegionEnvironmentVariable');
    const sourceDirEnvVar = get('sourceDirEnvironmentVariable');
    // eslint-disable-next-line no-secrets/no-secrets
    const awsS3BucketEnvVar = get('awsS3BucketEnvironmentVariable');
    const cloudfrontDistributionIdSecret = get('cloudfrontDistributionIdSecret');

    return [
        {
            internalId: uuidv4(),
            id: 'configure-aws-credentials-step',
            name: 'Configure AWS credentials with IAM Role',
            type: 'uses',
            uses: 'aws-actions/configure-aws-credentials@v4',
            with: {
                'role-to-assume': `arn:aws:iam::\${{ secrets.${awsAccountIdSecret} }}:role/\${{ env.${awsRoleNameEnvVar} }}`,
                'aws-region': `\${{ env.${awsRegionEnvVar} }}`,
            },
        },
        {
            internalId: uuidv4(),
            id: 'sync-files-to-s3-step',
            name: 'Sync files to S3',
            type: 'run',
            run: `aws s3 sync \${{ env.${sourceDirEnvVar} }} s3://\${{ env.${awsS3BucketEnvVar} }}/ --delete --exclude '.*git*'`,
        },
        {
            internalId: uuidv4(),
            id: 'invalidate-cloudfront-cache-step',
            name: 'Invalidate CloudFront Cache',
            type: 'run',
            run: `aws cloudfront create-invalidation --distribution-id \${{ secrets.${cloudfrontDistributionIdSecret} }} --paths "/*"`,
        },
    ];
}

/**
 * Vercel-specific steps
 */
function vercelSteps(config: WorkflowTemplateConfig): Step[] {
    const vercelTokenSecret = config.fields.find((f) => f.key === 'vercelTokenSecret')?.value ?? '';

    return [
        {
            internalId: uuidv4(),
            id: 'install-vercel-cli-step',
            name: 'Install Vercel CLI',
            type: 'run',
            run: 'npm install --global vercel@latest',
        },
        {
            internalId: uuidv4(),
            id: 'pull-vercel-env-info-step',
            name: 'Pull Vercel Environment Information',
            type: 'run',
            run: `vercel pull --yes --environment=production --token=\${{ secrets.${vercelTokenSecret} }}`,
        },
        {
            internalId: uuidv4(),
            id: 'build-vercel-artifacts-step',
            name: 'Build Project Artifacts',
            type: 'run',
            run: `vercel build --prod --token=\${{ secrets.${vercelTokenSecret} }}`,
        },
        {
            internalId: uuidv4(),
            id: 'deploy-vercel-artifacts-step',
            name: 'Deploy Project Artifacts to Vercel',
            type: 'run',
            run: `vercel deploy --prebuilt --prod --token=\${{ secrets.${vercelTokenSecret} }}`,
        },
    ];
}

/**
 * Snyk specific steps
 */
function snykSteps(config: WorkflowTemplateConfig): Step {
    const snykCodeStack = config.fields.find((f) => f.key === 'snykCodeStack')?.value ?? 'node';
    const snykTokenSecret = config.fields.find((f) => f.key === 'snykTokenSecret')?.value ?? '';
    const snykSeverityThreshold = config.fields.find((f) => f.key === 'snykSeverityThreshold')?.value ?? 'low';

    const actionName = snykStackActionMap[snykCodeStack];

    return {
        internalId: uuidv4(),
        id: 'run-snyk-step',
        name: 'Run Snyk to check for vulnerabilities',
        type: 'uses',
        uses: `snyk/actions/${actionName}@master`,
        env: {
            SNYK_TOKEN: `\${{ secrets.${snykTokenSecret} }}`,
        },
        with: {
            args: `--severity-threshold=${snykSeverityThreshold}`,
        },
    };
}

/**
 * Docker publish steps
 */
function dockerPublishSteps(config: WorkflowTemplateConfig): Step[] {
    const dockerUsername = config.fields.find((f) => f.key === 'dockerUsername')?.value ?? '';
    const dockerPasswordSecret = config.fields.find((f) => f.key === 'dockerPasswordSecret')?.value ?? '';
    const dockerRegistry = config.fields.find((f) => f.key === 'dockerRegistry')?.value ?? '';
    const dockerBuildContext = config.fields.find((f) => f.key === 'dockerBuildContext')?.value ?? '.';
    const dockerDockerfile = config.fields.find((f) => f.key === 'dockerDockerfile')?.value ?? './Dockerfile';
    const dockerImageTags = config.fields.find((f) => f.key === 'dockerImageTags')?.value ?? '';

    const loginWith: Record<string, string> = {
        username: dockerUsername,
        password: `\${{ secrets.${dockerPasswordSecret} }}`,
    };

    if (dockerRegistry === 'Github Container Registry') {
        loginWith.registry = 'ghcr.io';
    }

    return [
        {
            internalId: uuidv4(),
            id: 'login-to-docker-registry-step',
            name: 'Login to Docker Registry',
            type: 'uses',
            uses: 'docker/login-action@v3',
            with: loginWith,
        },
        {
            internalId: uuidv4(),
            id: 'setup-qemu-step',
            name: 'Set up QEMU',
            type: 'uses',
            uses: 'docker/setup-qemu-action@v3',
        },
        {
            internalId: uuidv4(),
            id: 'setup-buildx-step',
            name: 'Set up Docker Buildx',
            type: 'uses',
            uses: 'docker/setup-buildx-action@v3',
        },
        {
            internalId: uuidv4(),
            id: 'build-and-push-step',
            name: 'Build and push',
            type: 'uses',
            uses: 'docker/build-push-action@v6',
            with: {
                context: dockerBuildContext,
                file: dockerDockerfile,
                push: true,
                tags: dockerImageTags,
            },
        },
    ];
}

/**
 * Auto tag steps
 */
function autoTagSteps(config: WorkflowTemplateConfig): Step[] {
    const autoTagVersionCommand = config.fields.find((f) => f.key === 'autoTagVersionCommand')?.value ?? '';

    return [
        {
            internalId: uuidv4(),
            id: 'auto-tag-step',
            name: 'Auto Tag Version',
            type: 'uses',
            uses: 'salsify/action-detect-and-tag-new-version@v23',
            with: {
                'version-command': autoTagVersionCommand,
            },
        },
    ];
}

/**
 * Deploy to Laravel Forge steps
 */
function laravelForgeDeploymentSteps(config: WorkflowTemplateConfig): Step[] {
    const get = (key: string) => config.fields.find((f) => f.key === key)?.value ?? '';

    const deployMode = get('deployMode');

    const baseStep: Step = {
        internalId: uuidv4(),
        id: 'laravel-forge-deploy-step',
        name: 'Deploy to Laravel Forge',
        type: 'uses',
        uses: 'jbrooksuk/laravel-forge-action@v1.0.2',
        with: {},
    };

    if (deployMode === 'webhook') {
        baseStep.with = {
            'trigger-url': `\${{ secrets.${get('laravelForgeDeployTriggerUrlSecretName')} }}`,
        };
    } else if (deployMode === 'api') {
        baseStep.with = {
            api_key: `\${{ secrets.${get('laravelForgeDeployApiKeySecretName')} }}`,
            server_id: `\${{ secrets.${get('laravelForgeDeployServerIdSecretName')} }}`,
            site_id: `\${{ secrets.${get('laravelForgeDeploySiteIdSecretName')} }}`,
        };
    }

    return [baseStep];
}

/**
 * Pull Request Conventional Commits checker steps
 */
function prConventinalCommitsCheckSteps(config: WorkflowTemplateConfig): Step[] {
    const targetBranch = config.fields.find((f) => f.key === 'targetBranch')?.value ?? 'main';
    const currentBranch = config.fields.find((f) => f.key === 'currentBranch')?.value ?? '${{ github.head_ref }}';
    const commitLintPattern = config.fields.find((f) => f.key === 'commitLintPattern')?.value ?? '(feat|fix|ci|chore|docs|test|style|refactor): .{1,}$';

    const baseStep: Step = {
        internalId: uuidv4(),
        id: 'pr-conventional-commits-check-step',
        name: 'Commits check',
        type: 'uses',
        uses: 'netodevel/conventional-commits-checker@v1.0.1',
        with: {
            'target-branch': targetBranch,
            'current-branch': currentBranch,
            'commit-lint-pattern': commitLintPattern,
        },
    };

    return [baseStep];
}

/**
 * Generate steps based on workflow config
 */
function generateSteps(config: WorkflowTemplateConfig): Step[] {
    const steps = config.id !== 'docker-image-publish' ? checkoutStep() : [];

    if (config.id === 'node-pr-verify') {
        steps.push(setupNodeStep(config));
        steps.push(installDependenciesStep(config));
        steps.push(lintStep(config));
        steps.push(testStep(config));
        steps.push(buildStep(config));
    } else if (config.id === 'nx-pr-verify') {
        steps.push(setupNodeStep(config));
        steps.push(installDependenciesStep(config));
        steps.push(lintStep(config));
        steps.push(testStep(config));
        steps.push(buildStep(config));
    } else if (config.id === 'npm-publish') {
        steps.push(setupNodeStep(config));
        steps.push(installDependenciesStep(config));
        steps.push(testStep(config));
        steps.push(buildStep(config));
        steps.push(npmPublishStep(config));
    } else if (config.id === 'semantic-release') {
        steps.push(setupNodeStep(config));
        steps.push(installDependenciesStep(config));
        steps.push(buildStep(config));
        steps.push(semanticReleaseStep(config));
    } else if (config.id === 'aws-s3-cloudfront-deploy') {
        steps.push(setupNodeStep(config));
        steps.push(installDependenciesStep(config));
        steps.push(buildStep(config));
        steps.push(...awsSteps(config));
    } else if (config.id === 'vercel-pro-deployment') {
        steps.push(...vercelSteps(config));
    } else if (config.id === 'security-scan-snyk') {
        steps.push(snykSteps(config));
    } else if (config.id === 'docker-image-publish') {
        steps.push(...dockerPublishSteps(config));
    } else if (config.id === 'auto-tag-version') {
        steps.push(...autoTagSteps(config));
    } else if (config.id === 'laravel-forge-deploy') {
        steps.push(...laravelForgeDeploymentSteps(config));
    } else if (config.id === 'pr-conventional-commit-checker') {
        steps.push(...prConventinalCommitsCheckSteps(config));
    }

    return steps;
}

/**
 * Generate "on" section based on workflow config
 */
function generateOnConfig(config: WorkflowTemplateConfig): Record<string, any> {
    if (config.id === 'node-pr-verify' || config.id === 'nx-pr-verify' || config.id === 'pr-conventional-commit-checker') {
        return { pull_request: {} };
    }

    const branch = config.fields.find((f) => f.key === 'branch')?.value ?? 'main';
    return { push: { branches: [branch] } };
}

/**
 * Generate "env" section based on workflow config
 */
function generateEnvConfig(config: WorkflowTemplateConfig): Record<string, string> | undefined {
    if (config.id !== 'aws-s3-cloudfront-deploy') return undefined;

    const getFieldValue = (key: string): string | undefined => config.fields.find((f) => f.key === key)?.value;

    const regionKey = getFieldValue('awsRegionEnvironmentVariable');
    const regionValue = getFieldValue('awsRegionEnvironmentVariableValue');

    const roleKey = getFieldValue('awsRoleNameEnvironmentVariable');
    const roleValue = getFieldValue('awsRoleNameEnvironmentVariableValue');

    // eslint-disable-next-line no-secrets/no-secrets
    const bucketKey = getFieldValue('awsS3BucketEnvironmentVariable');
    // eslint-disable-next-line no-secrets/no-secrets
    const bucketValue = getFieldValue('awsS3BucketEnvironmentVariableValue');

    const sourceKey = getFieldValue('sourceDirEnvironmentVariable');
    const sourceValue = getFieldValue('sourceDirEnvironmentVariableValue');

    // Validamos que todas las claves estén definidas
    if (!regionKey || !regionValue || !roleKey || !roleValue || !bucketKey || !bucketValue || !sourceKey || !sourceValue) {
        return undefined;
    }

    return {
        [regionKey]: regionValue,
        [roleKey]: roleValue,
        [bucketKey]: bucketValue,
        [sourceKey]: sourceValue,
    };
}

/**
 * Generate "jobs" section based on workflow config
 */
function generateJobs(config: WorkflowTemplateConfig): Record<string, Job> {
    // 👇 lógica para workflows no custom
    const steps = generateSteps(config);

    return {
        [config.jobName ?? 'build']: {
            id: config.jobName ?? 'build',
            name: config.jobName ?? 'build',
            runner: config.runner,
            steps,
        },
    };
}

/**
 * Generate YAML steps from steps configuration
 */
function generateYamlStepsFromSteps(steps: Step[]): any[] {
    return steps.map((step) => {
        const commonFields = {
            id: step.id,
            name: step.name,
            ...(step.env && { env: step.env }),
        };

        if (step.type === 'run') {
            return {
                ...commonFields,
                run: step.run,
            };
        }

        if (step.type === 'uses') {
            const withSection: Record<string, string | number | boolean> = {};

            if (step.with) {
                for (const [key, value] of Object.entries(step.with)) {
                    const isSecret = Boolean(step.secretInputs?.includes(key));
                    withSection[key] = isSecret ? `\${{ secrets.${value} }}` : value;
                }
            }

            return {
                ...commonFields,
                uses: step.uses,
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
        jobsYaml[job.id] = {
            name: job.name,
            'runs-on': job.runner,
            steps: generateYamlStepsFromSteps(job.steps),
        };
    }

    return jobsYaml;
}

/**
 * Generate workflow YAML for templates use case
 *
 * @param workflowConfig Workflow configuration
 *
 * @return Workflow YAML object
 */
export function generateWorkflowYamlForTemplatesUseCase(workflowConfig: WorkflowTemplateConfig): WorkflowYaml {
    const on = generateOnConfig(workflowConfig);
    const env = generateEnvConfig(workflowConfig);
    const jobsInternal = generateJobs(workflowConfig);
    const jobsYaml = generateYamlJobsFromJobs(jobsInternal);

    return {
        name: workflowConfig.fields.find((f) => f.key === 'workflowName')?.value ?? 'Generated Workflow',
        on,
        env,
        jobs: jobsYaml,
    };
}

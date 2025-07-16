import {
    AwsS3CloudFrontWorkflowConfig,
    DockerImagePublishWorkflowConfig,
    Job,
    NodePrVerifyWorkflowConfig,
    NpmPublishWorkflowConfig,
    NxPrVerifyWorkflowConfig,
    SemanticReleaseWorkflowConfig,
    SnykSecurityScanWorkflowConfig,
    Step,
    VercelProDeploymentWorkflowConfig,
    WorkflowConfig,
    WorkflowYaml,
} from '@octolab/domain';

import { snykStackActionMap } from '../domain/constants/actions.const';

function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^\da-z]+/g, '-') // Reemplaza todo lo que no sea alfanumérico por guiones
        .replace(/^-+|-+$/g, ''); // Quita guiones al principio y al final
}

/**
 * Checkout step
 */
function checkoutStep(): Step[] {
    return [
        {
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
function setupNodeStep(
    config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig | NxPrVerifyWorkflowConfig,
): Step {
    return {
        id: 'setup-node-step',
        name: 'Setup Node',
        type: 'uses',
        uses: 'actions/setup-node@v4',
        with: {
            'node-version': config.nodeVersion ?? '18',
        },
    };
}

/**
 * Install dependencies step
 */
function installDependenciesStep(
    config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig | NxPrVerifyWorkflowConfig,
): Step {
    return {
        id: 'install-dependencies-step',
        name: 'Install dependencies',
        type: 'run',
        run: config.installCommand,
    };
}

/**
 * Lint step
 */
function lintStep(config: NodePrVerifyWorkflowConfig | NxPrVerifyWorkflowConfig): Step {
    let runCommand = config.lintCommand;

    if (config.id === 'nx-pr-verify' && config.baseBranch) {
        runCommand = `${runCommand} --base=origin/${config.baseBranch}`;
    }

    return {
        id: 'lint-step',
        name: 'Run lint',
        type: 'run',
        run: runCommand,
    };
}

/**
 * Test step
 */
function testStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | NxPrVerifyWorkflowConfig): Step {
    let runCommand = config.testCommand;

    if (config.id === 'nx-pr-verify' && config.baseBranch) {
        runCommand = `${runCommand} --base=origin/${config.baseBranch}`;
    }

    return {
        id: 'test-step',
        name: 'Run tests',
        type: 'run',
        run: runCommand,
    };
}

/**
 * Build step
 */
function buildStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig | NxPrVerifyWorkflowConfig): Step {
    let runCommand = config.buildCommand;

    if (config.id === 'nx-pr-verify' && config.baseBranch) {
        runCommand = `${runCommand} --base=origin/${config.baseBranch}`;
    }

    return {
        id: 'build-step',
        name: 'Build package',
        type: 'run',
        run: runCommand,
    };
}

/**
 * Publish to NPM step
 */
function npmPublishStep(config: NpmPublishWorkflowConfig): Step {
    return {
        id: 'npm-publish-step',
        name: 'Publish to NPM',
        type: 'uses',
        uses: 'JS-DevTools/npm-publish@v3',
        with: {
            token: `\${{ secrets.${config.npmTokenSecret} }}`,
        },
    };
}

/**
 * Semantic Release step
 */
function semanticReleaseStep(config: SemanticReleaseWorkflowConfig): Step {
    return {
        id: 'semantic-release-step',
        name: 'Release with Semantic Release',
        type: 'uses',
        run: config.releaseCommand,
        env: {
            GITHUB_TOKEN: `\${{ secrets.${config.githubTokenSecret} }}`,
        },
    };
}

/**
 * AWS S3 and CloudFront deployment steps
 */
function awsSteps(config: AwsS3CloudFrontWorkflowConfig): Step[] {
    return [
        {
            id: 'configure-aws-credentials-step',
            name: 'Configure AWS credentials with IAM Role',
            type: 'uses',
            uses: 'aws-actions/configure-aws-credentials@v4',
            with: {
                'role-to-assume': `arn:aws:iam::\${{ secrets.${config.awsAccountIdSecret} }}:role/\${{ env.${config.awsRoleNameEnvironmentVariable} }}`,
                'aws-region': `\${{ env.${config.awsRegionEnvironmentVariable} }}`,
            },
        },
        {
            id: 'sync-files-to-s3-step',
            name: 'Sync files to S3',
            type: 'run',
            run: `aws s3 sync \${{ env.${config.sourceDirEnvironmentVariable} }} s3://\${{ env.${config.awsS3BucketEnvironmentVariable} }}/ --delete --exclude '.*git*'`,
        },
        {
            id: 'invalidate-cloudfront-cache-step',
            name: 'Invalidate CloudFront Cache',
            type: 'run',
            run: `aws cloudfront create-invalidation --distribution-id \${{ secrets.${config.cloudfrontDistributionIdSecret} }} --paths "/*"`,
        },
    ];
}

/**
 * Vercel-specific steps
 */
function vercelSteps(config: VercelProDeploymentWorkflowConfig): Step[] {
    return [
        {
            id: 'install-vercel-cli-step',
            name: 'Install Vercel CLI',
            type: 'run',
            run: 'npm install --global vercel@latest',
        },
        {
            id: 'pull-vercel-env-info-step',
            name: 'Pull Vercel Environment Information',
            type: 'run',
            run: `vercel pull --yes --environment=production --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            id: 'build-vercel-artifacts-step',
            name: 'Build Project Artifacts',
            type: 'run',
            run: `vercel build --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            id: 'deploy-vercel-artifacts-step',
            name: 'Deploy Project Artifacts to Vercel',
            type: 'run',
            run: `vercel deploy --prebuilt --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
    ];
}

/**
 * Snyk specific steps
 */
function snykSteps(config: SnykSecurityScanWorkflowConfig): Step {
    const actionName = snykStackActionMap[config.snykCodeStack];

    return {
        id: 'run-snyk-step',
        name: 'Run Snyk to check for vulnerabilities',
        type: 'uses',
        uses: `snyk/actions/${actionName}@master`,
        env: {
            SNYK_TOKEN: `\${{ secrets.${config.snykTokenSecret} }}`,
        },
        with: {
            args: `--severity-threshold=${config.snykSeverityThreshold}`,
        },
    };
}

/**
 * Docker publish steps
 */
function dockerPublishSteps(config: DockerImagePublishWorkflowConfig): Step[] {
    // Construir el objeto "with" para login dinámicamente
    const loginWith: Record<string, string> = {
        username: config.dockerUsername,
        password: `\${{ secrets.${config.dockerPasswordSecret} }}`,
    };

    // Si el usuario selecciona GitHub Container Registry, añadir registry
    if (config.dockerRegistry === 'Github Container Registry') {
        loginWith.registry = 'ghcr.io';
    }

    return [
        {
            id: 'login-to-docker-registry-step',
            name: 'Login to Docker Registry',
            type: 'uses',
            uses: 'docker/login-action@v3',
            with: loginWith,
        },
        {
            id: 'setup-qemu-step',
            name: 'Set up QEMU',
            type: 'uses',
            uses: 'docker/setup-qemu-action@v3',
        },
        {
            id: 'setup-buildx-step',
            name: 'Set up Docker Buildx',
            type: 'uses',
            uses: 'docker/setup-buildx-action@v3',
        },
        {
            id: 'build-and-push-step',
            name: 'Build and push',
            type: 'uses',
            uses: 'docker/build-push-action@v6',
            with: {
                context: config.dockerBuildContext,
                file: config.dockerDockerfile,
                push: true,
                tags: config.dockerImageTags,
            },
        },
    ];
}

/**
 * Generate steps based on workflow config
 */
function generateSteps(config: WorkflowConfig): Step[] {
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
    }

    return steps;
}

/**
 * Generate "on" section based on workflow config
 */
function generateOnConfig(config: WorkflowConfig): Record<string, any> {
    if (config.id === 'custom') {
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
                        cron: '0 0 * * *', // Default cron example
                    },
                ],
            };
        }
    }

    if (config.id === 'node-pr-verify' || config.id === 'nx-pr-verify') {
        return { pull_request: {} };
    }

    return { push: { branches: [config.branch ?? 'main'] } };
}

/**
 * Generate "env" section based on workflow config
 */
function generateEnvConfig(config: WorkflowConfig): Record<string, string> | undefined {
    if (config.id === 'aws-s3-cloudfront-deploy') {
        return {
            [config.awsRegionEnvironmentVariable]: config.awsRegionEnvironmentVariableValue,
            [config.awsRoleNameEnvironmentVariable]: config.awsRoleNameEnvironmentVariableValue,
            [config.awsS3BucketEnvironmentVariable]: config.awsS3BucketEnvironmentVariableValue,
            [config.sourceDirEnvironmentVariable]: config.sourceDirEnvironmentVariableValue,
        };
    }
    return undefined;
}

/**
 * Generate "jobs" section based on workflow config
 */
function generateJobs(config: WorkflowConfig): Record<string, Job> {
    if (config.id === 'custom') {
        const jobs: Record<string, Job> = {};

        for (const customJob of config.jobs) {
            jobs[customJob.id] = {
                id: customJob.id,
                name: customJob.name,
                runner: customJob.runner,
                steps: customJob.steps,
            };
        }

        return jobs;
    }

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
 * Generate a workflow from a workflow config
 */
export function generateEditingWorkflowFromConfigUseCase(workflowConfig: WorkflowConfig): WorkflowYaml {
    const on = generateOnConfig(workflowConfig);
    const env = generateEnvConfig(workflowConfig);
    const jobsInternal = generateJobs(workflowConfig);

    const jobsYaml: Record<string, any> = {};

    for (const [, job] of Object.entries(jobsInternal)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const stepsYaml = job.steps.map(({ id, type, ...rest }) => rest);

        const jobKey = slugify(job.name);

        jobsYaml[jobKey] = {
            name: job.name,
            'runs-on': job.runner,
            steps: stepsYaml,
        };
    }

    return {
        name: workflowConfig.workflowName,
        on,
        env,
        jobs: jobsYaml,
    };
}

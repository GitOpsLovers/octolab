import {
    AutoTagVersionWorkflowConfig,
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
function setupNodeStep(
    config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig | NxPrVerifyWorkflowConfig,
): Step {
    return {
        internalId: uuidv4(),
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
        internalId: uuidv4(),
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
function testStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | NxPrVerifyWorkflowConfig): Step {
    let runCommand = config.testCommand;

    if (config.id === 'nx-pr-verify' && config.baseBranch) {
        runCommand = `${runCommand} --base=origin/${config.baseBranch}`;
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
function buildStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig | NxPrVerifyWorkflowConfig): Step {
    let runCommand = config.buildCommand;

    if (config.id === 'nx-pr-verify' && config.baseBranch) {
        runCommand = `${runCommand} --base=origin/${config.baseBranch}`;
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
function npmPublishStep(config: NpmPublishWorkflowConfig): Step {
    return {
        internalId: uuidv4(),
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
        internalId: uuidv4(),
        id: 'semantic-release-step',
        name: 'Release with Semantic Release',
        type: 'run',
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
            internalId: uuidv4(),
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
            internalId: uuidv4(),
            id: 'sync-files-to-s3-step',
            name: 'Sync files to S3',
            type: 'run',
            run: `aws s3 sync \${{ env.${config.sourceDirEnvironmentVariable} }} s3://\${{ env.${config.awsS3BucketEnvironmentVariable} }}/ --delete --exclude '.*git*'`,
        },
        {
            internalId: uuidv4(),
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
            run: `vercel pull --yes --environment=production --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            internalId: uuidv4(),
            id: 'build-vercel-artifacts-step',
            name: 'Build Project Artifacts',
            type: 'run',
            run: `vercel build --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            internalId: uuidv4(),
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
        internalId: uuidv4(),
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
                context: config.dockerBuildContext,
                file: config.dockerDockerfile,
                push: true,
                tags: config.dockerImageTags,
            },
        },
    ];
}

/**
 * Auto tag steps
 */
function autoTagSteps(config: AutoTagVersionWorkflowConfig): Step[] {
    return [
        {
            internalId: uuidv4(),
            id: 'auto-tag-step',
            name: 'Auto Tag Version',
            type: 'uses',
            uses: 'salsify/action-detect-and-tag-new-version@v23',
            with: {
                'version-command': config.autoTagVersionCommand,
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
    } else if (config.id === 'auto-tag-version') {
        steps.push(...autoTagSteps(config));
    }

    return steps;
}

/**
 * Generate "on" section based on workflow config
 */
function generateOnConfig(config: WorkflowConfig): Record<string, any> {
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
export function generateWorkflowYamlForTemplatesUseCase(workflowConfig: WorkflowConfig): WorkflowYaml {
    const on = generateOnConfig(workflowConfig);
    const env = generateEnvConfig(workflowConfig);
    const jobsInternal = generateJobs(workflowConfig);
    const jobsYaml = generateYamlJobsFromJobs(jobsInternal);

    return {
        name: workflowConfig.workflowName,
        on,
        env,
        jobs: jobsYaml,
    };
}

import {
    AwsS3CloudFrontWorkflowConfig,
    Job,
    NodePrVerifyWorkflowConfig,
    NpmPublishWorkflowConfig,
    SemanticReleaseWorkflowConfig,
    Step,
    VercelProDeploymentWorkflowConfig,
    WorkflowConfig,
    WorkflowYaml,
} from '@octolab/domain';

/**
 * Checkout step
 */
function checkoutStep(): Step[] {
    return [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v4',
        },
    ];
}

/**
 * Setup Node step
 */
function setupNodeStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig): Step {
    return {
        name: 'Setup Node',
        uses: 'actions/setup-node@v4',
        with: {
            'node-version': config.nodeVersion ?? '18',
        },
    };
}

/**
 * Install dependencies step
 */
function installDependenciesStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig): Step {
    return {
        name: 'Install dependencies',
        run: config.installCommand,
    };
}

/**
 * Lint step
 */
function lintStep(config: NodePrVerifyWorkflowConfig): Step {
    return {
        name: 'Run lint',
        run: config.lintCommand,
    };
}

/**
 * Test step
 */
function testStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig): Step {
    return {
        name: 'Run tests',
        run: config.testCommand,
    };
}

/**
 * Build step
 */
function buildStep(config: NodePrVerifyWorkflowConfig | NpmPublishWorkflowConfig | SemanticReleaseWorkflowConfig | AwsS3CloudFrontWorkflowConfig): Step {
    return {
        name: 'Build package',
        run: config.buildCommand,
    };
}

/**
 * Publish to NPM step
 */
function npmPublishStep(config: NpmPublishWorkflowConfig): Step {
    return {
        name: 'Publish to NPM',
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
        name: 'Release with Semantic Release',
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
            name: 'Configure AWS credentials with IAM Role',
            uses: 'aws-actions/configure-aws-credentials@v4',
            with: {
                'role-to-assume': `arn:aws:iam::\${{ secrets.${config.awsAccountIdSecret} }}:role/\${{ env.${config.awsRoleNameEnvironmentVariable} }}`,
                'aws-region': `\${{ env.${config.awsRegionEnvironmentVariable} }}`,
            },
        },
        {
            name: 'Sync files to S3',
            run: `aws s3 sync \${{ env.${config.sourceDirEnvironmentVariable} }} s3://\${{ env.${config.awsS3BucketEnvironmentVariable} }}/ --delete --exclude '.*git*'`,
        },
        {
            name: 'Invalidate CloudFront Cache',
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
            name: 'Install Vercel CLI',
            run: 'npm install --global vercel@latest',
        },
        {
            name: 'Pull Vercel Environment Information',
            run: `vercel pull --yes --environment=production --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            name: 'Build Project Artifacts',
            run: `vercel build --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
        {
            name: 'Deploy Project Artifacts to Vercel',
            run: `vercel deploy --prebuilt --prod --token=\${{ secrets.${config.vercelTokenSecret} }}`,
        },
    ];
}

/**
 * Generate steps based on workflow config
 */
function generateSteps(config: WorkflowConfig): Step[] {
    const steps = checkoutStep();

    if (config.id === 'node-pr-verify') {
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
    }

    return steps;
}

/**
 * Generate "on" section based on workflow config
 */
function generateOnConfig(config: WorkflowConfig): Record<string, any> {
    if (config.id === 'node-pr-verify') {
        return { pull_request: {} };
    }
    return { push: { branches: [config.branch] } };
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
 * Generate a workflow from a workflow config
 */
export function generateEditingWorkflowFromConfigUseCase(workflowConfig: WorkflowConfig): WorkflowYaml {
    const on = generateOnConfig(workflowConfig);
    const env = generateEnvConfig(workflowConfig);
    const steps = generateSteps(workflowConfig);

    let job: Job;

    if (workflowConfig.id === 'aws-s3-cloudfront-deploy') {
        job = {
            'runs-on': workflowConfig.runner,
            permissions: {
                'id-token': 'write',
                contents: 'read',
            },
            steps,
        };

        return {
            name: workflowConfig.workflowName,
            on,
            env,
            jobs: {
                [workflowConfig.jobName ?? 'build']: job,
            },
        };
    } else {
        job = {
            'runs-on': workflowConfig.runner,
            steps,
        };

        return {
            name: workflowConfig.workflowName,
            on,
            jobs: {
                [workflowConfig.jobName ?? 'build']: job,
            },
        };
    }
}

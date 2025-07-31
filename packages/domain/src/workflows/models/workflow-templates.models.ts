/**
 * Workflow template configuration model
 */
export type WorkflowTemplateConfig =
    | NpmPublishWorkflowConfig
    | NodePrVerifyWorkflowConfig
    | VercelProDeploymentWorkflowConfig
    | SemanticReleaseWorkflowConfig
    | AwsS3CloudFrontWorkflowConfig
    | NxPrVerifyWorkflowConfig
    | SnykSecurityScanWorkflowConfig
    | DockerImagePublishWorkflowConfig
    | AutoTagVersionWorkflowConfig
    | LaravelForgeDeployWorkflowConfig;

/**
 * Base workflow template configuration model
 */
export interface BaseWorkflowTemplateConfig {
    id: string;
    name: string;
    description: string;
    filename: string;
    workflowName: string;
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'npm-publish';
    runner: string;
    jobName: string;
    branch: string;
    installCommand?: string;
    testCommand: string;
    buildCommand?: string;
    npmTokenSecret: string;
    nodeVersion?: string;
}

/**
 * Template configuration for Node PR Verify workflow
 */
export interface NodePrVerifyWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'node-pr-verify';
    runner: string;
    jobName: string;
    installCommand?: string;
    lintCommand: string;
    testCommand: string;
    buildCommand?: string;
    nodeVersion?: string;
}

/**
 * Template configuration for NX PR Verify workflow
 */
export interface NxPrVerifyWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'nx-pr-verify';
    runner: string;
    jobName: string;
    baseBranch: string;
    installCommand?: string;
    lintCommand: string;
    testCommand: string;
    buildCommand?: string;
    nodeVersion?: string;
}

/**
 * Template configuration for Vercel PRO deployment workflow
 */
export interface VercelProDeploymentWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'vercel-pro-deployment';
    runner: string;
    jobName: string;
    branch: string;
    vercelTokenSecret: string;
}

/**
 * Template configuration for Semantic Release workflow
 */
export interface SemanticReleaseWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'semantic-release';
    runner: string;
    jobName: string;
    branch: string;
    installCommand?: string;
    buildCommand?: string;
    releaseCommand: string;
    githubTokenSecret: string;
    nodeVersion?: string;
}

/**
 * Template configuration for AWS S3 CloudFront deployment workflow
 */
export interface AwsS3CloudFrontWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'aws-s3-cloudfront-deploy';
    runner: string;
    jobName: string;
    branch: string;
    installCommand?: string;
    buildCommand?: string;
    awsRegionEnvironmentVariable: string;
    awsRegionEnvironmentVariableValue: string;
    awsRoleNameEnvironmentVariable: string;
    awsRoleNameEnvironmentVariableValue: string;
    awsS3BucketEnvironmentVariable: string;
    awsS3BucketEnvironmentVariableValue: string;
    sourceDirEnvironmentVariable: string;
    sourceDirEnvironmentVariableValue: string;
    cloudfrontDistributionIdSecret: string;
    awsAccountIdSecret: string;
    nodeVersion?: string;
}

/**
 * Template configuration for Snyk Security Scan workflow
 */
export interface SnykSecurityScanWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'security-scan-snyk';
    runner: string;
    jobName: string;
    branch: string;
    snykCodeStack: string;
    snykSeverityThreshold: string;
    snykTokenSecret: string;
}

/**
 * Template configuration for Docker image publish workflow
 */
export interface DockerImagePublishWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'docker-image-publish';
    runner: string;
    jobName: string;
    branch: string;
    dockerRegistry: string;
    dockerUsername: string;
    dockerPasswordSecret: string;
    dockerBuildContext: string;
    dockerDockerfile: string;
    dockerImageTags: string;
}

/**
 * Template configuration for Auto Tag Version workflow
 */
export interface AutoTagVersionWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'auto-tag-version';
    runner: string;
    jobName: string;
    branch: string;
    autoTagVersionCommand: string;
}

/**
 * Template configuration for Laravel Forge deployment workflow
 */
export interface LaravelForgeDeployWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'laravel-forge-deploy';
    runner: string;
    jobName: string;
    branch: string;
    deployMode: 'webhook' | 'api';
    laravelForgeDeployTriggerUrlSecretName: string;
    laravelForgeDeployApiKeySecretName: string;
    laravelForgeDeployServerIdSecretName: string;
    laravelForgeDeploySiteIdSecretName: string;
}

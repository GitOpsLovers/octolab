/**
 * Workflow configuration model
 */
export type WorkflowConfig =
    | NpmPublishWorkflowConfig
    | NodePrVerifyWorkflowConfig
    | VercelProDeploymentWorkflowConfig
    | SemanticReleaseWorkflowConfig
    | AwsS3CloudFrontWorkflowConfig
    | NxPrVerifyWorkflowConfig
    | SnykSecurityScanWorkflowConfig
    | DockerImagePublishWorkflowConfig;

/**
 * Base workflow configuration model
 */
export interface BaseWorkflowConfig {
    id: string;
    runner: string;
    jobName: string;
    name: string;
    description: string;
    filename: string;
    workflowName: string;
    branch?: string;
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishWorkflowConfig extends BaseWorkflowConfig {
    id: 'npm-publish';
    installCommand?: string;
    testCommand: string;
    buildCommand?: string;
    npmTokenSecret: string;
    nodeVersion?: string;
}

/**
 * Template configuration for Node PR Verify workflow
 */
export interface NodePrVerifyWorkflowConfig extends BaseWorkflowConfig {
    id: 'node-pr-verify';
    installCommand?: string;
    lintCommand: string;
    testCommand: string;
    buildCommand?: string;
    nodeVersion?: string;
}

/**
 * Template configuration for NX PR Verify workflow
 */
export interface NxPrVerifyWorkflowConfig extends BaseWorkflowConfig {
    id: 'nx-pr-verify';
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
export interface VercelProDeploymentWorkflowConfig extends BaseWorkflowConfig {
    id: 'vercel-pro-deployment';
    vercelTokenSecret: string;
}

/**
 * Template configuration for Semantic Release workflow
 */
export interface SemanticReleaseWorkflowConfig extends BaseWorkflowConfig {
    id: 'semantic-release';
    installCommand?: string;
    buildCommand?: string;
    releaseCommand: string;
    githubTokenSecret: string;
    nodeVersion?: string;
}

/**
 * Template configuration for AWS S3 CloudFront deployment workflow
 */
export interface AwsS3CloudFrontWorkflowConfig extends BaseWorkflowConfig {
    id: 'aws-s3-cloudfront-deploy';
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
export interface SnykSecurityScanWorkflowConfig extends BaseWorkflowConfig {
    id: 'security-scan-snyk';
    snykCodeStack: string;
    snykSeverityThreshold: string;
    snykTokenSecret: string;
}

/**
 * Template configuration for Docker image publish workflow
 */
export interface DockerImagePublishWorkflowConfig extends BaseWorkflowConfig {
    id: 'docker-image-publish';
    dockerRegistry: string;
    dockerUsername: string;
    dockerPasswordSecret: string;
    dockerBuildContext: string;
    dockerDockerfile: string;
    dockerImageTags: string;
}

/**
 * Workflow YAML model
 */
export interface WorkflowYaml {
    name: string;
    on: any;
    env?: Record<string, string>;
    jobs: Record<string, Job>;
}

/**
 * Jobs model
 */
export interface Job {
    'runs-on': string;
    permissions?: Record<string, string>;
    steps: Step[];
}

/**
 * Step model
 */
export interface Step {
    name: string;
    run?: string;
    uses?: string;
    with?: Record<string, string | number | boolean>;
    env?: Record<string, string>;
}

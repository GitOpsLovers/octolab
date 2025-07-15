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
    | SnykSecurityScanWorkflowConfig;

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
    nodeVersion?: string;
    installCommand?: string;
    buildCommand?: string;
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishWorkflowConfig extends BaseWorkflowConfig {
    id: 'npm-publish';
    testCommand: string;
    npmTokenSecret: string;
}

/**
 * Template configuration for Node PR Verify workflow
 */
export interface NodePrVerifyWorkflowConfig extends BaseWorkflowConfig {
    id: 'node-pr-verify';
    lintCommand: string;
    testCommand: string;
}

/**
 * Template configuration for NX PR Verify workflow
 */
export interface NxPrVerifyWorkflowConfig extends BaseWorkflowConfig {
    id: 'nx-pr-verify';
    lintCommand: string;
    testCommand: string;
    baseBranch: string;
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
    releaseCommand: string;
    githubTokenSecret: string;
}

/**
 * Template configuration for AWS S3 CloudFront deployment workflow
 */
export interface AwsS3CloudFrontWorkflowConfig extends BaseWorkflowConfig {
    id: 'aws-s3-cloudfront-deploy';
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
    with?: Record<string, string>;
    env?: Record<string, string>;
}

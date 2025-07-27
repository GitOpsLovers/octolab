import { Action } from '../../actions/models/actions.models';
import { Trigger } from '../../triggers/models/triggers.models';

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
    name: string;
    description: string;
    filename: string;
    workflowName: string;
}

/**
 * Configuration for custom workflows
 */
export interface CustomWorkflowConfig extends BaseWorkflowConfig {
    id: 'custom';
    on: Trigger;
    branch?: string;
    schedule?: string;
    jobs: Job[];
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishWorkflowConfig extends BaseWorkflowConfig {
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
export interface NodePrVerifyWorkflowConfig extends BaseWorkflowConfig {
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
export interface NxPrVerifyWorkflowConfig extends BaseWorkflowConfig {
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
export interface VercelProDeploymentWorkflowConfig extends BaseWorkflowConfig {
    id: 'vercel-pro-deployment';
    runner: string;
    jobName: string;
    branch: string;
    vercelTokenSecret: string;
}

/**
 * Template configuration for Semantic Release workflow
 */
export interface SemanticReleaseWorkflowConfig extends BaseWorkflowConfig {
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
export interface AwsS3CloudFrontWorkflowConfig extends BaseWorkflowConfig {
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
export interface SnykSecurityScanWorkflowConfig extends BaseWorkflowConfig {
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
export interface DockerImagePublishWorkflowConfig extends BaseWorkflowConfig {
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
 * Workflow YAML model
 */
export interface WorkflowYaml {
    name: string;
    on: any;
    env?: Record<string, string>;
    jobs: Record<string, Job>;
}

/**
 * Job model
 */
export interface Job {
    id: string;
    if?: string;
    needs?: string[];
    name: string;
    runner: string;
    steps: Step[];
}

/**
 * Step model
 */
export interface Step {
    internalId: string;
    id: string;
    if?: string;
    name: string;
    type: 'run' | 'uses';
    run?: string;
    uses?: string;
    with?: Record<string, string | number | boolean>;
    env?: Record<string, string>;
    secretInputs?: string[];
    environmentVariables?: string[];
    stepEnvironmentVariables?: string[];
    templates?: Record<string, string>;
    hiddenInputs?: string[];
    stepActionInputs?: Action['inputs'];
}

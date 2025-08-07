import { TemplateField } from '../../templates/models/templates.models';

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
    | LaravelForgeDeployWorkflowConfig
    | PrConventionalCommitCheckerWorkflowConfig;

/**
 * Base workflow template configuration model
 */
export interface BaseWorkflowTemplateConfig {
    id: string;
    name: string;
    description: string;
    filename: string;
    fields: TemplateField[];
}

/**
 * Template configuration for NPM publish workflow
 */
export interface NpmPublishWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'npm-publish';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Node PR Verify workflow
 */
export interface NodePrVerifyWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'node-pr-verify';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for NX PR Verify workflow
 */
export interface NxPrVerifyWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'nx-pr-verify';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Vercel PRO deployment workflow
 */
export interface VercelProDeploymentWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'vercel-pro-deployment';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Semantic Release workflow
 */
export interface SemanticReleaseWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'semantic-release';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for AWS S3 CloudFront deployment workflow
 */
export interface AwsS3CloudFrontWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'aws-s3-cloudfront-deploy';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Snyk Security Scan workflow
 */
export interface SnykSecurityScanWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'security-scan-snyk';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Docker image publish workflow
 */
export interface DockerImagePublishWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'docker-image-publish';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Auto Tag Version workflow
 */
export interface AutoTagVersionWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'auto-tag-version';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Laravel Forge deployment workflow
 */
export interface LaravelForgeDeployWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'laravel-forge-deploy';
    runner: string;
    jobName: string;
}

/**
 * Template configuration for Pull Request Conventional Commit checker
 */
export interface PrConventionalCommitCheckerWorkflowConfig extends BaseWorkflowTemplateConfig {
    id: 'pr-conventional-commit-checker';
    runner: string;
    jobName: string;
}

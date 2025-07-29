'use client';

import { ReactNode } from 'react';

import { useEditorTemplate } from '../hooks/editor-template.hooks';

/**
 * Template workflow form component
 */
export function TemplateWorkflowForm(): ReactNode {
    const { editingWorkflow, availableRunners, errors, setEditingWorkflow, resetEditingWorkflow, setErrors } = useEditorTemplate();

    // Validate field input
    const validateField = (field: string, value: string) => {
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, [field]: 'This field cannot be empty' }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    if (!editingWorkflow) return null;

    const fieldsConfig = [
        {
            key: 'workflowName',
            label: 'Name',
            placeholder: 'CI Workflow',
            show: true,
            type: 'input',
        },
        {
            key: 'runner',
            label: 'Runner',
            show: true,
            type: 'select',
            options: availableRunners,
        },
        {
            key: 'branch',
            label: 'Target Branch',
            show: editingWorkflow.id !== 'node-pr-verify' && editingWorkflow.id !== 'nx-pr-verify',
            type: 'input',
        },
        {
            key: 'baseBranch',
            label: 'Base Branch',
            show: editingWorkflow.id === 'nx-pr-verify',
            type: 'input',
        },
        {
            key: 'nodeVersion',
            label: 'Node version',
            show:
                editingWorkflow.id !== 'vercel-pro-deployment' &&
                editingWorkflow.id !== 'security-scan-snyk' &&
                editingWorkflow.id !== 'docker-image-publish' &&
                editingWorkflow.id !== 'auto-tag-version',
            type: 'select',
            options: ['16', '18', '20', '22'],
        },
        {
            key: 'installCommand',
            label: 'Installation command',
            placeholder: 'npm install',
            show:
                editingWorkflow.id !== 'vercel-pro-deployment' &&
                editingWorkflow.id !== 'security-scan-snyk' &&
                editingWorkflow.id !== 'docker-image-publish' &&
                editingWorkflow.id !== 'auto-tag-version',
            type: 'input',
        },
        {
            key: 'lintCommand',
            label: 'Lint command',
            placeholder: 'npm lint',
            show: editingWorkflow.id === 'node-pr-verify' || editingWorkflow.id === 'nx-pr-verify',
            type: 'input',
        },
        {
            key: 'testCommand',
            label: 'Test command',
            placeholder: 'npm test',
            show: editingWorkflow.id === 'node-pr-verify' || editingWorkflow.id === 'npm-publish' || editingWorkflow.id === 'nx-pr-verify',
            type: 'input',
        },
        {
            key: 'buildCommand',
            label: 'Build command',
            placeholder: 'npm run build',
            show:
                editingWorkflow.id !== 'vercel-pro-deployment' &&
                editingWorkflow.id !== 'security-scan-snyk' &&
                editingWorkflow.id !== 'docker-image-publish' &&
                editingWorkflow.id !== 'auto-tag-version',
            type: 'input',
        },
        {
            key: 'releaseCommand',
            label: 'Release command',
            placeholder: 'npx semantic-release',
            show: editingWorkflow.id === 'semantic-release',
            type: 'input',
        },
        {
            key: 'npmTokenSecret',
            label: 'NPM Token Secret Name',
            placeholder: 'Ej: NPM_TOKEN',
            show: editingWorkflow.id === 'npm-publish',
            type: 'input',
        },
        {
            key: 'vercelTokenSecret',
            label: 'Vercel Token Secret Name',
            placeholder: 'Ej: VERCEL_TOKEN',
            show: editingWorkflow.id === 'vercel-pro-deployment',
            type: 'input',
        },
        {
            key: 'githubTokenSecret',
            label: 'GitHub Token Secret Name',
            placeholder: 'Ej: GITHUB_TOKEN',
            show: editingWorkflow.id === 'semantic-release',
            type: 'input',
        },
        {
            key: 'awsRegionEnvironmentVariable',
            label: 'AWS region environment variable name',
            placeholder: 'MY_AWS_REGION',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'awsRegionEnvironmentVariableValue',
            label: 'AWS region environment variable value',
            placeholder: 'Add your AWS region',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'awsRoleNameEnvironmentVariable',
            label: 'AWS role name environment variable name',
            placeholder: 'AWS_ROLENAME',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'awsRoleNameEnvironmentVariableValue',
            label: 'AWS role name environment variable value',
            placeholder: 'Add your AWS role name',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'sourceDirEnvironmentVariable',
            label: 'Source directory environment variable name',
            placeholder: 'SOURCE_DIR',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'sourceDirEnvironmentVariableValue',
            label: 'Source directory environment variable value',
            placeholder: './build',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            // eslint-disable-next-line no-secrets/no-secrets
            key: 'awsS3BucketEnvironmentVariable',
            label: 'AWS S3 Bucket environment variable name',
            placeholder: 'AWS_S3_BUCKET',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            // eslint-disable-next-line no-secrets/no-secrets
            key: 'awsS3BucketEnvironmentVariableValue',
            label: 'AWS S3 Bucket environment variable value',
            placeholder: 'Add your AWS S3 Bucket',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'awsAccountIdSecret',
            label: 'AWS account ID secret name',
            placeholder: 'Ej: AWS_ACCOUNT_ID',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'cloudfrontDistributionIdSecret',
            label: 'CloudFront distribution ID secret name',
            placeholder: 'Ej: CLOUDFRONT_DISTRIBUTION_ID',
            show: editingWorkflow.id === 'aws-s3-cloudfront-deploy',
            type: 'input',
        },
        {
            key: 'snykCodeStack',
            label: 'Code stack',
            show: editingWorkflow.id === 'security-scan-snyk',
            type: 'select',
            options: ['Dotnet', 'Golang', 'Gradle', 'Maven', 'Node', 'PHP', 'Python', 'Ruby'],
        },
        {
            key: 'snykSeverityThreshold',
            label: 'Severity threshold',
            show: editingWorkflow.id === 'security-scan-snyk',
            type: 'select',
            options: ['low', 'medium', 'high'],
        },
        {
            key: 'snykTokenSecret',
            label: 'Snyk token secret name',
            placeholder: 'Ej: SNYK_TOKEN',
            show: editingWorkflow.id === 'security-scan-snyk',
            type: 'input',
        },
        {
            key: 'dockerRegistry',
            label: 'Docker registry',
            show: editingWorkflow.id === 'docker-image-publish',
            type: 'select',
            options: ['Docker', 'Github Container Registry'],
        },
        {
            key: 'dockerUsername',
            label: 'Docker Hub username',
            placeholder: 'Ej: myDockerUsername',
            show: editingWorkflow.id === 'docker-image-publish',
            type: 'input',
        },
        {
            key: 'dockerPasswordSecret',
            label: 'Docker Hub password secret name',
            placeholder: 'Ej: DOCKER_PASSWORD',
            show: editingWorkflow.id === 'docker-image-publish',
            type: 'input',
        },
        {
            key: 'dockerBuildContext',
            label: 'Docker build context',
            placeholder: 'Ej: .',
            show: editingWorkflow.id === 'docker-image-publish',
            type: 'input',
        },
        {
            key: 'dockerDockerfile',
            label: 'Dockerfile',
            placeholder: 'Ej: Dockerfile',
            show: editingWorkflow.id === 'docker-image-publish',
            type: 'input',
        },
        {
            key: 'dockerImageTags',
            label: 'Docker image tags (comma separated)',
            placeholder: 'Ej: latest',
            show: editingWorkflow.id === 'docker-image-publish',
            type: 'input',
        },
        {
            key: 'autoTagVersionCommand',
            label: 'Version command',
            placeholder: 'cat current-version.txt',
            show: editingWorkflow.id === 'auto-tag-version',
            type: 'input',
        },
    ];

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col mb-4">
            <h2 className="text-xl font-bold text-text mb-4">Edit Configuration</h2>

            {fieldsConfig.map((field) => {
                if (!field.show) return null;

                const value = (editingWorkflow as any)[field.key] ?? '';
                return (
                    <div key={field.key} className="mb-4">
                        <label className="block text-sm font-medium text-text mb-1">{field.label}</label>
                        {field.type === 'input' ? (
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setEditingWorkflow({ ...editingWorkflow, [field.key]: newValue });
                                    validateField(field.key, newValue);
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                                placeholder={field.placeholder}
                            />
                        ) : (
                            <select
                                value={value}
                                onChange={(e) => {
                                    setEditingWorkflow({ ...editingWorkflow, [field.key]: e.target.value });
                                }}
                                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            >
                                {field.options?.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors[field.key] && <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>}
                    </div>
                );
            })}

            <button
                type="button"
                onClick={() => {
                    resetEditingWorkflow();
                    setErrors({});
                }}
                data-umami-event={`[Workflow template editor] Reset values on ${editingWorkflow.id} click`}
                className="mt-2 border border-secondary font-semibold text-secondary px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/80 transition self-start"
            >
                Reset Values
            </button>
        </div>
    );
}

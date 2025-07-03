'use client';

import toast from 'react-hot-toast';
import { FaRegFileAlt } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import yaml from 'yaml';

import { useEditor } from '../hooks/editor.hooks';

import { Step } from '@features/editor/domain/editor.models';
import { availableTemplates } from '@features/templates/domain/constants/available-templates.const';

/**
 * Yaml preview component.
 */
export function YamlPreview() {
    const { config, errors } = useEditor();
    const templateData = availableTemplates.find((t) => t.id === config.template);
    const fileName = templateData ? templateData.filename : 'workflow.yml';

    const steps: Step[] = [
        {
            name: 'Checkout code',
            uses: 'actions/checkout@v3',
        },
        {
            name: 'Setup Node',
            uses: 'actions/setup-node@v3',
            with: {
                'node-version': config.nodeVersion,
                'registry-url': 'https://registry.npmjs.org/',
            },
        },
        {
            name: 'Install dependencies',
            run: config.installCommand,
        },
        {
            name: 'Run tests',
            run: config.testCommand,
        },
        {
            name: 'Build package',
            run: config.buildCommand,
        },
    ];

    if (config.template === 'npm-publish') {
        steps.push({
            name: 'Publish to NPM',
            run: 'npm publish',
            env: {
                NODE_AUTH_TOKEN: `\${{ secrets.${config.npmTokenSecret} }}`,
            },
        });
    }

    const fullConfig = {
        name: config.workflowName,
        on: {
            push: {
                branches: [config.branch],
            },
            ...(config.template === 'node-ci' && { pull_request: {} }),
        },
        jobs: {
            [templateData?.jobName ?? 'build']: {
                'runs-on': 'ubuntu-latest',
                steps: steps,
            },
        },
    };

    const yamlContent = yaml.stringify(fullConfig);

    // Copy to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(yamlContent);
            toast.success('YAML copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy YAML', err);
            toast.error('Error copying YAML');
        }
    };

    // Download YAML file
    const handleDownload = () => {
        try {
            const blob = new Blob([yamlContent], { type: 'text/yaml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('File downloaded');
        } catch (err) {
            console.error('Failed to download YAML', err);
            toast.error('Error downloading YAML');
        }
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="w-full lg:w-1/2 flex flex-col h-full">
            <SyntaxHighlighter
                language="yaml"
                style={oneDark}
                customStyle={{
                    flex: 1,
                    overflow: 'auto',
                    margin: '0 0  1rem',
                    borderRadius: '0.375rem',
                }}
            >
                {yamlContent}
            </SyntaxHighlighter>

            {/* Informative banner */}
            <div className="bg-background border border-border px-4 py-3 rounded-md mb-4 flex items-center gap-2">
                <FaRegFileAlt className="w-5 h-5 text-primary" />

                <div>
                    <p className="text-sm text-text font-medium">
                        Save this file as <code className="bg-muted px-1 py-0.5 rounded">.github/workflows/{fileName}</code>
                    </p>
                    <p className="text-xs text-text/70">Place this file in your repository to enable GitHub Actions.</p>
                </div>
            </div>

            <div className="flex gap-2 mt-auto mb-4">
                <button
                    onClick={handleCopy}
                    disabled={hasErrors}
                    className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                >
                    Copy code
                </button>

                <button
                    onClick={handleDownload}
                    disabled={hasErrors}
                    className={`bg-primary text-white px-4 py-2 font-semibold text-center rounded-md transition 
                        ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-hover cursor-pointer'}`}
                >
                    Download YAML
                </button>
            </div>
        </div>
    );
}

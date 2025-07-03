'use client';

import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import yaml from 'yaml';

import { useEditor } from '../hooks/editor.hooks';

import { Step } from '@features/editor/domain/editor.models';

/**
 * Yaml preview component.
 */
export function YamlPreview() {
    const { config, errors } = useEditor();

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
        name: config.template === 'npm-publish' ? 'Publish to NPM' : 'Node.js CI',
        on: {
            push: {
                branches: [config.branch],
            },
            ...(config.template === 'node-ci' && { pull_request: {} }),
        },
        jobs: {
            build: {
                'runs-on': 'ubuntu-latest',
                steps: steps,
            },
        },
    };

    const yamlContent = yaml.stringify(fullConfig);

    // Copy YAML to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(yamlContent);
            toast.success('YAML copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy YAML', err);
            toast.error('Error copying YAML');
        }
    };

    // Download YAML as a file
    const handleDownload = () => {
        try {
            const blob = new Blob([yamlContent], { type: 'text/yaml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'workflow.yml';
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

            <div className="flex gap-2 mt-auto">
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

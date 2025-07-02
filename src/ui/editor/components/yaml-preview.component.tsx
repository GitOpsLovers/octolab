'use client';

import { useState } from 'react';
import yaml from 'yaml';

import { useEditor } from '../hooks/editor.hooks';

export default function YamlPreview() {
    const { config } = useEditor();
    const [copied, setCopied] = useState(false);

    const steps = [
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

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(yamlContent);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy YAML', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([yamlContent], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'workflow.yml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full lg:w-1/2 bg-black text-white p-4 rounded shadow flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Vista YAML</h2>

            <pre className="text-xs whitespace-pre-wrap overflow-auto flex-1 mb-4">{yamlContent}</pre>

            <div className="flex gap-2 mt-auto">
                <button onClick={handleCopy} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
                    {copied ? 'Copiado ✅' : 'Copiar YAML'}
                </button>

                <button onClick={handleDownload} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
                    Descargar YAML
                </button>
            </div>
        </div>
    );
}

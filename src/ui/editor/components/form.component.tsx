'use client';

import { ReactNode } from 'react';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Editor form component
 */
export default function EditorForm(): ReactNode {
    const { config, setConfig } = useEditor();

    return (
        <div className="w-full lg:w-1/2 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Editar configuración</h2>

            <label className="block text-sm font-medium mb-1">Branch destino</label>
            <input
                type="text"
                value={config.branch}
                onChange={(e) => {
                    setConfig({ ...config, branch: e.target.value });
                }}
                className="border px-2 py-1 rounded w-full mb-4"
            />

            <label className="block text-sm font-medium mb-1">Node version</label>
            <select
                value={config.nodeVersion}
                onChange={(e) => {
                    setConfig({ ...config, nodeVersion: e.target.value });
                }}
                className="border px-2 py-1 rounded w-full mb-4"
            >
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="16">16</option>
            </select>

            <label className="block text-sm font-medium mb-1">Comando de instalación</label>
            <input
                type="text"
                value={config.installCommand ?? ''}
                onChange={(e) => {
                    setConfig({ ...config, installCommand: e.target.value });
                }}
                className="border px-2 py-1 rounded w-full mb-4"
                placeholder="npm install"
            />

            <label className="block text-sm font-medium mb-1">Comando de test</label>
            <input
                type="text"
                value={config.testCommand ?? ''}
                onChange={(e) => {
                    setConfig({ ...config, testCommand: e.target.value });
                }}
                className="border px-2 py-1 rounded w-full mb-4"
                placeholder="npm test"
            />

            <label className="block text-sm font-medium mb-1">Comando de build</label>
            <input
                type="text"
                value={config.buildCommand ?? ''}
                onChange={(e) => {
                    setConfig({ ...config, buildCommand: e.target.value });
                }}
                className="border px-2 py-1 rounded w-full mb-4"
                placeholder="npm run build"
            />

            {config.template === 'npm-publish' && (
                <>
                    <label className="block text-sm font-medium mb-1">Nombre del secret (token NPM)</label>
                    <input
                        type="text"
                        value={config.npmTokenSecret ?? ''}
                        onChange={(e) => {
                            setConfig({ ...config, npmTokenSecret: e.target.value });
                        }}
                        className="border px-2 py-1 rounded w-full mb-4"
                        placeholder="Ej: NPM_TOKEN"
                    />
                </>
            )}
        </div>
    );
}

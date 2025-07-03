'use client';

import { ReactNode } from 'react';

import { useEditor } from '../hooks/editor.hooks';

/**
 * Editor form component
 */
export default function EditorForm(): ReactNode {
    const { config, setConfig, resetConfig } = useEditor();

    return (
        <div className="w-full lg:w-1/2 bg-surface border border-border p-6 rounded-lg shadow flex flex-col">
            <h2 className="text-xl font-bold text-text mb-4">Editar configuración</h2>

            <label className="block text-sm font-medium text-text mb-1">Branch destino</label>
            <input
                type="text"
                value={config.branch}
                onChange={(e) => {
                    setConfig({ ...config, branch: e.target.value });
                }}
                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            <label className="block text-sm font-medium text-text mb-1">Node version</label>
            <select
                value={config.nodeVersion}
                onChange={(e) => {
                    setConfig({ ...config, nodeVersion: e.target.value });
                }}
                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="16">16</option>
            </select>

            <label className="block text-sm font-medium text-text mb-1">Comando de instalación</label>
            <input
                type="text"
                value={config.installCommand ?? ''}
                onChange={(e) => {
                    setConfig({ ...config, installCommand: e.target.value });
                }}
                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="npm install"
            />

            <label className="block text-sm font-medium text-text mb-1">Comando de test</label>
            <input
                type="text"
                value={config.testCommand ?? ''}
                onChange={(e) => {
                    setConfig({ ...config, testCommand: e.target.value });
                }}
                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="npm test"
            />

            <label className="block text-sm font-medium text-text mb-1">Comando de build</label>
            <input
                type="text"
                value={config.buildCommand ?? ''}
                onChange={(e) => {
                    setConfig({ ...config, buildCommand: e.target.value });
                }}
                className="bg-background border border-border text-text px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="npm run build"
            />

            {config.template === 'npm-publish' && (
                <>
                    <label className="block text-sm font-medium text-text mb-1">Nombre del secret (token NPM)</label>
                    <input
                        type="text"
                        value={config.npmTokenSecret ?? ''}
                        onChange={(e) => {
                            setConfig({ ...config, npmTokenSecret: e.target.value });
                        }}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Ej: NPM_TOKEN"
                    />
                </>
            )}

            <button
                type="button"
                onClick={resetConfig}
                className="mt-2 border border-secondary font-semibold text-secondary px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/80 transition self-start"
            >
                Resetear valores
            </button>
        </div>
    );
}

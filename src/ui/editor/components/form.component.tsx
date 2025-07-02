"use client";

import { useEditor } from "../hooks/editor.hooks";

export default function EditorForm() {
  const { config, setConfig } = useEditor();

 return (
    <div className="w-full lg:w-1/2 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Editar configuración</h2>

      <label className="block text-sm font-medium mb-1">Branch destino</label>
      <input
        type="text"
        value={config.branch}
        onChange={(e) => setConfig({ ...config, branch: e.target.value })}
        className="border px-2 py-1 rounded w-full mb-4"
      />

      <label className="block text-sm font-medium mb-1">Node version</label>
      <select
        value={config.nodeVersion}
        onChange={(e) => setConfig({ ...config, nodeVersion: e.target.value })}
        className="border px-2 py-1 rounded w-full mb-4"
      >
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="16">16</option>
      </select>
    </div>
  );
}

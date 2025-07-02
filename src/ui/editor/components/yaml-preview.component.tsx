"use client";

import yaml from "yaml";
import { useEditor } from "../hooks/editor.hooks";

export default function YamlPreview() {
  const { config } = useEditor();

  // Generar el objeto YAML actualizado
  const fullConfig = {
    name: "Publish to NPM",
    on: {
      push: {
        branches: [config.branch],
      },
    },
    jobs: {
      publish: {
        "runs-on": "ubuntu-latest",
        steps: [
          {
            name: "Checkout code",
            uses: "actions/checkout@v3",
          },
          {
            name: "Setup Node",
            uses: "actions/setup-node@v3",
            with: {
              "node-version": config.nodeVersion,
              "registry-url": "https://registry.npmjs.org/",
            },
          },
          {
            name: "Install dependencies",
            run: "npm install",
          },
          {
            name: "Run tests",
            run: "npm test",
          },
          {
            name: "Build package",
            run: "npm run build",
          },
          {
            name: "Publish to NPM",
            run: "npm publish",
            env: {
              NODE_AUTH_TOKEN: "${{ secrets.NPM_TOKEN }}",
            },
          },
        ],
      },
    },
  };

  const yamlContent = yaml.stringify(fullConfig);

  return (
    <div className="w-full lg:w-1/2 bg-black text-white p-4 rounded shadow overflow-auto">
      <h2 className="text-lg font-semibold mb-2">Vista YAML</h2>
      <pre className="text-xs whitespace-pre-wrap">{yamlContent}</pre>
    </div>
  );
}

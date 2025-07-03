import EditorForm from '@ui/editor/components/form.component';
import YamlPreview from '@ui/editor/components/yaml-preview.component';
import { EditorConfig } from '@ui/editor/models/editor.models';
import { EditorProvider } from '@ui/editor/providers/editor.provider';

/**
 * Editor page
 */
export default async function EditorPage({ params }: { params: Promise<{ template: string }> }) {
    const { template } = await params;

    let defaultConfig: EditorConfig;

    if (template === 'npm-publish') {
        defaultConfig = {
            template: 'npm-publish',
            branch: 'main',
            nodeVersion: '18',
            installCommand: 'npm install',
            testCommand: 'npm test',
            buildCommand: 'npm run build',
            npmTokenSecret: 'NPM_TOKEN',
        };
    } else if (template === 'node-ci') {
        defaultConfig = {
            template: 'node-ci',
            branch: 'main',
            nodeVersion: '18',
            installCommand: 'npm install',
            testCommand: 'npm test',
            buildCommand: 'npm run build',
        };
    } else {
        return <div>Plantilla no soportada todavía.</div>;
    }

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Editor: {template}</h1>

            <EditorProvider defaultConfig={defaultConfig}>
                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <EditorForm />

                    <YamlPreview />
                </div>
            </EditorProvider>
        </main>
    );
}

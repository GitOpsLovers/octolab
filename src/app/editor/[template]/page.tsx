import EditorForm from '@ui/editor/components/form.component';
import YamlPreview from '@ui/editor/components/yaml-preview.component';
import { EditorProvider } from '@ui/editor/providers/editor.provider';

export default function EditorPage({ params }: { params: { template: string } }) {
    const template = params.template;

    if (template !== 'npm-publish') {
        return <div>Plantilla no soportada todavía.</div>;
    }

    // Config base
    const defaultConfig = {
        branch: 'main',
        nodeVersion: '18',
    };

    return (
        <main className="min-h-screen flex flex-col p-6 bg-gray-50">
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

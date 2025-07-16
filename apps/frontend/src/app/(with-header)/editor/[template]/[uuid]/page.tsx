import { EditorForm } from '@ui/editor/components/editor-form.component';
import { LoadingEditor } from '@ui/editor/components/loading.component';
import { EditorTitle } from '@ui/editor/components/title.component';
import { YamlPreview } from '@ui/editor/components/yaml-preview.component';
import { EditorProvider } from '@ui/editor/providers/editor.provider';

/**
 * Editor page component.
 */
export default async function EditorPage({ params }: { params: Promise<{ template: string; uuid: string }> }) {
    const { template, uuid } = await params;

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <EditorProvider templateId={template} workflowId={uuid}>
                <EditorTitle />

                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <LoadingEditor />

                    <EditorForm />

                    <YamlPreview />
                </div>
            </EditorProvider>
        </main>
    );
}

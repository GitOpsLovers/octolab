import { EditorCustomForm } from '@ui/editor/components/editor-custom-form.component';
import { EditorCustomLoading } from '@ui/editor/components/editor-custom-loading.component';
import { EditorCustomTitle } from '@ui/editor/components/editor-custom-title.component';
import { YamlCustomPreview } from '@ui/editor/components/yaml-custom-preview.component';
import { EditorCustomProvider } from '@ui/editor/providers/editor-custom.provider';

/**
 * Editor custom workflow page component.
 */
export default async function EditorCustomPage({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <EditorCustomProvider workflowId={uuid}>
                <EditorCustomTitle />

                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <EditorCustomLoading />

                    <EditorCustomForm />

                    <YamlCustomPreview />
                </div>
            </EditorCustomProvider>
        </main>
    );
}

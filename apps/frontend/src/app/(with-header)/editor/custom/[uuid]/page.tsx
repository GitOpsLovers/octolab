import { Metadata } from 'next';

import { EditorCustomForm } from '@ui/editor/components/custom-workflow/editor-custom-form.component';
import { EditorCustomLoading } from '@ui/editor/components/custom-workflow/editor-custom-loading.component';
import { EditorCustomTitle } from '@ui/editor/components/custom-workflow/editor-custom-title.component';
import { YamlCustomPreview } from '@ui/editor/components/yaml-preview/yaml-custom-preview.component';
import { EditorCustomProvider } from '@ui/editor/providers/editor-custom.provider';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

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

import { Metadata } from 'next';

import { EditorTemplateForm } from '@ui/editor/components/editor-template-form.component';
import { EditorTemplateLoading } from '@ui/editor/components/editor-template-loading.component';
import { EditorTemplateTitle } from '@ui/editor/components/editor-template-title.component';
import { YamlTemplatePreview } from '@ui/editor/components/yaml-template-preview.component';
import { EditorTemplateProvider } from '@ui/editor/providers/editor-template.provider';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

/**
 * Editor template page component.
 */
export default async function EditorTemplatePage({ params }: { params: Promise<{ template: string; uuid: string }> }) {
    const { template, uuid } = await params;

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <EditorTemplateProvider templateId={template} workflowId={uuid}>
                <EditorTemplateTitle />

                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <EditorTemplateLoading />

                    <EditorTemplateForm />

                    <YamlTemplatePreview />
                </div>
            </EditorTemplateProvider>
        </main>
    );
}

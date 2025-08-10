import { Metadata } from 'next';

import { TemplateWorkflowEditorLoader } from '@ui/editor/components/template-workflow/template-workflow-editor-loader.component';
import { TemplateWorkflowEditorTitle } from '@ui/editor/components/template-workflow/template-workflow-editor-title.component';
import { TemplateWorkflowEditorWrapper } from '@ui/editor/components/template-workflow/template-workflow-editor-wrapper.component';
import { TemplateWorkflowYamlPreview } from '@ui/editor/components/yaml-preview/template-workflow-yaml-preview.component';
import { TemplateWorkflowEditorProvider } from '@ui/editor/providers/template-workflow-editor.provider';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

/**
 * Template workflow editor page
 */
export default async function TemplateWorkflowEditorPage({ params }: { params: Promise<{ template: string; uuid: string }> }) {
    const { template, uuid } = await params;

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <TemplateWorkflowEditorProvider templateId={template} workflowId={uuid}>
                <TemplateWorkflowEditorTitle />

                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <TemplateWorkflowEditorLoader />

                    <TemplateWorkflowEditorWrapper />

                    <TemplateWorkflowYamlPreview />
                </div>
            </TemplateWorkflowEditorProvider>
        </main>
    );
}

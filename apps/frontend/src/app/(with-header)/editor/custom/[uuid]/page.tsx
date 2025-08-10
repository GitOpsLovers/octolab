import { Metadata } from 'next';

import { CustomWorkflowEditorLoader } from '@ui/editor/components/custom-workflow/custom-workflow-editor-loader.component';
import { CustomWorkflowEditorTitle } from '@ui/editor/components/custom-workflow/custom-workflow-editor-title.component';
import { CustomWorkflowEditorWrapper } from '@ui/editor/components/custom-workflow/custom-workflow-editor-wrapper.component';
import { CustomWorkflowYamlPreview } from '@ui/editor/components/yaml-preview/custom-workflow-yaml-preview.component';
import { CustomWorkflowEditorProvider } from '@ui/editor/providers/custom-workflow-editor.provider';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

/**
 * Custom workflow editor page
 */
export default async function CustomWorkflowEditorPage({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <CustomWorkflowEditorProvider workflowId={uuid}>
                <CustomWorkflowEditorTitle />

                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <CustomWorkflowEditorLoader />

                    <CustomWorkflowEditorWrapper />

                    <CustomWorkflowYamlPreview />
                </div>
            </CustomWorkflowEditorProvider>
        </main>
    );
}

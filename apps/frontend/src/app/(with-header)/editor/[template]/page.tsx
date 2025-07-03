import { EditorConfig } from '@features/editor/domain/editor.models';
import { templatesDefaultConfigs } from '@features/templates/domain/constants/template-dafault-configs.const';
import { EditorForm } from '@ui/editor/components/form.component';
import { EditorTitle } from '@ui/editor/components/title.component';
import { YamlPreview } from '@ui/editor/components/yaml-preview.component';
import { EditorProvider } from '@ui/editor/providers/editor.provider';

/**
 * Editor page component.
 */
export default async function EditorPage({ params }: { params: Promise<{ template: string }> }) {
    const { template } = await params;

    const defaultConfig: EditorConfig | undefined = templatesDefaultConfigs[template];

    if (!defaultConfig) {
        return <div>Template not yet supported.</div>;
    }

    return (
        <main className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <EditorTitle template={template} />

            <EditorProvider defaultConfig={defaultConfig}>
                <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
                    <EditorForm />

                    <YamlPreview />
                </div>
            </EditorProvider>
        </main>
    );
}

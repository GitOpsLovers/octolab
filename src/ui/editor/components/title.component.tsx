import { availableTemplates } from '@features/templates/domain/constants/available-templates.const';

interface EditorTitleProps {
    template: string;
}

/**
 * Editor title component.
 */
export function EditorTitle({ template }: EditorTitleProps) {
    const data = availableTemplates.find((t) => t.id === template);

    if (!data) {
        return <h1 className="text-2xl font-bold mb-4">Editor</h1>;
    }

    return (
        <div className="mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">{data.name}</h1>
            <p className="text-text/70 text-base mt-1">{data.description}</p>
        </div>
    );
}

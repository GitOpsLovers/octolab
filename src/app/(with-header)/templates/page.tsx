import { TemplatesList } from '@ui/templates/components/templates-list.component';

/**
 * Templates page
 */
export default function TemplatesPage() {
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Choose a template to get started</h1>

            <TemplatesList />
        </main>
    );
}

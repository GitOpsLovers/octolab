import { TemplatesList } from '@ui/templates/components/templates-list.component';
import { TemplatesProvider } from '@ui/templates/providers/templates.provider';

/**
 * Templates page
 */
export default function TemplatesPage() {
    return (
        <main className="p-8">
            <TemplatesProvider>
                <TemplatesList />
            </TemplatesProvider>
        </main>
    );
}

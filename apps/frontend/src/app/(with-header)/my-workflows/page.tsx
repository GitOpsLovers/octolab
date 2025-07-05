import { redirect } from 'next/navigation';

import { auth0Client } from '@features/authentication/infrastructure/auth0/client.auth0';
import { WorkflowsList } from '@ui/my-workflows/components/workflows-list.component';
import { MyWorkflowsProvider } from '@ui/my-workflows/providers/my-workflows.provider';

/**
 * My workflows page
 */
export default async function MyWorkflowsPage() {
    const session = await auth0Client.getSession();

    // Si no hay usuario autenticado => redirigimos a home
    if (!session?.user) {
        redirect('/');
    }

    return (
        <main className="p-8">
            <MyWorkflowsProvider>
                <WorkflowsList />
            </MyWorkflowsProvider>
        </main>
    );
}

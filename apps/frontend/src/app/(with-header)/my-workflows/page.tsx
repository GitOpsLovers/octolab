import { WorkflowsList } from '@ui/my-workflows/components/workflows-list.component';
import { MyWorkflowsProvider } from '@ui/my-workflows/providers/my-workflows.provider';

/**
 * My workflows page
 */
export default function MyWorkflowsPage() {
    return (
        <main className="p-8">
            <MyWorkflowsProvider>
                <WorkflowsList />
            </MyWorkflowsProvider>
        </main>
    );
}

'use client';

import { ReactNode } from 'react';

import { useEditorCustom } from '../hooks/editor-custom.hooks';

import { CustomWorkflowForm } from './workflow-custom-form.component';

/**
 * Editor form for custom workflow component
 */
export function EditorCustomForm(): ReactNode {
    const { editingWorkflow } = useEditorCustom();

    if (!editingWorkflow) return null;

    return <CustomWorkflowForm />;
}

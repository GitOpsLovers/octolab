'use client';

import { ReactNode } from 'react';

import { useEditorCustom } from '../../hooks/editor-custom.hooks';

import { CustomWorkflowEditorForm } from './custom-workflow-editor-form.component';

/**
 * Custom workflow editor wrapper component.
 */
export function CustomWorkflowEditorWrapper(): ReactNode {
    const { editingWorkflow } = useEditorCustom();

    if (!editingWorkflow) return null;

    return <CustomWorkflowEditorForm />;
}

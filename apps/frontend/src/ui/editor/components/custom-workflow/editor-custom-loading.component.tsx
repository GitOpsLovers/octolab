'use client';

import { ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { useEditorCustom } from '../../hooks/editor-custom.hooks';

/**
 * Editor custom workflow loading component.
 */
export function EditorCustomLoading(): ReactNode {
    const { loading } = useEditorCustom();

    if (loading) {
        return (
            <div className="flex w-full h-full flex-1 items-center justify-center text-text-muted text-center py-12">
                <div className="flex flex-col items-center">
                    <FaSpinner className="w-8 h-8 animate-spin mb-4 text-primary" />
                    <p>Loading workflow...</p>
                </div>
            </div>
        );
    }

    return null;
}

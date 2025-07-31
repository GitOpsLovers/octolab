'use client';

import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { Modal } from '@ui/layout/components/modal.component';

interface RegisterModalProps {
    templateId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onSkip: () => void;
}

/**
 * Register modal for templates list component.
 */
export function RegisterModalForTemplatesList({ isOpen, onClose, templateId, onSkip }: RegisterModalProps) {
    if (!templateId) return null;

    const draftId = uuidv4();
    const editorUrl = templateId === 'custom' ? `/editor/custom/${templateId}/${draftId}` : `/editor/templates/${templateId}/${draftId}`;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-2 text-center">Save your workflow and continue</h2>
            <p className="text-text-muted mb-6 text-center">Create a free account to save and manage your workflows anytime.</p>
            <div className="flex flex-col gap-4">
                <a
                    href={`/auth/login?connection=github&returnTo=${editorUrl}`}
                    className="border border-primary text-primary font-semibold px-4 py-2 rounded-md hover:bg-primary hover:text-white transition text-center"
                >
                    Continue with GitHub
                </a>
                <a
                    href={`/auth/login?connection=google-oauth2&returnTo=${editorUrl}`}
                    className="border border-primary text-primary font-semibold px-4 py-2 rounded-md hover:bg-primary hover:text-white transition text-center"
                >
                    Continue with Google
                </a>
            </div>
            <p className="text-xs text-text-muted mt-4 text-center">
                Prefer to explore first?{' '}
                <Link
                    href={editorUrl}
                    onClick={() => {
                        onSkip();
                        onClose();
                    }}
                    className="underline"
                >
                    Continue without saving
                </Link>
            </p>
        </Modal>
    );
}

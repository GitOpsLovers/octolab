'use client';

import Link from 'next/link';

import { Modal } from '@ui/layout/components/modal';

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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-2 text-center">Save your workflow and continue</h2>
            <p className="text-text-muted mb-6 text-center">Create a free account to save and manage your workflows anytime.</p>
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => (window.location.href = '/api/auth/github')}
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition"
                >
                    Continue with GitHub
                </button>
                <button
                    onClick={() => (window.location.href = '/api/auth/google')}
                    className="border border-primary text-primary font-semibold px-4 py-2 rounded-md hover:bg-primary/10 transition"
                >
                    Continue with Google
                </button>
            </div>
            <p className="text-xs text-text-muted mt-4 text-center">
                Prefer to explore first?{' '}
                <Link
                    href={`/editor/${templateId}`}
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

'use client';

import { TemplateType } from '@octolab/domain';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { useState, MouseEvent, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';
import * as SiIcons from 'react-icons/si';
import { v4 as uuidv4 } from 'uuid';

import { useTemplates } from '../hooks/templates.hooks';

import { RegisterModalForTemplatesList } from './register-modal.component';

import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

/**
 * Templates list component.
 */
export function TemplatesList() {
    const cookies = useCookies();
    const router = useRouter();
    const { authUser, isLoading } = useAuthUser();
    const { templates, loading, error } = useTemplates();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [skipRegisterModal, setSkipRegisterModal] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('all');

    const templateTypeLabels: Record<TemplateType, string> = {
        verification: 'Verification',
        distribution: 'Distribution',
        deployment: 'Deployment',
        releasing: 'Releasing',
        security: 'Security',
    };

    const types = [
        { label: 'All', value: 'all' },
        ...Object.entries(templateTypeLabels).map(([value, label]) => ({
            label,
            value,
        })),
    ];

    /**
     * Check if the user has skipped the register modal.
     */
    useEffect(() => {
        const skip = cookies.get('octolab_skip_register_modal');
        if (skip === 'true') {
            setSkipRegisterModal(true);
        }
    }, [cookies]);

    // Set the skip register modal cookie and state.
    const setSkipModal = (value: boolean) => {
        if (value) {
            cookies.set('octolab_skip_register_modal', 'true', { expires: 7 });
            setSkipRegisterModal(true);
        } else {
            cookies.remove('octolab_skip_register_modal');
            setSkipRegisterModal(false);
        }
    };

    // Handle the template selection.
    const handleSelectTemplate = (e: MouseEvent, id: string) => {
        e.preventDefault();
        setSelectedTemplateId(id);

        const draftId = uuidv4();

        if (authUser || skipRegisterModal) {
            router.push(`/editor/${id}/${draftId}`);
        } else {
            setModalOpen(true);
        }
    };

    if (loading || isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
                <FaIcons.FaSpinner className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Loading templates...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading templates: {error}</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">Choose a template to get started</h1>

            <div className="flex justify-end mb-4">
                <select
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                    }}
                    className="bg-background border border-border text-text px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                    {types.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {templates
                    ?.filter((template) => selectedType === 'all' || template.type === selectedType)
                    .map((template) => {
                        let Icon;
                        if (template.iconLibrary === 'io5') {
                            // eslint-disable-next-line import/namespace
                            Icon = Io5Icons[template.icon as keyof typeof Io5Icons];
                        } else if (template.iconLibrary === 'fa') {
                            // eslint-disable-next-line import/namespace
                            Icon = FaIcons[template.icon as keyof typeof FaIcons];
                        } else {
                            // eslint-disable-next-line import/namespace
                            Icon = SiIcons[template.icon as keyof typeof SiIcons];
                        }

                        return (
                            <div key={template.id} className="bg-surface rounded-lg shadow hover:shadow-lg transition border border-border flex flex-col p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Icon className="w-10 h-10" style={{ color: template.iconColor }} />
                                    <h2 className="text-xl font-bold text-text">{template.name}</h2>
                                </div>

                                <p className="text-sm text-text-muted mb-3">{template.description}</p>

                                <ul className="grid grid-cols-1 gap-y-1 text-sm text-text-muted mb-4">
                                    {template.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="text-success">✔️</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto flex flex-col">
                                    <button
                                        onClick={(e) => {
                                            handleSelectTemplate(e, template.id);
                                        }}
                                        className="bg-primary text-white font-semibold text-center px-4 py-2 rounded-md hover:bg-primary-hover transition cursor-pointer"
                                    >
                                        Use template
                                    </button>
                                    {!authUser && !isLoading && <p className="text-xs text-text-muted mt-2 text-center">You’ll need an account to save your workflow.</p>}
                                </div>
                            </div>
                        );
                    })}

                <Link
                    className="bg-surface rounded-lg border border-dashed border-border flex flex-col p-4 items-center justify-center text-center hover:shadow-lg transition cursor-pointer"
                    href={'/propose-template'}
                >
                    <Io5Icons.IoAddCircleOutline className="w-10 h-10 text-primary mb-2" />
                    <h2 className="text-lg font-bold text-text mb-1">Request new template</h2>
                    <p className="text-sm text-text-muted">Can&apos;t find what you need? Let us know and we&apos;ll add it!</p>
                </Link>
            </div>

            <RegisterModalForTemplatesList
                templateId={selectedTemplateId}
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
                onSkip={() => {
                    setSkipModal(true);
                }}
            />
        </>
    );
}

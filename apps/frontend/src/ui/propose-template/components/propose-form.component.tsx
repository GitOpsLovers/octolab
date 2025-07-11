/* eslint-disable pii/no-email */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { sendTemplateProposalUseCase } from '@features/propose-template/application/send-template-proposal.use-case';
import { proposeTemplateSchema } from '@features/propose-template/domain/schemas/propose-template.schema';
import { proposeTemplateApiRepository } from '@features/propose-template/infrastructure/propose-template-api.repository';
import { useAuthUser } from '@ui/user/hooks/use-auth.hook';

type FormData = z.infer<typeof proposeTemplateSchema>;

/**
 * Propose template form component.
 */
export function ProposeTemplateForm() {
    const { authToken } = useAuthUser();
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: zodResolver(proposeTemplateSchema),
    });

    const onSubmit = async (data: FormData) => {
        if (!authToken) return;

        setFormError('');
        setIsLoading(true);

        try {
            const repository = proposeTemplateApiRepository(authToken);
            await sendTemplateProposalUseCase(repository, data);

            reset();
        } catch (error) {
            console.error('Error submitting proposal', error);
            setFormError('Something went wrong while submitting your proposal. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitSuccessful) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
                <h2 className="text-3xl font-bold mb-2 text-primary">Thank you for your suggestion!</h2>
                <p className="text-text-muted max-w-md">We’ll review it and get back to you if needed.</p>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">Propose a template</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl mx-auto bg-surface border border-border p-6 rounded-lg shadow flex flex-col gap-4">
                <h2 className="text-xl font-bold text-text mb-2 text-center">Suggest a new template</h2>

                <div>
                    <label className="block text-sm font-medium text-text mb-1">Name *</label>
                    <input
                        {...register('name')}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="e.g., Astro deploy to Vercel"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-1">Description *</label>
                    <textarea
                        {...register('description')}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Short description of what this template does"
                        rows={3}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-1">Motivation *</label>
                    <textarea
                        {...register('motivation')}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Why do you need this template? What problem does it solve?"
                        rows={3}
                    />
                    {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-1">Email (optional)</label>
                    <input
                        {...register('email')}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {formError && <p className="text-red-500 text-sm mt-1 text-center">{formError}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition w-full disabled:opacity-50"
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </>
    );
}

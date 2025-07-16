/* eslint-disable pii/no-email */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { sendContactSubmissionUseCase } from '@features/contact/application/send-contact-submission.use-case';
import { contactSchema } from '@features/contact/domain/schemas/contact.schema';
import { contactApiRepository } from '@features/contact/infrastructure/contact-api.repository';

type FormData = z.infer<typeof contactSchema>;

/**
 * Contact form component.
 */
export function ContactForm() {
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: FormData) => {
        setFormError('');
        setIsLoading(true);

        try {
            const repository = contactApiRepository();
            await sendContactSubmissionUseCase(repository, data);

            reset();
        } catch (error) {
            console.error('Error submitting contact form', error);
            setFormError('Something went wrong while submitting your contact submission. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitSuccessful) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
                <h2 className="text-3xl font-bold mb-2 text-primary">Thank you for contacting us!</h2>
                <p className="text-text-muted max-w-md">We’ll review it and get back to you if needed.</p>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-12 mt-4 text-center">Contact</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl mx-auto bg-surface border border-border p-6 rounded-lg shadow flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-text mb-1">Name *</label>
                    <input
                        {...register('name')}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-1">Message *</label>
                    <textarea
                        {...register('message')}
                        className="bg-background border border-border text-text px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Your message"
                        rows={5}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
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
                    className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-hover transition w-full disabled:opacity-50 cursor-pointer"
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </>
    );
}

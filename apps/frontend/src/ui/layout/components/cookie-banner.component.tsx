'use client';

import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';

const COOKIE_KEY = 'octolab_cookie_consent';

/**
 * Cookies banner component
 */
export function CookieBanner() {
    const cookies = useCookies();
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = cookies.get(COOKIE_KEY);
        if (!consent) {
            setShowBanner(true);
        }
    }, [cookies]);

    const handleConsent = (value: 'accepted' | 'rejected') => {
        cookies.set(COOKIE_KEY, value);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50 max-w-xs w-full bg-surface text-sm text-text-muted rounded-lg shadow hover:shadow-lg transition border border-border p-4 flex flex-col gap-3">
            <p className="text-text-muted mb-3">Usamos cookies para mejorar tu experiencia y analizar el uso mediante Umami. No recopilamos datos personales.</p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        handleConsent('rejected');
                    }}
                    className="text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted transition cursor-pointer hover:text-text"
                >
                    Rechazar
                </button>
                <button
                    onClick={() => {
                        handleConsent('accepted');
                    }}
                    className="text-sm px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primary-hover transition cursor-pointer"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}

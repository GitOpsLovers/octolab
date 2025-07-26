'use client';

import Script from 'next/script';

/**
 * Umami Analytics component
 */
export function UmamiAnalytics() {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    if (!websiteId) return null;

    return <Script async src="https://cloud.umami.is/script.js" data-website-id={websiteId} />;
}

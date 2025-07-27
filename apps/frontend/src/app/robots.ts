import type { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for the application.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/my-workflows/',
        },
        sitemap: 'https://octolab.app/sitemap.xml',
    };
}

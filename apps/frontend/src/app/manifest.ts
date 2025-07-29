import type { MetadataRoute } from 'next';

/**
 * Manifest configuration
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'OctoLab',
        short_name: 'OctoLab',
        description: 'The easiest way to build GitHub workflows',
        start_url: '/',
        display: 'standalone',
        background_color: '#0d1117',
        theme_color: '#ff4d9d',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}

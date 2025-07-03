import cors from 'cors';

/**
 * Configures the CORS on server middleware.
 *
 * @param allowedOrigins Allowed origins
 */
export function configureCorsMiddleware(allowedOrigins: string[]) {
    console.info(`CORS allowed origins: ${allowedOrigins}`, 'Application');

    return cors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`Origin not allowed by CORS: ${origin}`, 'Application');
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });
}

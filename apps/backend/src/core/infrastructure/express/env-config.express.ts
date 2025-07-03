/**
 * Check if all required environment variables are set.
 *
 * @param requiredEnvVars Required environment variables
 */
export function checkRequiredEnvVariables(requiredEnvVars: string[]) {
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`❌ Missing environment variable: ${envVar}`);
        }
    });
}

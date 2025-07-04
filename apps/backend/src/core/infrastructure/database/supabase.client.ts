import { createClient } from '@supabase/supabase-js';

let supabase: ReturnType<typeof createClient>;

/**
 * Initializes the Supabase client.
 */
export function initSupabaseClient() {
    /* const token = await getBackendAccessToken(); */

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

/**
 * Gets the initialized Supabase client.
 */
export function getSupabaseClient() {
    if (!supabase) {
        throw new Error('Supabase client not initialized. Call initSupabaseClient() first.');
    }

    return supabase;
}

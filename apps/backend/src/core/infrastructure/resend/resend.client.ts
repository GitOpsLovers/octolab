import { Resend } from 'resend';

/**
 * Resend Client
 */
export const resendClient = new Resend(process.env.RESEND_API_KEY);

/**
 * User from Identity Provider
 */
export interface UserIdp {
    created_at: string | Record<string, any>;
    email: string;
    email_verified: boolean;
    identities: any[];
    name: string;
    username: string;
    picture: string;
    updated_at: string | Record<string, any>;
    user_id: string;
    last_ip: string;
    last_login: string | Record<string, any>;
    logins_count: number;
    phone_number: string;
    user_metadata: Record<string, any>;
}

/**
 * User model
 */
export interface User {
    id: string;
}

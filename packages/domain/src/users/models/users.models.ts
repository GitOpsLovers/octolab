/**
 * User model
 */
export interface User {
    id: string;
    name: string;
    email: string;
    workflows: number;
    plan: 'free';
    picture: string;
}

/**
 * Create user DTO
 */
export interface CreateUserDto {
    id: string;
    auth0Id: string;
    provider: string;
    email: string;
}

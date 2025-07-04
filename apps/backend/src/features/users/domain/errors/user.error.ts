/**
 * User Error
 */
export class UserError extends Error {
    public code: string;

    public type: UserErrorType;

    constructor(message: string, type: UserErrorType, code: string = 'USER_ERROR') {
        super(message);
        this.name = 'UserError';
        this.code = code;
        this.type = type;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserError);
        }
    }
}

/**
 * User error types
 */
export enum UserErrorType {
    NO_AUTHENTICATED_USER = 'NO_AUTHENTICATED_USER',
}

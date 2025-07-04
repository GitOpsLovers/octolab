/**
 * Auth0 Error
 */
export class Auth0Error extends Error {
    public code: string;

    public type: string;

    constructor(message: string, type: Auth0ErrorType, code: string = 'AUTH0_ERROR') {
        super(message);
        this.name = 'Auth0Error';
        this.code = code;
        this.type = type;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Auth0Error);
        }
    }
}

/**
 * Auth0 error type
 */
export enum Auth0ErrorType {
    AUTH0_CONNECTION_ERROR = 'AUTH0_CONNECTION_ERROR',
}

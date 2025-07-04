/**
 * Database Error
 */
export class DatabaseError extends Error {
    public code: string;

    public type: string;

    constructor(message: string, type: DatabaseErrorType, code: string = 'DATABASE_ERROR') {
        super(message);
        this.name = 'DatabaseError';
        this.code = code;
        this.type = type;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
    }
}

/**
 * Database error Types
 */
export enum DatabaseErrorType {
    DATA_NOT_FOUND = 'DATA_NOT_FOUND',
    DATABASE_CONNECTION_ERROR = 'DATABASE_CONNECTION_ERROR',
    MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
    DATABASE_WRITE_ERROR = 'DATABASE_WRITE_ERROR',
}

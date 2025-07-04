import { Response } from 'express';

import { Auth0Error, Auth0ErrorType } from '../../infrastructure/auth0/auth0.error';
import { DatabaseError, DatabaseErrorType } from '../../infrastructure/database/database.error';

/**
 * Centralized error handler to map error types to HTTP responses
 */
export const handleError = (error: Error, res: Response) => {
    // Identity Provider errors
    if (error instanceof Auth0Error) {
        const errorResponse = {
            [Auth0ErrorType.AUTH0_CONNECTION_ERROR]: {
                status: 503,
                message: error.message,
            },
        };

        const response = errorResponse[error.type as Auth0ErrorType] || {
            status: 500,
            message: 'Unexpected error in IDP',
        };

        return res.status(response.status).json({ message: response.message });
    }

    // Database errors
    if (error instanceof DatabaseError) {
        const errorResponse = {
            [DatabaseErrorType.DATA_NOT_FOUND]: {
                status: 404,
                message: error.message,
            },
            [DatabaseErrorType.DATABASE_CONNECTION_ERROR]: {
                status: 503,
                message: error.message,
            },
            [DatabaseErrorType.MISSING_REQUIRED_FIELD]: {
                status: 400,
                message: error.message,
            },
            [DatabaseErrorType.DATABASE_WRITE_ERROR]: {
                status: 500,
                message: error.message,
            },
        };

        const response = errorResponse[error.type as DatabaseErrorType] || {
            status: 500,
            message: 'Unexpected error in database',
        };

        return res.status(response.status).json({ message: response.message });
    }

    // Fallback for any unhandled error type
    return res.status(500).json({ message: 'Unexpected error' });
};

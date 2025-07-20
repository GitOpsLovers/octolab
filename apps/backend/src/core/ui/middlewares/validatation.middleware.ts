import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodType, z } from 'zod';

/**
 * Middleware to validate request body against a Zod schema.
 */
export function validationMiddleware<T>(schema: ZodType<T, any, any>): RequestHandler {
    return (req, res, next) => {
        if (req.body === undefined || req.body === null || typeof req.body !== 'object' || Array.isArray(req.body) || Object.keys(req.body).length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid or missing request body',
            });
            return;
        }

        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errorTree = z.treeifyError(result.error);
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Validation failed',
                errors: errorTree,
            });
            return;
        }

        req.body = result.data;
        next();
    };
}

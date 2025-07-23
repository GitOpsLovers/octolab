import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Middleware to validate an endpoint that requires an Auth0 action token.
 */
export function auth0ActionMiddleware(req: Request, res: Response, next: NextFunction) {
    const expectedToken = process.env.AUTH0_ACTIONS_TOKEN;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing or malformed Authorization header' });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (token !== expectedToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Auth0 Actions token' });
        return;
    }

    next();
}

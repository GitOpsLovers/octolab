import { Request } from 'express';

import { UserError, UserErrorType } from '../domain/errors/user.error';

/**
 * Get current user id use case
 *
 * @param req Express request
 *
 * @returns User id
 */
export function getCurrentUserIdUseCase(req: Request): string {
    if (!req.auth?.payload?.sub) {
        throw new UserError('No authenticated user found in request.', UserErrorType.NO_AUTHENTICATED_USER);
    }

    return req.auth.payload.sub;
}

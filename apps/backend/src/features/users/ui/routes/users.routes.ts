import { Router } from 'express';

import { getCurrentUserController } from '../controllers/get-current-user.controller';

import { authClient } from '@features/authentication/infrastructure/auth0/authentication.client';

const usersRoutes = Router();

/**
 * Users routes
 */
usersRoutes.get('/current-user', authClient, getCurrentUserController);

export { usersRoutes };

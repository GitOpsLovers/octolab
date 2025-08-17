import { Router } from 'express';

import { createUserController } from '../controllers/create-user.controller';
import { deleteUserController } from '../controllers/delete-user.controller';
import { getCurrentUserController } from '../controllers/get-current-user.controller';

import { auth0ActionMiddleware } from '@core/ui/middlewares/auth0-actions.middleware';
import { authClient } from '@features/authentication/infrastructure/auth0/authentication.client';

const usersRoutes = Router();

/**
 * Users routes
 */
usersRoutes.get('/current-user', authClient, getCurrentUserController);
usersRoutes.post('/user', auth0ActionMiddleware, createUserController);
usersRoutes.delete('/user', authClient, deleteUserController);

export { usersRoutes };

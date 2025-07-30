import { Router } from 'express';

import { sendWelcomeEmailController } from '../controllers/send-welcome-email.controller';

import { auth0ActionMiddleware } from '@core/ui/middlewares/auth0-actions.middleware';

const authRoutes = Router();

/**
 * Authentication routes
 */
authRoutes.post('/send-welcome-email', auth0ActionMiddleware, sendWelcomeEmailController);

export { authRoutes };

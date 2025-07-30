import { Router } from 'express';

import { sendWelcomeEmailController } from '../controllers/send-welcome-email.controller';

const authRoutes = Router();

/**
 * Authentication routes
 */
authRoutes.post('/send-welcome-email', sendWelcomeEmailController);

export { authRoutes };

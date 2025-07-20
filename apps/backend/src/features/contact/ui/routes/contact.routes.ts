import { contactSchema } from '@octolab/domain';
import { Router } from 'express';

import { sendContactSubmissionController } from '../controllers/send-contact-submission.controller';

import { validationMiddleware } from '@core/ui/middlewares/validatation.middleware';

const contactRoutes = Router();

contactRoutes.post('/contact', validationMiddleware(contactSchema), sendContactSubmissionController);

export { contactRoutes };

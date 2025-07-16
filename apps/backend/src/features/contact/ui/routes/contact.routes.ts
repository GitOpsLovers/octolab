import { Router } from 'express';

import { sendContactSubmissionController } from '../controllers/send-contact-submission.controller';

const contactRoutes = Router();

contactRoutes.post('/contact', sendContactSubmissionController);

export { contactRoutes };

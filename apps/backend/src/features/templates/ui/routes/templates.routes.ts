import { Router } from 'express';

import { getTemplateByIdController } from '../controllers/get-template.controller';
import { getTemplatesController } from '../controllers/get-templates.controller';
import { sendTemplateProposalController } from '../controllers/send-template-proposal.controller';

const templatesRoutes = Router();

templatesRoutes.get('/templates', getTemplatesController);
templatesRoutes.get('/templates/:templateId', getTemplateByIdController);
templatesRoutes.post('/propose-template', sendTemplateProposalController);

export { templatesRoutes };

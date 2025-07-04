import { Router } from 'express';

import { getTemplateByIdController } from '../controllers/get-template.controller';
import { getTemplatesController } from '../controllers/get-templates.controller';

const templatesRoutes = Router();

templatesRoutes.get('/templates', getTemplatesController);
templatesRoutes.get('/templates/:templateId', getTemplateByIdController);

export { templatesRoutes };

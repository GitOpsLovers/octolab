import { Router } from 'express';

import { getTemplateConfigController } from '../controllers/get-template-config.controller';
import { getTemplateByIdController } from '../controllers/get-template.controller';
import { getTemplatesController } from '../controllers/get-templates.controller';

const templatesRoutes = Router();

templatesRoutes.get('/templates', getTemplatesController);
templatesRoutes.get('/templates/:templateId', getTemplateByIdController);
templatesRoutes.get('/templates/:templateId/config', getTemplateConfigController);

export { templatesRoutes };

import { Router } from 'express';

import { getTemplateConfigController } from '../controllers/get-template-config.controller';
import { getTemplatesController } from '../controllers/get-templates.controller';

const templatesRoutes = Router();

templatesRoutes.get('/templates', getTemplatesController);
templatesRoutes.get('/templates/:template', getTemplateConfigController);

export { templatesRoutes };

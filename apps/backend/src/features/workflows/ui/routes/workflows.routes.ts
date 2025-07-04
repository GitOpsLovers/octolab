import { Router } from 'express';

import { createWorkflowController } from '../controllers/create-workflow.controller';
import { getWorkflowConfigController } from '../controllers/get-workflow-config.controller';

const workflowsRoutes = Router();

workflowsRoutes.get('/workflows/:templateId', getWorkflowConfigController);
workflowsRoutes.post('/workflows', createWorkflowController);

export { workflowsRoutes };

import { Router } from 'express';

import { createOrEditWorkflowController } from '../controllers/create-edit-workflow.controller';
import { getWorkflowConfigController } from '../controllers/get-workflow-config.controller';
import { getWorkflowByIdController } from '../controllers/get-workflow.controller';
import { getWorkflowsController } from '../controllers/get-workflows.controller';

import { currentUserMiddleware } from '@features/users/ui/middlewares/current-user.middleware';

const workflowsRoutes = Router();

workflowsRoutes.get('/workflows/:workflowId', getWorkflowByIdController);
workflowsRoutes.get('/workflows/:templateId/config', getWorkflowConfigController);
workflowsRoutes.get('/workflows', getWorkflowsController);
workflowsRoutes.post('/workflows', currentUserMiddleware, createOrEditWorkflowController);

export { workflowsRoutes };

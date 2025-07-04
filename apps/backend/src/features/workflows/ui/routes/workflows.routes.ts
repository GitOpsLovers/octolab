import { Router } from 'express';

import { createWorkflowController } from '../controllers/create-workflow.controller';

const workflowsRoutes = Router();

workflowsRoutes.post('/workflows', createWorkflowController);

export { workflowsRoutes };

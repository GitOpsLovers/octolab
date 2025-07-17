import { Router } from 'express';

import { getActionsController } from '../controllers/get-actions.controller';

const actionsRoutes = Router();

actionsRoutes.get('/actions', getActionsController);

export { actionsRoutes };

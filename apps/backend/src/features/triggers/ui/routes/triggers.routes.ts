import { Router } from 'express';

import { getTriggersController } from '../controllers/get-triggers.controller';

const triggersRoutes = Router();

triggersRoutes.get('/triggers', getTriggersController);

export { triggersRoutes };

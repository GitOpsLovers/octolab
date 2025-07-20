import { Router } from 'express';

import { getRunnersController } from '../controllers/get-runners.controller';

const runnersRoutes = Router();

runnersRoutes.get('/runners', getRunnersController);

export { runnersRoutes };

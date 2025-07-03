// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import express from 'express';

import { configureCorsMiddleware } from '@core/infrastructure/express/cors-config.express';
import { checkRequiredEnvVariables } from '@core/infrastructure/express/env-config.express';
import { templatesRoutes } from '@features/templates/ui/routes/templates.routes';

const requiredEnvVars = ['BACKEND_PORT', 'CORS_ALLOWED_ORIGINS'];
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') ?? [];

checkRequiredEnvVariables(requiredEnvVars);

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

app.use(configureCorsMiddleware(allowedOrigins));

// Routing
app.use('/api', templatesRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';

import { initSupabaseClient } from '@core/infrastructure/database/supabase.client';
import { configureCorsMiddleware } from '@core/infrastructure/express/cors-config.express';
import { checkRequiredEnvVariables } from '@core/infrastructure/express/env-config.express';
import { templatesRoutes } from '@features/templates/ui/routes/templates.routes';
import { workflowsRoutes } from '@features/workflows/ui/routes/workflows.routes';

const requiredEnvVars = ['BACKEND_PORT', 'CORS_ALLOWED_ORIGINS', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'AUTH0_DOMAIN', 'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET'];
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') ?? [];

checkRequiredEnvVariables(requiredEnvVars);

initSupabaseClient();

const app = express();

// Trust first proxy
app.set('trust proxy', 1);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(configureCorsMiddleware(allowedOrigins));

// Routing
app.use('/api', templatesRoutes);
app.use('/api', workflowsRoutes);

const PORT = process.env.BACKEND_PORT || 4000;

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

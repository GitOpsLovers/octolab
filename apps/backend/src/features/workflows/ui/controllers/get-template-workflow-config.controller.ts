import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getTemplateWorkflowConfigUseCase } from '../../application/get-template-workflow-config.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Get template workflow configuration controller.
 */
export const getTemplateWorkflowConfigController: RequestHandler = async (req, res) => {
    try {
        const templateId = req.params.templateId;
        const config = await getTemplateWorkflowConfigUseCase(templateId);

        res.status(StatusCodes.OK).json(config);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Get template workflow configuration controller');
        handleError(error as Error, res);
    }
};

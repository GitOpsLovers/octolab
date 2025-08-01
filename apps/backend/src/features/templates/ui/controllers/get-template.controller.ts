import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { getTemplateByIdUseCase } from '../../application/get-template-by-id.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Get template by Id controller.
 */
export const getTemplateByIdController: RequestHandler = async (req, res) => {
    try {
        const templateId = req.params.templateId;
        const template = await getTemplateByIdUseCase(templateId);

        res.status(StatusCodes.OK).json(template);
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Template proposal');
        handleError(error as Error, res);
    }
};

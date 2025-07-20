import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sendTemplateProposalUseCase } from '../../application/send-template-proposa.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { resendClient } from '@core/infrastructure/resend/resend.client';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Send template proposal controller.
 */
export async function sendTemplateProposalController(req: Request, res: Response): Promise<void> {
    try {
        const data = req.body;

        await sendTemplateProposalUseCase(resendClient, data);

        res.status(StatusCodes.OK).send({ message: 'Template proposal sent successfully' });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Template proposal');
        handleError(error as Error, res);
    }
}

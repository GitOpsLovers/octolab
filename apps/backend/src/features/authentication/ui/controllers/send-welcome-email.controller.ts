import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sendWelcomeEmailUseCase } from '../../application/send-welcome-email.use-case';

import { appLogger } from '@core/infrastructure/loggers/winston.logger';
import { resendClient } from '@core/infrastructure/resend/resend.client';
import { handleError } from '@core/ui/handlers/error.handler';

/**
 * Send welcome email controller
 *
 * @param req Request
 * @param res Response
 */
export const sendWelcomeEmailController: RequestHandler = async (req, res) => {
    try {
        const data = req.body;

        await sendWelcomeEmailUseCase(resendClient, data);

        res.status(StatusCodes.OK).json({ message: 'Welcome email sent successfully' });
    } catch (error: unknown) {
        appLogger.error(`Error: ${(error as Error).message}`, 'Send welcome email controller');

        handleError(error as Error, res);
    }
};

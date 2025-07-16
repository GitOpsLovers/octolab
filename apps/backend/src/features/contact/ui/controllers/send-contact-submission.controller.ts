import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sendContactSubmissionUseCase } from '../../application/send-contact-submission.use-case';

import { resendClient } from '@core/infrastructure/resend/resend.client';

/**
 * Send contact submission controller.
 */
export async function sendContactSubmissionController(req: Request, res: Response): Promise<void> {
    const data = req.body;

    await sendContactSubmissionUseCase(resendClient, data);

    res.status(StatusCodes.OK).send({ message: 'Contact submission sent successfully' });
}

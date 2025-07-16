import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sendTemplateProposalUseCase } from '../../application/send-template-proposa.use-case';

import { resendClient } from '@core/infrastructure/resend/resend.client';

/**
 * Send template proposal controller.
 */
export async function sendTemplateProposalController(req: Request, res: Response): Promise<void> {
    const data = req.body;

    await sendTemplateProposalUseCase(resendClient, data);

    res.status(StatusCodes.OK).send({ message: 'Template proposal sent successfully' });
}

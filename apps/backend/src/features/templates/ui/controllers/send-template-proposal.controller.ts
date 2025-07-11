import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sendTemplateProposalUseCase } from '../../application/send-template-proposa.use-case';

/**
 * Send template proposal controller.
 */
export async function sendTemplateProposalController(req: Request, res: Response): Promise<void> {
    const data = req.body;

    await sendTemplateProposalUseCase(data);

    res.status(StatusCodes.OK).send({ message: 'Template proposal sent successfully' });
}

// eslint-disable-next-line import/no-unassigned-import
import 'express';

declare global {
    namespace Express {
        interface Request {
            auth?: any;
        }
    }
}

export {};

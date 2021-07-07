import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }

    const [,token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "e1ca2ccd37b03a57259695f780d9e90c") as IPayload;

        req.user_id = sub;

        return next();
    }catch(err) {
        return res.status(401).end();
    }

}
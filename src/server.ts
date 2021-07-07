import express, { Request, Response, NextFunction} from 'express';
import 'reflect-metadata';
import "express-async-errors";

import { router } from '../routes';

import './database';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "Error",
        message: "Internal Server Error"
    })
})

app.listen(3000, () => console.log("server is running"))

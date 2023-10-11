"use strict"
import express, { Request, Response } from 'express';
import { userRouter } from './user';
import { userStatus } from '../common';

const routes = express.Router();

const accessControl = (req: Request, res: Response, next: any) => {
    req.headers.userType = userStatus[req.originalUrl.split('/')[1]]
    next()
}

routes.use('/user', accessControl, userRouter);

export { routes }

"use strict"
import express, { Router } from 'express';
import { userController } from '../controller';
import { userJwt } from '../helper';
import * as validation from '../validation';
const routes = express.Router();

// --signup flow
routes.post('/signUp', validation.signUp, userController.signUp);
routes.post('/login', validation.login, userController.login);
routes.post('/logout', userJwt, validation.logout, userController.logOut);

routes.use(userJwt);
// --profile flow
routes.get('/get/profile', userController.getProfile);

// --chuck-joke flow
routes.get('/api/random/joke', userController.chuckJoke);


export const userRouter = routes;
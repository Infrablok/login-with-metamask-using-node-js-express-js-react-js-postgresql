import express from 'express';
import jwt from 'express-jwt';

import { config } from '../../config';
import * as controller from './usersController';

export const userRouter = express.Router();

userRouter.get('/',controller.find);

userRouter.get('/:userId',jwt(config), controller.get);

userRouter.post('/',controller.create);

userRouter.patch('/:userId',jwt(config), controller.patch);

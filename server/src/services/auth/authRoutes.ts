import express from 'express';

import * as controller from './authController';

export const authRouter = express.Router();

authRouter.post('/',controller.login);
